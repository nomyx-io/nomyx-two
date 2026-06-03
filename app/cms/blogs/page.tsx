"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Calendar,
  CheckCircle2,
  Clock3,
  Eye,
  EyeOff,
  FilePenLine,
  HelpCircle,
  ImageIcon,
  LayoutTemplate,
  Plus,
  Search,
  Radio,
  Save,
  Sparkles,
  Star,
  Trash2,
  Upload,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import CmsLogoutButton from "@/app/cms/CmsLogoutButton";
import RichTextEditor from "@/app/components/RichTextEditor";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import type { BlogFaq, BlogPost, BlogStatus } from "@/lib/blogs";

type FormState = {
  id: string | null;
  title: string;
  publishedAt: string;
  contentHtml: string;
  faqs: BlogFaq[];
  featured: boolean;
  status: BlogStatus;
  imageFile: File | null;
  existingImageUrl: string | null;
  removeImage: boolean;
};

const emptyForm: FormState = {
  id: null,
  title: "",
  publishedAt: "",
  contentHtml: "<p></p>",
  faqs: [],
  featured: false,
  status: "draft",
  imageFile: null,
  existingImageUrl: null,
  removeImage: false,
};

function toDateInput(value: string | null) {
  if (!value) {
    return "";
  }

  return new Date(value).toISOString().slice(0, 10);
}

function formatStatus(status: BlogStatus) {
  if (status === "published") {
    return "Published";
  }

  if (status === "hidden") {
    return "Hidden";
  }

  return "Draft";
}

