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
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="w-full max-w-[540px] mx-auto lg:ml-auto lg:mr-0 flex flex-col gap-6"
    >
      {/* Smart Contract card */}
      <div className="border border-[#0A112824] bg-white p-6 md:p-8 rounded-[24px] shadow-[0_8px_30px_rgba(10,17,40,0.02)] transition-all duration-300">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-[#EDF3F8] flex items-center justify-center flex-shrink-0">
            <Fingerprint size={24} className="text-[#215EC7]" />
          </div>
          <div className="text-left">
            <div className="text-sm font-medium text-ink-muted leading-tight">Nomyx Id</div>
            <div className="text-xl font-bold text-ink leading-tight">Smart Contract</div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3">
          {["KYC", "AML", "ACCREDITATION"].map((badge) => (
            <span
              key={badge}
              className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#42546E] border border-[#0A112824] bg-white rounded-[8px] shadow-sm"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Wallet providers grid */}
      <div className="grid grid-cols-3 gap-3 md:gap-6">
        {walletProviders.map((w) => {
          const Icon = w.icon;

          return (
            <div
              key={w.name}
              className="relative border border-[#0A112824] bg-white p-3 md:p-5 rounded-[20px] md:rounded-[24px] flex flex-col items-center justify-center text-center aspect-square hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group cursor-pointer select-none"
            >
              {w.isDefault && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 text-[8px] md:text-[9px] font-bold uppercase tracking-wider bg-[#215EC7] text-white rounded-[4px] md:rounded-[6px] shadow-sm">
                  Default
                </span>
              )}

              <div className="w-10 h-10 md:w-12 md:h-12 rounded-[10px] bg-[#EDF3F8] group-hover:bg-[#EBF3FC] flex items-center justify-center mb-2 md:mb-3 transition-colors duration-300">
                <Icon
                  size={16}
                  className="text-[#215EC7]"
                />
              </div>
              <span className="text-xs md:text-base font-bold text-ink mb-0.5 group-hover:text-[#215EC7] transition-colors duration-300 leading-tight block truncate w-full px-1">
                {w.name}
              </span>
              <span className="text-[9px] md:text-xs font-medium text-ink-muted/80 block truncate w-full px-1">
                {w.sub}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

/* ── Hero ── */
const IdHero = () => (
  <section className="relative bg-[#F4F7FC] text-ink pt-32 pb-14 md:pt-40 md:pb-20 border-b border-border/40 overflow-hidden">
    {/* Radial glow */}
    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] md:w-[600px] md:h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(33,94,199,0.04),transparent_70%)] pointer-events-none" />

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
            <span className="eyebrow inline-flex select-none">
              Advanced On-Chain Identity
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-display font-bold md:font-black tracking-tight text-ink mb-7"
          >
            One Identity. Zero Seed Phrases.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="prgraphs text-ink-muted font-light mb-10 max-w-xl md:max-w-2xl leading-relaxed"
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
            className="mb-10"
          >
            <AnimatedButton
              text="Create Your Nomyx ID"
              href="https://calendly.com/ivan-j-nomyx"
              variant="accent"
            />
          </motion.div>

          {/* Compliance badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center gap-x-6"
          >
            {["Kyc Verified", "Aml Compliant", "Accredited"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-[#215EC7] flex-shrink-0" />
                <span className="text-sm font-medium text-[#42546E]">
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

/* ── Compliance Logic ── */
const ComplianceLogic = () => (
  <section className="border-b border-border/40 section-padding bg-white">
    <div className="custom-container">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 md:mb-20"
      >
        <h2 className="text-display font-bold md:font-black tracking-tight text-ink mb-4 text-center">
          Granular Compliance Logic.
        </h2>
        <p className="prgraphs text-ink-muted max-w-2xl mx-auto text-center leading-relaxed font-light">
          Define the rules. The asset enforces them.
        </p>
      </motion.div>

      {/* Top Cards (Composable Rules & Receiver Check) */}
      <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto px-4 md:px-0">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border border-[#0A112824] p-6 md:p-10 rounded-[24px] flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 shadow-[0_4px_20px_rgba(10,17,40,0.01)] hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
        >
          <div className="w-14 h-14 rounded-[12px] border border-[#0A112824] bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
            <Check size={20} className="text-[#215EC7]" strokeWidth={3} />
          </div>
          <div>
            <h4 className="text-[17px] font-bold mb-1.5 text-ink leading-snug">
              Composable Rules
            </h4>
            <p className="text-sm text-[#94A3B8] leading-relaxed font-medium">
              Stack requirements like &apos;US Citizen&apos; + &apos;Accredited Investor&apos; + &apos;KYC Verified&apos;.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-[#0A112824] p-6 md:p-10 rounded-[24px] flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 shadow-[0_4px_20px_rgba(10,17,40,0.01)] hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
        >
          <div className="w-14 h-14 rounded-[12px] border border-[#0A112824] bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
            <Shield size={20} className="text-[#215EC7]" strokeWidth={2.5} />
          </div>
          <div>
            <h4 className="text-[17px] font-bold mb-1.5 text-ink leading-snug">
              The Receiver Check
            </h4>
            <p className="text-sm text-[#94A3B8] leading-relaxed font-medium">
              Assets cannot be sent to a wallet unless that wallet is mapped to a verified Nomyx ID.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Bottom Cards (Pipeline/Pre-requisites) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
        {/* Card 1: US Accredited Investor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative bg-white border border-[#0A112824] p-8 rounded-[24px] shadow-[0_8px_30px_rgba(10,17,40,0.01)] flex flex-col items-center hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
        >
          <div className="inline-block bg-[#EDF3F8] text-[#215EC7] text-[11px] font-bold px-4 py-1.5 rounded-full mb-6">
            Pre-Requisite
          </div>
          <h4 className="text-lg font-black text-ink mb-8 text-center min-h-[48px] flex items-center justify-center leading-tight">
            US Accredited Investor
          </h4>
          <div className="w-full py-2.5 bg-[#EDF3F8] border border-[#D1E2FA] rounded-[8px] flex items-center justify-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-[#215EC7] transition-all hover:bg-[#EBF2FA] shadow-sm">
            <Check size={13} strokeWidth={3} />
            Active
          </div>
        </motion.div>

        {/* Card 2: OFAC Sanctions List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="relative bg-white border border-[#0A112824] p-8 rounded-[24px] shadow-[0_8px_30px_rgba(10,17,40,0.01)] flex flex-col items-center hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
        >
          <div className="inline-block bg-[#0A1128] text-white text-[11px] font-black uppercase tracking-wider px-4 py-1.5 rounded-full mb-6">
            Blocker
          </div>
          <h4 className="text-lg font-black text-ink mb-8 text-center min-h-[48px] flex items-center justify-center leading-tight">
            OFAC Sanctions List
          </h4>
          <div className="w-full py-2.5 bg-[#0A1128] border border-[#0A1128] rounded-[8px] flex items-center justify-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-white transition-all hover:bg-[#121E42] shadow-sm">
            <X size={13} strokeWidth={3} />
            Active
          </div>
        </motion.div>

        {/* Card 3: Basic KYC */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative bg-white border border-[#0A112824] p-8 rounded-[24px] shadow-[0_8px_30px_rgba(10,17,40,0.01)] flex flex-col items-center hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
        >
          <div className="inline-block bg-[#EDF3F8] text-[#215EC7] text-[11px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-6">
            PRE-REQUISITE
          </div>
          <h4 className="text-lg font-black text-ink mb-8 text-center min-h-[48px] flex items-center justify-center leading-tight">
            Basic KYC
          </h4>
          <div className="w-full py-2.5 bg-[#EDF3F8] border border-[#D1E2FA] rounded-[8px] flex items-center justify-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-[#215EC7] transition-all hover:bg-[#EBF2FA] shadow-sm">
            <Check size={13} strokeWidth={3} />
            Active
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

/* ── Biometric Security ── */
const BiometricSecurity = () => (
  <section className="border-b border-border section-padding bg-[#F4F7FC]">
    <div className="custom-container">
      {/* Top Icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="flex justify-center mb-6 md:mb-8"
      >
        <div className="w-14 h-14 rounded-[14px] border border-[#0A112824] bg-white flex items-center justify-center shadow-sm">
          <ScanFace size={24} className="text-[#215EC7]" />
        </div>
      </motion.div>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-center mb-16 md:mb-20"
      >
        <h2 className="text-display font-bold md:font-black tracking-tight text-ink mb-5 text-center leading-tight">
          Biometric Security. No Seed Phrases.
        </h2>
        <p className="prgraphs text-ink-muted max-w-3xl mx-auto leading-relaxed text-center font-light">
          Traditional wallets rely on fragile seed phrases. Nomyx ID leverages Dfns MPC
          (Multi-Party Computation) technology. Your private key is split and secured.
          Access your assets using FaceID or TouchID.
        </p>
      </motion.div>

      {/* Recovery Flow Image Showcase */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative max-w-4xl mx-auto w-full aspect-[16/10] sm:aspect-[1.8/1] md:aspect-[1.8/1] flex items-center justify-center"
      >
        <div className="relative w-full h-full">
          <Image
            src="/biometric_main_image.png"
            alt="Biometric Security Recovery Flow"
            fill
            className="object-contain select-none pointer-events-none"
            priority
            draggable={false}
          />
        </div>
      </motion.div>
    </div>
  </section>
);

/* ── The Impossible Transfer ── */
const ImpossibleTransfer = () => (
  <section className="border-b border-border py-20 md:py-28 bg-white">
    <div className="custom-container">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 md:mb-20"
      >
        <h2 className="text-display font-bold md:font-black tracking-tight text-ink mb-5 text-center leading-tight">
          The Impossible Transfer.
        </h2>
        <p className="prgraphs text-ink-muted max-w-2xl mx-auto leading-relaxed text-center font-light">
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
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[#42546E]">
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
              <div className="w-14 h-14 rounded-[14px] border border-[#0A112824] bg-white flex items-center justify-center mb-5 shadow-sm">
                <Check size={22} className="text-[#215EC7]" strokeWidth={2.5} />
              </div>
              <h4 className="text-base font-black text-ink mb-2">Bilateral Verification</h4>
              <p className="text-sm text-ink-muted leading-relaxed max-w-[280px] md:max-w-none">
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
              <div className="w-14 h-14 rounded-[14px] border border-[#0A112824] bg-white flex items-center justify-center mb-5 shadow-sm">
                <FileText size={20} className="text-[#215EC7]" />
              </div>
              <h4 className="text-base font-black text-ink mb-2">Asset-Specific Rules</h4>
              <p className="text-sm text-ink-muted leading-relaxed max-w-[280px] md:max-w-none">
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
              <div className="w-14 h-14 rounded-[14px] border border-[#0A112824] bg-white flex items-center justify-center mb-5 shadow-sm">
                <Database size={20} className="text-[#215EC7]" />
              </div>
              <h4 className="text-base font-black text-ink mb-2">Atomic Settlement</h4>
              <p className="text-sm text-ink-muted leading-relaxed max-w-[280px] md:max-w-none">
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
  <section className="border-b border-border section-padding bg-[#F4F7FC]">
    <div className="custom-container">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 md:mb-24"
      >
        <h2 className="text-display font-bold md:font-black tracking-tight text-ink mb-5 text-center leading-tight">
          Stronger Protection for All
        </h2>
        <p className="prgraphs text-ink-muted max-w-3xl mx-auto leading-relaxed text-center font-light">
          The Nomyx Platform democratizes the ownership and trading of assets through safe and efficient tokenization, all while staying in line with evolving compliance standards using our revolutionary KYC, Nomyx ID.
        </p>
      </motion.div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto px-4 md:px-0">
        {protectionSteps.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="relative bg-[#F8FAFC] border border-[#0A11281A] p-8 md:p-10 rounded-[24px] transition-colors duration-300 hover:border-[#0A112833] group overflow-hidden flex flex-col justify-between min-h-[220px] md:min-h-[255px]"
          >
            {/* Massive background watermark number (Hairline/Thin 100 weight font) */}
            <div 
              className="absolute right-2 bottom-[-30px] md:bottom-[-40px] text-[260px] md:text-[320px] text-[#0A1128]/[0.02] select-none leading-none z-0 tracking-tighter"
              style={{ fontWeight: 100, fontFamily: "'Inter', sans-serif" }}
            >
              {step.num}
            </div>

            <div className="relative z-10 flex flex-col justify-between h-full flex-grow">
              <step.icon size={30} className="text-[#215EC7]" strokeWidth={2} />
              <p className="text-[15px] md:text-[17px] font-semibold text-ink leading-relaxed max-w-[85%] mt-8">
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
  <section
    id="evolution"
    className="relative overflow-hidden bg-[#0A1128] py-20 md:py-32 text-white border-t border-white/5"
  >
    {/* Background Glows (Exact homepage developers section style) */}
    <div className="pointer-events-none absolute -right-1/5 -top-1/4 h-[600px] w-[600px] rounded-full bg-blue-600/40 blur-[120px]" />
    <div className="pointer-events-none absolute -left-1/5 -bottom-1/4 h-[600px] w-[600px] rounded-full bg-blue-600/40 blur-[120px]" />

    <div className="custom-container relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 md:mb-24 max-w-4xl mx-auto"
      >
        <h2 className="text-display font-bold md:font-black tracking-tight text-white mb-6 text-center leading-tight">
          Built for Evolution.
        </h2>
        <p className="prgraphs text-white/70 max-w-2xl mx-auto leading-relaxed font-light">
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
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="relative bg-[#1B243C] border border-white/5 p-8 md:p-10 rounded-[24px] transition-all duration-300 hover:bg-[#232E4A] hover:translate-y-[-4px] hover:shadow-2xl flex flex-col justify-start min-h-[260px]"
          >
            <div className="w-12 h-12 rounded-[14px] border border-white/[0.08] bg-[#1E293B]/45 flex items-center justify-center mb-8">
              <feat.icon size={22} className="text-white" />
            </div>
            <h3 className="text-[20px] font-bold text-white mb-4 leading-tight">
              {feat.title}
            </h3>
            <p className="text-[14px] md:text-[15px] text-slate-400 leading-relaxed font-medium">
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
      <Navbar transparentInitially={true} hideBorder={true} />

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
