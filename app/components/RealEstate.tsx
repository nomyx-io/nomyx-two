"use client";

import { CustomCursor, Footer, Navbar } from "../home";
import { RealEstateHero } from "./real-estate/Hero";
import { Ledger } from "./real-estate/Ledger";
import { RentDistribution } from "./real-estate/RentDistribution";
import { LiquidityPremium } from "./real-estate/LiquidityPremium";
import { RealEstateFinalCTA } from "./real-estate/FinalCTA";

export default function RealEstate() {
  return (
    <div className="min-h-screen bg-bg font-sans text-ink">
      <CustomCursor />
      <Navbar />

      <main>
        <RealEstateHero />
        <Ledger />
        <RentDistribution />
        <LiquidityPremium />
        <RealEstateFinalCTA />
      </main>

      <Footer />
    </div>
  );
}

