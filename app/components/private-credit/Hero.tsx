"use client";

import { motion } from "motion/react";
import { ArrowDown, ArrowRight, Landmark, Repeat2, Wallet } from "lucide-react";
import { fadeUp, forceHomeNavigation, HoverTextSwap } from "../evergreen/shared";

const titleWords = ["Syndicate", "Loans", "On-Chain.", "Service", "Off-Chain."];

const Downlink = ({ delay = 0, height = "h-7" }: { delay?: number; height?: string }) => (
  <div className={`relative mx-auto my-4 w-px ${height} bg-accent/10`}>
    <motion.span
      className="absolute left-1/2 top-0 h-5 w-px -translate-x-1/2 bg-[#31d6c7]"
      animate={{ y: ["-10%", "150%"], opacity: [0, 1, 0] }}
      transition={{ duration: 1.65, repeat: Infinity, delay, ease: "easeInOut" }}
    />
    <ArrowDown className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[#31d6c7]" size={18} />
  </div>
);

const CreditArchitecture = () => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    className="relative mx-auto w-full max-w-3xl overflow-hidden border border-border bg-white p-5 text-center shadow-[0_30px_80px_rgba(10,17,40,0.12)]"
  >
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(30,58,138,0.08),transparent_38%),radial-gradient(circle_at_50%_62%,rgba(30,58,138,0.06),transparent_32%)]" />
    <div className="relative">
      <div className="mb-4 flex items-center justify-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-ink-muted">
        <span className="h-2 w-2 rounded-full bg-[#5aa7ff] shadow-[0_0_14px_rgba(90,167,255,0.9)]" />
        On-Chain Layer
      </div>

      <div className="grid grid-cols-3 gap-3">
        {["LP Wallet", "LP Wallet", "LP Wallet"].map((label, index) => (
          <motion.div
            key={`${label}-${index}`}
            className="relative overflow-hidden border border-accent/35 bg-accent/10 p-3 text-center shadow-[0_14px_34px_rgba(30,58,138,0.08)]"
          >
            <Wallet className="mx-auto mb-2 text-accent" size={18} />
            <div className="text-xs font-black uppercase tracking-tight text-ink">{label}</div>
            <div className="mx-auto mt-1 inline-flex rounded-full bg-white px-2.5 py-0.5 font-mono text-[9px] uppercase text-ink-muted">
              USDC
            </div>
          </motion.div>
        ))}
      </div>

      <div className="relative">
        <Downlink />
      </div>

      <motion.div
        className="relative overflow-hidden bg-accent p-4 text-center text-white shadow-[0_0_48px_rgba(30,58,138,0.28)]"
      >
        <div className="text-xs font-black uppercase tracking-tight">Syndication Smart Contract</div>
        <div className="relative mt-2 overflow-hidden rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white/75">
          <span className="relative">Aggregated Liquidity Pool</span>
        </div>
      </motion.div>

      <Downlink delay={0.4} height="h-8" />

      <motion.div
        className="mx-auto max-w-xs bg-ink p-4 text-center shadow-[0_0_42px_rgba(10,17,40,0.18)]"
      >
        <div className="mb-2 inline-flex rounded-full bg-[#31d6c7] px-4 py-0.5 text-[10px] font-black uppercase tracking-[0.12em] text-white shadow-[0_0_22px_rgba(49,214,199,0.42)]">
          Bridge Layer
        </div>
        <div className="flex items-center justify-center gap-2 text-sm font-bold text-white">
          <Repeat2 size={16} />
          Fiat Gateway / Servicer API
        </div>
      </motion.div>

      <Downlink delay={0.75} />

      <div className="mt-4 flex items-center justify-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-ink-muted">
        <span className="h-2 w-2 rounded-full bg-ink-muted" />
        Off-Chain Layer
      </div>
      <motion.div
        className="mt-3 flex items-center justify-center gap-3 border border-border bg-slate-50 p-4 text-center text-ink"
      >
        <div className="flex h-11 w-11 items-center justify-center bg-white text-accent">
          <Landmark size={21} />
        </div>
        <div>
          <div className="text-base font-black uppercase tracking-tight">Real World Borrower</div>
          <div className="mt-1 inline-flex bg-white px-2.5 py-0.5 text-xs text-ink-muted">Receives Fiat</div>
        </div>
      </motion.div>
    </div>
  </motion.div>
);

export const PrivateCreditHero = () => (
  <section className="relative overflow-hidden border-b border-border bg-white pt-28 text-ink">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_26%,rgba(30,58,138,0.08),transparent_32%)]" />

    <div className="custom-container relative grid grid-cols-1 items-center gap-12 py-20 md:py-24 lg:grid-cols-[1fr_1fr]">
      <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.1 }}>
        <motion.div variants={fadeUp} className="mb-7 inline-flex border border-accent/30 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-accent">
          Solution: Private Credit Syndication
        </motion.div>
        <motion.h1 className="text-display text-[clamp(48px,8.0vw,60px)] mb-6 mt-1">
          {titleWords.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              className="mr-[0.16em] inline-block overflow-hidden align-bottom"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.65, delay: 0.16 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>
        <motion.p variants={fadeUp} className="mb-8 max-w-3xl text-lg leading-relaxed text-ink-muted md:text-xl">
          The most efficient way to manage your LP capital stack. Aggregate liquidity on-chain, deploy fiat to borrowers, and automate yield distribution back to investors instantly.
        </motion.p>
        <motion.a
          href="/#cta"
          initial="rest"
          whileHover="hover"
          animate="rest"
          onClick={(event) => forceHomeNavigation(event, "/#cta")}
          className="inline-flex h-14 items-center gap-3 bg-ink px-8 text-xs font-black uppercase tracking-[0.14em] text-white transition-colors hover:bg-ink/90"
        >
          <HoverTextSwap text="Streamline LP Distributions" />
          <ArrowRight size={16} />
        </motion.a>
      </motion.div>
      <CreditArchitecture />
    </div>
  </section>
);
