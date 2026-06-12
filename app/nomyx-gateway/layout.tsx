import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Asset Distribution & Liquidity Infrastructure | Nomyx",
  alternates: {
    canonical: "https://www.nomyx.io/nomyx-gateway",
  },
};

export default function NomyxGatewayLayout({ children }: { children: ReactNode }) {
  return children;
}
