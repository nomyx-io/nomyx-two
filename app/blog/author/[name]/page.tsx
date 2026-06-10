import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CustomCursor, Footer, Navbar } from "@/app/home";
import { getAuthorBySlug } from "@/lib/authors";
import { plainTextFromHtml } from "@/lib/blogs";

type AuthorProps = {
  params: Promise<{
    name: string;
  }>;
};

export async function generateMetadata({ params }: AuthorProps): Promise<Metadata> {
  const { name } = await params;
  const author = await getAuthorBySlug(name);
  
  if (author) {
    return {
      title: author.page_title || `${author.name} - Nomyx`,
      description: author.meta_description || (author.bio_html ? plainTextFromHtml(author.bio_html).substring(0, 150) : "Author at Nomyx"),
    };
  }
  return {
    title: "Author - Nomyx",
  };
}

export default async function AuthorPage({ params }: AuthorProps) {
  const { name } = await params;
  const author = await getAuthorBySlug(name);

  if (!author) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-ink">
      <CustomCursor />
      <Navbar variant="light" transparentInitially={true} hideBorder={true} />

      <main className="overflow-hidden bg-white relative">
        {/* Absolute Background Gradient */}
        <div 
          className="absolute top-0 left-0 w-full h-[600px] pointer-events-none"
          style={{ background: "linear-gradient(to bottom, rgba(217, 239, 255, 0.5) 0%, rgba(255, 255, 255, 0) 100%)" }}
        />

        <section className="relative z-10 pt-32 pb-24 md:pt-48 md:pb-32">
          <div className="custom-container">
            <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
              
              {/* Left Column: Image (Sticky) */}
              {author.cover_image_url && (
                <div className="shrink-0 md:sticky md:top-32">
                  <div className="w-40 h-40 md:w-[260px] md:h-[260px] rounded-full overflow-hidden border-[6px] border-white shadow-[0_12px_40px_-12px_rgba(0,0,0,0.15)] ring-1 ring-slate-900/5 bg-slate-50 transition-transform duration-500 hover:scale-105">
                    <img src={author.cover_image_url} alt={author.name} className="w-full h-full object-cover" />
                  </div>
                </div>
              )}

              {/* Right Column: Hero & Bio */}
              <div className="flex-1 max-w-3xl pt-2 md:pt-6">
                <span className="eyebrow">
                  Author Profile
                </span>
                
                <h1 className="text-[clamp(40px,5vw,56px)] font-bold tracking-tight text-[#19233D] leading-[1.1] mb-5">
                  {author.name}
                </h1>
                
                {author.designation && (
                  <p className="text-xl md:text-[22px] font-light text-[#42546E] leading-relaxed mb-12">
                    {author.designation}
                  </p>
                )}

                {author.bio_html && (
                  <>
                    <div className="w-full h-[1px] bg-slate-200 mb-10" />
                    <h2 className="text-2xl font-bold tracking-tight text-[#19233D] mb-8">
                      About {author.name.split(' ')[0]}
                    </h2>
                    <div 
                      className="flex flex-col gap-6 prgraphs text-[#42546E] [&_a]:text-accent [&_a]:underline"
                      dangerouslySetInnerHTML={{ __html: author.bio_html.replace(/style="[^"]*"/gi, '') }} 
                    />
                  </>
                )}
              </div>
              
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
