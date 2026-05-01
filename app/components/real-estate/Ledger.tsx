"use client";

import { motion } from "motion/react";
import { Database, FileText, ShieldCheck, Users } from "lucide-react";
import { fadeUp, HoverTextSwap, SectionIntro } from "../evergreen/shared";

export const Ledger = () => (
  <section className="border-b border-border py-20 md:py-24">
    <div className="custom-container">
      <SectionIntro
        eyebrow="Transfer Agent Layer"
        title="Fractional Ownership Without Cap Table Chaos."
        description="Replace investor spreadsheets with a live ownership system that records transfers, balances, eligibility, and distributions as operational data."
      />

      <div className="mt-14 grid grid-cols-1 border border-border bg-white lg:grid-cols-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="border-b border-border p-8 lg:col-span-4 lg:border-b-0 lg:border-r"
        >
          <FileText className="mb-6 text-ink-muted" size={30} />
          <h3 className="mb-5 text-3xl font-black uppercase tracking-tight text-ink">
            Legacy Records
          </h3>
          <div className="relative h-56 overflow-hidden border border-border bg-slate-50">
            {Array.from({ length: 8 }).map((_, index) => (
              <motion.div
                key={index}
                className="absolute h-24 w-20 border border-border bg-white"
                style={{
                  left: 42 + (index % 4) * 34,
                  top: 44 + Math.floor(index / 4) * 28,
                  rotate: `${-14 + index * 4}deg`,
                }}
                animate={{ y: [0, -5, 0], rotate: [-12 + index * 3, -8 + index * 3, -12 + index * 3] }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.09 }}
              />
            ))}
            <div className="absolute bottom-5 right-5 bg-ink px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-white">
              Manual Updates
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="relative overflow-hidden bg-ink p-8 text-white lg:col-span-4"
        >
          <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:36px_36px]" />
          <Database className="relative mb-6 text-white" size={30} />
          <h3 className="relative mb-5 text-3xl font-black uppercase tracking-tight">
            Live Ledger
          </h3>
          <div className="relative space-y-3">
            {["Sarah Chen", "Michael Torres", "Jessica Park", "Avery Patel"].map((name, index) => (
              <motion.div
                key={name}
                className="grid grid-cols-[1fr_auto] items-center gap-4 border border-white/15 bg-white/5 px-4 py-3"
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.18 + index * 0.1 }}
              >
                <span className="font-bold text-white">{name}</span>
                <span className="font-mono text-xs uppercase tracking-[0.12em] text-white/60">
                  {[150, 200, 100, 75][index]} tokens
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="border-t border-border lg:col-span-4 lg:border-l lg:border-t-0">
          {[
            [Users, "500+ Holders", "One ownership system for large fractional LP bases."],
            [ShieldCheck, "Eligibility Rules", "Control who can buy, sell, and receive distributions."],
            [Database, "Audit Trail", "Every transfer and payment becomes a permanent record."],
          ].map(([Icon, title, text], index) => {
            const TypedIcon = Icon as typeof Users;
            return (
              <motion.div
                key={title as string}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="group border-b border-border p-7 transition-colors hover:bg-slate-50 last:border-b-0"
              >
                <TypedIcon className="mb-5 text-accent" size={26} />
                <h3 className="mb-2 text-xl font-black uppercase tracking-tight text-ink">
                  <motion.span initial="rest" whileHover="hover" animate="rest" className="inline-block">
                    <HoverTextSwap text={title as string} />
                  </motion.span>
                </h3>
                <p className="text-sm leading-relaxed text-ink-muted">{text as string}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

