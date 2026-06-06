export type LegalDocument = {
  slug: string;
  title: string;
  href: string;
  lastUpdated: string;
  description: string;
};

export const legalDocuments = [
  {
    slug: "msa",
    title: "Main Service Agreement",
    href: "/legal-documents/msa",
    lastUpdated: "July 1, 2025",
    description: "Primary service terms for Nomyx customers and authorized users.",
  },
  {
    slug: "cookie-notice",
    title: "Cookie Notice",
    href: "/legal-documents/cookie-notice",
    lastUpdated: "July 1, 2025",
    description: "Information about cookies and similar technologies used by Nomyx.",
  },
  {
    slug: "dpa",
    title: "Data Processing Agreement",
    href: "/legal-documents/dpa",
    lastUpdated: "July 1, 2025",
    description: "Data processing terms for customer and platform data.",
  },
  {
    slug: "securities-addendum",
    title: "Securities Tokenization Service Addendum",
    href: "/legal-documents/securities-addendum",
    lastUpdated: "July 1, 2025",
    description: "Additional terms for securities tokenization services.",
  },
  {
    slug: "privacy-notice",
    title: "Privacy Notice",
    href: "/legal-documents/privacy-notice",
    lastUpdated: "July 1, 2025",
    description: "How Nomyx collects, uses, and protects personal information.",
  },
  {
    slug: "blockchain-terms",
    title: "Blockchain Service-Specific Terms",
    href: "/legal-documents/blockchain-terms",
    lastUpdated: "July 1, 2025",
    description: "Terms that apply to blockchain-specific Nomyx services.",
  },
  {
    slug: "terms-of-use",
    title: "Website Terms of Use",
    href: "/legal-documents/terms-of-use",
    lastUpdated: "July 1, 2025",
    description: "Terms governing access to and use of the Nomyx website.",
  },
] satisfies LegalDocument[];

export function getLegalDocument(slug: string) {
  return legalDocuments.find((document) => document.slug === slug);
}
