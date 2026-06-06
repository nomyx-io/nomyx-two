import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LegalDocumentPage } from "../LegalDocumentPage";
import { getLegalDocument } from "../legalDocuments";

const document = getLegalDocument("terms-of-use");

export const metadata: Metadata = {
  title: "Website Terms of Use | Nomyx Legal Documents",
  description: document?.description,
  alternates: {
    canonical: "https://www.nomyx.io/legal-documents/terms-of-use",
  },
};

export default function TermsOfUsePage() {
  if (!document) {
    notFound();
  }

  return <LegalDocumentPage document={document} />;
}
