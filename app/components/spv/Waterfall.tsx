"use client";

import { motion } from "motion/react";
import { Check, Calculator, Eye, Zap } from "lucide-react";
import { fadeUp, HoverTextSwap, SectionIntro } from "../evergreen/shared";

const steps = [
  ["Step 1", "Return Of Capital", "LP principal returned first", "100%"],
  ["Step 2", "Preferred Return", "Target return threshold", "8%"],
  ["Step 3", "Carried Interest", "Split: LPs get 80%, GP gets 20%", "80/20"],
];

export const Waterfall = () => (
  <section className="border-b border-border py-20 md:py-24">
    <div className="custom-container">
      <SectionIntro
        eyebrow="Waterfall Engine"
        title="Perfect Waterfalls. Zero Spreadsheets."
        description="Program carry logic once, then let the SPV execute the distribution rules when proceeds arrive."
      />

      <div className="mt-14 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <div className="relative space-y-8">
          <motion.div
            className="absolute left-1/2 top-20 hidden h-[calc(100%-160px)] w-px -translate-x-1/2 bg-accent/30 md:block"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            style={{ transformOrigin: "top" }}
          />
          {steps.map(([label, title, text, value], index) => (
            <motion.div
              key={title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ x: 8 }}
              className="relative border border-border bg-white p-6 shadow-sm transition-colors hover:border-accent/40 hover:bg-slate-50"
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <div className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-accent">
                    {label}
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tight text-ink">
                    <motion.span initial="rest" whileHover="hover" animate="rest" className="inline-block">
                      <HoverTextSwap text={title} />
                    </motion.span>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{text}</p>
                </div>
                <div className="text-3xl font-black text-accent">{value}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="border border-border bg-white p-8"
        >
          <Calculator className="mb-6 text-accent" size={30} />
          <h2 className="section-heading mb-6">Program Your Carry Logic.</h2>
          <p className="mb-8 text-lg leading-relaxed text-ink-muted">
            Forget manual calculations at exit. Encode LP preferences, hurdle rates, and GP catch-up logic directly into the SPV smart contract.
          </p>
          <div className="space-y-5">
            {[
              [Zap, "No Spreadsheet Errors", "Calculations execute automatically on-chain"],
              [Check, "Instant Settlement", "Funds flow to wallets in seconds, not days"],
              [Eye, "Full Transparency", "Every LP can verify the distribution logic"],
            ].map(([Icon, title, text]) => {
              const TypedIcon = Icon as typeof Zap;
              return (
                <div key={title as string} className="flex gap-4 border-b border-border pb-5 last:border-b-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-border text-accent">
                    <TypedIcon size={18} />
                  </div>
                  <div>
                    <h3 className="font-black uppercase tracking-tight text-ink">{title as string}</h3>
                    <p className="text-sm leading-relaxed text-ink-muted">{text as string}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

