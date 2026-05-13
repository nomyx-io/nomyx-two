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
  <section className="bg-white py-20 md:py-24">
    <div className="custom-container">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.55 }}
        className="mx-auto max-w-4xl text-center"
      >
        <h2 className="section-heading">Slash Administration Costs By 40%.</h2>
      </motion.div>

      <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="rounded-[24px] bg-[#1B243C] p-8 md:p-10 shadow-xl"
        >
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center text-white">
              <Clock3 size={28} strokeWidth={2} />
            </div>
            <h3 className="text-[28px] font-semibold text-white">
              Traditional Admin
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-6">
            {traditionalItems.map(([Icon, title, text]) => {
              const TypedIcon = Icon as typeof FileText;

              return (
                <div key={title as string} className="flex gap-3">
                  <TypedIcon className="mt-1 shrink-0 text-white" size={18} />
                  <div>
                    <div className="text-[15px] font-semibold text-white mb-1">{title as string}</div>
                    <p className="text-[13px] tracking-wider text-white">{text as string}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-10 border-t border-white/10 pt-7">
            <span className="inline-flex rounded-lg border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold text-white/60">
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
          className="rounded-[24px] bg-[#1B243C] p-8 md:p-10 shadow-xl"
        >
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center text-white">
              <Zap size={28} strokeWidth={1.5} />
            </div>
            <h3 className="text-[28px] font-semibold text-white">
              Nomyx Infrastructure
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-6">
            {infrastructureItems.map(([title, text]) => (
              <div key={title} className="flex gap-3">
                <Check className="mt-1 shrink-0 text-white" size={18} strokeWidth={3} />
                <div>
                  <div className="text-[15px] font-bold text-white mb-1">{title}</div>
                  <p className="text-[13px] leading-relaxed text-white/50">{text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 border-t border-white/10 pt-7">
            <span className="inline-flex rounded-lg bg-[#2060D4] px-4 py-1.5 text-xs font-bold text-white shadow-lg">
              Instant
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);
