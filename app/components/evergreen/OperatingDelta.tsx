"use client";

import { motion } from "motion/react";
import { Check, Clock3, FileText, Zap } from "lucide-react";
import { fadeUp } from "./shared";

const traditionalItems = [
  [FileText, "Manual Subscription Docs", "Paper-based workflows"],
  [Clock3, "Quarterly Liquidity Windows", "Limited access periods"],
  [FileText, "Email-based Reconciliation", "Error-prone coordination"],
  [Clock3, "Delayed NAV Calculation", "T+30 settlement delays"],
];

const infrastructureItems = [
  ["Digital Onboarding (KYC/AML)", "Automated compliance checks"],
  ["24/7 Subscription/Redemption", "Always-on capital access"],
  ["Real-Time Cap Table", "Instant reconciliation"],
  ["Atomic Settlement", "Immediate execution"],
];

export const OperatingDelta = () => (
  <section className="border-b border-border bg-white py-20 md:py-24">
    <div className="custom-container">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.55 }}
        className="mx-auto max-w-4xl text-center"
      >
        <h2 className="section-heading">Slash Administration Costs by 40%.</h2>
      </motion.div>

      <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="border border-border bg-white p-8"
        >
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center border border-border text-ink-muted">
              <Clock3 size={22} />
            </div>
            <h3 className="text-3xl font-black tracking-tight text-ink">
              Traditional Admin
            </h3>
          </div>
          <div className="space-y-5">
            {traditionalItems.map(([Icon, title, text]) => {
              const TypedIcon = Icon as typeof FileText;

              return (
                <div key={title as string} className="flex gap-3">
                  <TypedIcon className="mt-0.5 shrink-0 text-ink-muted" size={17} />
                  <div>
                    <div className="text-sm font-black text-ink">{title as string}</div>
                    <p className="text-sm leading-relaxed text-ink-muted">{text as string}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-8 border-t border-border pt-5">
            <span className="inline-flex border border-border px-4 py-1 text-xs font-bold text-ink-muted">
              T+30 Days
            </span>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="border border-border bg-white p-8"
        >
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center border border-border text-accent">
              <Zap size={22} />
            </div>
            <h3 className="text-3xl font-black tracking-tight text-ink">
              Nomyx Infrastructure
            </h3>
          </div>
          <div className="space-y-5">
            {infrastructureItems.map(([title, text]) => (
              <div key={title} className="flex gap-3">
                <Check className="mt-0.5 shrink-0 text-accent" size={17} />
                <div>
                  <div className="text-sm font-black text-ink">{title}</div>
                  <p className="text-sm leading-relaxed text-ink-muted">{text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 border-t border-border pt-5">
            <span className="inline-flex border border-accent px-4 py-1 text-xs font-bold text-accent">
              Instant
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);
