import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock3, Star, FolderTree } from "lucide-react";

import { CustomCursor, Footer, Navbar } from "@/app/home";
import { getPublishedNewsBySlug } from "@/lib/news";
import { plainTextFromHtml } from "@/lib/blogs";
import { enhanceBlogHtml } from "@/lib/blog-content";
import BlogTableOfContents from "@/app/blog/[slug]/BlogTableOfContents";

type NewsDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const news = await getPublishedNewsBySlug(slug);

  return {
    title: news
      ? (news.page_title || `${news.title} | Nomyx News`)
      : "Nomyx News",
    description:
      news?.excerpt ||
      "Get the latest updates, press releases, and partner announcements from Nomyx.",
    alternates: {
      canonical: `https://www.nomyx.io/news/${slug}`,
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

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const news = await getPublishedNewsBySlug(slug);

  if (!news) {
    notFound();
  }

  const { content, headings } = enhanceBlogHtml(news.content_html);
  const tableHeadings = headings.filter((heading) => heading.level === 2);
  const plainText = plainTextFromHtml(news.content_html);
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
              <Link href="/news" className="hover:text-accent transition-colors">News</Link>
              <span className="text-slate-300">/</span>
              <span className="text-ink font-semibold truncate max-w-[200px] md:max-w-md">{news.title}</span>
            </nav>

            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start xl:gap-16">
              <article className="min-w-0">
                <h1 className="max-w-4xl text-[clamp(34px,4vw,52px)] font-bold leading-[1.08] text-ink md:font-black">
                  {news.title}
                </h1>

                <div className="mt-8 flex flex-wrap items-center gap-4 text-sm font-medium text-[#42546E]">
                  <span className="flex items-center gap-1.5">
                    <CalendarDays size={16} className="text-slate-400" />
                    {formatDate(news.published_at)}
                  </span>

                  <span className="text-slate-300">•</span>

                  <span className="flex items-center gap-1.5">
                    <Clock3 size={16} className="text-slate-400" />
                    {readTime} min read
                  </span>

                  {news.category && (
                    <>
                      <span className="text-slate-300">•</span>
                      <span className="flex items-center gap-1.5 text-accent font-semibold">
                        {news.category.name}
                      </span>
                    </>
                  )}

                  {news.featured && (
                    <>
                      <span className="text-slate-300">•</span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-accent">
                        <Star size={12} className="fill-accent" />
                        Featured
                      </span>
                    </>
                  )}
                </div>

                {news.cover_image_url && (
                  <figure className="mt-10 overflow-hidden rounded-2xl border border-border bg-white shadow-[0_24px_70px_rgba(10,17,40,0.10)]">
                    <img
                      src={news.cover_image_url}
                      alt={news.title}
                      className="aspect-[16/9] max-h-[500px] w-full object-cover"
                    />
                  </figure>
                )}

                <div
                  className="mt-14 text-[17px] font-normal leading-[31px] text-[#42546E] md:text-[18px] md:leading-[32px] [&_.blog-callout-list]:my-10 [&_.blog-callout-list]:rounded-2xl [&_.blog-callout-list]:border [&_.blog-callout-list]:border-accent/15 [&_.blog-callout-list]:bg-[#F2F9FF] [&_.blog-callout-list]:px-6 [&_.blog-callout-list]:py-5 [&_.blog-callout-list]:shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] md:[&_.blog-callout-list]:px-8 md:[&_.blog-callout-list]:py-6 [&_.blog-callout-list_li]:mb-2 [&_.blog-callout-list_li]:ml-6 [&_.blog-callout-list_li]:list-disc [&_.blog-callout-list_li]:font-semibold [&_.blog-callout-list_li]:text-ink [&_.blog-callout-list_ul]:mb-0 [&_.blog-callout-list_ul]:pl-0 [&_a]:font-semibold [&_a]:text-accent [&_blockquote]:my-10 [&_blockquote]:rounded-2xl [&_blockquote]:border-l-4 [&_blockquote]:border-accent [&_blockquote]:bg-[#F2F9FF] [&_blockquote]:px-6 [&_blockquote]:py-5 [&_blockquote]:font-medium [&_blockquote]:italic [&_figure]:my-12 [&_figure]:w-full [&_figcaption]:mt-3 [&_figcaption]:text-sm [&_figcaption]:font-medium [&_figcaption]:text-ink-muted [&_h2]:scroll-mt-28 [&_h2]:mb-5 [&_h2]:mt-14 [&_h2]:text-[28px] [&_h2]:font-bold [&_h2]:leading-[1.2] [&_h2]:text-[#19233D] md:[&_h2]:text-[38px] md:[&_h2]:leading-[46px] [&_h3]:scroll-mt-28 [&_h3]:mb-4 [&_h3]:mt-10 [&_h3]:text-[26px] [&_h3]:font-bold [&_h3]:leading-tight [&_h3]:text-[#19233D] [&_img]:h-auto [&_img]:w-full [&_img]:max-w-full [&_img]:rounded-2xl [&_img]:border [&_img]:border-border [&_li]:mb-3 [&_li]:ml-6 [&_li]:list-disc [&_ol]:mb-7 [&_ol]:pl-6 [&_p]:mb-7 [&_strong]:font-bold [&_strong]:text-ink [&_ul]:mb-7 [&_ul]:pl-1"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
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
