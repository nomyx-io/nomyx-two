"use client";

import { motion } from "motion/react";
import { Bolt, CreditCard, Cpu, HandCoins, Settings } from "lucide-react";
import { fadeUp, SectionIntro } from "../evergreen/shared";

const steps = [
  [HandCoins, "Step 1", "Capital Aggregation", "LPs subscribe via stablecoins into a compliance-gated smart contract."],
  [CreditCard, "Step 2", "Deployment", "Funds are converted to fiat and wired to your off-chain borrower or servicer."],
  [Settings, "Step 3", "Off-Chain Servicing", "Your existing servicer collects repayments and interest from the borrower in fiat."],
  [Bolt, "Step 4", "Atomic Distribution", "Yield is bridged back on-chain. The Nomyx Engine splits and sends payments to all LP wallets in a single transaction."],
];

export const YieldBridge = () => (
  <section className="py-20 md:py-24">
    <div className="custom-container">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55 }}
        className="mb-14 text-center"
      >
        <h2 className="section-heading mb-4">Bridging Real World Yield To Digital Investors.</h2>
        <p className="text-[17px] text-ink-muted">Keep Your Existing Loan Servicing Partners. Upgrade Your Investor Experience.</p>
      </motion.div>

      <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-[#0A112824] bg-white md:grid-cols-4">
        {steps.map(([Icon, step, title, text], index) => {
          const TypedIcon = Icon as typeof HandCoins;
          return (
            <motion.div
              key={title as string}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="relative p-8 transition-colors hover:bg-slate-50/50"
            >
              <div className="mb-6 text-[#2060D4]">
                <TypedIcon size={50} strokeWidth={1.5} />
              </div>
              <div className="mb-3 text-[11px] font-bold uppercase tracking-widest">
                {step as string}
              </div>
              <h3 className="mb-4 text-[22px] font-bold tracking-tight text-ink">
                {title as string}
              </h3>
              <p className="text-[15px] leading-relaxed text-ink-muted">{text as string}</p>

              {/* Floating separator for desktop */}
              {index !== 3 && (
                <div className="absolute right-0 top-1/2 hidden h-65 w-px -translate-y-1/2 bg-[#0A112824] md:block" />
              )}
              
              {/* Horizontal separator for mobile */}
              {index !== 3 && (
                <div className="absolute bottom-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-[#0A112824] md:hidden" />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

