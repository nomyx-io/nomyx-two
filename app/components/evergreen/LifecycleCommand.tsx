"use client";

import { motion } from "motion/react";
import { Database, FileText, RefreshCw } from "lucide-react";
import { fadeUp, HoverTextSwap, SectionIntro } from "./shared";

export const LifecycleCommand = () => (
  <section className="border-b border-border py-20 md:py-24">
    <div className="custom-container">
      <SectionIntro
        eyebrow="Live Operations"
        title="One Control Plane For The Open-Ended Fund."
        description="Subscriptions, NAV publication, compliance, liquidity windows, and investor reporting sit in a single operational surface."
      />

      <div className="mt-14 grid grid-cols-1 border border-border lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
          className="border-b border-border bg-white p-6 lg:border-b-0 lg:border-r md:p-8"
        >
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-ink">
                Evergreen Growth Fund I
              </h3>
              <p className="text-sm text-ink-muted">Continuous fund lifecycle</p>
            </div>
            <motion.div
              className="border border-accent px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-accent"
              animate={{ boxShadow: ["0 0 0 rgba(30,58,138,0)", "0 0 24px rgba(30,58,138,0.22)", "0 0 0 rgba(30,58,138,0)"] }}
              transition={{ duration: 2.4, repeat: Infinity }}
            >
              Live NAV
            </motion.div>
          </div>

          <div className="relative h-72 overflow-hidden border border-border bg-slate-50 p-6">
            <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(#0A1128_1px,transparent_1px),linear-gradient(90deg,#0A1128_1px,transparent_1px)] [background-size:32px_32px]" />
            <div className="absolute left-6 top-6 z-10 bg-ink px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white">
              Oracle: $10.42/token
            </div>
            <svg viewBox="0 0 700 260" className="relative h-full w-full">
              <path d="M35 210 H665" stroke="rgba(10,17,40,0.12)" />
              <path d="M35 160 H665" stroke="rgba(10,17,40,0.08)" />
              <path d="M35 110 H665" stroke="rgba(10,17,40,0.08)" />
              <path d="M35 60 H665" stroke="rgba(10,17,40,0.08)" />
              <motion.path
                d="M45 205 L120 184 L195 176 L275 148 L350 158 L438 118 L525 96 L655 72"
                fill="none"
                stroke="#1E3A8A"
                strokeWidth="5"
                strokeLinecap="square"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
              <motion.path
                d="M45 205 L120 184 L195 176 L275 148 L350 158 L438 118 L525 96 L655 72 L655 220 L45 220 Z"
                fill="rgba(30,58,138,0.08)"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.45 }}
              />
              <motion.circle
                cx="655"
                cy="72"
                r="7"
                fill="#1E3A8A"
                animate={{ r: [7, 11, 7], opacity: [1, 0.55, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </svg>
          </div>

          <div className="mt-6 grid grid-cols-3 border border-border">
            {[
              ["AUM", "$124.5M"],
              ["Investors", "1,847"],
              ["Liquidity", "Always on"],
            ].map(([label, value]) => (
              <div key={label} className="border-r border-border p-5 last:border-r-0">
                <div className="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-ink-muted">
                  {label}
                </div>
                <div className="text-xl font-black text-ink">{value}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="divide-y divide-border bg-white">
          {[
            {
              icon: Database,
              title: "Price From Source Of Truth",
              text: "Connect oracle, administrator, or internal portfolio data feeds to publish real-time NAV.",
            },
            {
              icon: RefreshCw,
              title: "Subscriptions And Redemptions",
              text: "Process investor entries and exits continuously instead of batching operational work every quarter.",
            },
            {
              icon: FileText,
              title: "Reporting Without Waiting",
              text: "Expose holdings, positions, and transfer history as live investor records.",
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group flex gap-5 p-7 transition-colors hover:bg-slate-50"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-border text-accent transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                  <Icon size={22} />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-black uppercase tracking-tight text-ink">
                    <motion.span initial="rest" whileHover="hover" animate="rest" className="inline-block">
                      <HoverTextSwap text={item.title} stagger={0.01} />
                    </motion.span>
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-muted">{item.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);
