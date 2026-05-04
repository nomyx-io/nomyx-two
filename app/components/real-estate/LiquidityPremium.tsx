"use client";

import { motion } from "motion/react";
import { ChartNoAxesCombined, LockKeyhole, TimerReset, TrendingUp } from "lucide-react";
import { fadeUp, SectionIntro } from "../evergreen/shared";

export const LiquidityPremium = () => (
  <section className="border-b border-border py-20 md:py-24">
    <div className="custom-container">
      <SectionIntro
        title="The Liquidity Premium."
        description="Don't lock your investors in for 7 years. Offer them an exit."
      />

      <div className="mt-14 grid grid-cols-1 border border-border bg-white lg:grid-cols-[0.8fr_1.2fr]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55 }}
          className="relative overflow-hidden border-b border-border bg-ink p-8 text-white lg:border-b-0 lg:border-r"
        >
          <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:36px_36px]" />
          <ChartNoAxesCombined className="relative mb-6 text-white" size={34} />
          <h3 className="relative mb-4 text-3xl font-black uppercase tracking-tight">
            Private Secondary Trading
          </h3>
          <p className="relative mb-8 text-sm leading-relaxed text-white/70">
            Enable a private, white-label bulletin board where approved investors can trade their property shares peer-to-peer. You control the trading windows and the eligible buyers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {[
            [LockKeyhole, "Controlled Access", "Approved buyers only"],
            [TimerReset, "Trading Windows", "Set your own schedule"],
            [TrendingUp, "Price Discovery", "Market-driven valuations"],
          ].map(([Icon, title, text], index) => {
            const TypedIcon = Icon as typeof LockKeyhole;
            return (
              <motion.div
                key={title as string}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="group border-b border-border p-7 transition-colors hover:bg-slate-50 md:border-r even:md:border-r-0"
              >
                <TypedIcon className="mb-5 text-accent transition-transform group-hover:translate-x-1" size={26} />
                <h4 className="mb-2 text-xl font-black uppercase tracking-tight text-ink">
                  {title as string}
                </h4>
                <p className="text-sm leading-relaxed text-ink-muted">{text as string}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

