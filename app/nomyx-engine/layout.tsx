import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Tokenization Engine for Asset Managers | Nomyx",
  alternates: {
    canonical: "https://www.nomyx.io/nomyx-engine",
  },
};

export default function NomyxEngineLayout({ children }: { children: ReactNode }) {
  return children;
}
