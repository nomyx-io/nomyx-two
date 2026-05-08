import Link from "next/link";
import { ArrowRight, CheckCircle2, FileText, PenLine } from "lucide-react";

import { CustomCursor, Footer, Navbar } from "@/app/home";
import { getPublishedBlogs, plainTextFromHtml } from "@/lib/blogs";
import { AnimatedButton } from "@/app/components/evergreen/shared";

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
      <Navbar />

      <main className="overflow-hidden pt-20">
        <section className="relative overflow-hidden border-b border-border bg-white">
          <div className="custom-container relative">
            <div className="grid items-center gap-10 py-14 md:py-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,0.7fr)]">
              <div className="app-reveal max-w-4xl">
                <p className="mb-6 inline-flex border border-border bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-accent shadow-sm">
                  Insights
                </p>
                <h1 className="max-w-4xl text-[clamp(50px,7vw,92px)] font-black uppercase leading-[0.88] tracking-tight">
                  Nomyx Blog
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-muted md:text-lg">
                  Tokenization infrastructure notes, capital markets workflows, and product thinking from the Nomyx team.
                </p>
              </div>

              <div aria-hidden="true" className="app-reveal relative hidden aspect-[1.05/1] overflow-hidden border border-border bg-white shadow-[0_24px_70px_rgba(10,17,40,0.08)] lg:block">
                <div className="absolute inset-8 bg-slate-50/70 [clip-path:polygon(50%_0%,94%_25%,94%_75%,50%_100%,6%_75%,6%_25%)]" />
                <div className="absolute inset-6 border-[14px] border-slate-100/80 [clip-path:polygon(50%_0%,94%_25%,94%_75%,50%_100%,6%_75%,6%_25%)]" />

                <div className="absolute left-1/2 top-[18%] z-10 -translate-x-1/2 rounded-[6px] bg-accent px-6 py-2 text-xs font-black uppercase tracking-[0.08em] text-white shadow-[0_12px_28px_rgba(30,58,138,0.18)]">
                  With Nomyx
                </div>

                <p className="absolute left-1/2 top-[33%] z-10 w-full -translate-x-1/2 px-10 text-center text-base font-bold leading-snug text-ink">
                  Draft notes become published infrastructure insights
                </p>

                <div className="app-float absolute left-1/2 top-[39%] z-10 flex w-[54%] -translate-x-1/2 items-center gap-3 rounded-[8px] border border-border bg-white px-4 py-3 shadow-[0_16px_38px_rgba(10,17,40,0.08)]">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-border bg-slate-50">
                    <PenLine size={18} className="text-accent" />
                  </span>
                  <span className="text-base font-semibold text-ink">Research Draft</span>
                </div>

                <div className="app-float absolute left-1/2 top-[59%] z-10 flex w-[58%] -translate-x-1/2 items-center gap-3 rounded-[8px] border border-accent/25 bg-white px-4 py-3 shadow-[0_16px_38px_rgba(10,17,40,0.08)] [animation-delay:700ms]">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-border bg-slate-50">
                    <FileText size={18} className="text-accent" />
                  </span>
                  <span className="text-base font-semibold text-ink">Published Article</span>
                </div>

                {/* <div className="app-pulse absolute left-1/2 top-[60%] z-20 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent bg-white shadow-[0_14px_30px_rgba(10,17,40,0.12)]">
                  <CheckCircle2 size={24} className="text-accent" />
                </div>

                <ArrowRight className="absolute left-[57%] top-[56%] z-10 rotate-90 text-ink" size={40} strokeWidth={1.8} /> */}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50/70 py-14 md:py-20">
          <div className="custom-container">
            {blogs.length === 0 ? (
              <div className="border border-border bg-white px-6 py-14 text-center text-sm font-semibold uppercase tracking-[0.14em] text-ink-muted shadow-[0_18px_54px_rgba(10,17,40,0.06)]">
                No published blog posts yet.
              </div>
            ) : (
              <div className="grid items-stretch gap-6 lg:grid-cols-2">
                {blogs.map((blog, index) => (
                  <article
                    key={blog.id}
                    className="app-reveal group flex h-full flex-col overflow-hidden border border-border bg-white shadow-[0_16px_44px_rgba(10,17,40,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-ink/45 hover:shadow-[0_22px_58px_rgba(10,17,40,0.09)]"
                    style={{ animationDelay: `${Math.min(index, 8) * 65}ms` }}
                  >
                    <Link href={`/blog/${blog.slug}`} className="relative block aspect-[16/9] overflow-hidden bg-ink">
                      {blog.cover_image_url ? (
                        <img
                          src={blog.cover_image_url}
                          alt={blog.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                        />
                      ) : (
                        <div className="app-line-stack flex h-full items-center justify-center bg-ink text-sm font-bold uppercase tracking-[0.16em] text-white/55">
                          No Image
                        </div>
                      )}
                    </Link>

                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                      <div className="mb-4 flex items-center justify-between gap-4">
                        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent">
                          {blog.featured ? "Featured / " : ""}
                          {formatDate(blog.published_at)}
                        </p>
                        <span className="h-2 w-2 rounded-full bg-ink/55" />
                      </div>
                      <h2 className="mb-4 text-[clamp(26px,3vw,38px)] font-black uppercase leading-[0.98] tracking-tight">
                        {blog.title}
                      </h2>
                      <p className="mb-7 line-clamp-3 flex-1 text-base leading-relaxed text-ink-muted">
                        {blog.excerpt || plainTextFromHtml(blog.content_html).slice(0, 170)}
                      </p>
                      <AnimatedButton 
                        text="Read Article" 
                        href={`/blog/${blog.slug}`} 
                        variant="ink" 
                        className="h-11 !px-6"
                      />
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
