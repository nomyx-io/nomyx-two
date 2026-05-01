"use client";

import { motion } from "motion/react";
import { Eye, Repeat2, Shuffle } from "lucide-react";
import { fadeUp, HoverTextSwap, SectionIntro } from "../evergreen/shared";

export const InvestorBenefits = () => (
  <section className="border-b border-border py-20 md:py-24">
    <div className="custom-container">
      <SectionIntro eyebrow="Investor Experience" title="What Your Investors Gain." />

      <div className="mt-14 grid grid-cols-1 border border-border bg-white md:grid-cols-3">
        {[
          [Eye, "Real-Time Transparency", "LPs can verify the syndication status and accrued yield on-chain, 24/7."],
          [Repeat2, "Instant Reinvestment", "Yield is received in liquid stablecoins, ready for immediate redeployment or withdrawal."],
          [Shuffle, "Secondary Liquidity", "Allow LPs to sell their loan position to other whitelisted investors if they need early exit liquidity."],
        ].map(([Icon, title, text], index) => {
          const TypedIcon = Icon as typeof Eye;
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
              <div className="mb-7 flex h-12 w-12 items-center justify-center border border-border text-accent transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                <TypedIcon size={22} />
              </div>
              <h3 className="mb-4 text-2xl font-black uppercase tracking-tight text-ink">
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

