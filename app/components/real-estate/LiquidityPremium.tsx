"use client";

import { motion } from "motion/react";
import { ChartNoAxesCombined, LockKeyhole, TimerReset, TrendingUp, Users } from "lucide-react";
import { fadeUp, HoverTextSwap, SectionIntro } from "../evergreen/shared";

export const LiquidityPremium = () => (
  <section className="border-b border-border py-20 md:py-24">
    <div className="custom-container">
      <SectionIntro
        eyebrow="Private Market Liquidity"
        title="Give Property Investors An Exit Window."
        description="Create controlled liquidity without turning a private real estate asset into an open market free-for-all."
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
            Private Bulletin Board
          </h3>
          <p className="relative mb-8 text-sm leading-relaxed text-white/70">
            Approved investors can list property shares, discover price, and transfer ownership under issuer-defined rules.
          </p>
          <div className="relative space-y-3">
            {["Sell order created", "Buyer whitelist checked", "Ownership transfer recorded"].map((item, index) => (
              <motion.div
                key={item}
                className="border border-white/15 bg-white/5 px-4 py-3 text-sm font-bold text-white/80"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 }}
              >
                {item}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {[
            [LockKeyhole, "Controlled Access", "Only approved buyers can enter the trading window."],
            [TimerReset, "Scheduled Liquidity", "Open secondary windows on the sponsor's timeline."],
            [TrendingUp, "Price Discovery", "Let market demand inform private property valuations."],
            [Users, "Investor Retention", "Offer exits without forcing asset sales or refinancing."],
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
                  <motion.span initial="rest" whileHover="hover" animate="rest" className="inline-block">
                    <HoverTextSwap text={title as string} />
                  </motion.span>
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

