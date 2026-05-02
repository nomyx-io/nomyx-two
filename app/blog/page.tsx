import Link from "next/link";

import { CustomCursor, Footer, Navbar } from "@/app/home";
import { getPublishedBlogs, plainTextFromHtml } from "@/lib/blogs";

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

export default async function BlogIndexPage() {
  const blogs = await getPublishedBlogs();

  return (
    <div className="min-h-screen bg-white text-ink">
      <CustomCursor />
      <Navbar />

      <main className="pt-32">
        <section className="border-b border-border pb-16">
          <div className="custom-container">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-accent">
              Insights
            </p>
            <h1 className="section-heading max-w-4xl">Nomyx Blog</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink-muted">
              Published articles appear here automatically. Newer published posts are sorted to the top.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="custom-container">
            {blogs.length === 0 ? (
              <div className="border border-border bg-slate-50 px-6 py-10 text-center text-ink-muted">
                No published blog posts yet.
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {blogs.map((blog) => (
                  <article key={blog.id} className="border border-border bg-white">
                    {blog.cover_image_url ? (
                      <img
                        src={blog.cover_image_url}
                        alt={blog.title}
                        className="h-64 w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-64 items-center justify-center bg-slate-100 text-sm font-bold uppercase tracking-[0.16em] text-ink-muted">
                        No Image
                      </div>
                    )}
                    <div className="p-6">
                      <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-accent">
                        {formatDate(blog.published_at)}
                      </p>
                      <h2 className="mb-4 text-2xl font-black uppercase tracking-tight">
                        {blog.title}
                      </h2>
                      <p className="mb-6 text-base leading-relaxed text-ink-muted">
                        {blog.excerpt || plainTextFromHtml(blog.content_html).slice(0, 160)}
                      </p>
                      <Link
                        href={`/blog/${blog.slug}`}
                        className="inline-flex h-11 items-center justify-center border border-border px-5 text-xs font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-slate-50"
                      >
                        Read Article
                      </Link>
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
