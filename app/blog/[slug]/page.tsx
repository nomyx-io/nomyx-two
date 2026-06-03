import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock3, Star } from "lucide-react";

import { CustomCursor, Footer, Navbar } from "@/app/home";
import { getPublishedBlogBySlug, plainTextFromHtml } from "@/lib/blogs";
import { enhanceBlogHtml } from "@/lib/blog-content";
import BlogTableOfContents from "./BlogTableOfContents";

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
  const tableHeadings = headings.filter((heading) => heading.level === 2);
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
            <Link
              href="/blog"
              className="mb-10 inline-flex h-11 items-center justify-center gap-2 rounded-[6px] border border-ink/10 bg-white px-5 text-sm font-bold text-ink shadow-sm transition-colors hover:border-accent hover:text-accent"
            >
              <ArrowLeft size={16} />
              Back to Blog
            </Link>

            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start xl:gap-16">
              <article className="min-w-0">
                <h1 className="max-w-4xl text-[clamp(34px,4vw,52px)] font-bold leading-[1.08] text-ink md:font-black">
                  {blog.title}
                </h1>

                <div className="mt-6 flex flex-wrap items-center gap-3 text-[12px] font-bold uppercase tracking-[0.15em] text-[#42546E]">
                  <span className="inline-flex h-9 items-center gap-2 rounded-full border border-border bg-white px-4 shadow-sm">
                    <CalendarDays size={14} className="text-accent" />
                    {formatDate(blog.published_at)}
                  </span>
                  <span className="inline-flex h-9 items-center gap-2 rounded-full border border-border bg-white px-4 shadow-sm">
                    <Clock3 size={14} className="text-accent" />
                    {readTime} min read
                  </span>
                  {blog.featured && (
                    <span className="inline-flex h-9 items-center gap-2 rounded-full bg-ink px-4 text-white shadow-sm">
                      <Star size={14} />
                      Featured
                    </span>
                  )}
                </div>

                {blog.cover_image_url && (
                  <figure className="mt-10 overflow-hidden rounded-2xl border border-border bg-white shadow-[0_24px_70px_rgba(10,17,40,0.10)]">
                    <img
                      src={blog.cover_image_url}
                      alt={blog.title}
                      className="aspect-[16/9] max-h-[500px] w-full object-cover"
                    />
                  </figure>
                )}

                <div
                  className="mt-14 text-[17px] font-normal leading-[31px] text-[#42546E] md:text-[18px] md:leading-[32px] [&_a]:font-semibold [&_a]:text-accent [&_blockquote]:my-10 [&_blockquote]:rounded-2xl [&_blockquote]:border-l-4 [&_blockquote]:border-accent [&_blockquote]:bg-[#F2F9FF] [&_blockquote]:px-6 [&_blockquote]:py-5 [&_blockquote]:font-medium [&_blockquote]:italic [&_figure]:my-12 [&_figure]:w-full [&_figcaption]:mt-3 [&_figcaption]:text-sm [&_figcaption]:font-medium [&_figcaption]:text-ink-muted [&_h2]:scroll-mt-28 [&_h2]:mb-5 [&_h2]:mt-14 [&_h2]:text-[32px] [&_h2]:font-bold [&_h2]:leading-[1.2] [&_h2]:text-[#19233D] md:[&_h2]:text-[45px] md:[&_h2]:leading-[54px] [&_h3]:scroll-mt-28 [&_h3]:mb-4 [&_h3]:mt-10 [&_h3]:text-[26px] [&_h3]:font-bold [&_h3]:leading-tight [&_h3]:text-[#19233D] [&_img]:h-auto [&_img]:w-full [&_img]:max-w-full [&_img]:rounded-2xl [&_img]:border [&_img]:border-border [&_li]:mb-3 [&_li]:ml-6 [&_li]:list-disc [&_ol]:mb-7 [&_ol]:pl-6 [&_p]:mb-7 [&_strong]:font-bold [&_strong]:text-ink [&_ul]:mb-7 [&_ul]:pl-1"
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
