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

const stages = [
  { icon: Zap, label: "Minted", date: "Jan 1" },
  { icon: Users, label: "Distribution", date: "Feb 1" },
  { icon: ShieldCheck, label: "Compliance Upgrade", date: "Mar 1" },
  { icon: RefreshCw, label: "Dividend Payout", date: "Apr 1" },
];

/* ── Animated lifecycle visual (right column) ── */
const EngineVisual = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % 4), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.35 }}
      className="w-full max-w-[520px] mx-auto lg:ml-auto lg:mr-0"
    >
      {/* Card */}
      <div className="border border-border bg-white shadow-[0_24px_64px_rgba(10,17,40,0.07)] p-7 md:p-9">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink-muted">
            Asset Lifecycle Dashboard
          </span>
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-emerald-600"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Active
          </motion.span>
        </div>

        {/* Timeline */}
        <div className="relative px-2">
          {/* Track */}
          <div className="absolute top-7 left-[calc(12.5%)] right-[calc(12.5%)] h-px bg-border" />

          {/* Progress fill */}
          <motion.div
            className="absolute top-7 left-[calc(12.5%)] h-[2px] bg-accent origin-left"
            animate={{
              width: `${(active / 3) * 75}%`,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />

          {/* Nodes */}
          <div className="relative grid grid-cols-4 gap-0">
            {stages.map((stage, i) => {
              const Icon = stage.icon;
              const reached = i <= active;

              return (
                <div key={stage.label} className="flex flex-col items-center">
                  {/* Circle */}
                  <div className="relative mb-3">
                    {/* Pulse ring */}
                    {i === active && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-accent"
                        animate={{ scale: [1, 1.7], opacity: [0.5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                    <motion.div
                      animate={{
                        backgroundColor: reached ? "#1E3A8A" : "#F1F5F9",
                        scale: i === active ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                      className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center"
                      style={{
                        boxShadow: reached
                          ? "0 6px 20px rgba(30,58,138,0.3)"
                          : "0 1px 4px rgba(10,17,40,0.06)",
                      }}
                    >
                      <Icon
                        size={20}
                        strokeWidth={2}
                        color={reached ? "#fff" : "#94A3B8"}
                      />
                    </motion.div>
                  </div>

                  {/* Label */}
                  <span
                    className="text-[11px] font-bold text-center leading-tight mb-0.5 transition-colors duration-300"
                    style={{ color: reached ? "#0A1128" : "#94A3B8" }}
                  >
                    {stage.label}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-ink-muted/50">
                    {stage.date}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Terminal footer */}
        <div className="mt-8 bg-ink p-4 font-mono text-[11px] leading-relaxed">
          <div className="flex items-center gap-2 mb-1 text-white/70">
            <span className="text-emerald-400">●</span>
            LIFECYCLE_ENGINE_ACTIVE
          </div>
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white/45"
          >
            current_stage: {stages[active].label.toLowerCase().replace(/ /g, "_")} | next:{" "}
            {stages[(active + 1) % 4].label.toLowerCase().replace(/ /g, "_")}
          </motion.div>
        </div>
      </div>

      {/* Shadow decorations */}
      <div className="mx-4 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent mt-[-1px]" />
      <div className="mx-10 h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent" />
    </motion.div>
  );
};

/* ── Hero ── */
const EngineHero = () => (
  <section className="relative pt-32 pb-14 md:pt-40 md:pb-20 border-b border-border overflow-hidden">
    {/* Dot pattern */}
    <div
      className="absolute inset-0 opacity-[0.02] pointer-events-none"
      style={{
        backgroundImage: "radial-gradient(circle, #0A1128 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    />

    <div className="custom-container relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-10 items-center">
        {/* Left — text */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-flex border-2 border-accent px-5 py-2.5 text-sm font-bold uppercase tracking-[0.12em] text-accent">
              The Tokenization Engine
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="section-heading mb-7"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
          >
            The Operating System for Digital Assets.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-base md:text-lg text-ink-muted leading-relaxed mb-10 max-w-xl"
          >
            Issue, manage, and distribute compliant assets with a purpose-built
            smart contract factory. Zero technical debt. Infinite upgradability.
            Take advantage of the world&apos;s most advanced smart contract
            technology inside a system that&apos;s simple enough for anyone at
            your firm to use.
          </motion.p>

          <motion.a
            href="#explore"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="group inline-flex h-14 items-center justify-center gap-3 bg-ink px-9 text-sm font-bold uppercase tracking-[0.14em] text-white transition-all hover:bg-ink/90 hover:gap-4"
          >
            Explore the Engine
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </motion.a>
        </div>

        {/* Right — visual */}
        <EngineVisual />
      </div>
    </div>
  </section>
);

/* ── Deploy Once section ── */
const DeployOnce = () => {
  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setShowSolution((p) => !p), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="border-b border-border section-padding overflow-hidden">
      <div className="custom-container">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 md:mb-18"
        >
          <h2 className="section-heading mb-5">
            Deploy Once. Upgrade Forever.
          </h2>
          <p className="text-base md:text-lg text-ink-muted max-w-2xl mx-auto leading-relaxed">
            Solving the &quot;Immutability Paradox&quot; with EIP-2535 Diamond
            Proxies.
          </p>
        </motion.div>

        {/* Two-panel comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-border">
          {/* ── LEFT: The Problem ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-border bg-white"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                <Lock size={18} className="text-red-500" />
              </div>
              <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight">
                The Problem
              </h3>
            </div>

            <p className="text-base text-ink-muted leading-relaxed mb-8">
              Financial institutions rely on flexibility in their assets to
              maintain compliance in an evolving regulatory environment. However,
              traditional smart contracts immutable. If regulations change, you
              have to migrate tokens — a security nightmare.
            </p>

            {/* Traditional contract mock */}
            <div className="border border-border bg-slate-50 p-5">
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-muted mb-5">
                Traditional Smart Contracts
              </div>

              {/* Mini contract card */}
              <div className="flex items-center gap-3 bg-white border border-border p-4 mb-5">
                <div className="w-10 h-10 bg-slate-100 rounded flex items-center justify-center flex-shrink-0">
                  <Lock size={16} className="text-slate-400" />
                </div>
                <div className="flex-1 space-y-1.5">
                  <div className="h-2 w-24 bg-slate-200 rounded-full" />
                  <div className="h-2 w-16 bg-slate-100 rounded-full" />
                </div>
                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                  <XCircle size={14} className="text-red-400" />
                </div>
              </div>

              {/* Limitation badges */}
              <div className="space-y-2.5">
                {[
                  "Cannot be modified after deployment",
                  "Must be completely replaced if changes arise",
                  "Cannot reference live data",
                ].map((text) => (
                  <div key={text} className="flex items-start gap-2.5">
                    <XCircle
                      size={15}
                      className="text-red-400 mt-0.5 flex-shrink-0"
                    />
                    <span className="text-sm text-ink-muted leading-snug">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: The Solution ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="p-8 md:p-10 bg-white relative"
          >
            {/* Subtle accent top line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent/0 via-accent/40 to-accent/0 hidden lg:block" />

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <Gem size={18} className="text-accent" />
              </div>
              <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight">
                The Solution
              </h3>
            </div>

            <p className="text-base text-ink-muted leading-relaxed mb-8">
              Nomyx created something better, a flexible platform to match the
              flexibility that financial institutions need. Nomyx Engine
              separates the asset state from the logic. You can upgrade
              compliance modules or yield calculators instantly without moving a
              single token. Financial institutions depend on the flexibility of
              their infrastructure, and now they have it: tokens that can grow
              and evolve with the regulatory landscape with no extra cost and
              only seconds of effort.
            </p>

            {/* Diamond proxy mock */}
            <div className="border border-accent/20 bg-accent/[0.02] p-5">
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-accent mb-5">
                Diamond Proxy Upgradeable Smart Contracts
              </div>

              {/* Mini proxy card */}
              <div className="flex items-center gap-3 bg-white border border-accent/20 p-4 mb-5">
                <div className="w-10 h-10 bg-accent/10 rounded flex items-center justify-center flex-shrink-0">
                  <Gem size={16} className="text-accent" />
                </div>
                <div className="flex-1">
                  <div className="flex gap-2 mb-1.5">
                    <div className="h-2 w-20 bg-accent/20 rounded-full" />
                    <div className="h-2 w-12 bg-accent/10 rounded-full" />
                  </div>
                  <div className="flex gap-2">
                    <div className="h-2 w-16 bg-accent/15 rounded-full" />
                    <div className="h-2 w-10 bg-accent/10 rounded-full" />
                  </div>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center"
                >
                  <CheckCircle2 size={14} className="text-emerald-500" />
                </motion.div>
              </div>

              {/* Benefit badges */}
              <div className="space-y-2.5">
                {[
                  "Keeps underlying data protected",
                  "Can be modified to match regulatory changes",
                ].map((text) => (
                  <div key={text} className="flex items-start gap-2.5">
                    <CheckCircle2
                      size={15}
                      className="text-emerald-500 mt-0.5 flex-shrink-0"
                    />
                    <span className="text-sm text-ink leading-snug font-medium">
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
  <section className="border-b border-border bg-slate-50/60 section-padding">
    <div className="custom-container">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10 md:mb-14"
      >
        <h2 className="section-heading mb-4">
          Automate the Asset Lifecycle.
        </h2>
        <p className="text-base md:text-lg text-ink-muted max-w-2xl mx-auto leading-relaxed">
          Tokenization isn&apos;t just about day one. It&apos;s about day two,
          three, and four hundred.
        </p>
      </motion.div>

      {/* Cards — 1 col mobile → 2 col tablet → 4 col desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {lifecycleCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="group bg-white border border-border p-6 md:p-7 transition-shadow hover:shadow-[0_8px_30px_rgba(10,17,40,0.06)]"
            >
              <div className="w-11 h-11 rounded-lg bg-accent/[0.07] flex items-center justify-center mb-5 transition-colors group-hover:bg-accent/[0.12]">
                <Icon size={20} className="text-accent" />
              </div>
              <h3 className="text-base font-black uppercase tracking-tight mb-2">
                {card.title}
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                {card.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default function NomyxEnginePage() {
  return (
    <div className="min-h-screen bg-bg font-sans text-ink">
      <CustomCursor />
      <Navbar />

      <main>
        <EngineHero />
        <DeployOnce />
        <AssetLifecycle />
        <FundLifecycle />
        <ApiFirst />
        <EngineCTA />
      </main>

      <Footer />
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
      className="w-full max-w-[440px] mx-auto lg:ml-auto lg:mr-0"
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
                  className="text-xs font-bold uppercase tracking-[0.1em] transition-colors duration-300"
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
                <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
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
          <h2 className="section-heading text-white mb-4">
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
            className={`border border-white/10 bg-white/[0.03] flex flex-col ${
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
                <div className="border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white">
                  Set Interest Rate
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-white/40 mb-2">
                  New Rate (%)
                </label>
                <div className="flex items-center border border-white/10 bg-white/[0.04] px-4 py-3">
                  <span className="text-sm font-semibold text-white flex-1">
                    5.00
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-white/30">
                    Annual
                  </span>
                </div>
              </div>

              <div className="mt-auto">
                <motion.div
                  whileInView={{ opacity: [0.7, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
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
            className={`border border-white/10 bg-white/[0.03] flex flex-col ${
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
                        {line.includes("mutation") || line.includes("updateAssetParameter") ? (
                          <span className="text-sky-400">{line}</span>
                        ) : line.includes('"') ? (
                          <span>
                            {line.split('"').map((part, j) =>
                              j % 2 === 1 ? (
                                <span key={j} className="text-emerald-400">&quot;{part}&quot;</span>
                              ) : (
                                <span key={j}>{part}</span>
                              )
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

/* ── Final CTA ── */
const EngineCTA = () => (
  <section className="border-b border-border bg-slate-50/50 py-20 md:py-28">
    <div className="custom-container text-center">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="section-heading mb-8 max-w-3xl mx-auto"
      >
        Start your issuance on future-proof infrastructure.
      </motion.h2>
      <motion.a
        href="#"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
        className="group inline-flex h-14 items-center justify-center gap-3 bg-accent px-9 text-sm font-bold uppercase tracking-[0.14em] text-white transition-all hover:bg-accent/90 hover:gap-4"
      >
        Access Nomyx Engine
        <ArrowRight
          size={18}
          className="transition-transform group-hover:translate-x-0.5"
        />
      </motion.a>
    </div>
  </section>
);
