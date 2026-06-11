import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CalendarDays, ChevronDown, Clock3, Star } from "lucide-react";

import { CustomCursor, Footer, Navbar } from "@/app/home";
import { getBlogBySlug, getPublishedBlogBySlug, plainTextFromHtml } from "@/lib/blogs";
import { enhanceBlogHtml } from "@/lib/blog-content";
import BlogTableOfContents from "./BlogTableOfContents";
import { isCmsRequestAuthenticated } from "@/lib/cms-auth-server";

type BlogDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  params,
  searchParams,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { preview } = await searchParams;
  
  const isPreview = preview === "true" && (await isCmsRequestAuthenticated());
  const blog = isPreview ? await getBlogBySlug(slug) : await getPublishedBlogBySlug(slug);

  return {
    title: blog
      ? (blog.page_title || `${blog.title} | Nomyx Blog`)
      : "Nomyx Blog",
    description:
      blog?.excerpt ||
      "Tokenization infrastructure notes, capital markets workflows, and product thinking from the Nomyx team.",
    alternates: {
      canonical: `https://www.nomyx.io/blog/${slug}`,
    },
  };
}

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

export default async function BlogDetailPage({ params, searchParams }: BlogDetailPageProps) {
  const { slug } = await params;
  const { preview } = await searchParams;

  const isPreview = preview === "true" && (await isCmsRequestAuthenticated());
  const blog = isPreview ? await getBlogBySlug(slug) : await getPublishedBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const { content, headings } = enhanceBlogHtml(blog.content_html);
  const faqs = blog.faqs || [];
  const tableHeadings = [
    ...headings.filter((heading) => heading.level === 2),
    ...(faqs.length > 0 ? [{ id: "faqs", level: 2 as const, text: "FAQ's" }] : []),
  ];
  const plainText = plainTextFromHtml(blog.content_html);
  const wordCount = plainText.split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 220));

  return (
    <div className="min-h-screen bg-white text-ink">
      <CustomCursor />
      <Navbar variant="light" transparentInitially={true} hideBorder={true} />

      <main className="bg-white">
        <section className="pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="custom-container">
            <nav className="mb-10 flex items-center gap-2 text-sm font-medium text-[#42546E]">
              <Link href="/" className="hover:text-accent transition-colors">Home</Link>
              <span className="text-slate-300">/</span>
              <Link href="/blog" className="hover:text-accent transition-colors">Blog</Link>
              <span className="text-slate-300">/</span>
              <span className="text-ink font-semibold truncate max-w-[200px] md:max-w-md">{blog.title}</span>
            </nav>

            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start xl:gap-16">
              <article className="min-w-0">
                <h1 className="max-w-4xl text-[clamp(34px,4vw,52px)] font-bold leading-[1.08] text-ink md:font-black">
                  {blog.title}
                </h1>

                <div className="mt-8 flex flex-wrap items-center gap-4 text-sm font-medium text-[#42546E]">
                  {blog.authors ? (
                    <div className="relative group/author flex items-center">
                      <Link href={`/blog/author/${blog.authors.slug}`} className="flex items-center gap-3 transition-colors hover:text-accent">
                        {blog.authors.cover_image_url ? (
                          <img src={blog.authors.cover_image_url} alt={blog.authors.name} className="h-10 w-10 rounded-full object-cover shadow-sm ring-1 ring-slate-900/5 group-hover/author:ring-accent/50 transition-all" />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-slate-50 ring-1 ring-slate-900/5 flex items-center justify-center text-xs font-bold text-slate-400 group-hover/author:ring-accent/50 transition-all">
                            {blog.authors.name.charAt(0)}
                          </div>
                        )}
                        <span className="font-semibold text-ink group-hover/author:text-accent transition-colors">{blog.authors.name}</span>
                      </Link>

                      {/* Hover Card */}
                      <div className="absolute top-full left-0 pt-4 z-[100] invisible opacity-0 translate-y-2 group-hover/author:visible group-hover/author:opacity-100 group-hover/author:translate-y-0 transition-all duration-300 w-[340px]">
                        <div className="bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-slate-100 p-6 cursor-default relative pointer-events-auto">
                          <div className="flex items-center gap-4 mb-4">
                            {blog.authors.cover_image_url ? (
                              <img src={blog.authors.cover_image_url} alt={blog.authors.name} className="w-14 h-14 rounded-full object-cover shadow-sm ring-1 ring-slate-900/5" />
                            ) : (
                              <div className="w-14 h-14 rounded-full bg-slate-50 ring-1 ring-slate-900/5 flex items-center justify-center text-lg font-bold text-slate-400">
                                {blog.authors.name.charAt(0)}
                              </div>
                            )}
                            <div>
                              <div className="font-bold text-ink text-lg leading-tight">{blog.authors.name}</div>
                              {blog.authors.designation && <div className="text-sm text-[#42546E] mt-0.5">{blog.authors.designation}</div>}
                            </div>
                          </div>
                          
                          {blog.authors.bio_html && (
                            <p className="text-sm text-[#42546E] leading-relaxed line-clamp-4 mb-5">
                              {plainTextFromHtml(blog.authors.bio_html).substring(0, 150)}{plainTextFromHtml(blog.authors.bio_html).length > 150 ? '...' : ''}
                            </p>
                          )}

                          <div className="flex items-center justify-between mt-auto">
                            <Link href={`/blog/author/${blog.authors.slug}`} className="inline-flex items-center justify-center rounded-[6px] bg-[#F2F9FF] px-4 py-2 text-[13px] font-semibold text-accent transition-colors hover:bg-[#e6f3ff]">
                              Read Full Bio
                            </Link>
                            
                            <div className="flex items-center gap-3">
                              <a href="https://x.com/ubear90" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-accent transition-colors" aria-label="X (Twitter)">
                                <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                              </a>
                              <a href="https://www.linkedin.com/in/ubairjavaid" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-accent transition-colors" aria-label="LinkedIn">
                                <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-slate-50 ring-1 ring-slate-900/5 flex items-center justify-center text-xs font-bold text-slate-400">
                        N
                      </div>
                      <span className="font-semibold text-ink">Nomyx Team</span>
                    </div>
                  )}

                  <span className="text-slate-300">•</span>

                  <span className="flex items-center gap-1.5">
                    <CalendarDays size={16} className="text-slate-400" />
                    {formatDate(blog.published_at)}
                  </span>

                  <span className="text-slate-300">•</span>

                  <span className="flex items-center gap-1.5">
                    <Clock3 size={16} className="text-slate-400" />
                    {readTime} min read
                  </span>

                  {blog.featured && (
                    <>
                      <span className="text-slate-300">•</span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-accent">
                        <Star size={12} className="fill-accent" />
                        Featured
                      </span>
                    </>
                  )}
                </div>

                {blog.cover_image_url && (
                  <figure className="mt-10 overflow-hidden rounded-2xl border border-border bg-white shadow-[0_24px_70px_rgba(10,17,40,0.10)]">
                    <img
                      src={blog.cover_image_url}
                      alt={blog.title}
                      className="w-full h-auto object-contain"
                    />
                  </figure>
                )}

                <div
                  className="mt-14 text-[17px] font-normal leading-[31px] text-[#42546E] md:text-[18px] md:leading-[32px] [&_.blog-callout-list]:my-10 [&_.blog-callout-list]:rounded-2xl [&_.blog-callout-list]:border [&_.blog-callout-list]:border-accent/15 [&_.blog-callout-list]:bg-[#F2F9FF] [&_.blog-callout-list]:px-4 [&_.blog-callout-list]:py-3 [&_.blog-callout-list]:shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] md:[&_.blog-callout-list]:px-5 md:[&_.blog-callout-list]:py-4 [&_.blog-callout-list_li]:mb-2 [&_.blog-callout-list_li]:ml-6 [&_.blog-callout-list_li]:list-disc [&_.blog-callout-list_li]:font-semibold [&_.blog-callout-list_li]:text-ink [&_.blog-callout-list_ul]:mb-0 [&_.blog-callout-list_ul]:pl-0 [&_a]:font-semibold [&_a]:text-accent [&_blockquote]:my-10 [&_blockquote]:rounded-2xl [&_blockquote]:border-l-4 [&_blockquote]:border-accent [&_blockquote]:bg-[#F2F9FF] [&_blockquote]:px-6 [&_blockquote]:py-5 [&_blockquote]:font-medium [&_blockquote]:italic [&_figure]:my-12 [&_figure]:w-full [&_figcaption]:mt-3 [&_figcaption]:text-sm [&_figcaption]:font-medium [&_figcaption]:text-ink-muted [&_h2]:scroll-mt-28 [&_h2]:mb-5 [&_h2]:mt-14 [&_h2]:text-[28px] [&_h2]:font-bold [&_h2]:leading-[1.2] [&_h2]:text-[#19233D] md:[&_h2]:text-[38px] md:[&_h2]:leading-[46px] [&_h3]:scroll-mt-28 [&_h3]:mb-4 [&_h3]:mt-10 [&_h3]:text-[26px] [&_h3]:font-bold [&_h3]:leading-tight [&_h3]:text-[#19233D] [&_img]:h-auto [&_img]:w-full [&_img]:max-w-full [&_img]:rounded-2xl [&_img]:border [&_img]:border-border [&_li]:mb-3 [&_li]:ml-6 [&_li]:list-disc [&_ol]:mb-7 [&_ol]:pl-6 [&_p]:mb-7 [&_strong]:font-bold [&_strong]:text-ink [&_ul]:mb-7 [&_ul]:pl-1"
                  dangerouslySetInnerHTML={{ __html: content }}
                />

                {faqs.length > 0 && (
                  <section id="faqs" className="mt-20 scroll-mt-28">
                    <h2 className="mb-8 text-[28px] font-bold leading-[1.2] text-[#19233D] md:text-[38px] md:leading-[46px]">
                      FAQ&apos;s
                    </h2>

                    <div className="space-y-3">
                      {faqs.map((faq, index) => (
                        <details
                          key={`${faq.question}-${index}`}
                          className="group rounded-2xl border border-border bg-[#F8FBFF] px-5 py-4 transition-colors open:bg-white md:px-7 md:py-5"
                        >
                          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-[17px] font-bold leading-snug text-ink marker:hidden md:text-[18px] [&::-webkit-details-marker]:hidden">
                            {faq.question}
                            <ChevronDown
                              size={20}
                              className="shrink-0 text-accent transition-transform group-open:rotate-180"
                            />
                          </summary>
                          <p className="mt-4 max-w-4xl text-[16px] font-normal leading-8 text-[#42546E] md:text-[17px]">
                            {faq.answer}
                          </p>
                        </details>
                      ))}
                    </div>
                  </section>
                )}
              </article>

              <aside className="hidden lg:sticky lg:top-28 lg:block lg:self-start">
                <BlogTableOfContents
                  headings={tableHeadings}
                  readTime={readTime}
                  wordCount={wordCount}
                />
              </aside>
            </div>
          </div>
        </section>
      </main>

      <Footer
        ctaTitle="Ready to modernize your fund?"
        ctaDescription="Schedule a personalized walkthrough with our technical team to see how Nomyx can streamline your infrastructure."
        ctaButtonText="Schedule a Technical Demo"
        ctaButtonLink="https://calendly.com/ivan-j-nomyx"
      />
    </div>
  );
}
