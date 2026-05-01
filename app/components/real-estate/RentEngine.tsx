"use client";

import { motion } from "motion/react";
import { fadeUp } from "../evergreen/shared";

export const RentEngine = () => (
  <section className="border-b border-border bg-slate-50/60 py-20 md:py-24">
    <div className="custom-container grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55 }}
        className="border border-border bg-white p-8 shadow-xl"
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-black uppercase tracking-tight text-ink">Rent Distribution</h3>
            <p className="text-sm text-ink-muted">Commercial Property SPV</p>
          </div>
          <div className="border border-accent px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-accent">
            Live
          </div>
        </div>
        <div className="space-y-4">
          {[
            ["Gross Rent", "$82,400", "100%"],
            ["Operating Reserve", "$9,800", "28%"],
            ["Investor Distribution", "$72,600", "88%"],
          ].map(([label, value, width], index) => (
            <div key={label}>
              <div className="mb-2 flex justify-between text-sm font-bold text-ink">
                <span>{label}</span>
                <span>{value}</span>
              </div>
              <div className="h-3 bg-slate-100">
                <motion.div
                  className={index === 2 ? "h-full bg-accent" : "h-full bg-ink-muted"}
                  initial={{ width: 0 }}
                  whileInView={{ width }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: index * 0.15 }}
                />
              </div>
            </div>
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
          Rent Logic
        </div>
        <h2 className="section-heading mb-6">Rent Moves Without Manual Reconciliation.</h2>
        <p className="mb-8 max-w-xl text-lg leading-relaxed text-ink-muted">
          Connect property income, reserves, and ownership percentages into a distribution engine that sends investor proceeds on schedule.
        </p>
        <div className="grid grid-cols-1 border border-border sm:grid-cols-3">
          {[
            ["Reserve", "Set operating buffers"],
            ["Allocate", "Calculate holder share"],
            ["Distribute", "Route funds instantly"],
          ].map(([title, text]) => (
            <div key={title} className="border-b border-border p-5 sm:border-b-0 sm:border-r last:sm:border-r-0">
              <h3 className="mb-2 text-sm font-black uppercase tracking-tight text-ink">{title}</h3>
              <p className="text-sm leading-relaxed text-ink-muted">{text}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

