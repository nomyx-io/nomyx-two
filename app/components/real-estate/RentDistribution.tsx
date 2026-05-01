"use client";

import { motion } from "motion/react";
import { ArrowRight, Banknote, Calculator, Clock3 } from "lucide-react";
import { fadeUp, HoverTextSwap } from "../evergreen/shared";

export const RentDistribution = () => (
  <section className="border-b border-border bg-slate-50/60 py-20 md:py-24">
    <div className="custom-container grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55 }}
        className="border border-border bg-white shadow-[0_28px_70px_rgba(10,17,40,0.12)]"
      >
        <div className="grid grid-cols-1 border-b border-border md:grid-cols-3">
          {[
            ["Property", "123 Main Street"],
            ["Snapshot", "Live"],
            ["Income", "$125,000"],
          ].map(([label, value]) => (
            <div key={label} className="border-b border-border p-5 md:border-b-0 md:border-r last:md:border-r-0">
              <div className="mb-1 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink-muted">
                {label}
              </div>
              <div className="text-xl font-black text-ink">{value}</div>
            </div>
          ))}
        </div>

        <div className="p-6">
          <div className="mb-6 h-3 overflow-hidden bg-slate-100">
            <motion.div
              className="h-full bg-accent"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: "easeOut" }}
            />
          </div>
          <motion.button
            initial="rest"
            whileHover="hover"
            animate="rest"
            className="mb-6 flex h-14 w-full items-center justify-center gap-3 bg-ink text-sm font-black uppercase tracking-[0.12em] text-white transition-colors hover:bg-accent"
          >
            <HoverTextSwap text="Distribute To Holders" />
            <ArrowRight size={16} />
          </motion.button>

          <div className="grid grid-cols-1 gap-3">
            {["0x742d...3f21", "0xa53c...7e19", "0xcf1b...2d84", "0x9e2a...6c45"].map((wallet, index) => (
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

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, delay: 0.1 }}
      >
        <div className="mb-5 inline-flex border-2 border-accent px-5 py-2.5 text-sm font-bold uppercase tracking-[0.12em] text-accent">
          Distribution Automation
        </div>
        <h2 className="section-heading mb-6">Rental Yield Becomes Programmable Cash Flow.</h2>
        <p className="mb-8 max-w-xl text-lg leading-relaxed text-ink-muted">
          Snapshot token holders, calculate pro-rata entitlement, and distribute rent to hundreds of wallets without reconciliation work.
        </p>
        <div className="grid grid-cols-1 border border-border bg-white sm:grid-cols-3">
          {[
            [Clock3, "12 sec", "Distribution time"],
            [Banknote, "$5", "Gas cost"],
            [Calculator, "0", "Manual calculations"],
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
    </div>
  </section>
);