function plainTextFromHtml(html: string) {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function countInlineImages(html: string) {
  return (html.match(/<img\b/gi) || []).length;
}

function cleanFaqs(faqs: BlogFaq[]) {
  return faqs
    .map((faq) => ({
      question: faq.question.trim(),
      answer: faq.answer.trim(),
    }))
    .filter((faq) => faq.question && faq.answer);
}

export default function BlogCmsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const initializedRealtime = useRef(false);
  const previewUrl = useMemo(() => {
    if (!form.imageFile) {
      return form.existingImageUrl;
    }

    return URL.createObjectURL(form.imageFile);
  }, [form.existingImageUrl, form.imageFile]);

  const selectedBlog = useMemo(
    () => blogs.find((blog) => blog.id === form.id) ?? null,
    [blogs, form.id]
  );

  const filteredBlogs = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return blogs;
    }

    return blogs.filter((blog) => {
      return (
        blog.title.toLowerCase().includes(query) ||
        blog.status.toLowerCase().includes(query) ||
        (blog.excerpt || "").toLowerCase().includes(query)
      );
    });
  }, [blogs, searchTerm]);

  const contentStats = useMemo(() => {
    const wordCount = plainTextFromHtml(form.contentHtml).split(/\s+/).filter(Boolean).length;
    const readTime = Math.max(1, Math.ceil(wordCount / 220));

    return {
      images: countInlineImages(form.contentHtml),
      readTime,
      words: wordCount,
    };
  }, [form.contentHtml]);

  const completeFaqs = useMemo(() => cleanFaqs(form.faqs), [form.faqs]);

  const stats = useMemo(() => {
    return blogs.reduce(
      (accumulator, blog) => {
        accumulator.total += 1;
        if (blog.status === "published") {
          accumulator.published += 1;
        }
        if (blog.status === "draft") {
          accumulator.draft += 1;
        }
        if (blog.featured) {
          accumulator.featured += 1;
        }
        return accumulator;
      },
      { total: 0, published: 0, draft: 0, featured: 0 }
    );
  }, [blogs]);

  useEffect(() => {
    return () => {
      if (previewUrl && form.imageFile) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [form.imageFile, previewUrl]);

  const sortBlogs = (items: BlogPost[]) =>
    [...items].sort((first, second) => {
      const firstTime = new Date(second.updated_at).getTime() - new Date(first.updated_at).getTime();
      if (firstTime !== 0) {
        return firstTime;
      }
      return second.title.localeCompare(first.title);
    });

  const syncSelectedBlog = (blog: BlogPost | null) => {
    if (!blog) {
      return;
    }

    if (form.id !== blog.id) {
      return;
    }

    setForm((current) => ({
      ...current,
      id: blog.id,
      title: blog.title,
      publishedAt: toDateInput(blog.published_at),
      contentHtml: blog.content_html,
      faqs: blog.faqs || [],
      featured: blog.featured,
      status: blog.status,
      existingImageUrl: blog.cover_image_url,
      removeImage: false,
    }));
  };

  const loadBlogs = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/blogs", { cache: "no-store" });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to load blogs");
      }

      setBlogs(sortBlogs(data.blogs));
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Failed to load blogs");
      toast.error("Could not load blog entries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  useEffect(() => {
    if (initializedRealtime.current) {
      return;
    }

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      return;
    }

    initializedRealtime.current = true;

    const channel = supabase
      .channel("blog-cms-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "blog_posts",
        },
        (payload) => {
          if (payload.eventType === "DELETE") {
            const deletedId = String(payload.old.id);
            setBlogs((current) => current.filter((blog) => blog.id !== deletedId));

            setForm((current) => {
              if (current.id !== deletedId) {
                return current;
              }

              return emptyForm;
            });

            return;
          }

          const nextBlog = payload.new as BlogPost;

          setBlogs((current) => {
            const withoutCurrent = current.filter((blog) => blog.id !== nextBlog.id);
            return sortBlogs([nextBlog, ...withoutCurrent]);
          });

          syncSelectedBlog(nextBlog);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
      initializedRealtime.current = false;
    };
  }, [form.id]);

  const startNew = () => {
    setError(null);
    setForm(emptyForm);
  };

  const selectBlog = (blog: BlogPost) => {
    setError(null);
    setForm({
      id: blog.id,
      title: blog.title,
      publishedAt: toDateInput(blog.published_at),
      contentHtml: blog.content_html,
      faqs: blog.faqs || [],
      featured: blog.featured,
      status: blog.status,
      imageFile: null,
      existingImageUrl: blog.cover_image_url,
      removeImage: false,
    });
  };

  const persist = async (nextStatus: BlogStatus) => {
    setSaving(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.set("title", form.title);
      formData.set("publishedAt", form.publishedAt);
      formData.set("contentHtml", form.contentHtml);
      formData.set("faqs", JSON.stringify(cleanFaqs(form.faqs)));
      formData.set("featured", String(form.featured));
      formData.set("status", nextStatus);
      formData.set("removeImage", String(form.removeImage));

      if (form.imageFile) {
        formData.set("image", form.imageFile);
      }

      const response = await fetch(form.id ? `/api/admin/blogs/${form.id}` : "/api/admin/blogs", {
        method: form.id ? "PATCH" : "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save blog");
      }

      if (data.blog) {
        setBlogs((current) => {
          const withoutCurrent = current.filter((blog) => blog.id !== data.blog.id);
          return sortBlogs([data.blog, ...withoutCurrent]);
        });
        selectBlog(data.blog);
      }

      if (nextStatus === "published") {
        toast.success(form.id && form.status === "hidden" ? "Blog unhidden and published." : "Blog published.");
      } else if (nextStatus === "hidden") {
        toast.success("Blog hidden.");
      } else {
        toast.success("Draft saved.");
      }
    } catch (requestError) {
      const message =
        requestError instanceof Error ? requestError.message : "Failed to save blog";
      setError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  const toggleHiddenState = async () => {
    if (!form.id) {
      return;
    }

    await persist(form.status === "hidden" ? "published" : "hidden");
  };

  const addFaq = () => {
    setForm((current) => ({
      ...current,
      faqs: [...current.faqs, { question: "", answer: "" }],
    }));
  };

  const updateFaq = (index: number, field: keyof BlogFaq, value: string) => {
    setForm((current) => ({
      ...current,
      faqs: current.faqs.map((faq, faqIndex) =>
        faqIndex === index ? { ...faq, [field]: value } : faq
      ),
    }));
  };

  const removeFaq = (index: number) => {
    setForm((current) => ({
      ...current,
      faqs: current.faqs.filter((_, faqIndex) => faqIndex !== index),
    }));
  };

  const deleteCurrentBlog = async () => {
    if (!form.id) {
      return;
    }

    const confirmed = window.confirm("Delete this blog permanently?");
    if (!confirmed) {
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/blogs/${form.id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete blog");
      }

      setBlogs((current) => current.filter((blog) => blog.id !== form.id));
      setForm(emptyForm);
      toast.success("Blog deleted.");
    } catch (requestError) {
      const message =
        requestError instanceof Error ? requestError.message : "Failed to delete blog";
      setError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen app-grid-bg text-ink">
      <div className="custom-container py-12 md:py-14">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 inline-flex rounded-[6px] border border-[#1B243C] px-4 py-1.5 text-sm font-medium text-[#1B243C]">
              Publishing Panel
            </p>
            <h1 className="text-[clamp(36px,5vw,58px)] font-medium tracking-[-0.03em] leading-[1.02] text-[#19233D]">
              Editorial Control Center
            </h1>
            <p className="mt-4 max-w-3xl text-[17px] leading-relaxed text-[#42546E]">
              Draft, publish, feature, and compose rich articles with cover imagery and inline visuals from one focused editorial workspace.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <CmsLogoutButton />
            <Link
              href="/cms/leads"
              className="inline-flex h-12 items-center justify-center gap-2 border border-border bg-white px-5 text-xs font-bold uppercase tracking-[0.16em] text-ink shadow-sm transition-transform hover:-translate-y-0.5"
            >
              <Users size={16} className="text-accent" />
              View Resource Leads
            </Link>
            <button
              type="button"
              onClick={startNew}
              className="inline-flex h-12 items-center justify-center gap-2 bg-ink px-5 text-xs font-bold uppercase tracking-[0.16em] text-white shadow-[0_18px_36px_rgba(10,17,40,0.18)] transition-transform hover:-translate-y-0.5"
            >
              <Plus size={16} />
              New Blog
            </button>
          </div>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Total Posts", value: stats.total, icon: LayoutTemplate },
            { label: "Published", value: stats.published, icon: CheckCircle2 },
            { label: "Drafts", value: stats.draft, icon: FilePenLine },
            { label: "Featured", value: stats.featured, icon: Sparkles },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="rounded-[10px] border border-border bg-white/85 px-5 py-5 shadow-[0_16px_48px_rgba(10,17,40,0.05)] backdrop-blur"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-ink-muted">
                    {item.label}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-[8px] border border-border bg-[#F2F9FF]">
                    <Icon size={18} className="text-accent" />
                  </div>
                </div>
                <div className="text-4xl font-semibold tracking-tight">{item.value}</div>
              </div>
            );
          })}
        </div>

        <div className="grid gap-8 xl:grid-cols-[350px_minmax(0,1fr)]">
          <aside className="overflow-hidden rounded-[12px] border border-border bg-white/92 shadow-[0_24px_64px_rgba(10,17,40,0.07)] backdrop-blur">
            <div className="border-b border-border bg-[#F8FBFF] px-5 py-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-[0.16em]">Library</h2>
                  <p className="mt-1 text-sm text-ink-muted">
                    Search drafts, hidden posts, and published articles.
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-700">
                  <Radio size={13} className="fill-current" />
                  Live
                </span>
              </div>
              <div className="relative mt-4">
                <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
                <input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search posts..."
                  className="h-11 w-full rounded-[8px] border border-border bg-white pl-10 pr-3 text-sm font-medium outline-none transition-colors focus:border-accent"
                />
              </div>
            </div>

            {loading ? (
              <div className="px-5 py-6 text-sm text-ink-muted">Loading blogs...</div>
            ) : filteredBlogs.length === 0 ? (
              <div className="px-5 py-6 text-sm text-ink-muted">No matching blogs.</div>
            ) : (
              <div className="max-h-[820px] overflow-y-auto bg-white">
                {filteredBlogs.map((blog) => {
                  const active = blog.id === selectedBlog?.id;

                  return (
                    <button
                      key={blog.id}
                      type="button"
                      onClick={() => selectBlog(blog)}
                      className={`block w-full border-b border-border px-5 py-4 text-left transition-colors hover:bg-[#F8FBFF] ${
                        active ? "bg-[#F2F9FF] shadow-[inset_3px_0_0_0_#215EC7]" : "bg-white"
                      }`}
                    >
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <span className="line-clamp-2 text-base font-bold tracking-tight text-[#19233D]">
                          {blog.title}
                        </span>
                        {blog.featured && <Star size={16} className="shrink-0 text-accent" />}
                      </div>
                      <div className="mb-3 flex flex-wrap gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-ink-muted">
                        <span
                          className={`px-2 py-1 ${
                            blog.status === "published"
                              ? "bg-emerald-50 text-emerald-700"
                              : blog.status === "hidden"
                                ? "bg-amber-50 text-amber-700"
                                : "bg-slate-100 text-ink-muted"
                          }`}
                        >
                          {formatStatus(blog.status)}
                        </span>
                        {blog.published_at && <span>{toDateInput(blog.published_at)}</span>}
                      </div>
                      <p className="line-clamp-2 text-sm text-ink-muted">
                        {blog.excerpt || "No excerpt yet."}
                      </p>
                    </button>
                  );
                })}
              </div>
            )}
          </aside>

          <section className="overflow-hidden rounded-[12px] border border-border bg-white/95 shadow-[0_24px_64px_rgba(10,17,40,0.08)] backdrop-blur">
            <div className="border-b border-border bg-[#F8FBFF] px-6 py-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-[0.16em]">
                    {form.id ? "Edit Blog" : "Create Blog"}
                  </h2>
                  <p className="mt-1 text-sm text-ink-muted">
                    Compose articles with a cover image, inline images, headings, lists, quotes, and links.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-2 rounded-[6px] border border-border bg-white px-3 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-ink-muted">
                    Status: {formatStatus(form.status)}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-[6px] border border-border bg-white px-3 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-ink-muted">
                    <Clock3 size={13} className="text-accent" />
                    {contentStats.readTime} Min
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-[6px] border border-border bg-white px-3 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-ink-muted">
                    <ImageIcon size={13} className="text-accent" />
                    {contentStats.images} Inline
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-[6px] border border-border bg-white px-3 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-ink-muted">
                    <HelpCircle size={13} className="text-accent" />
                    {completeFaqs.length} FAQs
                  </span>
                  {form.featured && (
                    <span className="inline-flex items-center gap-2 rounded-[6px] border border-accent bg-accent/5 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-accent">
                      <Star size={13} />
                      Featured
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6 px-5 py-5 md:px-7 md:py-7">
              {error && (
                <div className="rounded-[8px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_260px]">
                <div className="rounded-[10px] border border-border bg-white p-5 shadow-[0_14px_40px_rgba(10,17,40,0.04)]">
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-ink-muted">
                    Article Title
                  </label>
                  <input
                    value={form.title}
                    onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                    placeholder="Enter the blog title"
                    className="h-14 w-full rounded-[8px] border border-border bg-white px-4 text-base font-medium outline-none transition-colors focus:border-accent"
                  />
                </div>

                <div className="rounded-[10px] border border-border bg-white p-5 shadow-[0_14px_40px_rgba(10,17,40,0.04)]">
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-ink-muted">
                    Publishing Date
                  </label>
                  <div className="relative">
                    <Calendar size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted" />
                    <input
                      type="date"
                      value={form.publishedAt}
                      onChange={(event) =>
                        setForm((current) => ({ ...current, publishedAt: event.target.value }))
                      }
                      className="h-14 w-full rounded-[8px] border border-border bg-white pl-12 pr-4 text-base font-medium outline-none transition-colors focus:border-accent"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-[10px] border border-border bg-white p-5 shadow-[0_14px_40px_rgba(10,17,40,0.04)]">
                <div className="mb-4 flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.16em] text-ink-muted">
                      Cover Image
                    </label>
                    <p className="mt-1 text-sm text-ink-muted">
                      Used for the blog card and article hero.
                    </p>
                  </div>
                  <label className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-[6px] bg-ink px-4 text-xs font-bold uppercase tracking-[0.14em] text-white transition-transform hover:-translate-y-0.5">
                    <Upload size={15} />
                    Upload Cover
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          imageFile: event.target.files?.[0] ?? null,
                          removeImage: false,
                        }))
                      }
                    />
                  </label>
                </div>

                  {previewUrl && (
                    <div className="overflow-hidden rounded-[8px] border border-border bg-white">
                      <img
                        src={previewUrl}
                        alt="Blog cover preview"
                        className="aspect-[16/7] w-full object-cover"
                      />
                      <div className="flex justify-between gap-3 px-4 py-3">
                        <span className="text-sm text-ink-muted">
                          Cover preview
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setForm((current) => ({
                              ...current,
                              imageFile: null,
                              existingImageUrl: current.imageFile ? current.existingImageUrl : null,
                              removeImage: true,
                            }))
                          }
                          className="text-xs font-bold uppercase tracking-[0.14em] text-red-700"
                        >
                          Remove Image
                        </button>
                      </div>
                    </div>
                  )}
                  {!previewUrl && (
                    <label className="flex min-h-48 cursor-pointer flex-col items-center justify-center gap-3 rounded-[8px] border border-dashed border-border bg-[#F8FBFF] px-6 py-8 text-center transition-colors hover:border-accent hover:bg-white">
                      <ImageIcon size={24} className="text-accent" />
                      <span className="text-sm font-bold uppercase tracking-[0.14em] text-ink">
                        Add a cover image
                      </span>
                      <span className="max-w-md text-sm text-ink-muted">
                        Inline images are added from the editor toolbar below.
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(event) =>
                          setForm((current) => ({
                            ...current,
                            imageFile: event.target.files?.[0] ?? null,
                            removeImage: false,
                          }))
                        }
                      />
                    </label>
                  )}
              </div>

              <div className="rounded-[10px] border border-border bg-white p-5 shadow-[0_14px_40px_rgba(10,17,40,0.04)]">
                <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.16em] text-ink-muted">
                      Article Body
                    </label>
                    <p className="mt-1 text-sm text-ink-muted">
                      Use H2/H3 headings for the public table of contents. Use the Image toolbar action to place visuals between paragraphs.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-ink-muted">
                    <span className="rounded-[6px] bg-[#F2F9FF] px-3 py-2">{contentStats.words} Words</span>
                    <span className="rounded-[6px] bg-[#F2F9FF] px-3 py-2">{contentStats.images} Images</span>
                  </div>
                </div>
                <RichTextEditor
                  value={form.contentHtml}
                  imageUploadTitle={form.title || "blog-content"}
                  onChange={(contentHtml) => setForm((current) => ({ ...current, contentHtml }))}
                />
              </div>

              <div className="rounded-[10px] border border-border bg-white p-5 shadow-[0_14px_40px_rgba(10,17,40,0.04)]">
                <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.16em] text-ink-muted">
                      FAQs
                    </label>
                    <p className="mt-1 text-sm text-ink-muted">
                      Add optional questions and answers that appear at the end of the public blog.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={addFaq}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-[6px] bg-ink px-4 text-xs font-bold uppercase tracking-[0.14em] text-white transition-transform hover:-translate-y-0.5"
                  >
                    <Plus size={15} />
                    Add FAQ
                  </button>
                </div>

                {form.faqs.length === 0 ? (
                  <div className="rounded-[8px] border border-dashed border-border bg-[#F8FBFF] px-5 py-8 text-center">
                    <HelpCircle size={24} className="mx-auto mb-3 text-accent" />
                    <p className="text-sm font-bold uppercase tracking-[0.14em] text-ink">
                      No FAQs added
                    </p>
                    <p className="mt-2 text-sm text-ink-muted">
                      Use FAQs for short objections, definitions, and end-of-article context.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {form.faqs.map((faq, index) => (
                      <div
                        key={index}
                        className="rounded-[8px] border border-border bg-[#F8FBFF] p-4"
                      >
                        <div className="mb-3 flex items-center justify-between gap-3">
                          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-muted">
                            FAQ {index + 1}
                          </p>
                          <button
                            type="button"
                            onClick={() => removeFaq(index)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-[6px] text-red-700 transition-colors hover:bg-red-50"
                            aria-label={`Remove FAQ ${index + 1}`}
                          >
                            <X size={16} />
                          </button>
                        </div>

                        <label className="mb-3 block">
                          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-ink-muted">
                            Question
                          </span>
                          <input
                            value={faq.question}
                            onChange={(event) => updateFaq(index, "question", event.target.value)}
                            placeholder="What should readers know?"
                            className="h-12 w-full rounded-[8px] border border-border bg-white px-4 text-sm font-medium outline-none transition-colors focus:border-accent"
                          />
                        </label>

                        <label className="block">
                          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-ink-muted">
                            Answer
                          </span>
                          <textarea
                            value={faq.answer}
                            onChange={(event) => updateFaq(index, "answer", event.target.value)}
                            placeholder="Write a concise answer."
                            rows={4}
                            className="w-full resize-y rounded-[8px] border border-border bg-white px-4 py-3 text-sm leading-relaxed outline-none transition-colors focus:border-accent"
                          />
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="sticky bottom-4 z-20 rounded-[10px] border border-border bg-white/95 px-5 py-5 shadow-[0_24px_72px_rgba(10,17,40,0.12)] backdrop-blur-md">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                  <label className="flex items-center gap-4">
                    <span className="text-xs font-bold uppercase tracking-[0.16em] text-ink-muted">
                      Featured on homepage
                    </span>
                    <button
                      type="button"
                      aria-pressed={form.featured}
                      onClick={() => setForm((current) => ({ ...current, featured: !current.featured }))}
                      className={`relative h-8 w-14 rounded-full transition-colors ${
                        form.featured ? "bg-accent" : "bg-slate-300"
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-6 w-6 rounded-full bg-white transition-transform ${
                          form.featured ? "translate-x-7" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </label>

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => persist("draft")}
                      disabled={saving}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-[6px] border border-border px-4 text-xs font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Save size={15} />
                      Save Draft
                    </button>
                    <button
                      type="button"
                      onClick={() => persist("published")}
                      disabled={saving}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-[6px] bg-accent px-4 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-[0_14px_32px_rgba(30,58,138,0.28)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Eye size={15} />
                      {form.status === "published" ? "Update & Publish" : "Publish"}
                    </button>
                    {form.id && (
                      <button
                        type="button"
                        onClick={toggleHiddenState}
                        disabled={saving}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-[6px] border border-border px-4 text-xs font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {form.status === "hidden" ? <Eye size={15} /> : <EyeOff size={15} />}
                        {form.status === "hidden" ? "Unhide" : "Hide"}
                      </button>
                    )}
                    {form.id && (
                      <button
                        type="button"
                        onClick={deleteCurrentBlog}
                        disabled={saving}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-[6px] bg-red-700 px-4 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <Trash2 size={15} />
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
                <div className="rounded-[10px] border border-border bg-[#F8FBFF] px-5 py-4">
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-ink-muted">
                    Composition
                  </p>
                  <div className="flex flex-wrap gap-3 text-sm text-ink-muted">
                    <span className="inline-flex items-center gap-2">
                      <FilePenLine size={14} /> Title
                    </span>
                    <span>Cover Image</span>
                    <span>Inline Images</span>
                    <span>Rich Body</span>
                  </div>
                </div>

                <div className="rounded-[10px] border border-border bg-white px-5 py-4">
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-ink-muted">
                    Visibility
                  </p>
                  <p className="text-sm leading-relaxed text-ink-muted">
                    `Publish` sends the post live, `Hide` removes it from public surfaces, and `Featured` promotes it to the homepage blog section.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
