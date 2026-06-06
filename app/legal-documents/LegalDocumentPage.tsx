import type { ReactNode } from "react";

import type { LegalDocument } from "./legalDocuments";

type LegalDocumentPageProps = {
  document: LegalDocument;
  children?: ReactNode;
};

export function LegalDocumentPage({ document, children }: LegalDocumentPageProps) {
  return (
    <article className="mx-auto max-w-[920px]">
      <header className="mb-10">
        <p className="mb-4 inline-flex rounded-[6px] border border-ink/15 px-4 py-1.5 text-sm font-semibold text-ink">
          Legal Documents
        </p>
        <h1 className="max-w-3xl text-[34px] font-bold leading-[1.12] text-ink md:text-[50px]">
          {document.title}
        </h1>
        <p className="mt-4 text-base font-medium text-ink-muted">
          Last Updated: {document.lastUpdated}
        </p>
      </header>

      <div className="border-t border-border pt-10">
        {children ?? (
          <div className="space-y-7 text-[16px] font-normal leading-8 text-ink-muted md:text-[17px]">
            <p className="text-[18px] font-bold leading-8 text-ink md:text-[20px]">
              The final copy for this document will be added here.
            </p>
            <p>
              This page is prepared with the permanent legal document layout,
              sidebar navigation, reading width, and Nomyx visual styling. When
              the approved content is ready, it can replace this placeholder
              without changing the page structure.
            </p>
            <section className="rounded-[8px] border border-border bg-[#F8FBFF] p-6">
              <h2 className="mb-3 text-[22px] font-bold leading-tight text-ink">
                Document Overview
              </h2>
              <p className="mb-0">
                {document.description}
              </p>
            </section>
            <p className="font-semibold text-ink">
              Effective Date: {document.lastUpdated}
            </p>
          </div>
        )}
      </div>
    </article>
  );
}
