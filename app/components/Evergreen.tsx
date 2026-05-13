"use client";

import { CustomCursor, Footer, Navbar } from "../home";
import { EvergreenHero } from "./evergreen/Hero";
import { LifecycleCommand } from "./evergreen/LifecycleCommand";
import { OperatingDelta } from "./evergreen/OperatingDelta";
import { LiquidityLayer } from "./evergreen/LiquidityLayer";
import { UpgradePanel } from "./evergreen/UpgradePanel";

export default function Evergreen() {
  return (
    <div className="min-h-screen bg-bg font-sans text-ink">
      <CustomCursor />
      <Navbar variant="light" transparentInitially={true} hideBorder={true} />

      <main>
        <EvergreenHero />
        <div id="live-operations">
          <LifecycleCommand />
        </div>
        <OperatingDelta />
        <LiquidityLayer />
        <UpgradePanel />
      </main>

      <Footer 
        ctaTitle="Stop running your fund on quarterly deadlines."
        ctaDescription="Join the asset managers moving billions on-chain with Nomyx."
        ctaButtonText="Automate Your Evergreen Fund"
        ctaButtonLink="https://calendly.com/ivan-j-nomyx/30min"
      />
    </div>
  );
}
