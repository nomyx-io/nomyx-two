"use client";

import { CustomCursor, Footer, Navbar } from "../home";
import { EvergreenHero } from "./evergreen/Hero";
import { LifecycleCommand } from "./evergreen/LifecycleCommand";
import { OperatingDelta } from "./evergreen/OperatingDelta";
import { LiquidityLayer } from "./evergreen/LiquidityLayer";
import { UpgradePanel } from "./evergreen/UpgradePanel";
import { FinalCTA } from "./evergreen/FinalCTA";

export default function Evergreen() {
  return (
    <div className="min-h-screen bg-bg font-sans text-ink">
      <CustomCursor />
      <Navbar />

      <main>
        <EvergreenHero />
        <div id="live-operations">
          <LifecycleCommand />
        </div>
        <OperatingDelta />
        <LiquidityLayer />
        <UpgradePanel />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}
