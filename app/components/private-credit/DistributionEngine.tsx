"use client";

import { motion } from "motion/react";
import { fadeUp } from "../evergreen/shared";

export const DistributionEngine = () => (
  <section className="border-b border-border bg-slate-50/60 py-20 md:py-24">
    <div className="custom-container grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55 }}
      >
        <div className="mb-5 inline-flex border-2 border-accent px-5 py-2.5 text-sm font-bold uppercase tracking-[0.12em] text-accent">
          Distribution Engine
        </div>
        <h2 className="section-heading mb-6">Replace 500 Wire Transfers With 1 Transaction.</h2>
        <p className="max-w-xl text-lg leading-relaxed text-ink-muted">
          Manual quarterly distributions are an administrative nightmare. With Nomyx, when the off-chain payment clears, you trigger a single on-chain function. The smart contract calculates every LP share and distributes USDC instantly.
        </p>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, delay: 0.1 }}
        className="space-y-6"
      >
        <div className="border border-border bg-white p-6">
          <div className="mb-4 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink-muted">
            Old Way
          </div>
          {[
            ["Settlement", "3-5 Days", "70%"],
            ["Wire Fees", "$15,000", "95%"],
          ].map(([label, value, width]) => (
            <div key={label} className="mb-4 last:mb-0">
              <div className="mb-2 flex justify-between text-sm font-bold text-ink">
                <span>{label}</span>
                <span>{value}</span>
              </div>
              <div className="h-3 bg-slate-100">
                <motion.div
                  className="h-full bg-ink-muted"
                  initial={{ width: 0 }}
                  whileInView={{ width }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9 }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="border border-accent bg-white p-6 shadow-xl">
          <div className="mb-4 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-accent">
            Nomyx Way
          </div>
          {[
            ["Settlement", "12 Seconds", "18%"],
            ["Gas Cost", "$5.00", "8%"],
          ].map(([label, value, width]) => (
            <div key={label} className="mb-4 last:mb-0">
              <div className="mb-2 flex justify-between text-sm font-bold text-ink">
                <span>{label}</span>
                <span>{value}</span>
              </div>
              <div className="h-3 bg-accent/10">
                <motion.div
                  className="h-full bg-accent"
                  initial={{ width: 0 }}
                  whileInView={{ width }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.2 }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

