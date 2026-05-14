"use client";

import { motion } from "motion/react";
import { Eye, Repeat2, Shuffle } from "lucide-react";
import { fadeUp, SectionIntro } from "../evergreen/shared";

export const InvestorBenefits = () => (
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
        <h2 className="section-heading">What Your Investors Gain.</h2>
      </motion.div>

      <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-[#0A112824] bg-white md:grid-cols-3">
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
              className="relative p-7 transition-colors hover:bg-slate-50/50"
            >
              <div className="mb-7 text-[#2060D4]">
                <TypedIcon size={50} strokeWidth={2} />
              </div>
              <h3 className="mb-4 text-[25px] font-bold tracking-tight text-ink">
                {title as string}
              </h3>
              <p className="text-[15px] leading-relaxed text-ink-muted">{text as string}</p>

              {/* Floating separator for desktop */}
              {index !== 2 && (
                <div className="absolute right-0 top-1/2 hidden h-45 w-px -translate-y-1/2 bg-[#0A112824] md:block" />
              )}
              
              {/* Horizontal separator for mobile */}
              {index !== 2 && (
                <div className="absolute bottom-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-[#0A112824] md:hidden" />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

