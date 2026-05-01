"use client";

import { motion } from "motion/react";
import { fadeUp, HoverTextSwap } from "./shared";

export const LiquidityLayer = () => (
  <section className="border-b border-border py-20 md:py-24">
    <div className="custom-container grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55 }}
        className="border border-border bg-white shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-border bg-ink px-6 py-4 text-white">
          <span className="text-sm font-black uppercase tracking-tight">
            Controlled Secondary Liquidity
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/55">
            Whitelist Only
          </span>
        </div>
        <div className="divide-y divide-border p-6">
          {[
            ["500 tokens", "$105.50", "LP #4782"],
            ["1,200 tokens", "$104.25", "LP #2103"],
            ["850 tokens", "$106.00", "LP #8891"],
          ].map(([amount, price, seller], index) => (
            <motion.div
              key={seller}
              className="grid grid-cols-[1fr_auto] gap-4 py-5 first:pt-0 last:pb-0"
              whileHover={{ x: 6 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              <div>
                <h3 className="text-lg font-black uppercase tracking-tight text-ink">
                  <motion.span initial="rest" whileHover="hover" animate="rest" className="inline-block">
                    <HoverTextSwap text={`${amount} Available`} />
                  </motion.span>
                </h3>
                <p className="text-sm text-ink-muted">{price} per token - {seller}</p>
              </div>
              <motion.div
                className="self-start border border-accent/30 px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] text-accent"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2.2, repeat: Infinity, delay: index * 0.35 }}
              >
                Passed
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, delay: 0.1 }}
      >
        <div className="mb-5 inline-flex border-2 border-accent px-5 py-2.5 text-sm font-bold uppercase tracking-[0.12em] text-accent">
          Liquidity Layer
        </div>
        <h2 className="section-heading mb-6">Give LPs A Controlled Exit.</h2>
        <p className="mb-8 max-w-2xl text-lg leading-relaxed text-ink-muted">
          Offer price discovery and early exits without forcing the fund to sell underlying assets or lower investor quality.
        </p>
        <div className="grid grid-cols-1 border border-border sm:grid-cols-3">
          {[
            ["Whitelist", "Only approved buyers"],
            ["Pricing", "Market driven"],
            ["Capital", "No forced liquidation"],
          ].map(([title, text]) => (
            <div key={title} className="group border-b border-border p-5 transition-colors hover:bg-slate-50 sm:border-b-0 sm:border-r last:sm:border-r-0">
              <h3 className="mb-2 text-sm font-black uppercase tracking-tight text-ink group-hover:text-accent">
                <motion.span initial="rest" whileHover="hover" animate="rest" className="inline-block">
                  <HoverTextSwap text={title} />
                </motion.span>
              </h3>
              <p className="text-sm leading-relaxed text-ink-muted">{text}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);
