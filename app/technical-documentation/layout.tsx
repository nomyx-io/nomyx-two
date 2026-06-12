import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Technical Documentation | Nomyx",
  alternates: {
    canonical: "https://www.nomyx.io/technical-documentation",
  },
};

export default function ResourcesLayout({ children }: { children: ReactNode }) {
  return children;
}
