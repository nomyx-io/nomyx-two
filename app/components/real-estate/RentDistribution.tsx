"use client";

import { motion } from "motion/react";
import { Banknote, Clock3 } from "lucide-react";
import { fadeUp, AnimatedButton } from "../evergreen/shared";

export const RentDistribution = () => (
  <section className="border-b border-border bg-slate-50/60 py-20 md:py-24">
    <div className="custom-container grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, delay: 0.1 }}
        className="lg:order-1"
      >
        <div className="mb-5 inline-flex border-2 border-accent px-5 py-2.5 text-sm font-bold uppercase tracking-[0.12em] text-accent">
          Distribution Automation
        </div>
        <h2 className="section-heading mb-6">Rent Distributions on Autopilot.</h2>
        <p className="mb-8 max-w-xl text-lg leading-relaxed text-ink-muted">
          Distribute rental income to hundreds of investors in a single click. The smart contract calculates the pro-rata share based on tokens held at the time of the snapshot and distributes USDC instantly.
        </p>
        <div className="grid grid-cols-1 border border-border bg-white sm:grid-cols-2">
          {[
            [Clock3, "12 sec", "Distribution time"],
            [Banknote, "$5", "Gas cost"],
            // [Calculator, "0", "Manual calculations"],
          ].map(([Icon, value, label]) => {
            const TypedIcon = Icon as typeof Clock3;
            return (
              <div key={label as string} className="border-b border-border p-5 sm:border-b-0 sm:border-r last:sm:border-r-0">
                <TypedIcon className="mb-4 text-accent" size={22} />
                <div className="text-3xl font-black text-ink">{value as string}</div>
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">{label as string}</div>
              </div>
            );
          })}
        </div>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55 }}
        className="border border-border bg-white shadow-[0_28px_70px_rgba(10,17,40,0.12)]"
      >
        <div className="bg-gradient-to-r from-accent to-[#14B8A6] p-5 text-white">
          <div className="mb-2 text-xl font-black">
            Property Dashboard
          </div>
          <div className="text-sm font-semibold text-white">123 Main Street, Manhattan</div>
        </div>

        <div className="p-6">
          <div className="mb-4 flex items-center justify-between text-sm">
            <span className="font-bold text-ink-muted">Net Rental Income</span>
            <span className="font-black text-accent">$125,000</span>
          </div>
          <AnimatedButton 
            text="Distribute To Holders" 
            variant="ink" 
            className="mb-6 w-full h-14"
          />

          <div className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink-muted">
            Distribution Results
          </div>
          <div className="grid grid-cols-1 gap-3">
            {["0x742d...3f21", "0x8a3c...7e19", "0x5f1b...2d84", "0x9e2a...6c45"].map((wallet, index) => (
              <motion.div
                key={wallet}
                className="grid grid-cols-[1fr_auto] border border-border bg-white px-4 py-3 text-sm"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 6 }}
              >
                <span className="font-mono text-ink-muted">{wallet}</span>
                <span className="font-black text-accent">+$1,250.00 USDC</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);
