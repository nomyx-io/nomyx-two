"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText } from "lucide-react";

import { legalDocuments } from "./legalDocuments";

export function LegalSidebar() {
  const pathname = usePathname();

  return (
    <aside className="lg:sticky lg:top-28">
      <div className="app-panel rounded-[8px] bg-white p-4 lg:p-5">
        <div className="mb-4 flex items-center gap-3 border-b border-border pb-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-[6px] bg-accent/10 text-accent">
            <FileText size={18} strokeWidth={2.3} />
          </span>
          <div>
            <p className="text-base font-bold text-ink">Legal Documents</p>
            <p className="text-xs font-medium text-ink-muted">Nomyx policies and terms</p>
          </div>
        </div>

        <nav aria-label="Legal documents" className="flex gap-2 overflow-x-auto pb-1 lg:block lg:space-y-1 lg:overflow-visible lg:pb-0">
          {legalDocuments.map((document) => {
            const isActive =
              pathname === document.href ||
              (pathname === "/legal-documents" && document.slug === "msa");

            return (
              <Link
                key={document.href}
                href={document.href}
                aria-current={isActive ? "page" : undefined}
                className={`flex min-w-[210px] items-center rounded-[6px] px-3 py-3 text-sm font-semibold leading-snug transition-colors lg:min-w-0 ${
                  isActive
                    ? "bg-accent text-white shadow-sm"
                    : "text-ink-muted hover:bg-accent/5 hover:text-accent"
                }`}
              >
                {document.title}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
