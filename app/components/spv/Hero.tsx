"use client";

import { motion } from "motion/react";
import { ArrowRight, Check, FileCheck2, Users } from "lucide-react";
import { fadeUp, forceHomeNavigation, HoverTextSwap } from "../evergreen/shared";

const titleWords = ["Compliant", "SPVs", "In", "Hours."];

const DealFlowSvg = () => (
  <motion.svg
    viewBox="0 0 520 320"
    className="mx-auto w-full max-w-xl"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.65, delay: 0.2 }}
  >
    <defs>
      <filter id="spvGlow">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <rect x="46" y="78" width="110" height="72" fill="#fff" stroke="#1E3A8A" strokeWidth="3" />
    <rect x="205" y="52" width="110" height="72" fill="#fff" stroke="#0A1128" strokeWidth="3" />
    <rect x="364" y="104" width="110" height="72" fill="#fff" stroke="#1E3A8A" strokeWidth="3" />
    <rect x="205" y="206" width="110" height="72" fill="#0A1128" stroke="#0A1128" strokeWidth="3" />
    <path d="M156 114 H205" stroke="#1E3A8A" strokeWidth="3" strokeDasharray="8 8" />
    <path d="M315 88 C348 88 348 140 364 140" stroke="#1E3A8A" strokeWidth="3" strokeDasharray="8 8" fill="none" />
    <path d="M419 176 C419 240 315 240 315 242" stroke="#1E3A8A" strokeWidth="3" strokeDasharray="8 8" fill="none" />
    <path d="M205 242 C132 242 101 150 101 150" stroke="#1E3A8A" strokeWidth="3" strokeDasharray="8 8" fill="none" />
    {[
      [156, 114, 205, 114],
      [315, 88, 364, 140],
      [419, 176, 315, 242],
      [205, 242, 101, 150],
    ].map(([x1, y1, x2, y2], index) => (
      <motion.circle
        key={`${x1}-${y1}`}
        r="7"
        fill={index % 2 ? "#0A1128" : "#1E3A8A"}
        filter="url(#spvGlow)"
        animate={{ cx: [x1, x2], cy: [y1, y2], opacity: [0.2, 1, 0.2] }}
        transition={{ duration: 2.2, repeat: Infinity, delay: index * 0.4, ease: "easeInOut" }}
      />
    ))}
    {[
      ["LPs", 101, 118],
      ["Docs", 260, 92],
      ["SPV", 419, 145],
      ["Tokens", 260, 248],
    ].map(([label, x, y]) => (
      <text key={label} x={x} y={y} textAnchor="middle" fontSize="15" fontWeight="800" fill={label === "Tokens" ? "#fff" : "#0A1128"}>
        {label}
      </text>
    ))}
  </motion.svg>
);

const FundingCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.55, delay: 0.18 }}
    className="border border-border bg-white shadow-[0_30px_80px_rgba(10,17,40,0.12)]"
  >
    <div className="border-b border-border p-6">
      <div className="mb-5 flex items-start justify-between gap-6">
        <div>
          <h3 className="text-2xl font-black uppercase tracking-tight text-ink">Project Alpha Series B</h3>
          <p className="text-sm font-semibold text-ink-muted">Status: Raising</p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-black text-accent">85%</div>
          <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">Filled</div>
        </div>
      </div>
      <div className="h-2 overflow-hidden bg-slate-100">
        <motion.div
          className="h-full bg-accent"
          initial={{ width: "0%" }}
          animate={{ width: "85%" }}
          transition={{ duration: 1.1, delay: 0.35, ease: "easeOut" }}
        />
      </div>
      <div className="mt-5 grid grid-cols-2 text-sm">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">Target</div>
          <div className="font-black text-ink">$5.0M</div>
        </div>
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">Committed</div>
          <div className="font-black text-ink">$4.25M</div>
        </div>
      </div>
    </div>
    <motion.a
      href="/#cta"
      initial="rest"
      whileHover="hover"
      animate="rest"
      onClick={(event) => forceHomeNavigation(event, "/#cta")}
      className="flex h-16 items-center justify-between bg-ink px-6 text-sm font-black uppercase tracking-[0.12em] text-white transition-colors hover:bg-accent"
    >
      <HoverTextSwap text="Close Round & Mint Tokens" />
      <ArrowRight size={18} />
    </motion.a>
  </motion.div>
);

export const SpvHero = () => (
  <section className="relative overflow-hidden border-b border-border bg-white pt-28">
    <div className="absolute inset-0 opacity-[0.055] [background-image:linear-gradient(#0A1128_1px,transparent_1px),linear-gradient(90deg,#0A1128_1px,transparent_1px)] [background-size:54px_54px]" />
    <motion.div
      className="absolute left-[7%] top-32 h-32 w-32 border border-accent/15"
      animate={{ rotate: [0, 8, 0], y: [0, 12, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    />
    <div className="custom-container relative grid grid-cols-1 items-center gap-12 py-20 md:py-24 lg:grid-cols-[1.05fr_0.95fr]">
      <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.1 }}>
        <motion.div variants={fadeUp} className="mb-7 inline-flex border border-accent/30 bg-accent/5 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-accent">
          Solution: Deal-By-Deal Structuring
        </motion.div>
        <motion.h1 className="text-display mb-6 max-w-4xl text-[clamp(50px,6.6vw,96px)] text-ink">
          {titleWords.map((word, index) => (
            <motion.span
              key={word}
              className="mr-[0.18em] inline-block overflow-hidden align-bottom"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.65, delay: 0.16 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>
        <motion.p variants={fadeUp} className="mb-8 max-w-3xl text-lg leading-relaxed text-ink-muted md:text-xl">
          The fastest way to syndicate deals. Automate capital formation, cap table management, and carry distribution for single-asset vehicles.
        </motion.p>
        <motion.a
          href="/#cta"
          initial="rest"
          whileHover="hover"
          animate="rest"
          onClick={(event) => forceHomeNavigation(event, "/#cta")}
          className="inline-flex h-14 items-center gap-3 bg-ink px-8 text-xs font-black uppercase tracking-[0.14em] text-white transition-colors hover:bg-accent"
        >
          <HoverTextSwap text="Start Your Syndication" />
          <ArrowRight size={16} />
        </motion.a>
      </motion.div>
      <div className="space-y-6">
        <FundingCard />
        <div className="border border-border bg-white p-5">
          <DealFlowSvg />
        </div>
      </div>
    </div>
  </section>
);

