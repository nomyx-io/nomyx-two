"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertCircle,
  ExternalLink,
  FilePenLine,
  ImageIcon,
  LayoutTemplate,
  Plus,
  Search,
  Save,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

import RichTextEditor from "@/app/components/RichTextEditor";
import ImageCropperModal from "@/app/components/ImageCropperModal";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import type { Author } from "@/lib/authors";

type FormState = {
  id: string | null;
  name: string;
  slug: string;
  pageTitle: string;
  metaDescription: string;
  designation: string;
  bioHtml: string;
  imageFile: File | null;
  existingImageUrl: string | null;
  removeImage: boolean;
};

const emptyForm: FormState = {
  id: null,
  name: "",
  slug: "",
  pageTitle: "",
  metaDescription: "",
  designation: "",
  bioHtml: "<p></p>",
  imageFile: null,
  existingImageUrl: null,
  removeImage: false,
};

function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  author,
  authors,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (transferToId?: string) => void;
  author: Author | null;
  authors: Author[];
}) {
  const [transferId, setTransferId] = useState<string>("");

  if (!isOpen || !author) return null;

  const hasBlogs = (author.blog_count ?? 0) > 0;
  const otherAuthors = authors.filter((a) => a.id !== author.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/20 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[16px] border border-border bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-12 w-12 rounded-full bg-red-50 flex items-center justify-center shrink-0">
            <Trash2 size={24} className="text-red-600" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-ink">
            Delete Author
          </h2>
        </div>

        <p className="text-ink-muted text-sm mb-6 leading-relaxed">
          Are you sure you want to delete <span className="font-bold text-ink">"{author.name}"</span>? 
          This action cannot be undone.
        </p>

        {hasBlogs && (
          <div className="mb-6 rounded-[12px] bg-amber-50 border border-amber-100 p-4">
            <div className="flex items-start gap-3 text-amber-800">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold mb-2">
                  This author has {author.blog_count} blog post(s) linked to them.
                </p>
                <p className="text-xs mb-3">
                  Please select another author to transfer them to, or choose
                  "No Author".
                </p>
                <select
                  value={transferId}
                  onChange={(e) => setTransferId(e.target.value)}
                  className="w-full h-10 px-3 rounded-md border border-amber-200 bg-white text-sm outline-none focus:border-amber-400"
                >
                  <option value="" disabled>
                    Select an author...
                  </option>
                  <option value="none">No Author</option>
                  {otherAuthors.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider text-ink-muted hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(hasBlogs ? transferId : undefined)}
            disabled={hasBlogs && !transferId}
            className="px-5 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AuthorsCmsPage() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [croppingImage, setCroppingImage] = useState<string | null>(null);
  const initializedRealtime = useRef(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [authorToDelete, setAuthorToDelete] = useState<Author | null>(null);
  
  const previewUrl = useMemo(() => {
    if (!form.imageFile) return form.existingImageUrl;
    return URL.createObjectURL(form.imageFile);
  }, [form.existingImageUrl, form.imageFile]);

  const filteredAuthors = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return authors;
    return authors.filter((item) => {
      return (
        item.name.toLowerCase().includes(query) ||
        item.slug.toLowerCase().includes(query)
      );
    });
  }, [authors, searchTerm]);

  useEffect(() => {
    return () => {
      if (previewUrl && form.imageFile) URL.revokeObjectURL(previewUrl);
      if (croppingImage) URL.revokeObjectURL(croppingImage);
    };
  }, [form.imageFile, previewUrl, croppingImage]);

  const syncSelectedAuthor = (item: Author | null) => {
    if (!item || form.id !== item.id) return;

    setForm((current) => ({
      ...current,
      id: item.id,
      name: item.name,
      slug: item.slug || "",
      pageTitle: item.page_title || "",
      metaDescription: item.meta_description || "",
      designation: item.designation || "",
      bioHtml: item.bio_html || "",
      existingImageUrl: item.cover_image_url,
      removeImage: false,
    }));
  };

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/authors", { cache: "no-store" });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to load authors");

      setAuthors(data.authors || []);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Failed to load data");
      toast.error("Could not load authors.");
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
      .channel("authors-cms-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "authors" },
        (payload) => {
          if (payload.eventType === "DELETE") {
            const deletedId = String(payload.old.id);
            setAuthors((current) => current.filter((item) => item.id !== deletedId));
            setForm((current) => current.id === deletedId ? emptyForm : current);
            return;
          }

          const nextItem = payload.new as Author;
          setAuthors((current) => {
            const withoutCurrent = current.filter((item) => item.id !== nextItem.id);
            return [nextItem, ...withoutCurrent].sort((a, b) => a.name.localeCompare(b.name));
          });
          syncSelectedAuthor(nextItem);
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

  const selectAuthor = (item: Author) => {
    setError(null);
    setForm({
      id: item.id,
      name: item.name,
      slug: item.slug || "",
      pageTitle: item.page_title || "",
      metaDescription: item.meta_description || "",
      designation: item.designation || "",
      bioHtml: item.bio_html || "",
      imageFile: null,
      existingImageUrl: item.cover_image_url,
      removeImage: false,
    });
    setIsEditing(true);
  };

  const persist = async () => {
    setSaving(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.set("name", form.name);
      formData.set("slug", form.slug);
      formData.set("pageTitle", form.pageTitle);
      formData.set("metaDescription", form.metaDescription);
      formData.set("bioHtml", form.bioHtml);
      formData.set("designation", form.designation);
      formData.set("removeImage", String(form.removeImage));

      if (form.imageFile) formData.set("image", form.imageFile);

      const response = await fetch(form.id ? `/api/admin/authors/${form.id}` : "/api/admin/authors", {
        method: form.id ? "PATCH" : "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to save author");

      if (data.author) {
        setAuthors((current) => {
          const withoutCurrent = current.filter((item) => item.id !== data.author.id);
          return [data.author, ...withoutCurrent].sort((a, b) => a.name.localeCompare(b.name));
        });
        selectAuthor(data.author);
      }

      toast.success(form.id ? "Author updated." : "Author created.");
      loadData(); // To fetch the updated blog count
      setIsEditing(false);
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : "Failed to save author";
      setError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  const startDelete = (author: Author) => {
    setAuthorToDelete(author);
    setDeleteModalOpen(true);
  };

  const executeDelete = async (transferToId?: string) => {
    if (!authorToDelete) return;
    setDeleteModalOpen(false);

    setSaving(true);
    setError(null);

    try {
      const url = new URL(`/api/admin/authors/${authorToDelete.id}`, window.location.origin);
      if (transferToId) {
        url.searchParams.set("transferToAuthorId", transferToId);
      }

      const response = await fetch(url.toString(), { method: "DELETE" });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to delete author");

      setAuthors((current) => current.filter((item) => item.id !== authorToDelete.id));
      if (form.id === authorToDelete.id) {
        setForm(emptyForm);
        setIsEditing(false);
      }
      toast.success("Author deleted.");
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : "Failed to delete author";
      setError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(191,219,254,0.32),transparent_28%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_24%,#f8fafc_100%)] text-ink">
      <div className="custom-container py-12 md:py-14">
        {!isEditing ? (
          <>
            <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-4 inline-flex rounded-[6px] border border-[#1B243C] px-4 py-1 text-sm font-medium text-[#1B243C]">
                  Team Management
                </p>
                <h1 className="text-[clamp(36px,5vw,25px)] font-medium tracking-[-0.03em] leading-[1.02] text-[#19233D]">
                  Author Profiles
                </h1>
                <p className="mt-4 max-w-3xl text-[16px] leading-relaxed text-[#42546E]">
                  Manage author profiles, their bios, and profile images to be displayed on their dedicated pages.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={startNew}
                  className="inline-flex rounded-[9px] items-center justify-center gap-2 bg-ink px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white shadow-[0_18px_36px_rgba(10,17,40,0.18)] transition-transform hover:-translate-y-0.5"
                >
                  <Plus size={16} />
                  New Author
                </button>
              </div>
            </div>

            <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                { label: "Total Authors", value: authors.length, icon: LayoutTemplate },
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
                  <h2 className="text-sm font-bold uppercase tracking-[0.16em]">Authors Library</h2>
                  <p className="mt-1 text-sm text-ink-muted">Manage all your authors.</p>
                </div>
                <div className="relative">
                  <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
                  <input
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search authors..."
                    className="h-11 w-full md:w-72 rounded-[8px] border border-border bg-white pl-10 pr-3 text-sm font-medium outline-none transition-colors focus:border-accent"
                  />
                </div>
              </div>
              
              {loading ? (
                <div className="px-6 py-8 text-center text-sm text-ink-muted">Loading authors...</div>
              ) : filteredAuthors.length === 0 ? (
                <div className="px-6 py-8 text-center text-sm text-ink-muted">No matching authors.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-border text-[11px] font-bold uppercase tracking-[0.16em] text-ink-muted">
                      <tr>
                        <th className="px-6 py-4 font-bold whitespace-nowrap">Image</th>
                        <th className="px-6 py-4 font-bold whitespace-nowrap">Author Name</th>
                        <th className="px-6 py-4 font-bold whitespace-nowrap">Slug</th>
                        <th className="px-6 py-4 font-bold whitespace-nowrap text-center">Blog Posts</th>
                        <th className="px-6 py-4 font-bold text-right whitespace-nowrap">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredAuthors.map((item) => (
                        <tr key={item.id} className="transition-colors hover:bg-slate-50/50">
                          <td className="px-6 py-4 w-16">
                            <div className="w-10 h-10 rounded-full overflow-hidden border border-border bg-slate-100 flex items-center justify-center">
                              {item.cover_image_url ? (
                                <img src={item.cover_image_url} alt={item.name} className="w-full h-full object-cover" />
                              ) : (
                                <ImageIcon size={16} className="text-slate-400" />
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-bold text-[#19233D] line-clamp-1">{item.name}</div>
                          </td>
                          <td className="px-6 py-4 text-ink-muted font-medium whitespace-nowrap">
                            {item.slug}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="inline-flex items-center justify-center px-2 py-1 rounded-[4px] bg-slate-100 border border-slate-200 text-ink-muted text-[10px] font-bold">
                              {item.blog_count ?? 0}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Link
                                href={`/blog/author/${item.slug}`}
                                target="_blank"
                                className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-[6px] border border-border bg-white text-ink-muted shadow-[0_2px_8px_rgba(10,17,40,0.04)] transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                                title="View Profile"
                              >
                                <ExternalLink size={14} />
                              </Link>
                              <button
                                onClick={() => selectAuthor(item)}
                                className="inline-flex items-center justify-center gap-2 rounded-[6px] border border-border bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-ink shadow-[0_2px_8px_rgba(10,17,40,0.04)] transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                              >
                                <FilePenLine size={14} />
                                Edit
                              </button>
                              <button
                                onClick={() => startDelete(item)}
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
                    {form.id ? "Edit Author" : "Create Author"}
                  </h2>
                  <p className="mt-1 text-sm text-ink-muted">
                    Compose the author's profile, including their bio and profile picture.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-8 px-5 py-6 md:px-8 md:py-8">
              {error && (
                <div className="rounded-[8px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
                {/* Left Column: Name, Bio */}
                <div className="flex flex-col gap-8">
                  {/* Name */}
                  <div>
                    <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-ink-muted">
                      Author Name
                    </label>
                    <input
                      value={form.name}
                      onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                      placeholder="Enter the author's name"
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
                      placeholder="Leave blank to auto-generate from name"
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
                      placeholder="Leave blank to use Author Name"
                      className="h-12 w-full rounded-[6px] border border-border bg-slate-50/50 px-4 text-base font-medium outline-none transition-colors focus:bg-white focus:border-accent"
                    />
                  </div>

                  {/* Meta Description */}
                  <div>
                    <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-ink-muted">
                      Meta Description
                    </label>
                    <textarea
                      value={form.metaDescription || ""}
                      onChange={(event) => setForm((current) => ({ ...current, metaDescription: event.target.value }))}
                      placeholder="Enter the meta description for the author page"
                      rows={3}
                      className="w-full resize-none rounded-[6px] border border-border bg-slate-50/50 px-4 py-3 text-base font-medium outline-none transition-colors focus:bg-white focus:border-accent"
                    />
                  </div>

                  {/* Designation */}
                  <div>
                    <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-ink-muted">
                      Designation
                    </label>
                    <input
                      value={form.designation}
                      onChange={(event) => setForm((current) => ({ ...current, designation: event.target.value }))}
                      placeholder="e.g. Co-Founder and CEO of Nomyx"
                      className="h-12 w-full rounded-[6px] border border-border bg-slate-50/50 px-4 text-base font-medium outline-none transition-colors focus:bg-white focus:border-accent"
                    />
                  </div>

                  {/* Body */}
                  <div className="mt-2">
                    <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-ink-muted">
                          Biography
                        </label>
                        <p className="mt-1 text-[13px] text-ink-muted">
                          Provide the author's background and expertise.
                        </p>
                      </div>
                    </div>
                    <div className="rounded-[8px] border border-border bg-white shadow-[0_2px_8px_rgba(10,17,40,0.04)] overflow-hidden">
                      <RichTextEditor
                        value={form.bioHtml}
                        imageUploadTitle={form.name || "author-bio"}
                        onChange={(bioHtml) => setForm((current) => ({ ...current, bioHtml }))}
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column: Profile Picture */}
                <div className="flex flex-col gap-6 border-l-0 xl:border-l border-border pl-0 xl:pl-8 pt-8 xl:pt-0 border-t xl:border-t-0">
                  <div>
                    <div className="mb-3 flex flex-col gap-2">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-ink-muted">
                          Profile Picture
                        </label>
                        <p className="mt-1 text-[13px] text-ink-muted">
                          Square images work best.
                        </p>
                      </div>
                    </div>

                    {previewUrl ? (
                      <div className="overflow-hidden rounded-[8px] border border-border bg-white group relative">
                        <img src={previewUrl} alt="Cover preview" className="aspect-square w-full object-cover" />
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
                          <span className="block text-sm font-bold uppercase tracking-[0.14em] text-ink">Upload Photo</span>
                          <span className="block text-xs text-ink-muted mt-1">PNG, JPG up to 5MB</span>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(event) => {
                            const file = event.target.files?.[0];
                            if (file) {
                              setCroppingImage(URL.createObjectURL(file));
                            }
                            event.target.value = ''; // Reset input so same file can be selected again
                          }}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-border bg-[#F8FBFF] px-5 py-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-end">
                <button
                  type="button"
                  disabled={saving || !form.name.trim()}
                  onClick={() => persist()}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-[6px] bg-accent px-8 text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-[0_4px_12px_rgba(33,94,199,0.2)] transition-all hover:-translate-y-0.5 hover:bg-[#1a4ba8] hover:shadow-[0_6px_16px_rgba(33,94,199,0.3)] disabled:opacity-50"
                >
                  <Save size={15} />
                  {saving ? "Saving..." : form.id ? "Update Author" : "Save Author"}
                </button>
              </div>
            </div>
          </section>
          </div>
        )}
      </div>

      {croppingImage && (
        <ImageCropperModal
          imageSrc={croppingImage}
          onClose={() => {
            URL.revokeObjectURL(croppingImage);
            setCroppingImage(null);
          }}
          onCropComplete={(croppedFile) => {
            setForm((current) => ({
              ...current,
              imageFile: croppedFile,
              removeImage: false,
            }));
            URL.revokeObjectURL(croppingImage);
            setCroppingImage(null);
          }}
        />
      )}

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={executeDelete}
        author={authorToDelete}
        authors={authors}
      />
    </div>
  );
}
