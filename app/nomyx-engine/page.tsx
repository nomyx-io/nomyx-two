"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Zap,
  Users,
  ShieldCheck,
  RefreshCw,
  ArrowRight,
  XCircle,
  CheckCircle2,
  Lock,
  Gem,
  Vote,
  Table2,
  KeyRound,
  Code2,
  Terminal,
} from "lucide-react";
import { CustomCursor, Navbar, Footer } from "@/app/home";
import { AnimatedButton } from "@/app/components/evergreen/shared";

const stages = [
  { icon: Zap, label: "Minted", date: "Jan 1" },
  { icon: Users, label: "Distribution", date: "Feb 1" },
  { icon: ShieldCheck, label: "Compliance Upgrade", date: "Mar 1" },
  { icon: RefreshCw, label: "Dividend Payout", date: "Apr 1" },
];

/* ── Animated lifecycle visual (right column) ── */
const EngineVisual = () => {
  const [active, setActive] = useState(1);

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % 4), 3000);
    return () => clearInterval(id);
  }, []);

  // Circle centers in SVG coordinate space (viewBox 380×360)
  const nodes = [
    { x: 95,  y: 65 },   // Minted
    { x: 285, y: 65 },   // Distribution
    { x: 95,  y: 295 },  // Compliance Upgrade
    { x: 285, y: 295 },  // Dividend Payout
  ];

  // S-path: line exits from circle sides, curves via right & left edges
  const svgPath =
    `M${nodes[0].x} ${nodes[0].y} H${nodes[1].x}` +               // top row horizontal
    ` C370 ${nodes[1].y}, 370 180, ${nodes[1].x} 180` +            // right-edge curve down
    ` H${nodes[2].x}` +                                             // middle horizontal left
    ` C10 180, 10 ${nodes[2].y}, ${nodes[2].x} ${nodes[2].y}` +    // left-edge curve down
    ` H${nodes[3].x}`;                                              // bottom row horizontal

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.35 }}
      className="w-full max-w-145 mx-auto lg:ml-auto lg:mr-0"
    >
      <div className="relative rounded-[40px] border border-[#0A112808] bg-white p-10 shadow-[0_32px_84px_rgba(10,17,40,0.06)] md:p-12">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between px-2">
          <span className="text-[13px] font-extrabold uppercase tracking-[0.16em] text-ink-muted">
            Asset Lifecycle Dashboard
          </span>
          <div className="flex items-center gap-2 text-[13px] font-extrabold uppercase tracking-[0.12em] text-[#10B981]">
            <span className="h-2 w-2 rounded-full bg-[#10B981]" />
            Active
          </div>
        </div>

        {/* Timeline Visual — 380×360 coordinate space, 1:1 scale */}
        <div className="relative mx-auto w-full max-w-95" style={{ aspectRatio: "380 / 400" }}>
          {/* Path SVG — aligned to top */}
          <svg
            className="absolute top-0 left-0 w-full pointer-events-none"
            viewBox="0 0 380 360"
            style={{ height: "90%" }}
            preserveAspectRatio="xMidYMin meet"
            fill="none"
          >
            <path d={svgPath} stroke="#E8EDF2" strokeWidth="2" strokeLinecap="round" fill="none" />
            <motion.path
              d={svgPath}
              stroke="#1E3A8A"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{
                pathLength: active === 0 ? 0.08 : active === 1 ? 0.28 : active === 2 ? 0.72 : 1,
              }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </svg>

          {/* Nodes — circle center anchored at SVG coordinate, text hangs below */}
          {stages.map((stage, i) => {
            const Icon = stage.icon;
            const isReached = i <= active;
            const isActive = i === active;
            const n = nodes[i];

            return (
              <div
                key={stage.label}
                className="absolute"
                style={{
                  left: `${(n.x / 380) * 100}%`,
                  top: `${(n.y / 400) * 100}%`,
                  transform: "translate(-50%, -36px)",
                }}
              >
                {/* Circle — 72px, center sits exactly on path line */}
                <div className="relative z-10">
                  <motion.div
                    animate={{
                      backgroundColor: isReached ? "#1E3A8A" : "#F1F5F9",
                      boxShadow: isReached
                        ? "0 8px 24px rgba(30,58,138,0.22)"
                        : "0 2px 8px rgba(10,17,40,0.04)",
                    }}
                    transition={{ duration: 0.5 }}
                    className="flex h-18 w-18 items-center justify-center rounded-full"
                  >
                    <Icon size={26} strokeWidth={1.8} className={isReached ? "text-white" : "text-[#94A3B8]"} />
                  </motion.div>
                </div>

                {/* Label + date — sits below circle, clear of the path */}
                <div className="mt-3 text-center whitespace-nowrap">
                  <p className={`text-[15px] font-black tracking-tight leading-tight ${isReached ? "text-ink" : "text-[#94A3B8]"}`}>
                    {stage.label}
                  </p>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#B0BAC9]">
                    {stage.date}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

/* ── Hero ── */
const EngineHero = () => (
  <section className="relative pt-32 pb-14 md:pt-40 md:pb-24 overflow-hidden bg-[#F2F9FF]">
    <div className="custom-container relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-10 items-center">
        {/* Left — text */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="eyebrow px-5 py-2.5 rounded-full border border-ink/10 bg-white/50 inline-block">
              The Tokenization Engine
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="section-heading mb-8"
          >
            The Operating System <br className="hidden md:block" /> For Digital Assets.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="prgraphs mb-12 max-w-2xl"
          >
            Issue, manage, and distribute compliant assets with a purpose-built smart
            contract factory. Zero technical debt. Infinite upgradability. Take advantage of the
            world&apos;s most advanced smart contract technology inside a system that&apos;s simple
            enough for anyone at your firm to use.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <AnimatedButton
              text="Explore the Engine"
              href="https://calendly.com/ivan-j-nomyx"
              variant="accent"
            />
          </motion.div>
        </div>

        {/* Right — visual (re-using the improved EngineVisual) */}
        <div className="flex justify-center lg:justify-end">
          <EngineVisual />
        </div>
      </div>
    </div>
  </section>
);

/* ── Deploy Once section ── */
const DeployOnce = () => {
  return (
    <section className="border-b border-border section-padding overflow-hidden bg-white">
      <div className="custom-container">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="section-heading mb-4">
            Deploy Once. Upgrade Forever.
          </h2>
          <p className="text-base md:text-lg text-ink-muted max-w-2xl mx-auto leading-relaxed">
            Solving the &quot;Immutability Paradox&quot; with EIP-2535 Diamond
            Proxies.
          </p>
        </motion.div>

        {/* Two-panel comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* ── LEFT: The Problem ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col rounded-4xl border border-slate-200 bg-white shadow-sm overflow-hidden"
          >
            {/* Text Section */}
            <div className="bg-slate-50 p-6 md:p-8 border-b border-slate-100 flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <Lock size={18} className="text-red-500" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight text-ink">
                  The Problem
                </h3>
              </div>
              <p className="text-sm md:text-base text-slate-500 leading-relaxed font-medium">
                Financial institutions rely on flexibility in their assets to
                maintain compliance in an evolving regulatory environment.
                However, traditional smart contracts are immutable. If
                regulations change, you have to migrate tokens — a security
                nightmare.
              </p>
            </div>

            {/* Visual Box */}
            <div className="p-6 md:p-8 bg-white">
              {/* Mini contract card */}
              <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-6 shadow-sm">
                <div className="w-12 h-12 bg-white border border-slate-100 rounded-xl flex items-center justify-center shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                  <Lock size={20} className="text-slate-400" />
                </div>
                <div className="flex-1">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                    Traditional Smart Contracts
                  </div>
                  <div className="flex gap-2.5">
                    <div className="h-2 w-20 bg-slate-200 rounded-full" />
                    <div className="h-2 w-12 bg-slate-200 rounded-full" />
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                  <XCircle size={18} className="text-red-500" />
                </div>
              </div>

              {/* Limitation badges */}
              <div className="space-y-3">
                {[
                  "Cannot be modified after deployment",
                  "Must be completely replaced if changes arise",
                  "Cannot reference live data",
                ].map((text) => (
                  <div key={text} className="flex items-start gap-3">
                    <XCircle
                      size={18}
                      className="text-red-400 shrink-0 mt-0.5"
                    />
                    <span className="text-sm font-medium text-slate-600 leading-snug">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: The Solution ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col rounded-4xl border border-accent/20 bg-white shadow-[0_8px_40px_rgba(30,58,138,0.06)] overflow-hidden relative"
          >
            {/* Subtle glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-3xl rounded-full pointer-events-none" />

            {/* Text Section */}
            <div className="bg-accent/3 p-6 md:p-8 border-b border-accent/10 flex-1 relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <Gem size={18} className="text-accent" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight text-ink">
                  The Solution
                </h3>
              </div>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed font-medium">
                Nomyx created something better, a flexible platform to match the
                flexibility that financial institutions need. Nomyx Engine
                separates the asset state from the logic. You can upgrade
                compliance modules or yield calculators instantly without moving
                a single token.
              </p>
            </div>

            {/* Visual Box */}
            <div className="p-6 md:p-8 bg-white relative z-10">
              {/* Mini proxy card */}
              <div className="flex items-center gap-4 bg-accent/2 border border-accent/20 rounded-2xl p-5 mb-6 shadow-sm">
                <div className="w-12 h-12 bg-white border border-accent/10 rounded-xl flex items-center justify-center shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                  <Gem size={20} className="text-accent" />
                </div>
                <div className="flex-1">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2">
                    Diamond Proxy Upgradeable Smart Contracts
                  </div>
                  <div className="flex gap-2.5">
                    <div className="h-2 w-20 bg-accent/20 rounded-full" />
                    <div className="h-2 w-12 bg-accent/10 rounded-full" />
                  </div>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0"
                >
                  <CheckCircle2 size={18} className="text-emerald-500" />
                </motion.div>
              </div>

              {/* Benefit badges */}
              <div className="space-y-3">
                {[
                  "Keeps underlying data protected",
                  "Can be modified to match regulatory changes",
                ].map((text) => (
                  <div key={text} className="flex items-start gap-3">
                    <CheckCircle2
                      size={18}
                      className="text-emerald-500 shrink-0 mt-0.5"
                    />
                    <span className="text-sm font-bold text-slate-700 leading-snug">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ── Automate the Asset Lifecycle ── */
const lifecycleCards = [
  {
    icon: RefreshCw,
    title: "Distributions",
    desc: "Automate USDC dividend or interest payments to thousands of holders.",
  },
  {
    icon: Vote,
    title: "Voting & Governance",
    desc: "Execute on-chain proxy voting for board resolutions.",
  },
  {
    icon: Table2,
    title: "Cap Table Management",
    desc: "Real-time reconciliation of transfers and ownership stakes.",
  },
  {
    icon: KeyRound,
    title: "Recovery & Reissue",
    desc: "Burn and reissue lost tokens securely (Lost Key Recovery).",
  },
];

const AssetLifecycle = () => (
  <section className="bg-[#FAFAFA] section-padding pt-0">
    <div className="custom-container">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14 md:mb-20"
      >
        <h2 className="section-heading mb-5">Automate the Asset Lifecycle.</h2>
        <p className="prgraphs max-w-2xl mx-auto">
          Tokenization isn&apos;t just about day one. It&apos;s about day two,
          three, and four hundred.
        </p>
      </motion.div>

      {/* Merged Cards Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-border rounded-3xl overflow-hidden bg-white"
      >
        {lifecycleCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className={`p-10 md:p-12 flex flex-col items-start transition-colors hover:bg-[#F2F9FF]/30
                ${i !== lifecycleCards.length - 1 ? 'lg:border-r border-border' : ''}
                ${i < 2 ? 'md:border-b lg:border-b-0' : ''}
                ${i === 1 ? 'md:border-r-0 lg:border-r' : ''}
              `}
            >
              <div className="mb-10 text-[#2563EB]">
                <Icon size={40} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-black tracking-tight mb-3 text-ink">
                {card.title}
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                {card.desc}
              </p>
            </div>
          );
        })}
      </motion.div>
    </div>
  </section>
);

export default function NomyxEnginePage() {
  return (
    <div className="min-h-screen bg-white font-sans text-ink">
      <CustomCursor />
      <Navbar transparentInitially={true} hideBorder={true} />

      <main>
        <EngineHero />
        <DeployOnce />
        <AssetLifecycle />
        <FundLifecycle />
        <ApiFirst />
      </main>

      <Footer
        ctaTitle="Start your issuance on future-proof infrastructure."
        ctaDescription="Join the asset managers moving billions on-chain with Nomyx."
        ctaButtonText="Access Nomyx Engine"
        ctaButtonLink="https://calendly.com/ivan-j-nomyx"
      />
    </div>
  );
}

/* ── Complete Fund Lifecycle Management ── */
const fundBullets = [
  {
    title: "Issue Capital Calls",
    desc: "Launch and track capital calls with real-time commitment visibility across all LPs.",
    icon: Zap,
  },
  {
    title: "Collect LP Investments",
    desc: "Accept and reconcile investor subscriptions seamlessly with automated compliance checks.",
    icon: Users,
  },
  {
    title: "Manage Investor Registry",
    desc: "Maintain a compliant, real-time view of all stakeholders and their ownership positions.",
    icon: Table2,
  },
  {
    title: "Distribute Returns",
    desc: "Automate dividend payments, profit distributions, and capital returns at fund close.",
    icon: RefreshCw,
  },
];

/* Animated cycle visual — pure grid, no SVG alignment issues */
const LifecycleLoop = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % 4), 2000);
    return () => clearInterval(id);
  }, []);

  const nodes = [
    { label: "Issue", icon: Zap },
    { label: "Collect", icon: Users },
    { label: "Manage", icon: Table2 },
    { label: "Distribute", icon: RefreshCw },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="w-full max-w-110 mx-auto lg:ml-auto lg:mr-0"
    >
      <div className="relative">
        {/* Connector lines through the center gap */}
        {/* Vertical line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 border-l border-dashed border-border z-0" />
        {/* Horizontal line */}
        <div className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 border-t border-dashed border-border z-0" />

        {/* Center engine node */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <motion.div
            animate={{ scale: [1, 1.35, 1], opacity: [0.12, 0.04, 0.12] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-20 h-20 rounded-full bg-accent absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          />
          <div className="relative w-14 h-14 rounded-full bg-ink flex items-center justify-center shadow-[0_8px_24px_rgba(10,17,40,0.25)]">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Gem size={20} className="text-white" />
            </motion.div>
          </div>
        </div>

        {/* 2×2 card grid */}
        <div className="grid grid-cols-2 gap-12 md:gap-14 relative z-10">
          {nodes.map((node, i) => {
            const Icon = node.icon;
            const isActive = i === active;

            return (
              <motion.div
                key={node.label}
                animate={{
                  borderColor: isActive
                    ? "rgba(30,58,138,0.4)"
                    : "rgba(10,17,40,0.14)",
                  boxShadow: isActive
                    ? "0 8px 28px rgba(30,58,138,0.1)"
                    : "0 1px 4px rgba(10,17,40,0.03)",
                }}
                transition={{ duration: 0.3 }}
                className="bg-white border p-5 md:p-6 flex flex-col items-center text-center"
              >
                <motion.div
                  animate={{
                    backgroundColor: isActive ? "#1E3A8A" : "#F1F5F9",
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                >
                  <Icon
                    size={20}
                    strokeWidth={2}
                    style={{ color: isActive ? "#fff" : "#64748B" }}
                  />
                </motion.div>
                <span
                  className="text-xs font-bold uppercase tracking-widest transition-colors duration-300"
                  style={{ color: isActive ? "#0A1128" : "#94A3B8" }}
                >
                  {node.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

const FundLifecycle = () => (
  <section className="border-b border-border section-padding">
    <div className="custom-container">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left — text */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-heading mb-5">
            Complete Fund Lifecycle Management.
          </h2>
          <p className="text-base md:text-lg text-ink-muted leading-relaxed mb-9 max-w-xl">
            From capital formation to final distribution—manage every stage of
            your fund from a single dashboard.
          </p>

          <div className="space-y-6">
            {fundBullets.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                className="flex items-start gap-3.5"
              >
                <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={14} className="text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase tracking-tight mb-1">
                    {item.title}
                  </h4>
                  <p className="text-sm text-ink-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right — animated lifecycle loop */}
        <LifecycleLoop />
      </div>
    </div>
  </section>
);

/* ── API-First Architecture ── */
const graphqlCode = `mutation UpdateYieldRate {
  updateAssetParameter(
    assetId: "0xF4B1...",
    parameter: INTEREST_RATE,
    value: 5.0
  ) {
    success
    transactionHash
    newValue
  }
}`;

const ApiFirst = () => {
  const [activeTab, setActiveTab] = useState<"nocode" | "graphql">("nocode");

  return (
    <section className="bg-ink text-white border-b border-white/10 section-padding overflow-hidden">
      <div className="custom-container">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="section-heading text-white! mb-4">
            API-First Architecture.
          </h2>
          <p className="text-base md:text-lg text-white/60 max-w-xl mx-auto leading-relaxed">
            Built for operations teams to use, and engineering teams to extend.
          </p>
        </motion.div>

        {/* Mobile tab switcher */}
        <div className="flex justify-center mb-6 lg:hidden">
          <div className="inline-flex border border-white/10 p-1">
            <button
              onClick={() => setActiveTab("nocode")}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] transition-colors ${
                activeTab === "nocode"
                  ? "bg-white/10 text-white"
                  : "text-white/40"
              }`}
            >
              No-Code
            </button>
            <button
              onClick={() => setActiveTab("graphql")}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] transition-colors ${
                activeTab === "graphql"
                  ? "bg-white/10 text-white"
                  : "text-white/40"
              }`}
            >
              GraphQL
            </button>
          </div>
        </div>

        {/* Two panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* No-Code Interface */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`border border-white/10 bg-white/3 flex flex-col ${
              activeTab !== "nocode" ? "hidden lg:flex" : "flex"
            }`}
          >
            {/* Panel header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-400">
                No-Code Interface
              </span>
              <Terminal size={14} className="text-white/30" />
            </div>

            {/* Form */}
            <div className="p-5 md:p-7 flex-1 flex flex-col">
              <div className="mb-5">
                <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-white/40 mb-2">
                  Action Type
                </label>
                <div className="border border-white/10 bg-white/4 px-4 py-3 text-sm font-semibold text-white">
                  Set Interest Rate
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-white/40 mb-2">
                  New Rate (%)
                </label>
                <div className="flex items-center border border-white/10 bg-white/4 px-4 py-3">
                  <span className="text-sm font-semibold text-white flex-1">
                    5.00
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">
                    Annual
                  </span>
                </div>
              </div>

              <div className="mt-auto">
                <motion.div
                  whileInView={{ opacity: [0.7, 1] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="w-full bg-emerald-500 text-center py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white"
                >
                  Execute Action
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* GraphQL Mutation */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`border border-white/10 bg-white/3 flex flex-col ${
              activeTab !== "graphql" ? "hidden lg:flex" : "flex"
            }`}
          >
            {/* Panel header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-sky-400">
                GraphQL Mutation
              </span>
              <Code2 size={14} className="text-white/30" />
            </div>

            {/* Code */}
            <div className="p-5 md:p-7 flex-1">
              <pre className="font-mono text-[13px] leading-[1.8] text-white/70 overflow-x-auto">
                <code>
                  {graphqlCode.split("\n").map((line, i) => (
                    <div key={i} className="flex">
                      <span className="w-6 shrink-0 text-white/20 select-none text-right mr-4">
                        {i + 1}
                      </span>
                      <span>
                        {line.includes("mutation") ||
                        line.includes("updateAssetParameter") ? (
                          <span className="text-sky-400">{line}</span>
                        ) : line.includes('"') ? (
                          <span>
                            {line.split('"').map((part, j) =>
                              j % 2 === 1 ? (
                                <span key={j} className="text-emerald-400">
                                  &quot;{part}&quot;
                                </span>
                              ) : (
                                <span key={j}>{part}</span>
                              ),
                            )}
                          </span>
                        ) : (
                          line
                        )}
                      </span>
                    </div>
                  ))}
                </code>
              </pre>
            </div>
          </motion.div>
        </div>

        {/* Footer tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center text-sm text-white/40 mt-8 tracking-wide"
        >
          Same action. Two interfaces. Complete flexibility.
        </motion.p>
      </div>
    </section>
  );
};
