"use client";

import { CustomCursor, Footer, Navbar } from "../home";
import { PrivateCreditHero } from "./private-credit/Hero";
import { YieldBridge } from "./private-credit/YieldBridge";
import { DistributionEngine } from "./private-credit/DistributionEngine";
import { InvestorBenefits } from "./private-credit/InvestorBenefits";
import { Servicer } from "./private-credit/Servicer";

export default function PrivateCredit() {
  return (
    <div className="min-h-screen bg-bg font-sans text-ink">
      <CustomCursor />
      <Navbar />

      <main>
        <PrivateCreditHero />
        <YieldBridge />
        <DistributionEngine />
        <InvestorBenefits />
        <Servicer />
      </main>

      <Footer />
    </div>
  );
}

