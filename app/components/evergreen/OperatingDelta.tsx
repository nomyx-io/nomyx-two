"use client";

import { motion } from "motion/react";
import { ArrowLeftRight, Check, Clock3, Zap } from "lucide-react";
import { fadeUp, HoverTextSwap, SectionIntro } from "./shared";

export const OperatingDelta = () => (
  <section className="relative overflow-hidden border-b border-border bg-slate-50/60 py-20 md:py-24">
    <motion.div
      className="absolute left-0 top-1/2 hidden h-px w-full bg-accent/20 lg:block"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.1, ease: "easeOut" }}
    />
    <div className="custom-container relative">
      <SectionIntro
        eyebrow="Operating Delta"
        title="Quarter-End Work Becomes Continuous Infrastructure."
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
          <Clock3 className="mb-6 text-ink-muted" size={28} />
          <h3 className="mb-4 text-3xl font-black uppercase tracking-tight text-ink">
            <motion.span initial="rest" whileHover="hover" animate="rest" className="inline-block">
              <HoverTextSwap text="Legacy Cycle" />
            </motion.span>
          </h3>
          <p className="mb-8 text-sm leading-relaxed text-ink-muted">
            Subscription packets, quarter-end windows, emails, and delayed calculations create avoidable drag.
          </p>
          <div className="space-y-4">
            {["Manual documents", "Quarterly access", "Spreadsheet reconciliation", "Delayed NAV"].map((item) => (
              <div key={item} className="flex items-center gap-3 border-b border-border pb-3 text-sm font-bold text-ink-muted">
                <span className="h-2 w-2 bg-ink-muted" />
                {item}
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
          className="relative overflow-hidden bg-ink p-8 text-white lg:col-span-4"
        >
          <motion.div
            className="absolute -right-12 -top-12 h-28 w-28 border border-white/10"
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          />
          <ArrowLeftRight className="mb-6 text-white" size={28} />
          <h3 className="mb-4 text-3xl font-black uppercase tracking-tight">
            <motion.span initial="rest" whileHover="hover" animate="rest" className="inline-block">
              <HoverTextSwap text="40% Less Admin Load" />
            </motion.span>
          </h3>
          <p className="mb-8 text-sm leading-relaxed text-white/70">
            Automate repetitive fund administration while keeping issuer controls, compliance checks, and audit logs intact.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              ["T+0", "Settlement"],
              ["24/7", "Liquidity"],
              ["Live", "NAV"],
              ["API", "Reporting"],
            ].map(([value, label]) => (
              <div key={label} className="border border-white/15 p-4 transition-colors hover:bg-white/5">
                <div className="text-3xl font-black">{value}</div>
                <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-white/50">
                  {label}
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
          transition={{ duration: 0.55, delay: 0.2 }}
          className="border-t border-border p-8 lg:col-span-4 lg:border-l lg:border-t-0"
        >
          <Zap className="mb-6 text-accent" size={28} />
          <h3 className="mb-4 text-3xl font-black uppercase tracking-tight text-ink">
            <motion.span initial="rest" whileHover="hover" animate="rest" className="inline-block">
              <HoverTextSwap text="Nomyx Flow" />
            </motion.span>
          </h3>
          <p className="mb-8 text-sm leading-relaxed text-ink-muted">
            Digital onboarding, automated compliance, live cap tables, and atomic settlement run as one workflow.
          </p>
          <div className="space-y-4">
            {["Digital onboarding", "Always-on subscriptions", "Real-time cap table", "Atomic settlement"].map((item) => (
              <div key={item} className="flex items-center gap-3 border-b border-border pb-3 text-sm font-bold text-ink">
                <Check size={16} className="text-accent" />
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);
