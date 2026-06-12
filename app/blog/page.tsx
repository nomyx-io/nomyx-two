import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FileText, PenLine } from "lucide-react";

import { CustomCursor, Footer, Navbar } from "@/app/home";
import { getPublishedBlogs, plainTextFromHtml } from "@/lib/blogs";
import { AnimatedButton } from "@/app/components/evergreen/shared";

export const metadata: Metadata = {
  title: "Nomyx Insights | Institutional Tokenization",
  alternates: {
    canonical: "https://www.nomyx.io/blog",
  },
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

export default async function BlogIndexPage() {
  const blogs = await getPublishedBlogs();

  return (
    <div className="min-h-screen bg-white text-ink">
      <CustomCursor />
      <Navbar variant="light" transparentInitially={true} hideBorder={true} />

      <main className="overflow-hidden">
        <section 
          className="relative overflow-hidden pt-32 pb-10 md:pt-40 md:pb-16"
          style={{
            background: "linear-gradient(to bottom, #D9EFFF 0%, #FFFFFF 100%)"
          }}
        >
          <div className="custom-container relative text-center">
            <div className="mx-auto max-w-4xl">
              <p className="eyebrow mb-6">
                Insights
              </p>
              <h1 className="text-display mb-8">
                Nomyx Blog
              </h1>
              <p className="mx-auto prgraphs md:text-xl">
                Tokenization infrastructure notes, capital markets workflows, and product thinking from the Nomyx team.
              </p>
            </div>
          </div>
        </section>

        <section className="py-10 md:py-12">
          <div className="custom-container">
            {blogs.length === 0 ? (
              <div className="rounded-2xl border border-[#0A112824] bg-white px-6 py-20 text-center text-sm font-bold uppercase tracking-widest text-ink-muted">
                No published blog posts yet.
              </div>
            ) : (
              <div className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
                {blogs.map((blog, index) => (
                  <article
                    key={blog.id}
                    className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#0A112824] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <Link href={`/blog/${blog.slug}`} className="relative block overflow-hidden bg-slate-50 border-b border-border group">
                      {blog.cover_image_url ? (
                        <img
                          src={blog.cover_image_url}
                          alt={blog.title}
                          className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                        />
                      ) : (
                        <div className="flex aspect-[3/2] w-full items-center justify-center bg-slate-100 text-xs font-bold uppercase tracking-widest text-slate-400">
                          No Image Available
                        </div>
                      )}
                    </Link>

                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-4 flex items-center justify-between gap-4">
                        {blog.authors ? (
                          <div className="flex items-center gap-2.5">
                            {blog.authors.cover_image_url ? (
                              <img src={blog.authors.cover_image_url} alt={blog.authors.name} className="w-6 h-6 rounded-full object-cover border border-slate-200" />
                            ) : (
                              <div className="w-6 h-6 rounded-full bg-slate-200" />
                            )}
                            <span className="text-xs font-semibold text-ink line-clamp-1">{blog.authors.name}</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-ink">Nomyx Team</span>
                          </div>
                        )}
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#2060D4] shrink-0">
                          {formatDate(blog.published_at)}
                        </p>
                      </div>
                      <h2 className="mb-3 text-xl font-bold leading-tight tracking-tight text-ink line-clamp-2">
                        {blog.title}
                      </h2>
                      <p className="mb-6 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-muted">
                        {blog.excerpt || plainTextFromHtml(blog.content_html).slice(0, 150)}
                      </p>
                      <div className="mt-auto">
                        <AnimatedButton 
                          text="Read Article" 
                          href={`/blog/${blog.slug}`} 
                          variant="accent" 
                          className="h-10 !px-6 text-xs"
                        />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
