"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  Fingerprint,
  ShieldCheck,
  Wallet,
  KeyRound,
  HardDrive,
  Check,
  Shield,
  X,
  ScanFace,
  Lock,
  FileText,
  Database,
  UserPlus,
  FileCheck,
  FileCode,
  LayoutDashboard,
  ShieldAlert,
} from "lucide-react";
import Image from "next/image";
import { CustomCursor, Navbar, Footer } from "@/app/home";
import { AnimatedButton } from "@/app/components/evergreen/shared";

/* ── Wallet architecture visual ── */
const walletProviders = [
  { name: "Dfns", sub: "MPC Wallet", icon: KeyRound, isDefault: true },
  { name: "WalletConnect", sub: "External Wallet", icon: Wallet, isDefault: false },
  { name: "Ledger", sub: "Hardware Security", icon: HardDrive, isDefault: false },
];

const IdentityVisual = () => {
  const [activeWallet, setActiveWallet] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActiveWallet((p) => (p + 1) % 3), 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="w-full max-w-[480px] mx-auto lg:ml-auto lg:mr-0"
    >
      {/* Smart Contract card */}
      <div className="border border-border bg-white p-5 md:p-6 text-center shadow-[0_8px_30px_rgba(10,17,40,0.04)]">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
            <Fingerprint size={20} className="text-accent" />
          </div>
          <div className="text-left">
            <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-muted">
              Nomyx ID
            </div>
            <div className="text-sm font-black text-ink">Smart Contract</div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2">
          {["KYC", "AML", "Accreditation"].map((badge) => (
            <span
              key={badge}
              className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-ink-muted border border-border bg-slate-50"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Connector line */}
      <div className="flex justify-center">
        <motion.div
          animate={{ height: [24, 32, 24] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px bg-gradient-to-b from-border to-transparent"
        />
      </div>

      {/* Wallet providers */}
      <div className="grid grid-cols-3 gap-3">
        {walletProviders.map((w, i) => {
          const Icon = w.icon;
          const isActive = i === activeWallet;

          return (
            <motion.div
              key={w.name}
              animate={{
                borderColor: isActive
                  ? "rgba(30,58,138,0.3)"
                  : "rgba(10,17,40,0.08)",
                backgroundColor: isActive
                  ? "rgba(30,58,138,0.02)"
                  : "#fff",
                boxShadow: isActive
                  ? "0 8px 24px rgba(30,58,138,0.08)"
                  : "0 1px 3px rgba(0,0,0,0.02)",
              }}
              transition={{ duration: 0.3 }}
              className="relative border p-4 md:p-5 flex flex-col items-center text-center"
            >
              {w.isDefault && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] bg-emerald-500 text-white">
                  Default
                </span>
              )}
              <motion.div
                animate={{
                  backgroundColor: isActive
                    ? "rgba(30,58,138,0.1)"
                    : "#f8fafc",
                }}
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
              >
                <Icon
                  size={18}
                  style={{ color: isActive ? "#1E3A8A" : "#64748B" }}
                  className="transition-colors duration-300"
                />
              </motion.div>
              <span
                className="text-xs font-bold transition-colors duration-300 mb-0.5"
                style={{ color: isActive ? "#0A1128" : "#64748B" }}
              >
                {w.name}
              </span>
              <span className="text-[10px] text-ink-muted/60">{w.sub}</span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

/* ── Hero ── */
const IdHero = () => (
  <section className="relative bg-white text-ink pt-32 pb-14 md:pt-40 md:pb-20 border-b border-border overflow-hidden">
    {/* Subtle dot grid */}
    <div
      className="absolute inset-0 opacity-[0.05] pointer-events-none"
      style={{
        backgroundImage:
          "radial-gradient(circle, #0A1128 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    />

    {/* Radial glow */}
    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] md:w-[600px] md:h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(30,58,138,0.03),transparent_70%)] pointer-events-none" />

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
            <span className="inline-flex border-2 border-accent/20 px-5 py-2.5 text-sm font-bold uppercase tracking-[0.12em] text-accent">
              Advanced On-Chain Identity
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="section-heading mb-7"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
          >
            One Identity. Zero Seed Phrases.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-base md:text-lg text-ink-muted leading-relaxed mb-10 max-w-xl"
          >
            The first identity system that decouples compliance from custody.
            Every Nomyx ID automatically deploys a secure Dfns wallet. Lose your
            key? Don&apos;t lose your assets. Recover your wallet instantly via
            biometric passkeys and identity verification.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <AnimatedButton 
              text="Create Your Nomyx ID" 
              href="https://calendly.com/ivan-j-nomyx" 
              variant="ink" 
            />
          </motion.div>

          {/* Compliance badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-10 flex items-center gap-5 border-t border-border pt-7"
          >
            {["KYC Verified", "AML Compliant", "Accredited"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-ink-muted">
                  {item}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — architecture visual */}
        <IdentityVisual />
      </div>
    </div>
  </section>
);

const complianceNodes = [
  { rule: "US Accredited Investor", type: "Pre-Requisite", status: "Active", isBlocker: false },
  { rule: "OFAC Sanctions List", type: "Blocker", status: "Active", isBlocker: true },
  { rule: "Basic KYC", type: "Pre-Requisite", status: "Active", isBlocker: false },
];

/* ── Compliance Logic ── */
const ComplianceLogic = () => (
  <section className="border-b border-border section-padding bg-slate-50/30">
    <div className="custom-container">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 md:mb-20"
      >
        <h2 className="section-heading mb-4">
          Granular Compliance Logic.
        </h2>
        <p className="text-base md:text-lg text-ink-muted max-w-2xl mx-auto leading-relaxed">
          Define the rules. The asset enforces them.
        </p>
      </motion.div>

      {/* Text Features (Replacing left side bullets) */}
      <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border border-border p-7 md:p-9 rounded-2xl flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 shadow-[0_2px_10px_rgba(10,17,40,0.02)]"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0">
            <Check size={20} className="text-emerald-500" />
          </div>
          <div>
            <h4 className="text-sm font-black uppercase tracking-tight mb-2 text-ink">
              Composable Rules
            </h4>
            <p className="text-sm text-ink-muted leading-relaxed">
              Stack requirements like &apos;US Citizen&apos; + &apos;Accredited Investor&apos; + &apos;KYC Verified&apos;.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-border p-7 md:p-9 rounded-2xl flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 shadow-[0_2px_10px_rgba(10,17,40,0.02)]"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0">
            <Shield size={20} className="text-emerald-500" />
          </div>
          <div>
            <h4 className="text-sm font-black uppercase tracking-tight mb-2 text-ink">
              The Receiver Check
            </h4>
            <p className="text-sm text-ink-muted leading-relaxed">
              Assets cannot be sent to a wallet unless that wallet is mapped to a verified Nomyx ID.
            </p>
          </div>
        </motion.div>
      </div>

      {/* The Rule Pipeline Visual */}
      <div className="relative px-4 md:px-0">
        {/* Connecting line behind nodes on desktop */}
        <div className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-border to-transparent -translate-y-1/2 z-0" />
        {/* Connecting line behind nodes on mobile */}
        <div className="lg:hidden absolute top-[10%] bottom-[10%] left-1/2 w-0.5 bg-gradient-to-b from-transparent via-border to-transparent -translate-x-1/2 z-0" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 relative z-10 max-w-5xl mx-auto">
          {complianceNodes.map((node, i) => (
            <motion.div
              key={node.rule}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="bg-white border border-border p-6 md:p-8 rounded-[1.5rem] shadow-[0_12px_40px_rgba(10,17,40,0.04)] flex flex-col items-center text-center group hover:-translate-y-1 transition-transform"
            >
              <div className={`mb-5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.14em] ${node.isBlocker ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                {node.type}
              </div>
              <h4 className="text-sm md:text-base font-black text-ink mb-6 h-10 flex items-center justify-center leading-tight">
                {node.rule}
              </h4>
              <div className={`w-full py-2.5 rounded-xl border flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] transition-colors ${node.isBlocker ? 'bg-red-50 border-red-100 text-red-600' : 'bg-emerald-50 border-emerald-100 text-emerald-600'}`}>
                {node.isBlocker ? <X size={14} strokeWidth={3} /> : <Check size={14} strokeWidth={3} />}
                {node.status}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  </section>
);

/* ── Biometric Security ── */
const BiometricSecurity = () => (
  <section className="border-b border-border section-padding bg-white">
    <div className="custom-container">
      {/* Top Icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="flex justify-center mb-6 md:mb-8"
      >
        <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100/50 flex items-center justify-center">
          <ScanFace size={24} className="text-emerald-600" />
        </div>
      </motion.div>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-center mb-12 md:mb-16"
      >
        <h2 className="section-heading mb-5">
          Biometric Security. No Seed Phrases.
        </h2>
        <p className="text-base md:text-lg text-ink-muted max-w-3xl mx-auto leading-relaxed">
          Traditional wallets rely on fragile seed phrases. Nomyx ID leverages Dfns MPC
          (Multi-Party Computation) technology. Your private key is split and secured.
          Access your assets using FaceID or TouchID.
        </p>
      </motion.div>

      {/* Recovery Flow Card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="max-w-4xl mx-auto bg-white border border-border rounded-2xl shadow-[0_8px_30px_rgba(10,17,40,0.06)] overflow-hidden"
      >
        <div className="p-8 md:p-12 relative">
          <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-ink-muted text-center mb-12 md:mb-16">
            Recovery Flow
          </h3>

          <div className="relative flex flex-col md:flex-row items-start justify-between gap-12 md:gap-0 px-0">
            {/* Desktop Line Connector */}
            <div className="hidden md:block absolute top-10 left-[16.66%] right-[16.66%] h-[2px] bg-gradient-to-r from-red-200 via-sky-300 to-emerald-200 -translate-y-1/2 z-0" />
            
            {/* Desktop Lock Icon (between step 1 and 2) */}
            <div className="hidden md:flex absolute top-10 left-1/3 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-accent border-[3px] border-white items-center justify-center z-10 shadow-sm">
              <Lock size={12} className="text-white" />
            </div>

            {/* Mobile Line Connector */}
            <div className="md:hidden absolute top-[10%] bottom-[10%] left-1/2 w-[2px] bg-gradient-to-b from-red-200 via-sky-300 to-emerald-200 -translate-x-1/2 z-0" />
            
            {/* Mobile Lock Icon in middle of line */}
            <div className="md:hidden absolute top-[33%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-accent border-[3px] border-white flex items-center justify-center z-10 shadow-sm">
              <Lock size={12} className="text-white" />
            </div>

            {/* Step 1 */}
            <div className="relative z-10 flex flex-col items-center text-center w-full md:w-1/3">
              <div className="w-20 h-20 bg-white flex items-center justify-center mb-2">
                <div className="w-16 h-16 rounded-full bg-red-50 border border-red-100 flex items-center justify-center shadow-[0_0_0_8px_white]">
                  <X size={24} className="text-red-500" strokeWidth={2.5} />
                </div>
              </div>
              <h4 className="text-sm font-bold text-ink mb-1">Device Lost</h4>
              <p className="text-[11px] text-ink-muted uppercase tracking-wide font-medium">Phone damaged</p>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 flex flex-col items-center text-center w-full md:w-1/3">
              <div className="w-20 h-20 bg-white flex items-center justify-center mb-2">
                <div className="w-16 h-16 rounded-full bg-sky-50 border border-sky-100 flex items-center justify-center shadow-[0_0_0_8px_white]">
                  <Shield size={24} className="text-sky-500" strokeWidth={2.5} />
                </div>
              </div>
              <h4 className="text-sm font-bold text-ink mb-1">Verify Identity</h4>
              <p className="text-[11px] text-ink-muted uppercase tracking-wide font-medium">KYC check</p>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 flex flex-col items-center text-center w-full md:w-1/3">
              <div className="w-20 h-20 bg-white flex items-center justify-center mb-2">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shadow-[0_0_0_8px_white]">
                  <Check size={24} className="text-emerald-500" strokeWidth={2.5} />
                </div>
              </div>
              <h4 className="text-sm font-bold text-ink mb-1">Passkey Recovery</h4>
              <p className="text-[11px] text-ink-muted uppercase tracking-wide font-medium">Access restored</p>
            </div>
          </div>
        </div>

        {/* Footer message */}
        <div className="bg-emerald-50/40 border-t border-emerald-100/50 p-5 md:p-6 text-center">
          <p className="text-xs md:text-sm text-emerald-800 font-medium">
            <span className="font-bold">Recover access</span> through additional verification without ever exposing a private key.
          </p>
        </div>
      </motion.div>
    </div>
  </section>
);

/* ── The Impossible Transfer ── */
const ImpossibleTransfer = () => (
  <section className="border-b border-border section-padding bg-slate-50/30">
    <div className="custom-container">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 md:mb-20"
      >
        <h2 className="section-heading mb-4">
          The Impossible Transfer.
        </h2>
        <p className="text-base md:text-lg text-ink-muted max-w-2xl mx-auto leading-relaxed">
          Compliance checks happen before settlement. Transactions only succeed if both parties hold the required credentials.
        </p>
      </motion.div>

      {/* New Improved Layout: Top GIF Showcase, Bottom 3-Column Features */}
      <div className="flex flex-col gap-16 md:gap-20">
        
        {/* GIF Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto w-full aspect-square sm:aspect-video md:aspect-[16/9] bg-white border border-border rounded-3xl shadow-[0_20px_60px_rgba(10,17,40,0.06)] overflow-hidden flex items-center justify-center p-4 md:p-8"
        >
           <div className="relative w-full h-full rounded-2xl overflow-hidden bg-white">
             <Image 
               src="/token-level-compliance.gif" 
               alt="Token Level Compliance Visualization" 
               fill
               className="object-contain"
               unoptimized
             />
           </div>
        </motion.div>     

        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-12"
          >
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-ink-muted/70">
              Why It Matters
            </h3>
          </motion.div>

          {/* 3-Column Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 max-w-5xl mx-auto px-4 md:px-0">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center flex flex-col items-center"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-5">
                <Check size={20} className="text-emerald-500" />
              </div>
              <h4 className="text-sm font-black uppercase tracking-tight mb-3 text-ink">Bilateral Verification</h4>
              <p className="text-sm text-ink-muted leading-relaxed">
                The engine checks credentials for both the sender and the receiver.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center flex flex-col items-center"
            >
              <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center mb-5">
                <FileText size={20} className="text-sky-500" />
              </div>
              <h4 className="text-sm font-black uppercase tracking-tight mb-3 text-ink">Asset-Specific Rules</h4>
              <p className="text-sm text-ink-muted leading-relaxed">
                This transfer succeeded because both users met the specific &apos;US Accredited Investor&apos; rule required by this asset.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center flex flex-col items-center"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-5">
                <Database size={20} className="text-accent" />
              </div>
              <h4 className="text-sm font-black uppercase tracking-tight mb-3 text-ink">Atomic Settlement</h4>
              <p className="text-sm text-ink-muted leading-relaxed">
                If the rule passes, the ledger updates instantly.
              </p>
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  </section>
);

/* ── Stronger Protection for All ── */
const protectionSteps = [
  {
    num: "1",
    icon: UserPlus,
    text: "New user onboards with your institution.",
  },
  {
    num: "2",
    icon: FileCheck,
    text: "Persona verifies key personal information to ensure the user is who they claim to be.",
  },
  {
    num: "3",
    icon: FileCode,
    text: "Nomyx creates smart contract IDs for each profile and attaches permissions based on Persona's verification.",
  },
  {
    num: "4",
    icon: LayoutDashboard,
    text: "Identity verification and profiles appear in your Nomyx dashboard. Profile permissions can be modified at any time.",
  },
  {
    num: "5",
    icon: Lock,
    text: "At the point of token creation, Nomyx attaches prerequisites to each token to restrict who may interact with that asset.",
  },
  {
    num: "6",
    icon: ShieldAlert,
    text: "Prior to any transaction, the asset's compliance matrix cross references its required credentials of all parties involved in the transactions, and rejects any that are noncompliant.",
  },
];

const ProtectionForAll = () => (
  <section className="border-b border-border section-padding bg-white">
    <div className="custom-container">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 md:mb-24"
      >
        <h2 className="section-heading mb-6">
          Stronger Protection for All
        </h2>
        <p className="text-base md:text-lg text-ink-muted max-w-3xl mx-auto leading-relaxed">
          The Nomyx Platform democratizes the ownership and trading of assets through safe and efficient tokenization, all while staying in line with evolving compliance standards using our revolutionary KYC, Nomyx ID.
        </p>
      </motion.div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
        {protectionSteps.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative bg-white border border-border p-8 rounded-[1.5rem] shadow-[0_4px_20px_rgba(10,17,40,0.03)] hover:shadow-[0_12px_40px_rgba(10,17,40,0.06)] transition-all group overflow-hidden flex flex-col min-h-[220px]"
          >
            {/* Massive background number */}
            <div className="absolute -top-6 -right-6 text-[160px] font-black text-slate-50 leading-none select-none z-0 group-hover:scale-105 transition-transform duration-500">
              {step.num}
            </div>

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 rounded-2xl bg-accent/5 border border-accent/10 flex items-center justify-center">
                  <step.icon size={24} className="text-accent" />
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 text-ink-muted text-xs font-bold flex items-center justify-center shadow-sm">
                  {step.num}
                </div>
              </div>
              <p className="text-sm md:text-base text-ink leading-relaxed font-semibold mt-auto">
                {step.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ── Built for Evolution ── */
const evolutionFeatures = [
  {
    title: "Upgradable Architecture",
    desc: "Built on upgradeable smart contracts. Adapt to new regulations without reissuing IDs.",
    icon: Database,
    color: "text-sky-400",
    bg: "bg-sky-400/10",
    border: "border-sky-400/20",
  },
  {
    title: "Privacy Preserving",
    desc: "PII data stays off-chain. Only the boolean flags (Pass/Fail) are recorded on the ledger.",
    icon: Lock,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20",
  },
  {
    title: "No-Code Management",
    desc: "Manage identities and compliance rules via a simple dashboard.",
    icon: FileText,
    color: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/20",
  },
];

const BuiltForEvolution = () => (
  <section className="border-t border-ink section-padding bg-ink text-white relative overflow-hidden">
    {/* Subtle Background Glows */}
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] pointer-events-none" />
    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />

    <div className="custom-container relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 md:mb-28"
      >
        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6">
          Built for Evolution.
        </h2>
        <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Your compliance infrastructure should adapt as regulations change and your business grows.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto px-4 md:px-0">
        {evolutionFeatures.map((feat, i) => (
          <motion.div
            key={feat.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className={`bg-white/[0.03] border border-white/10 p-8 md:p-10 rounded-[1.5rem] flex flex-col hover:bg-white/[0.06] transition-all hover:-translate-y-1 ${i === 1 ? 'md:-translate-y-8 hover:md:-translate-y-9' : ''}`}
          >
            <div className={`w-14 h-14 rounded-2xl ${feat.bg} ${feat.border} border flex items-center justify-center mb-8`}>
              <feat.icon size={24} className={feat.color} />
            </div>
            <h4 className="text-lg font-bold text-white mb-3">{feat.title}</h4>
            <p className="text-sm text-slate-400 leading-relaxed font-medium">
              {feat.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);



export default function NomyxIdPage() {
  return (
    <div className="min-h-screen bg-bg font-sans text-ink">
      <CustomCursor />
      <Navbar />

      <main>
        <IdHero />
        <ComplianceLogic />
        <BiometricSecurity />
        <ImpossibleTransfer />
        <ProtectionForAll />
        <BuiltForEvolution />
      </main>

      <Footer 
        ctaTitle="Secure your assets with identity-first infrastructure."
        ctaDescription="Join the asset managers moving billions on-chain with Nomyx."
        ctaButtonText="Schedule a Nomyx ID Demo"
        ctaButtonLink="https://calendly.com/ivan-j-nomyx"
      />
    </div>
  );
}
