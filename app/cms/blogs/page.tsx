"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Calendar,
  CheckCircle2,
  Eye,
  EyeOff,
  FilePenLine,
  LayoutTemplate,
  Plus,
  Radio,
  Save,
  Sparkles,
  Star,
  Trash2,
  Upload,
} from "lucide-react";
import { toast } from "sonner";

import RichTextEditor from "@/app/components/RichTextEditor";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import type { BlogPost, BlogStatus } from "@/lib/blogs";

type FormState = {
  id: string | null;
  title: string;
  publishedAt: string;
  contentHtml: string;
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

export default function BlogCmsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(191,219,254,0.32),transparent_28%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_24%,#f8fafc_100%)] text-ink">
      <div className="custom-container py-12 md:py-14">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-accent">
              Publishing Panel
            </p>
            <h1 className="text-[clamp(40px,6vw,64px)] font-black uppercase tracking-[-0.04em] leading-[0.92]">
              Editorial Control Center
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink-muted md:text-lg">
              Manage article creation, scheduling, featuring, and visibility from one workspace. Published posts appear on the public blog automatically, and featured posts flow into the homepage spotlight.
            </p>
          </div>

          <button
            type="button"
            onClick={startNew}
            className="inline-flex h-12 items-center justify-center gap-2 bg-ink px-5 text-xs font-bold uppercase tracking-[0.16em] text-white shadow-[0_18px_36px_rgba(10,17,40,0.18)] transition-transform hover:-translate-y-0.5"
          >
            <Plus size={16} />
            New Blog
          </button>
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
                className="border border-border bg-white px-5 py-5 shadow-[0_16px_48px_rgba(10,17,40,0.06)]"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-ink-muted">
                    {item.label}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center border border-border bg-slate-50">
                    <Icon size={18} className="text-accent" />
                  </div>
                </div>
                <div className="text-4xl font-black tracking-tight">{item.value}</div>
              </div>
            );
          })}
        </div>

        <div className="grid gap-8 xl:grid-cols-[360px_minmax(0,1fr)]">
          <aside className="overflow-hidden border border-border bg-white shadow-[0_24px_64px_rgba(10,17,40,0.08)]">
            <div className="border-b border-border bg-[linear-gradient(180deg,rgba(248,250,252,0.96),rgba(255,255,255,0.96))] px-5 py-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-sm font-black uppercase tracking-[0.16em]">All Blogs</h2>
                  <p className="mt-1 text-sm text-ink-muted">
                    Live list with realtime Supabase updates.
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-700">
                  <Radio size={13} className="fill-current" />
                  Live
                </span>
              </div>
            </div>

            {loading ? (
              <div className="px-5 py-6 text-sm text-ink-muted">Loading blogs...</div>
            ) : blogs.length === 0 ? (
              <div className="px-5 py-6 text-sm text-ink-muted">No blogs yet.</div>
            ) : (
              <div className="max-h-[780px] overflow-y-auto bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]">
                {blogs.map((blog) => {
                  const active = blog.id === selectedBlog?.id;

                  return (
                    <button
                      key={blog.id}
                      type="button"
                      onClick={() => selectBlog(blog)}
                      className={`block w-full border-b border-border px-5 py-4 text-left transition-all hover:bg-slate-50 ${
                        active ? "bg-slate-50 shadow-[inset_3px_0_0_0_#1E3A8A]" : "bg-white"
                      }`}
                    >
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <span className="line-clamp-2 text-base font-black uppercase tracking-tight">
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

          <section className="overflow-hidden border border-border bg-white shadow-[0_24px_64px_rgba(10,17,40,0.08)]">
            <div className="border-b border-border bg-[linear-gradient(180deg,rgba(248,250,252,0.96),rgba(255,255,255,0.96))] px-6 py-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-sm font-black uppercase tracking-[0.16em]">
                    {form.id ? "Edit Blog" : "Create Blog"}
                  </h2>
                  <p className="mt-1 text-sm text-ink-muted">
                    Fixed publishing structure: heading, publishing date, image, then content.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-2 border border-border px-3 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-ink-muted">
                    Status: {formatStatus(form.status)}
                  </span>
                  {form.featured && (
                    <span className="inline-flex items-center gap-2 border border-accent bg-accent/5 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-accent">
                      <Star size={13} />
                      Featured
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-8 px-6 py-6 md:px-8 md:py-8">
              {error && (
                <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div>
                <div className="rounded-[28px] border border-border bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-5 shadow-[0_18px_48px_rgba(10,17,40,0.05)]">
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-ink-muted">
                    1. Heading
                  </label>
                  <input
                    value={form.title}
                    onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                    placeholder="Enter the blog title"
                    className="h-14 w-full border border-border bg-white px-4 text-base outline-none transition-colors focus:border-accent"
                  />
                </div>
              </div>

              <div>
                <div className="rounded-[28px] border border-border bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-5 shadow-[0_18px_48px_rgba(10,17,40,0.05)]">
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-ink-muted">
                    2. Publishing Date
                  </label>
                  <div className="relative">
                    <Calendar size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted" />
                    <input
                      type="date"
                      value={form.publishedAt}
                      onChange={(event) =>
                        setForm((current) => ({ ...current, publishedAt: event.target.value }))
                      }
                      className="h-14 w-full border border-border bg-white pl-12 pr-4 text-base outline-none transition-colors focus:border-accent"
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="rounded-[28px] border border-border bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-5 shadow-[0_18px_48px_rgba(10,17,40,0.05)]">
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-ink-muted">
                    3. Blog Image
                  </label>
                  <label className="flex min-h-56 cursor-pointer flex-col items-center justify-center gap-3 border border-dashed border-border bg-slate-50 px-6 py-8 text-center transition-colors hover:border-accent hover:bg-white">
                    <Upload size={22} className="text-accent" />
                    <span className="text-sm font-bold uppercase tracking-[0.14em] text-ink">
                      Upload Cover Image
                    </span>
                    <span className="text-sm text-ink-muted">
                      Choose a strong visual for the article header.
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
                  {previewUrl && (
                    <div className="mt-4 overflow-hidden border border-border bg-white p-4">
                      <img
                        src={previewUrl}
                        alt="Blog cover preview"
                        className="h-64 w-full object-cover"
                      />
                      <div className="mt-3 flex justify-between gap-3">
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
                </div>
              </div>

              <div>
                <div className="rounded-[28px] border border-border bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-5 shadow-[0_18px_48px_rgba(10,17,40,0.05)]">
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-ink-muted">
                    4. Content
                  </label>
                  <p className="mb-4 text-sm text-ink-muted">
                    Use `H2` and `H3` headings to generate the article table of contents automatically.
                  </p>
                  <RichTextEditor
                    value={form.contentHtml}
                    onChange={(contentHtml) => setForm((current) => ({ ...current, contentHtml }))}
                  />
                </div>
              </div>

              <div className="sticky bottom-4 z-20 rounded-[28px] border border-border bg-white/95 px-5 py-5 shadow-[0_24px_72px_rgba(10,17,40,0.12)] backdrop-blur-md">
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
                      className="inline-flex h-11 items-center justify-center gap-2 border border-border px-4 text-xs font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Save size={15} />
                      Save Draft
                    </button>
                    <button
                      type="button"
                      onClick={() => persist("published")}
                      disabled={saving}
                      className="inline-flex h-11 items-center justify-center gap-2 bg-accent px-4 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-[0_14px_32px_rgba(30,58,138,0.28)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Eye size={15} />
                      {form.status === "published" ? "Update & Publish" : "Publish"}
                    </button>
                    {form.id && (
                      <button
                        type="button"
                        onClick={toggleHiddenState}
                        disabled={saving}
                        className="inline-flex h-11 items-center justify-center gap-2 border border-border px-4 text-xs font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
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
                        className="inline-flex h-11 items-center justify-center gap-2 bg-red-700 px-4 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <Trash2 size={15} />
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
                <div className="border border-border bg-slate-50 px-5 py-4">
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-ink-muted">
                    Structure
                  </p>
                  <div className="flex flex-wrap gap-3 text-sm text-ink-muted">
                    <span className="inline-flex items-center gap-2">
                      <FilePenLine size={14} /> Heading
                    </span>
                    <span>2. Publishing Date</span>
                    <span>3. Blog Image</span>
                    <span>4. Content</span>
                  </div>
                </div>

                <div className="border border-border bg-white px-5 py-4">
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
