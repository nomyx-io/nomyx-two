import type { Metadata } from "next";

import RealEstate from "../components/RealEstate";

export const metadata: Metadata = {
  title: "Real Estate Tokenization | Nomyx",
  alternates: {
    canonical: "https://www.nomyx.io/real-estate-tokenization",
  },
};

export default function RealEstateTokenizationPage() {
  return <RealEstate />;
}
