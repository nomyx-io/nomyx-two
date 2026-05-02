import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock3 } from "lucide-react";

import { CustomCursor, Footer, Navbar } from "@/app/home";
import { getPublishedBlogBySlug, plainTextFromHtml } from "@/lib/blogs";
import { enhanceBlogHtml } from "@/lib/blog-content";

type BlogDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatDate(value: string | null) {
  if (!value) {
    return "Unscheduled";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const blog = await getPublishedBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const { content, headings } = enhanceBlogHtml(blog.content_html);
  const wordCount = plainTextFromHtml(blog.content_html).split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 220));

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_18%,#ffffff_100%)] text-ink">
      <CustomCursor />
      <Navbar />

      <main className="pt-28">
        <article className="pb-24">
          <div className="custom-container">
            <div className="relative overflow-hidden border border-border bg-white shadow-[0_24px_80px_rgba(10,17,40,0.08)]">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-accent to-cyan-400" />
              <header className="relative overflow-hidden border-b border-border px-6 py-10 md:px-10 md:py-14">
                <div className="absolute right-[-5%] top-[-10%] h-56 w-56 rounded-full bg-cyan-100/60 blur-3xl" />
                <div className="absolute bottom-[-20%] left-[-5%] h-64 w-64 rounded-full bg-blue-100/70 blur-3xl" />

                <div className="relative z-10">
                  <Link
                    href="/blog"
                    className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-ink-muted transition-colors hover:text-accent"
                  >
                    <ArrowLeft size={15} />
                    Back To Blog
                  </Link>

                  <div className="mb-5 flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.16em] text-ink-muted">
                    <span className="inline-flex items-center gap-2 border border-border bg-white/90 px-3 py-2">
                      <CalendarDays size={14} className="text-accent" />
                      {formatDate(blog.published_at)}
                    </span>
                    <span className="inline-flex items-center gap-2 border border-border bg-white/90 px-3 py-2">
                      <Clock3 size={14} className="text-accent" />
                      {readTime} min read
                    </span>
                    {blog.featured && (
                      <span className="inline-flex items-center gap-2 border border-accent bg-accent/5 px-3 py-2 text-accent">
                        Featured Post
                      </span>
                    )}
                  </div>

                  <h1 className="max-w-5xl text-[clamp(42px,7vw,72px)] font-black uppercase tracking-[-0.04em] leading-[0.92]">
                    {blog.title}
                  </h1>

                  {blog.excerpt && (
                    <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink-muted md:text-xl">
                      {blog.excerpt}
                    </p>
                  )}
                </div>
              </header>

              {blog.cover_image_url && (
                <div className="border-b border-border bg-slate-50 px-6 py-6 md:px-10 md:py-10">
                  <img
                    src={blog.cover_image_url}
                    alt={blog.title}
                    className="h-auto max-h-[720px] w-full object-cover shadow-[0_24px_64px_rgba(10,17,40,0.12)]"
                  />
                </div>
              )}

              <div className="grid gap-10 px-6 py-10 md:px-10 md:py-14 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-14">
                <aside className="lg:sticky lg:top-28 lg:self-start">
                  <div className="border border-border bg-slate-50">
                    <div className="border-b border-border px-5 py-4">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
                        Table Of Contents
                      </p>
                    </div>

                    <div className="px-5 py-5">
                      {headings.length > 0 ? (
                        <nav className="space-y-3">
                          {headings.map((heading) => (
                            <a
                              key={heading.id}
                              href={`#${heading.id}`}
                              className={`block text-sm leading-relaxed text-ink-muted transition-colors hover:text-accent ${
                                heading.level === 3 ? "pl-4" : ""
                              }`}
                            >
                              {heading.text}
                            </a>
                          ))}
                        </nav>
                      ) : (
                        <p className="text-sm leading-relaxed text-ink-muted">
                          Add `H2` and `H3` headings in the editor to generate a table of contents here.
                        </p>
                      )}
                    </div>
                  </div>
                </aside>

                <div
                  className="min-w-0 text-[17px] leading-8 text-ink md:text-[18px] [&_a]:font-semibold [&_a]:text-accent [&_blockquote]:my-10 [&_blockquote]:border-l-4 [&_blockquote]:border-accent [&_blockquote]:bg-slate-50 [&_blockquote]:px-6 [&_blockquote]:py-5 [&_blockquote]:italic [&_h2]:scroll-mt-28 [&_h2]:mt-14 [&_h2]:mb-5 [&_h2]:text-4xl [&_h2]:font-black [&_h2]:uppercase [&_h2]:tracking-tight [&_h3]:scroll-mt-28 [&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:text-2xl [&_h3]:font-black [&_li]:ml-6 [&_li]:mb-2 [&_li]:list-disc [&_ol]:mb-6 [&_ol]:pl-6 [&_p]:mb-6 [&_ul]:mb-6"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
