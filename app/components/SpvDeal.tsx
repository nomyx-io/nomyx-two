"use client";

import { CustomCursor, Footer, Navbar } from "../home";
import { SpvHero } from "./spv/Hero";
import { Waterfall } from "./spv/Waterfall";
import { Onboarding } from "./spv/Onboarding";
import { SpvFinalCTA } from "./spv/FinalCTA";

export default function SpvDeal() {
  return (
    <div className="min-h-screen bg-bg font-sans text-ink">
      <CustomCursor />
      <Navbar />

      <main>
        <SpvHero />
        <Waterfall />
        <Onboarding />
        <SpvFinalCTA />
      </main>

      <Footer />
    </div>
  );
}

