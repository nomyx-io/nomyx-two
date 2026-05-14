"use client";

import { motion } from "motion/react";
import { fadeUp } from "../evergreen/shared";

export const DistributionEngine = () => (
  <section className="py-20 md:py-24">
    <div className="custom-container grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55 }}
      >
        <h2 className="section-heading mb-8">Replace 500 Wire Transfers With 1 Transaction.</h2>
        <p className="max-w-xl text-[17px] leading-relaxed text-ink-muted md:text-lg">
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
        <div className="rounded-2xl border border-[#0A112824] bg-white p-8">
          <div className="mb-6 text-[11px] font-bold uppercase tracking-widest text-ink-muted">
            Old Way
          </div>
          {[
            ["Settlement", "3-5 Days", "70%"],
            ["Wire Fees", "$15,000", "95%"],
          ].map(([label, value, width]) => (
            <div key={label} className="mb-6 last:mb-0">
              <div className="mb-2 flex justify-between text-[15px] font-bold text-ink">
                <span>{label}</span>
                <span className="text-ink-muted">{value}</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100">
                <motion.div
                  className="h-full rounded-full bg-ink/20"
                  initial={{ width: 0 }}
                  whileInView={{ width }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9 }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-[#2060D4] bg-white p-8 shadow-[0_20px_50px_rgba(32,96,212,0.08)]">
          <div className="mb-6 text-[11px] font-bold uppercase tracking-widest text-[#2060D4]">
            Nomyx Way
          </div>
          {[
            ["Settlement", "12 Seconds", "18%"],
            ["Gas Cost", "$5.00", "8%"],
          ].map(([label, value, width]) => (
            <div key={label} className="mb-6 last:mb-0">
              <div className="mb-2 flex justify-between text-[15px] font-bold text-ink">
                <span>{label}</span>
                <span className="text-[#2060D4]">{value}</span>
              </div>
              <div className="h-2 rounded-full bg-[#2060D4]/10">
                <motion.div
                  className="h-full rounded-full bg-[#2060D4]"
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

