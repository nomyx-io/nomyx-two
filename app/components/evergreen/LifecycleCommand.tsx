"use client";

import { motion } from "motion/react";
import { BarChart3, Link2, RefreshCw } from "lucide-react";
import { fadeUp, SectionIntro } from "./shared";

export const LifecycleCommand = () => (
  <section className="border-b border-border py-20 md:py-24">
    <div className="custom-container">
      <SectionIntro
        // eyebrow="Live Operations"
        title="Real-Time NAV. Real-Time Trust."
        description=""
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
              <h3 className="text-sm font-black tracking-tight text-ink">
                Fund Performance
              </h3>
              <p className="text-xs text-ink-muted">Evergreen Growth Fund I</p>
            </div>
            <div className="text-right">
              <div className="text-xl font-black text-ink">$10.42</div>
              <div className="text-xs font-bold text-emerald-500">+4.2% YTD</div>
            </div>
          </div>

          <div className="relative h-72 overflow-hidden border border-border bg-slate-50 p-6">
            <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(#0A1128_1px,transparent_1px),linear-gradient(90deg,#0A1128_1px,transparent_1px)] [background-size:32px_32px]" />
            <motion.div
              className="absolute right-6 top-6 z-10 rounded-full bg-emerald-500 px-4 py-1.5 text-[10px] font-bold text-white shadow-[0_10px_24px_rgba(16,185,129,0.22)]"
              animate={{ opacity: [0.86, 1, 0.86] }}
              transition={{ duration: 2.4, repeat: Infinity }}
            >
              Oracle Update: $10.42/token
            </motion.div>
            <svg viewBox="0 0 700 260" className="relative h-full w-full">
              <path d="M35 210 H665" stroke="rgba(10,17,40,0.12)" />
              <path d="M35 160 H665" stroke="rgba(10,17,40,0.08)" />
              <path d="M35 110 H665" stroke="rgba(10,17,40,0.08)" />
              <path d="M35 60 H665" stroke="rgba(10,17,40,0.08)" />
              <motion.path
                d="M45 205 L120 184 L195 176 L275 148 L350 158 L438 118 L525 96 L655 72"
                fill="none"
                stroke="#14B8A6"
                strokeWidth="4"
                strokeLinecap="square"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
              <motion.path
                d="M45 205 L120 184 L195 176 L275 148 L350 158 L438 118 L525 96 L655 72 L655 220 L45 220 Z"
                fill="rgba(20,184,166,0.12)"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.45 }}
              />
              <motion.circle
                cx="655"
                cy="72"
                r="7"
                fill="#14B8A6"
                animate={{ r: [7, 11, 7], opacity: [1, 0.55, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </svg>
          </div>

          <div className="mt-6 grid grid-cols-3 border border-border">
            {[
              ["AUM", "$124.5M"],
              ["Investors", "1,847"],
              ["Liquidity", "24/7"],
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

        <div className="flex min-h-full flex-col bg-white">
          {[
            {
              icon: Link2,
              title: "Oracle Integration",
              text: "Connect to Chainlink or internal data feeds to update token prices automatically as underlying asset values change.",
            },
            {
              icon: RefreshCw,
              title: "24/7 Liquidity",
              text: "Allow LPs to subscribe or redeem at the current NAV instantly, without waiting for end-of-quarter windows.",
            },
            {
              icon: BarChart3,
              title: "Transparent Reporting",
              text: "Give investors a live view of their holdings' value, 24/7. No more waiting for monthly statements.",
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
                className="group flex flex-1 gap-5 border-b border-border p-7 transition-colors hover:bg-slate-50 last:border-b-0"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-border text-accent transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                  <Icon size={22} />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-black uppercase tracking-tight text-ink">
                    {item.title}
                  </h3>
                  <p className="text-md leading-relaxed text-ink-muted">{item.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);
