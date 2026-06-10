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
  FolderTree,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import RichTextEditor from "@/app/components/RichTextEditor";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import type { NewsCategory, NewsPost, NewsStatus } from "@/lib/news";

type FormState = {
  id: string | null;
  title: string;
  slug: string;
  pageTitle: string;
  excerpt: string;
  publishedAt: string;
  contentHtml: string;
  categoryId: string | null;
  featured: boolean;
  status: NewsStatus;
  imageFile: File | null;
  existingImageUrl: string | null;
  removeImage: boolean;
};

const emptyForm: FormState = {
  id: null,
  title: "",
  slug: "",
  pageTitle: "",
  excerpt: "",
  publishedAt: "",
  contentHtml: "<p></p>",
  categoryId: null,
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

function formatStatus(status: NewsStatus) {
  if (status === "published") return "Published";
  if (status === "hidden") return "Hidden";
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

export default function NewsCmsPage() {
  const [newsItems, setNewsItems] = useState<NewsPost[]>([]);
  const [categories, setCategories] = useState<NewsCategory[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const initializedRealtime = useRef(false);
  
  const previewUrl = useMemo(() => {
    if (!form.imageFile) return form.existingImageUrl;
    return URL.createObjectURL(form.imageFile);
  }, [form.existingImageUrl, form.imageFile]);

  const selectedNews = useMemo(
    () => newsItems.find((item) => item.id === form.id) ?? null,
    [newsItems, form.id]
  );

  const filteredNews = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return newsItems;
    return newsItems.filter((item) => {
      return (
        item.title.toLowerCase().includes(query) ||
        item.status.toLowerCase().includes(query) ||
        (item.excerpt || "").toLowerCase().includes(query)
      );
    });
  }, [newsItems, searchTerm]);

  const contentStats = useMemo(() => {
    const wordCount = plainTextFromHtml(form.contentHtml).split(/\s+/).filter(Boolean).length;
    const readTime = Math.max(1, Math.ceil(wordCount / 220));
    return { images: countInlineImages(form.contentHtml), readTime, words: wordCount };
  }, [form.contentHtml]);

  const stats = useMemo(() => {
    return newsItems.reduce(
      (accumulator, item) => {
        accumulator.total += 1;
        if (item.status === "published") accumulator.published += 1;
        if (item.status === "draft") accumulator.draft += 1;
        if (item.featured) accumulator.featured += 1;
        return accumulator;
      },
      { total: 0, published: 0, draft: 0, featured: 0 }
    );
  }, [newsItems]);

  useEffect(() => {
    return () => {
      if (previewUrl && form.imageFile) URL.revokeObjectURL(previewUrl);
    };
  }, [form.imageFile, previewUrl]);

  const sortNews = (items: NewsPost[]) =>
    [...items].sort((first, second) => {
      const firstTime = new Date(second.updated_at).getTime() - new Date(first.updated_at).getTime();
      if (firstTime !== 0) return firstTime;
      return second.title.localeCompare(first.title);
    });

  const syncSelectedNews = (item: NewsPost | null) => {
    if (!item || form.id !== item.id) return;

    setForm((current) => ({
      ...current,
      id: item.id,
      title: item.title,
      slug: item.slug || "",
      pageTitle: item.page_title || "",
      excerpt: item.excerpt || "",
      publishedAt: toDateInput(item.published_at),
      contentHtml: item.content_html,
      categoryId: item.category_id,
      featured: item.featured,
      status: item.status,
      existingImageUrl: item.cover_image_url,
      removeImage: false,
    }));
  };

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [newsResponse, catResponse] = await Promise.all([
        fetch("/api/admin/news", { cache: "no-store" }),
        fetch("/api/admin/news-categories", { cache: "no-store" })
      ]);
      const newsData = await newsResponse.json();
      const catData = await catResponse.json();

      if (!newsResponse.ok) throw new Error(newsData.error || "Failed to load news");
      if (!catResponse.ok) throw new Error(catData.error || "Failed to load categories");

      setNewsItems(sortNews(newsData.news || []));
      setCategories(catData.categories || []);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Failed to load data");
      toast.error("Could not load news entries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (initializedRealtime.current) return;

    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    initializedRealtime.current = true;

    const channel = supabase
      .channel("news-cms-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "news_posts" },
        (payload) => {
          if (payload.eventType === "DELETE") {
            const deletedId = String(payload.old.id);
            setNewsItems((current) => current.filter((item) => item.id !== deletedId));
            setForm((current) => current.id === deletedId ? emptyForm : current);
            return;
          }

          const nextItem = payload.new as NewsPost;
          setNewsItems((current) => {
            const withoutCurrent = current.filter((item) => item.id !== nextItem.id);
            return sortNews([nextItem, ...withoutCurrent]);
          });
          syncSelectedNews(nextItem);
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
    setIsEditing(true);
  };

  const selectNews = (item: NewsPost) => {
    setError(null);
    setForm({
      id: item.id,
      title: item.title,
      slug: item.slug || "",
      pageTitle: item.page_title || "",
      excerpt: item.excerpt || "",
      publishedAt: toDateInput(item.published_at),
      contentHtml: item.content_html,
      categoryId: item.category_id,
      featured: item.featured,
      status: item.status,
      imageFile: null,
      existingImageUrl: item.cover_image_url,
      removeImage: false,
    });
    setIsEditing(true);
  };

  const persist = async (nextStatus: NewsStatus) => {
    setSaving(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.set("title", form.title);
      formData.set("slug", form.slug);
      formData.set("pageTitle", form.pageTitle);
      formData.set("excerpt", form.excerpt);
      formData.set("publishedAt", form.publishedAt);
      formData.set("contentHtml", form.contentHtml);
      if (form.categoryId) formData.set("categoryId", form.categoryId);
      formData.set("featured", String(form.featured));
      formData.set("status", nextStatus);
      formData.set("removeImage", String(form.removeImage));

      if (form.imageFile) formData.set("image", form.imageFile);

      const response = await fetch(form.id ? `/api/admin/news/${form.id}` : "/api/admin/news", {
        method: form.id ? "PATCH" : "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to save news");

      if (data.newsItem) {
        setNewsItems((current) => {
          const withoutCurrent = current.filter((item) => item.id !== data.newsItem.id);
          return sortNews([data.newsItem, ...withoutCurrent]);
        });
        selectNews(data.newsItem);
      }

      if (nextStatus === "published") {
        toast.success(form.id && form.status === "hidden" ? "News unhidden and published." : "News published.");
      } else if (nextStatus === "hidden") {
        toast.success("News hidden.");
      } else {
        toast.success("Draft saved.");
      }
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : "Failed to save news";
      setError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  const toggleHiddenState = async () => {
    if (!form.id) return;
    await persist(form.status === "hidden" ? "published" : "hidden");
  };

  const executeDelete = async (id: string) => {
    setSaving(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/news/${id}`, { method: "DELETE" });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to delete news");

      setNewsItems((current) => current.filter((item) => item.id !== id));
      if (form.id === id) {
        setForm(emptyForm);
        setIsEditing(false);
      }
      setDeleteTargetId(null);
      toast.success("News deleted.");
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : "Failed to delete news";
      setError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  const selectedCategoryName = categories.find(c => c.id === form.categoryId)?.name;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(191,219,254,0.32),transparent_28%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_24%,#f8fafc_100%)] text-ink">
      <div className="custom-container py-12 md:py-14">
        {!isEditing ? (
          <>
            <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-4 inline-flex rounded-[6px] border border-[#1B243C] px-4 py-1 text-sm font-medium text-[#1B243C]">
                  Publishing Panel
                </p>
                <h1 className="text-[clamp(36px,5vw,25px)] font-medium tracking-[-0.03em] leading-[1.02] text-[#19233D]">
                  News Control Center
                </h1>
                <p className="mt-4 max-w-3xl text-[16px] leading-relaxed text-[#42546E]">
                  Draft, publish, feature, and categorize news updates from one focused editorial workspace.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={startNew}
                  className="inline-flex rounded-[9px] items-center justify-center gap-2 bg-ink px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white shadow-[0_18px_36px_rgba(10,17,40,0.18)] transition-transform hover:-translate-y-0.5"
                >
                  <Plus size={16} />
                  New Article
                </button>
              </div>
            </div>

            <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                { label: "Total Articles", value: stats.total, icon: LayoutTemplate },
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

            <div className="overflow-hidden rounded-[12px] border border-border bg-white/95 shadow-[0_24px_64px_rgba(10,17,40,0.08)] backdrop-blur">
              <div className="border-b border-border bg-[#F8FBFF] px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-[0.16em]">Articles Library</h2>
                  <p className="mt-1 text-sm text-ink-muted">Manage all your news articles.</p>
                </div>
                <div className="relative">
                  <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
                  <input
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search articles..."
                    className="h-11 w-full md:w-72 rounded-[8px] border border-border bg-white pl-10 pr-3 text-sm font-medium outline-none transition-colors focus:border-accent"
                  />
                </div>
              </div>
              
              {loading ? (
                <div className="px-6 py-8 text-center text-sm text-ink-muted">Loading news...</div>
              ) : filteredNews.length === 0 ? (
                <div className="px-6 py-8 text-center text-sm text-ink-muted">No matching news articles.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-border text-[11px] font-bold uppercase tracking-[0.16em] text-ink-muted">
                      <tr>
                        <th className="px-6 py-4 font-bold whitespace-nowrap">Article Title</th>
                        <th className="px-6 py-4 font-bold whitespace-nowrap">Status</th>
                        <th className="px-6 py-4 font-bold whitespace-nowrap">Category</th>
                        <th className="px-6 py-4 font-bold whitespace-nowrap">Published Date</th>
                        <th className="px-6 py-4 font-bold whitespace-nowrap">Featured</th>
                        <th className="px-6 py-4 font-bold text-right whitespace-nowrap">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredNews.map((item) => (
                        <tr key={item.id} className="transition-colors hover:bg-slate-50/50">
                          <td className="px-6 py-4">
                            <div className="font-bold text-[#19233D] line-clamp-1">{item.title}</div>
                            {item.excerpt && <div className="text-[13px] text-ink-muted line-clamp-1 mt-1">{item.excerpt}</div>}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-2.5 py-1 rounded-[4px] text-[10px] font-bold uppercase tracking-[0.14em] ${
                              item.status === "published" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                              item.status === "hidden" ? "bg-amber-50 text-amber-700 border border-amber-200" :
                              "bg-slate-100 text-ink-muted border border-slate-200"
                            }`}>
                              {formatStatus(item.status)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-ink-muted text-[11px] font-bold uppercase tracking-widest whitespace-nowrap">
                            {categories.find(c => c.id === item.category_id)?.name || "—"}
                          </td>
                          <td className="px-6 py-4 text-ink-muted font-medium whitespace-nowrap">
                            {item.published_at ? toDateInput(item.published_at) : "—"}
                          </td>
                          <td className="px-6 py-4">
                            {item.featured ? <Star size={16} className="text-accent fill-accent" /> : <span className="text-slate-300">—</span>}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => selectNews(item)}
                                className="inline-flex items-center justify-center gap-2 rounded-[6px] border border-border bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-ink shadow-[0_2px_8px_rgba(10,17,40,0.04)] transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                              >
                                <FilePenLine size={14} />
                                Edit
                              </button>
                              <button
                                onClick={() => setDeleteTargetId(item.id)}
                                className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-[6px] border border-red-200 bg-red-50 text-red-700 shadow-[0_2px_8px_rgba(10,17,40,0.04)] transition-all hover:-translate-y-0.5 hover:bg-red-100"
                                title="Delete"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8">
              <button
                onClick={() => setIsEditing(false)}
                className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-ink-muted transition-colors hover:text-accent bg-white border border-border shadow-sm px-4 py-2 rounded-lg"
              >
                <X size={16} className="shrink-0" />
                Back to Library
              </button>
            </div>

          <section className="overflow-hidden rounded-[12px] border border-border bg-white/95 shadow-[0_24px_64px_rgba(10,17,40,0.08)] backdrop-blur">
            <div className="border-b border-border bg-[#F8FBFF] px-6 py-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-[0.16em]">
                    {form.id ? "Edit Article" : "Create Article"}
                  </h2>
                  <p className="mt-1 text-sm text-ink-muted">
                    Compose articles with a cover image, inline images, headings, and categorize them.
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
                  {selectedCategoryName && (
                    <span className="inline-flex items-center gap-2 rounded-[6px] border border-border bg-white px-3 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-ink-muted">
                      <FolderTree size={13} className="text-accent" />
                      {selectedCategoryName}
                    </span>
                  )}
                  {form.featured && (
                    <span className="inline-flex items-center gap-2 rounded-[6px] border border-accent bg-accent/5 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-accent">
                      <Star size={13} />
                      Featured
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-8 px-5 py-6 md:px-8 md:py-8">
              {error && (
                <div className="rounded-[8px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_280px]">
                {/* Left Column: Title, Cover, Content */}
                <div className="flex flex-col gap-8">
                  {/* Title */}
                  <div>
                    <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-ink-muted">
                      Article Title
                    </label>
                    <input
                      value={form.title}
                      onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                      placeholder="Enter the article title"
                      className="h-12 w-full rounded-[6px] border border-border bg-slate-50/50 px-4 text-base font-medium outline-none transition-colors focus:bg-white focus:border-accent"
                    />
                  </div>

                  {/* Page Title */}
                  <div>
                    <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-ink-muted">
                      Page Title
                    </label>
                    <input
                      value={form.pageTitle || ""}
                      onChange={(event) => setForm((current) => ({ ...current, pageTitle: event.target.value }))}
                      placeholder="Leave blank to use Article Title"
                      className="h-12 w-full rounded-[6px] border border-border bg-slate-50/50 px-4 text-base font-medium outline-none transition-colors focus:bg-white focus:border-accent"
                    />
                  </div>

                  {/* Slug */}
                  <div>
                    <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-ink-muted">
                      URL Slug
                    </label>
                    <input
                      value={form.slug || ""}
                      onChange={(event) => setForm((current) => ({ ...current, slug: event.target.value }))}
                      placeholder="Leave blank to auto-generate from title"
                      className="h-12 w-full rounded-[6px] border border-border bg-slate-50/50 px-4 text-base font-medium outline-none transition-colors focus:bg-white focus:border-accent"
                    />
                  </div>

                  {/* Meta Description */}
                  <div>
                    <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-ink-muted">
                      Meta Description (Excerpt)
                    </label>
                    <textarea
                      value={form.excerpt || ""}
                      onChange={(event) => setForm((current) => ({ ...current, excerpt: event.target.value }))}
                      placeholder="Leave blank to auto-generate from content"
                      rows={3}
                      className="w-full resize-none rounded-[6px] border border-border bg-slate-50/50 px-4 py-3 text-base font-medium outline-none transition-colors focus:bg-white focus:border-accent"
                    />
                  </div>

                  {/* Cover Image */}
                  <div>
                    <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-ink-muted">
                          Cover Image
                        </label>
                        <p className="mt-1 text-[13px] text-ink-muted">
                          Used for the article card and hero section.
                        </p>
                      </div>
                      <label className="inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-[6px] bg-ink px-4 text-[11px] font-bold uppercase tracking-[0.14em] text-white transition-transform hover:-translate-y-0.5 shrink-0">
                        <Upload size={14} />
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

                    {previewUrl ? (
                      <div className="overflow-hidden rounded-[8px] border border-border bg-white group relative">
                        <img src={previewUrl} alt="Cover preview" className="aspect-[21/9] w-full object-cover" />
                        <div className="absolute inset-0 bg-ink/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                          <button
                            type="button"
                            onClick={() => setForm(current => ({ ...current, imageFile: null, existingImageUrl: current.imageFile ? current.existingImageUrl : null, removeImage: true }))}
                            className="inline-flex h-10 items-center justify-center gap-2 rounded-[6px] bg-red-600 px-5 text-[11px] font-bold uppercase tracking-[0.14em] text-white transition-transform hover:-translate-y-0.5 shadow-xl"
                          >
                            <Trash2 size={14} />
                            Remove Image
                          </button>
                        </div>
                      </div>
                    ) : (
                      <label className="flex min-h-[200px] cursor-pointer flex-col items-center justify-center gap-3 rounded-[8px] border border-dashed border-slate-300 bg-slate-50/50 px-6 py-8 text-center transition-colors hover:border-accent hover:bg-blue-50/50">
                        <div className="h-12 w-12 rounded-full bg-white shadow-sm border border-border flex items-center justify-center">
                          <ImageIcon size={20} className="text-ink-muted" />
                        </div>
                        <div>
                          <span className="block text-sm font-bold uppercase tracking-[0.14em] text-ink">Add a cover image</span>
                          <span className="block text-xs text-ink-muted mt-1">PNG, JPG, or WEBP up to 5MB</span>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(event) =>
                            setForm((current) => ({ ...current, imageFile: event.target.files?.[0] ?? null, removeImage: false }))
                          }
                        />
                      </label>
                    )}
                  </div>

                  {/* Body */}
                  <div className="mt-2">
                    <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-ink-muted">
                          Article Body
                        </label>
                        <p className="mt-1 text-[13px] text-ink-muted">
                          Use H2/H3 headings for structure. Use the Image toolbar action to place visuals between paragraphs.
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-ink-muted">
                        <span className="rounded-[6px] bg-slate-100 border border-slate-200 px-3 py-1.5">{contentStats.words} Words</span>
                      </div>
                    </div>
                    <div className="rounded-[8px] border border-border bg-white shadow-[0_2px_8px_rgba(10,17,40,0.04)] overflow-hidden">
                      <RichTextEditor
                        value={form.contentHtml}
                        imageUploadTitle={form.title || "news-content"}
                        onChange={(contentHtml) => setForm((current) => ({ ...current, contentHtml }))}
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column: Settings Sidebar */}
                <div className="flex flex-col gap-6 border-l-0 xl:border-l border-border pl-0 xl:pl-8 pt-8 xl:pt-0 border-t xl:border-t-0">
                  <div>
                    <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-ink-muted">
                      Publishing Date
                    </label>
                    <div className="relative">
                      <Calendar size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted" />
                      <input
                        type="date"
                        value={form.publishedAt}
                        onChange={(event) =>
                          setForm((current) => ({ ...current, publishedAt: event.target.value }))
                        }
                        className="h-11 w-full rounded-[6px] border border-border bg-slate-50/50 pl-10 pr-4 text-sm font-medium outline-none transition-colors focus:bg-white focus:border-accent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-ink-muted">
                      Category
                    </label>
                    <select
                      value={form.categoryId || ""}
                      onChange={(event) => setForm(current => ({ ...current, categoryId: event.target.value || null }))}
                      className="h-11 w-full rounded-[6px] border border-border bg-slate-50/50 px-3 text-sm font-medium outline-none transition-colors focus:bg-white focus:border-accent"
                    >
                      <option value="">No Category</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="pt-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className={`flex h-5 w-5 items-center justify-center rounded border transition-colors ${form.featured ? 'bg-accent border-accent text-white' : 'border-slate-300 bg-white group-hover:border-accent'}`}>
                        {form.featured && <CheckCircle2 size={12} className="stroke-[3]" />}
                      </div>
                      <input
                        type="checkbox"
                        checked={form.featured}
                        onChange={(event) => setForm(current => ({ ...current, featured: event.target.checked }))}
                        className="hidden"
                      />
                      <div>
                        <span className="block text-sm font-bold uppercase tracking-[0.14em] text-ink group-hover:text-accent transition-colors">Feature Article</span>
                        <span className="block text-xs text-ink-muted mt-0.5">Show in hero section</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-border bg-[#F8FBFF] px-5 py-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => persist(form.status === "hidden" ? "hidden" : "draft")}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-[6px] border border-border bg-white px-5 text-[11px] font-bold uppercase tracking-[0.14em] text-ink shadow-[0_4px_12px_rgba(10,17,40,0.03)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(10,17,40,0.06)] disabled:opacity-50"
                  >
                    <Save size={15} />
                    {saving ? "Saving..." : "Save Draft"}
                  </button>

                  {form.id && (
                    <button
                      type="button"
                      disabled={saving}
                      onClick={toggleHiddenState}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-[6px] border border-border bg-white text-ink shadow-[0_4px_12px_rgba(10,17,40,0.03)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(10,17,40,0.06)] disabled:opacity-50"
                      title={form.status === "hidden" ? "Make Visible" : "Hide from public"}
                    >
                      {form.status === "hidden" ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {form.id && (
                    <button
                      type="button"
                      disabled={saving}
                      onClick={() => setDeleteTargetId(form.id!)}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-[6px] border border-red-200 bg-red-50 px-5 text-[11px] font-bold uppercase tracking-[0.14em] text-red-700 transition-all hover:-translate-y-0.5 hover:bg-red-100 disabled:opacity-50"
                    >
                      <Trash2 size={15} />
                      Delete
                    </button>
                  )}
                  
                  <button
                    type="button"
                    disabled={saving || !form.title.trim()}
                    onClick={() => persist("published")}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-[6px] bg-accent px-8 text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-[0_4px_12px_rgba(33,94,199,0.2)] transition-all hover:-translate-y-0.5 hover:bg-[#1a4ba8] hover:shadow-[0_6px_16px_rgba(33,94,199,0.3)] disabled:opacity-50"
                  >
                    {saving ? "Publishing..." : form.status === "published" ? "Update Published" : "Publish Now"}
                  </button>
                </div>
              </div>
            </div>
          </section>
          </div>
        )}
      </div>

      {deleteTargetId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={() => !saving && setDeleteTargetId(null)}></div>
          <div className="relative w-full max-w-sm rounded-[16px] border border-border bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-ink">Delete Article?</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              Are you sure you want to permanently delete this news article? This action cannot be undone.
            </p>
            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={() => setDeleteTargetId(null)}
                disabled={saving}
                className="rounded-[8px] border border-border bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-ink hover:bg-slate-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={() => executeDelete(deleteTargetId)}
                disabled={saving}
                className="rounded-[8px] bg-red-600 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-white hover:bg-red-700 transition-colors shadow-[0_4px_12px_rgba(220,38,38,0.2)] hover:-translate-y-0.5 disabled:opacity-50 flex items-center gap-2"
              >
                {saving ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
