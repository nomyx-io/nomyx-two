"use client";

import { motion } from "motion/react";
import { fadeUp } from "./shared";

export const LiquidityLayer = () => (
  <section className="py-20 md:py-24">
    <div className="custom-container">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55 }}
        className="mx-auto mb-16 max-w-4xl text-center"
      >
        <h2 className="section-heading mb-6">Give LPs The Exit They Want.</h2>
        <p className="mx-auto max-w-2xl text-[17px] leading-relaxed text-ink-muted">
          Offer price discovery and early exits without forcing the fund to sell underlying assets or lower investor quality.
        </p>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, delay: 0.1 }}
        className="mx-auto mb-16 max-w-5xl rounded-2xl border border-border bg-white"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3">
          {[
            ["Whitelist", "Only approved buyers"],
            ["Pricing", "Market driven"],
            ["Capital", "No forced liquidation"],
          ].map(([title, text], index) => (
            <div 
              key={title} 
              className="relative flex flex-col justify-center px-8 py-5 md:py-6"
            >
              <h3 className="mb-1 text-sm font-bold text-ink">
                {title}
              </h3>
              <p className="text-[15px] leading-relaxed text-ink-muted">{text}</p>
              
              {/* Floating separator for desktop */}
              {index !== 2 && (
                <div className="absolute right-0 top-1/2 hidden h-18 w-px -translate-y-1/2 bg-border sm:block" />
              )}
              
              {/* Horizontal separator for mobile */}
              {index !== 2 && (
                <div className="absolute bottom-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-border/60 sm:hidden" />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, delay: 0.2 }}
        className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-border bg-white shadow-xl"
      >
        <div className="bg-[#1B243C] px-8 py-5 text-white">
          <span className="text-[17px] font-bold">
            Secondary Market Bulletin Board
          </span>
        </div>
        <div className="divide-y divide-border/60 px-8">
          {[
            ["500 Tokens Available", "$105.50 per token", "Seller: LP #4782 • Listed 2 days ago"],
            ["1,200 Tokens Available", "$104.25 per token", "Seller: LP #2103 • Listed 5 days ago"],
            ["850 Tokens Available", "$106.00 per token", "Seller: LP #8921 • Listed 1 week ago"],
          ].map(([amount, price, seller], index) => (
            <div
              key={seller}
              className="flex flex-col items-start justify-between gap-4 py-8 sm:flex-row sm:items-center"
            >
              <div>
                <h3 className="text-[19px] font-bold tracking-tight text-ink">
                  {amount}
                </h3>
                <p className="text-[15px] font-medium text-ink-muted/80">{price}</p>
                <p className="mt-2 text-[13px] text-ink-muted">{seller}</p>
              </div>
              <div className="rounded-md border border-[#1E3A8A4D] px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#1E3A8A]">
                Compliance: Passed
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);
