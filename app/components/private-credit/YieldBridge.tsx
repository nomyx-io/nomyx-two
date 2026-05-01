"use client";

import { motion } from "motion/react";
import { Bolt, CreditCard, Cpu, HandCoins, Settings } from "lucide-react";
import { fadeUp, HoverTextSwap, SectionIntro } from "../evergreen/shared";

const steps = [
  [HandCoins, "Step 1", "Capital Aggregation", "LPs subscribe via stablecoins into a compliance-gated smart contract."],
  [CreditCard, "Step 2", "Deployment", "Funds convert to fiat and wire to your off-chain borrower or servicer."],
  [Settings, "Step 3", "Off-Chain Servicing", "Your servicer collects repayments and interest from the borrower in fiat."],
  [Bolt, "Step 4", "Atomic Distribution", "Yield is bridged back on-chain and distributed to LP wallets in one transaction."],
];

export const YieldBridge = () => (
  <section className="border-b border-border py-20 md:py-24">
    <div className="custom-container">
      <SectionIntro
        eyebrow="Yield Bridge"
        title="Bridging Real World Yield To Digital Investors."
        description="Keep your existing loan servicing partners. Upgrade your investor experience."
      />

      <div className="relative mt-14 grid grid-cols-1 border border-border bg-white md:grid-cols-4">
        <motion.div
          className="absolute left-[12%] top-1/2 hidden h-px w-[76%] bg-accent/25 md:block"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          style={{ transformOrigin: "left" }}
        />
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
              className="group relative border-b border-border bg-white p-7 text-center transition-colors hover:bg-slate-50 md:border-b-0 md:border-r last:md:border-r-0"
            >
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-accent px-4 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-white">
                {step as string}
              </div>
              <div className="mx-auto mb-7 flex h-14 w-14 items-center justify-center border border-border text-accent transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                <TypedIcon size={24} />
              </div>
              <h3 className="mb-4 text-xl font-black uppercase tracking-tight text-ink">
                <motion.span initial="rest" whileHover="hover" animate="rest" className="inline-block">
                  <HoverTextSwap text={title as string} />
                </motion.span>
              </h3>
              <p className="text-sm leading-relaxed text-ink-muted">{text as string}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

