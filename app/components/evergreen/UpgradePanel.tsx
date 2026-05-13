"use client";

import { motion } from "motion/react";
import { RefreshCw, Shield, Zap } from "lucide-react";
import { fadeUp } from "./shared";

const OrbitGraphic = () => (
  <div className="relative flex h-56 w-56 items-center justify-center border border-white/20">
    <motion.div
      className="absolute inset-5 border border-white/15"
      animate={{ rotate: 360 }}
      transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
    />
    <motion.div
      className="absolute inset-14 border border-white/15"
      animate={{ rotate: -360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    />
    <Shield size={46} />
    {[0, 1, 2].map((item) => (
      <motion.span
        key={item}
        className="absolute h-5 w-5 bg-white"
        style={{ transformOrigin: "112px 112px" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 7 + item * 2, repeat: Infinity, ease: "linear", delay: item * 0.6 }}
        initial={{ x: 0, y: -112, rotate: item * 120 }}
      />
    ))}
  </div>
);

export const UpgradePanel = () => (
  <section className="py-20 md:py-24">
    <div className="custom-container">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.55 }}
        className="grid grid-cols-1 overflow-hidden rounded-[24px] border border-[#0A112824] bg-white lg:grid-cols-[0.8fr_1.2fr]"
      >
        <div className="relative flex items-center justify-center overflow-hidden border-b border-[#0A112824] bg-ink p-10 text-white lg:border-b-0 lg:border-r lg:border-[#0A112824]">
          <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:38px_38px]" />
          <OrbitGraphic />
        </div>
        <div className="p-8 md:p-12 lg:p-16">
          <h2 className="section-heading mb-6">Built For The Long Haul.</h2>
          <p className="mb-10 max-w-3xl text-[17px] leading-relaxed text-ink-muted">
            Evergreen funds need evergreen technology. Powered by the Diamond Standard (EIP-2535), your fund's smart contracts are upgradable. Adapt to new regulations in 2030 without migrating assets or disrupting your LPs.
          </p>
          <div className="grid grid-cols-1 rounded-xl border border-[#0A112824] sm:grid-cols-3">
            {[
              [RefreshCw, "Future-Proof", "Upgrade without migration"],
              [Shield, "Regulatory Ready", "Adapt to new compliance"],
              [Zap, "Zero Disruption", "LPs stay unaffected"],
            ].map(([Icon, title, text], index) => {
              const TypedIcon = Icon as typeof RefreshCw;

              return (
                <div key={title as string} className="relative p-6 lg:p-7">
                  <TypedIcon className="mb-4 text-[#2060D4]" size={24} />
                  <h3 className="mb-2 text-[15px] font-bold text-ink">
                    {title as string}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-ink-muted/80">{text as string}</p>
                  
                  {/* Floating separator for desktop */}
                  {index !== 2 && (
                    <div className="absolute right-0 top-1/2 hidden h-30 w-px -translate-y-1/2 bg-[#0A112824] sm:block" />
                  )}
                  
                  {/* Horizontal separator for mobile */}
                  {index !== 2 && (
                    <div className="absolute bottom-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-[#0A112824] sm:hidden" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);
