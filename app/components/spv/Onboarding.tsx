"use client";

import { motion } from "motion/react";
import { ShieldCheck, UserCheck, Zap } from "lucide-react";
import { fadeUp, SectionIntro } from "../evergreen/shared";

export const Onboarding = () => (
  <section className="border-b border-border bg-slate-50/60 py-20 md:py-24">
    <div className="custom-container">
      <SectionIntro
        // eyebrow="Investor Onboarding"
        title="Onboard Investors In Minutes."
        description=""
      />

      <div className="mt-14 grid grid-cols-1 border border-border bg-white md:grid-cols-3">
        {[
          [Zap, "Step 1", "Link-Based Invites", "Send a secure link to LPs. They connect their wallet and sign subscription docs digitally."],
          [UserCheck, "Step 2", "Instant KYC/KYB", "Integrated identity verification checks investor eligibility in real time."],
          [ShieldCheck, "Step 3", "Atomic Closing", "Funds move from LP wallet to the SPV smart contract instantly upon signing."],
        ].map(([Icon, step, title, text], index) => {
          const TypedIcon = Icon as typeof Zap;

          return (
            <motion.div
              key={title as string}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="group border-b border-border p-8 transition-colors hover:bg-slate-50 md:border-b-0 md:border-r last:md:border-r-0"
            >
              <div className="mb-7 flex h-14 w-14 items-center justify-center border border-border text-accent transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                <TypedIcon size={24} />
              </div>
              <div className="mb-4 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink-muted">
                {step as string}
              </div>
              <h3 className="mb-4 text-2xl font-black uppercase tracking-tight text-ink">
                {title as string}
              </h3>
              <p className="text-base leading-relaxed text-ink-muted">{text as string}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

