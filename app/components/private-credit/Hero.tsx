"use client";

import { motion } from "motion/react";
import { ArrowDown, ArrowRight, Landmark, Repeat2, Wallet } from "lucide-react";
import { fadeUp, forceHomeNavigation, HoverTextSwap } from "../evergreen/shared";

const titleWords = ["Syndicate", "Loans", "On-Chain.", "Service", "Off-Chain."];

const FlowParticle = ({
  className,
  delay = 0,
}: {
  className: string;
  delay?: number;
}) => (
  <motion.span
    className={`absolute z-20 h-2.5 w-2.5 rounded-full bg-[#31d6c7] shadow-[0_0_18px_rgba(49,214,199,0.95)] ${className}`}
    animate={{ y: [0, 46], opacity: [0, 1, 0] }}
    transition={{ duration: 2.2, repeat: Infinity, delay, ease: "easeInOut" }}
  />
);

const Downlink = ({ delay = 0, height = "h-14" }: { delay?: number; height?: string }) => (
  <div className={`relative mx-auto my-7 w-px ${height} bg-accent/10`}>
    <motion.span
      className="absolute left-1/2 top-0 h-8 w-px -translate-x-1/2 bg-[#31d6c7]"
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
    className="relative overflow-hidden border border-border bg-white p-8 shadow-[0_30px_80px_rgba(10,17,40,0.12)]"
  >
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(30,58,138,0.08),transparent_38%),radial-gradient(circle_at_50%_62%,rgba(30,58,138,0.06),transparent_32%)]" />
    <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(#0A1128_1px,transparent_1px),linear-gradient(90deg,#0A1128_1px,transparent_1px)] [background-size:34px_34px]" />
    <motion.div
      className="absolute -right-16 -top-16 h-40 w-40 rotate-45 border border-accent/10"
      animate={{ rotate: [45, 64, 45], opacity: [0.35, 0.75, 0.35] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    />

    <div className="relative">
      <div className="mb-5 flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-ink-muted">
        <span className="h-2 w-2 rounded-full bg-[#5aa7ff] shadow-[0_0_14px_rgba(90,167,255,0.9)]" />
        On-Chain Layer
      </div>

      <div className="grid grid-cols-3 gap-4">
        {["LP Wallet", "LP Wallet", "LP Wallet"].map((label, index) => (
          <motion.div
            key={`${label}-${index}`}
            className="group relative overflow-hidden border border-accent/40 bg-accent/10 p-4 text-center shadow-[0_0_28px_rgba(30,58,138,0.12)]"
            animate={{
              y: [0, -6, 0],
              boxShadow: [
                "0 0 18px rgba(90,167,255,0.16)",
                "0 0 34px rgba(90,167,255,0.34)",
                "0 0 18px rgba(90,167,255,0.16)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, delay: index * 0.25 }}
            whileHover={{ y: -10, scale: 1.03 }}
          >
            <motion.span
              className="absolute inset-y-0 -left-1/2 w-1/2 bg-white/20 blur-md"
              animate={{ x: ["0%", "320%"] }}
              transition={{ duration: 3.2, repeat: Infinity, delay: index * 0.35 }}
            />
            <Wallet className="mx-auto mb-3 text-accent" size={20} />
            <div className="text-sm font-black uppercase tracking-tight text-ink">{label}</div>
            <div className="mx-auto mt-2 inline-flex rounded-full bg-white px-3 py-1 font-mono text-[10px] uppercase text-ink-muted">
              USDC
            </div>
          </motion.div>
        ))}
      </div>

      <div className="relative">
        <Downlink />
        <FlowParticle className="left-[18%] top-2" />
        <FlowParticle className="left-1/2 top-2" delay={0.35} />
        <FlowParticle className="right-[18%] top-2" delay={0.7} />
      </div>

      <motion.div
        className="relative overflow-hidden bg-accent p-6 text-center text-white shadow-[0_0_48px_rgba(30,58,138,0.28)]"
        animate={{
          boxShadow: [
            "0 0 28px rgba(66,122,230,0.24)",
            "0 0 58px rgba(66,122,230,0.48)",
            "0 0 28px rgba(66,122,230,0.24)",
          ],
        }}
        transition={{ duration: 3.6, repeat: Infinity }}
      >
        <motion.span
          className="absolute inset-y-0 -left-1/3 w-1/3 bg-white/16 blur-xl"
          animate={{ x: ["0%", "430%"] }}
          transition={{ duration: 3.8, repeat: Infinity }}
        />
        <div className="text-sm font-black uppercase tracking-tight">Syndication Smart Contract</div>
        <div className="relative mt-3 overflow-hidden rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white/75">
          <motion.span
            className="absolute inset-y-0 left-0 bg-white/10"
            animate={{ width: ["12%", "100%", "12%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="relative">Aggregated Liquidity Pool</span>
        </div>
      </motion.div>

      <Downlink delay={0.4} height="h-16" />

      <motion.div
        className="mx-auto max-w-xs bg-ink p-5 text-center shadow-[0_0_42px_rgba(10,17,40,0.18)]"
        whileHover={{ scale: 1.03 }}
      >
        <div className="mb-3 inline-flex rounded-full bg-[#31d6c7] px-5 py-1 text-xs font-black uppercase tracking-[0.12em] text-white shadow-[0_0_22px_rgba(49,214,199,0.42)]">
          Bridge Layer
        </div>
        <div className="flex items-center justify-center gap-3 font-bold text-white">
          <Repeat2 size={18} />
          Fiat Gateway / Servicer API
        </div>
      </motion.div>

      <Downlink delay={0.75} />

      <div className="mt-8 flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-ink-muted">
        <span className="h-2 w-2 rounded-full bg-ink-muted" />
        Off-Chain Layer
      </div>
      <motion.div
        className="mt-4 flex items-center gap-4 border border-border bg-slate-50 p-5 text-ink"
        animate={{ opacity: [0.86, 1, 0.86] }}
        transition={{ duration: 3.5, repeat: Infinity }}
      >
        <div className="flex h-14 w-14 items-center justify-center bg-white text-accent">
          <Landmark size={24} />
        </div>
        <div>
          <div className="text-lg font-black uppercase tracking-tight">Real World Borrower</div>
          <div className="mt-1 inline-flex bg-white px-3 py-1 text-sm text-ink-muted">Receives Fiat</div>
        </div>
      </motion.div>
    </div>
  </motion.div>
);

export const PrivateCreditHero = () => (
  <section className="relative overflow-hidden border-b border-border bg-white pt-28 text-ink">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_26%,rgba(30,58,138,0.08),transparent_32%)]" />
    <div className="absolute inset-0 opacity-[0.055] [background-image:linear-gradient(#0A1128_1px,transparent_1px),linear-gradient(90deg,#0A1128_1px,transparent_1px)] [background-size:56px_56px]" />
    <motion.div
      className="absolute left-[8%] top-36 h-44 w-44 rotate-12 border border-accent/15"
      animate={{ rotate: [12, 22, 12], y: [0, 14, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute bottom-20 right-[4%] h-32 w-32 -rotate-6 border border-accent/15"
      animate={{ rotate: [-6, -18, -6], y: [0, -12, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    />

    <div className="custom-container relative grid grid-cols-1 items-center gap-12 py-20 md:py-24 lg:grid-cols-[1fr_1fr]">
      <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.1 }}>
        <motion.div variants={fadeUp} className="mb-7 inline-flex border border-accent/30 bg-accent/5 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-accent">
          Solution: Private Credit Syndication
        </motion.div>
        <motion.h1 className="mb-6 max-w-4xl font-black leading-[0.94] tracking-tight text-ink text-[clamp(48px,6.2vw,88px)]">
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
