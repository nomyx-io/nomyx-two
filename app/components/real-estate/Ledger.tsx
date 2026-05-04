"use client";

import { motion } from "motion/react";
import { Check, Database, FileText } from "lucide-react";
import { fadeUp, SectionIntro } from "../evergreen/shared";

const ledgerRows = [
  ["Sarah Chen", "150 Tokens"],
  ["Michael Torres", "200 Tokens"],
  ["Jessica Park", "100 Tokens"],
];

export const Ledger = () => (
  <section className="border-b border-border py-20 md:py-24">
    <div className="custom-container">
      <SectionIntro
        eyebrow="Transfer Agent Layer"
        title="Scale Your LP Base. Not Your Paperwork."
        description="Raising capital from smaller investors usually means a cap table nightmare. Nomyx acts as a digital transfer agent, maintaining a real-time, immutable record of ownership for thousands of fractional holders."
      />

      <div className="grid grid-cols-1 border border-border bg-white lg:grid-cols-2 mt-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="border-b border-border p-8 lg:border-b-0 lg:border-r"
        >
          <FileText className="mb-6 text-ink-muted" size={30} />
          <h3 className="mb-5 text-3xl font-black uppercase tracking-tight text-ink">
            Traditional Syndication
          </h3>
          <p className="mb-8 text-sm leading-relaxed text-ink-muted">
            Manual K-1s, scattered emails, outdated Excel sheets.
          </p>
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
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="relative overflow-hidden bg-ink p-8 text-white"
        >
          <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:36px_36px]" />
          <Database className="relative mb-6 text-white" size={30} />
          <h3 className="relative mb-5 text-3xl font-black uppercase tracking-tight">
            Nomyx Ledger
          </h3>
          <p className="relative mb-8 text-sm leading-relaxed text-white/70">
            Automated ownership tracking, instant transfer recording, and digital K-1 distribution.
          </p>
          <div className="relative mb-4 flex border-b border-white/15 text-xs font-bold">
            <div className="border-b border-white px-4 pb-3 text-white">Investors</div>
            <div className="px-4 pb-3 text-white/45">Distribution History</div>
          </div>
          <div className="relative space-y-3">
            {ledgerRows.map(([name, tokens], index) => (
              <motion.div
                key={name}
                className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border border-white/15 bg-white/5 px-4 py-3"
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.18 + index * 0.1 }}
              >
                <span className="font-bold text-white">{name}</span>
                <span className="font-mono text-xs uppercase tracking-[0.12em] text-white/60">
                  {tokens}
                </span>
                <span className="inline-flex items-center gap-1 bg-white/10 px-2 py-1 text-[10px] font-bold text-white">
                  <Check size={12} />
                  Settled
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

