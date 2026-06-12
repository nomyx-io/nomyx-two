import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Tokenization APIs & Developer Docs | Nomyx",
  alternates: {
    canonical: "https://www.nomyx.io/developers",
  },
};

export default function DevelopersLayout({ children }: { children: ReactNode }) {
  return children;
}
