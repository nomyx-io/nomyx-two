import { notFound } from "next/navigation";
import Link from "next/link";
import { CalendarDays, ChevronRight, Clock3, ListTree } from "lucide-react";

import { CustomCursor, Footer, Navbar } from "@/app/home";
import { getPublishedBlogBySlug, plainTextFromHtml } from "@/lib/blogs";
import { AnimatedButton } from "@/app/components/evergreen/shared";
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
    month: "short",
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
  const plainText = plainTextFromHtml(blog.content_html);
  const wordCount = plainText.split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 220));
  const briefText = blog.excerpt || plainText.slice(0, 180);

  return (
    <div className="min-h-screen bg-white text-ink">
      <CustomCursor />
      <Navbar />

      <main className="relative mx-auto max-w-8xl overflow-visible bg-white pt-20">
        <div className="pointer-events-none absolute inset-x-0 top-20 h-[440px] border-b border-border bg-white">
          <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(#0A1128_1px,transparent_1px),linear-gradient(90deg,#0A1128_1px,transparent_1px)] [background-size:56px_56px]" />
        </div>

        <article className="relative py-8 md:py-12 lg:py-14">
          <div className="custom-container">
            <div className="max-w-8xl mx-auto">
              <div className="app-reveal mb-8">
                <AnimatedButton 
                  text="Back to Blog" 
                  href="/blog" 
                  variant="ink" 
                  className="h-10 !px-6"
                />
              </div>

              <div className="grid gap-7 lg:grid-cols-[270px_minmax(0,1fr)] lg:items-start">
                <aside className="app-reveal lg:sticky lg:top-28 lg:self-start">
                  <div className="relative overflow-hidden border border-border bg-white text-ink shadow-[0_18px_48px_rgba(10,17,40,0.06)]">
                    <span className="app-border-orbit pointer-events-none absolute -right-8 top-8 h-20 w-20 border border-ink/10" />
                    <span className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-ink/25 to-transparent" />
                    <div className="relative border-b border-border px-5 py-4">
                      <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-accent">
                        <ListTree size={15} />
                        Table Of Contents
                      </p>
                    </div>

                    <div className="relative px-5 py-5">
                      {headings.length > 0 ? (
                        <nav className="space-y-1">
                          {headings.map((heading) => (
                            <a
                              key={heading.id}
                              href={`#${heading.id}`}
                              className={`block border-l-2 border-border py-2 pr-2 text-sm leading-relaxed text-ink-muted transition-all duration-200 hover:border-ink hover:text-ink ${
                                heading.level === 3 ? "pl-5" : "pl-3"
                              }`}
                            >
                              {heading.text}
                            </a>
                          ))}
                        </nav>
                      ) : (
                        <p className="text-sm leading-relaxed text-ink-muted">{briefText}</p>
                      )}

                      <div className="mt-6 grid gap-3 border-t border-border pt-5 text-[10px] font-bold uppercase tracking-[0.14em] text-ink-muted">
                        <div className="flex items-center justify-between gap-3">
                          <span>Published</span>
                          <span className="text-ink">{formatDate(blog.published_at)}</span>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <span>Read Time</span>
                          <span className="text-ink">{readTime} Min</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </aside>

                <section className="min-w-0">
                  <div className="app-reveal border border-border bg-white p-6 shadow-[0_22px_70px_rgba(10,17,40,0.08)] sm:p-8 lg:p-10">
                    <div className="mb-5 flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.16em] text-ink-muted">
                      <span className="inline-flex h-9 items-center gap-2 border border-border bg-white px-3">
                        <CalendarDays size={14} className="text-accent" />
                        {formatDate(blog.published_at)}
                      </span>
                      <span className="inline-flex h-9 items-center gap-2 border border-border bg-white px-3">
                        <Clock3 size={14} className="text-accent" />
                        {readTime} min read
                      </span>
                      {blog.featured && (
                        <span className="inline-flex h-9 items-center border border-ink bg-ink px-3 text-white">
                          Featured
                        </span>
                      )}
                    </div>

                    <h1 className="max-w-5xl text-[clamp(34px,5vw,60px)] font-black uppercase leading-[0.95] tracking-tight">
                      {blog.title}
                    </h1>

                    {blog.cover_image_url && (
                      <div className="mt-8 overflow-hidden border border-border bg-ink shadow-[0_18px_54px_rgba(10,17,40,0.10)]">
                        <img
                          src={blog.cover_image_url}
                          alt={blog.title}
                          className="aspect-[16/8.7] w-full object-cover"
                        />
                      </div>
                    )}

                    <div
                      className="mt-8 min-w-0 text-[16px] leading-8 text-ink md:text-[17px] [&_a]:font-semibold [&_a]:text-accent [&_blockquote]:my-8 [&_blockquote]:border-l-4 [&_blockquote]:border-accent [&_blockquote]:bg-slate-50 [&_blockquote]:px-5 [&_blockquote]:py-4 [&_blockquote]:italic [&_h2]:scroll-mt-28 [&_h2]:mt-12 [&_h2]:mb-5 [&_h2]:text-2xl [&_h2]:font-black [&_h2]:uppercase [&_h2]:tracking-tight md:[&_h2]:text-3xl [&_h3]:scroll-mt-28 [&_h3]:mt-9 [&_h3]:mb-4 [&_h3]:text-xl [&_h3]:font-black [&_h3]:uppercase [&_img]:border [&_img]:border-border [&_li]:ml-6 [&_li]:mb-2 [&_li]:list-disc [&_ol]:mb-6 [&_ol]:pl-6 [&_p]:mb-6 [&_ul]:mb-6"
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
                  </div>
                </section>
              </div>
            </div>
          </div>
        </article>

        <section className="relative overflow-hidden border-y border-border bg-slate-50/50 py-20 text-center md:py-24">
          <div className="custom-container">
            <h2 className="section-heading mb-8">Ready to modernize your fund?</h2>
            <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-ink-muted">
              Schedule a personalized walkthrough with our technical team to see how Nomyx can streamline your infrastructure.
            </p>
            <AnimatedButton 
              text="Schedule a Technical Demo" 
              href="https://calendly.com/ivan-j-nomyx" 
              target="_blank" 
              rel="noopener" 
              variant="ink" 
              className="min-w-[240px]"
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
