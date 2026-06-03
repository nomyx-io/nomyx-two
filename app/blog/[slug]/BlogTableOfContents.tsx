"use client";

import { useEffect, useState } from "react";
import { ListTree } from "lucide-react";

import type { BlogHeading } from "@/lib/blog-content";

type BlogTableOfContentsProps = {
  headings: BlogHeading[];
  readTime: number;
  wordCount: number;
};

export default function BlogTableOfContents({
  headings,
  readTime,
  wordCount,
}: BlogTableOfContentsProps) {
  const [activeId, setActiveId] = useState(headings[0]?.id || "");

  useEffect(() => {
    if (headings.length === 0) {
      return;
    }

    const visibleHeadings = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleHeadings.set(entry.target.id, entry.boundingClientRect.top);
          } else {
            visibleHeadings.delete(entry.target.id);
          }
        });

        const nextActive = [...visibleHeadings.entries()].sort(
          (first, second) => first[1] - second[1]
        )[0]?.[0];

        if (nextActive) {
          setActiveId(nextActive);
        }
      },
      {
        rootMargin: "-120px 0px -55% 0px",
        threshold: [0, 0.15, 1],
      }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);

    if (!element) {
      return;
    }

    setActiveId(id);
    const top = element.getBoundingClientRect().top + window.scrollY - 112;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div className="max-h-[calc(100vh-8rem)] overflow-y-auto rounded-2xl border border-border bg-white/90 p-6 shadow-[0_18px_50px_rgba(10,17,40,0.07)] backdrop-blur">
      <p className="mb-5 flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.16em] text-accent">
        <ListTree size={16} />
        Table of Contents
      </p>

      {headings.length > 0 ? (
        <nav className="space-y-2">
          {headings.map((heading) => {
            const active = heading.id === activeId;

            return (
              <button
                key={heading.id}
                type="button"
                onClick={() => scrollToHeading(heading.id)}
                className={`block w-full rounded-[8px] px-3 py-2 text-left text-sm font-medium leading-relaxed transition-colors ${
                  active
                    ? "bg-[#F2F9FF] text-accent"
                    : "text-[#42546E] hover:bg-[#F2F9FF] hover:text-accent"
                }`}
              >
                {heading.text}
              </button>
            );
          })}
        </nav>
      ) : (
        <p className="text-sm leading-relaxed text-[#42546E]">
          Add H2 headings in the CMS editor to generate article sections.
        </p>
      )}

      <div className="mt-6 border-t border-border pt-5 text-[12px] font-bold uppercase tracking-[0.14em] text-[#42546E]">
        <div className="flex items-center justify-between gap-4">
          <span>Words</span>
          <span className="text-ink">{wordCount}</span>
        </div>
        <div className="mt-3 flex items-center justify-between gap-4">
          <span>Read Time</span>
          <span className="text-ink">{readTime} Min</span>
        </div>
      </div>
    </div>
  );
}
