"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Terminal,
  CheckCircle2,
  TerminalSquare,
  Zap,
  Code2,
  ArrowRight,
  ShieldCheck,
  Key,
  Network,
  Fingerprint,
  Github,
  MessageSquare,
  Layers
} from "lucide-react";
import { CustomCursor, Navbar, Footer } from "@/app/home";
import { AnimatedButton } from "@/app/components/evergreen/shared";

/* ── Developers Hero Section ── */
const DevelopersHero = () => (
  <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 bg-white overflow-hidden min-h-[90vh] flex items-center">
    {/* Clean Right Glow Background Gradient */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_30%,#D9EFFF_0%,transparent_50%),radial-gradient(circle_at_0%_40%,rgba(33,94,199,0.06),transparent_50%)] bg-white" />

    <div className="custom-container relative z-10 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        {/* Left Side: Content */}
        <div className="max-w-xl mx-auto lg:mx-0 relative z-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="">
              <span className="eyebrow px-5 py-2.5 rounded-full border border-ink/10 bg-white/50 inline-block">
                Nomyx API V2.0
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-display font-bold md:font-black tracking-tight text-ink mb-6 mt-1 leading-tight text-left"
          >
            The Infrastructure <br className="hidden md:block" />
            Layer For Real-World <br className="hidden md:block" />
            Assets.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="prgraphs text-ink-muted leading-relaxed font-light text-left mb-10 max-w-xl"
          >
            Don't reinvent the wheel. Integrate banking-grade tokenization, identity, and compliance directly into your application with a few lines of code.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <AnimatedButton
              text="Read The Docs"
              href="https://nomyx-io.github.io/gemforce-docs/"
              variant="accent"
            />
          </motion.div>
        </div>

        {/* Right Side: Animated Terminal Composition */}
        <div className="relative w-full max-w-[600px] mx-auto lg:ml-auto lg:mr-0 z-10 lg:perspective-1000">
          <motion.div
            initial={{ opacity: 0, rotateY: -15, rotateX: 10, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, rotateY: 0, rotateX: 0, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative transform-style-3d"
          >
            {/* Main Terminal Window */}
            <div className="relative bg-[#0A1128] rounded-[24px] shadow-[0_40px_100px_rgba(10,17,40,0.18)] overflow-hidden border border-[#ffffff0a]">

              {/* macOS Window Controls */}
              <div className="px-5 py-4 flex items-center gap-2 border-b border-[#ffffff0a] bg-[#0A1128]">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <div className="ml-4 text-xs font-mono text-slate-400 flex items-center gap-2">
                  <Terminal size={12} /> ~ /terminal
                </div>
              </div>

              {/* Code Content */}
              <div className="p-6 md:p-8 font-mono text-[13px] md:text-sm leading-relaxed text-slate-300">
                {/* Request */}
                <div className="mb-8">
                  <span className="text-emerald-400 mr-2">$</span>
                  <span className="text-emerald-400 mr-2">curl</span>
                  <span className="text-white">https://api.nomyx.io/v2/assets/mint \</span><br />
                  &nbsp;&nbsp;<span className="text-cyan-400">-H</span> <span className="text-amber-300">"Authorization: Bearer sk_live_..." \</span><br />
                  &nbsp;&nbsp;<span className="text-cyan-400">-d</span> <span className="text-amber-300">'{'{"amount": 1000000, "recipient": "0x..."}'}'</span>
                </div>

                {/* Response Block (Nested styling) */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="bg-[#0F172A]/70 rounded-[16px] p-5 border border-[#ffffff0a] shadow-inner"
                >
                  <span className="text-slate-400">{'{'}</span><br />
                  &nbsp;&nbsp;<span className="text-cyan-400">"status"</span>: <span className="text-emerald-400">"success"</span>,<br />
                  &nbsp;&nbsp;<span className="text-cyan-400">"txHash"</span>: <span className="text-amber-300">"0x7f3b..."</span>,<br />
                  &nbsp;&nbsp;<span className="text-cyan-400">"code"</span>: <span className="text-fuchsia-400">200</span><br />
                  <span className="text-slate-400">{'}'}</span>
                </motion.div>

                {/* Blinking Cursor */}
                <motion.div
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="mt-6 w-2.5 h-5 bg-slate-500"
                />
              </div>
            </div>

            {/* Floating Status Card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-8 bg-white p-4 rounded-[16px] shadow-lg border border-[#0A11281A] flex items-center gap-3 z-20 select-none"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0">
                <CheckCircle2 size={18} className="text-white fill-emerald-500" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-[#42546E] uppercase tracking-wider leading-none mb-1">Status</div>
                <div className="text-sm font-bold text-[#0A1128]">API Online</div>
              </div>
            </motion.div>

          </motion.div>
        </div>

      </div>
    </div>
  </section>
);

/* ── Toolkit Section ── */
const ToolkitSection = () => {
  const features = [
    {
      icon: TerminalSquare,
      title: "GraphQL & REST",
      description: "Query your asset data with precision. Our GraphQL API allows you to fetch complex ownership structures in a single request."
    },
    {
      icon: Zap,
      title: "Webhooks & Events",
      description: "Real-time settlement. Subscribe to on-chain events like TransferSettled or ComplianceCheckFailed to update your internal UI instantly."
    },
    {
      icon: Code2,
      title: "Type-Safe SDKs",
      description: "Ship faster with fully typed SDKs for TypeScript, Python, and Go."
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden border-t border-[#0A11281A]">
      <div className="custom-container max-w-5xl relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-display font-bold md:font-black tracking-tight text-ink mb-20 text-center"
        >
          A Complete Toolkit for <br className="hidden md:block" /> Fintech Engineering.
        </motion.h2>

        <div className="flex flex-col">
          {features.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-12 py-12 border-t border-[#0A11281A] transition-colors"
            >
              <div className="flex items-center gap-6 md:w-[45%]">
                <div className="w-14 h-14 rounded-[16px] border border-[#0A11281A] flex items-center justify-center text-[#215EC7] bg-[#215EC7]/5 shrink-0">
                  <item.icon size={26} strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-bold text-ink">
                  {item.title}
                </h3>
              </div>

              <div className="md:w-[55%] text-left">
                <p className="text-lg text-ink-muted leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
          <div className="border-t border-[#0A11281A]" />
        </div>
      </div>
    </section>
  );
};

/* ── Sandbox Section ── */
const SandboxSection = () => {
  const [isTestnet, setIsTestnet] = useState(true);

  return (
    <section className="py-24 bg-white relative overflow-hidden border-t border-[#0A11281A]">
      <div className="custom-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left Side: Interactive Sandbox Widget */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative mx-auto w-full max-w-md lg:max-w-lg"
          >
            <div className="relative bg-white rounded-[32px] p-8 md:p-10 shadow-[0_24px_48px_rgba(10,17,40,0.06)] border border-[#0A11281A] overflow-hidden">
              <div className="flex items-center justify-between mb-10 select-none">
                <h3 className="text-2xl font-black text-ink">Environment</h3>

                {/* Interactive Toggle */}
                <div className="flex items-center gap-3">
                  <span className={`text-[13px] font-semibold transition-colors duration-500 ${!isTestnet ? 'text-[#0A1128]' : 'text-slate-400'}`}>Mainnet</span>

                  <button
                    onClick={() => setIsTestnet(!isTestnet)}
                    className={`relative w-14 h-7 rounded-full transition-colors duration-500 flex items-center px-1 shadow-inner focus:outline-none ${isTestnet ? 'bg-[#215EC7]' : 'bg-slate-300'}`}
                    aria-label="Toggle Environment"
                  >
                    <motion.div
                      layout
                      className="w-5 h-5 bg-white rounded-full shadow-sm"
                      animate={{ x: isTestnet ? 28 : 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </button>

                  <span className={`text-[13px] font-semibold transition-colors duration-500 ${isTestnet ? 'text-[#215EC7]' : 'text-slate-400'}`}>Testnet</span>
                </div>
              </div>

              {/* Data Rows */}
              <div className="space-y-3 select-none">
                <div
                  className={`flex items-center justify-between p-4 md:p-5 rounded-[12px] transition-all duration-500 ${isTestnet ? 'bg-[#F0F4FC] border border-[#215EC7]/20 text-[#215EC7]' : 'bg-slate-50 border border-slate-200 text-slate-700'}`}
                >
                  <span className="text-sm font-bold">Mode</span>
                  <motion.span
                    key={isTestnet ? 'test' : 'prod'}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs font-extrabold tracking-wider uppercase"
                  >
                    {isTestnet ? 'TESTNET' : 'PRODUCTION'}
                  </motion.span>
                </div>

                <div className="flex items-center justify-between p-4 md:p-5 rounded-[12px] bg-white border border-slate-100 text-ink">
                  <span className="text-sm font-medium text-slate-500">Network</span>
                  <motion.span
                    key={isTestnet ? 'sep' : 'eth'}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-sm font-mono font-semibold text-slate-500"
                  >
                    {isTestnet ? 'Sepolia' : 'Ethereum'}
                  </motion.span>
                </div>

                <div className="flex items-center justify-between p-4 md:p-5 rounded-[12px] bg-white border border-slate-100 text-ink">
                  <span className="text-sm font-medium text-slate-500">Gas Cost</span>
                  <motion.span
                    key={isTestnet ? 'gas-free' : 'gas-paid'}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`text-sm font-mono font-bold ${isTestnet ? 'text-[#215EC7]' : 'text-slate-700'}`}
                  >
                    {isTestnet ? '$0.00' : '$14.25'}
                  </motion.span>
                </div>
              </div>

              <p className="text-center text-[12px] font-medium text-slate-400 mt-8 italic select-none">
                Switch environments with a single config change.
              </p>
            </div>
          </motion.div>

          {/* Right Side: Text Content */}
          <div className="max-w-xl mx-auto lg:mx-0">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-display font-bold md:font-black tracking-tight text-ink mb-6 text-left"
            >
              Build Without Spending Real Money.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="prgraphs text-ink-muted leading-relaxed font-light text-left max-w-xl"
            >
              Develop in a safe, mirrored environment. Our Sandbox mimics mainnet conditions (including gas and block times) but uses testnet currency, so you can stress-test your application cost-free.
            </motion.p>
          </div>

        </div>
      </div>
    </section>
  );
};

/* ── Security Section ── */
const SecuritySection = () => {
  const securityFeatures = [
    { icon: Key, text: "Granular API Scopes (Read/Write/Admin)." },
    { icon: Network, text: "IP Whitelisting for API Keys." },
    { icon: Fingerprint, text: "MFA-Protected Org Settings." },
    { icon: ShieldCheck, text: "SOC 2 Type II Certified Infrastructure." },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden border-t border-[#0A11281A]">
      <div className="custom-container relative z-10">

        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-12 h-12 bg-white border border-[#D0E2FF]/80 rounded-[12px] flex items-center justify-center mx-auto mb-6 shadow-[0_2px_8px_rgba(33,94,199,0.05)]"
          >
            <ShieldCheck size={22} className="text-[#215EC7]" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[32px] md:text-[44px] font-bold md:font-black tracking-tight text-[#0A1128] leading-[1.15]"
          >
            Enterprise Security <br /> Standards.
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border border-[#E2E8F0] rounded-[24px] bg-white overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.015)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[#E2E8F0]">
            {securityFeatures.map((feat, i) => (
              <div
                key={i}
                className="p-8 md:p-10 flex flex-col justify-between min-h-[220px] lg:min-h-[260px] bg-white transition-colors duration-300 hover:bg-slate-50/30 cursor-default select-none"
              >
                <div>
                  <feat.icon size={28} strokeWidth={1.8} className="text-[#215EC7]" />
                </div>

                <p className="font-bold text-[#0A1128] text-base leading-snug tracking-tight">
                  {feat.text}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

/* ── Community CTA ── */
const CommunityCTA = () => {
  const platforms = [
    { name: "GitHub", icon: Github },
    { name: "Discord", icon: MessageSquare },
    { name: "Stack Overflow", icon: Layers },
  ];

  return (
    <section className="pt-24 pb-32 bg-[#0A1128] relative overflow-hidden text-center border-t border-[#ffffff0a]">
      {/* Immersive Dark Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-500/5 blur-[150px] pointer-events-none" />

      <div className="custom-container relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[32px] md:text-[44px] font-bold md:font-black tracking-tight text-white mb-12"
        >
          Join the Builders.
        </motion.h2>

        {/* Interactive Platform Tiles */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12">
          {platforms.map((plat, i) => (
            <motion.a
              key={i}
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3 px-8 py-4 rounded-[14px] bg-[#131B35]/50 border border-[#22305C]/60 text-white font-semibold text-base transition-all duration-300 hover:bg-[#1E294A] hover:border-[#3B4E85] hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 group"
            >
              <plat.icon size={20} className="text-white/80 group-hover:text-white transition-colors" />
              <span>{plat.name}</span>
            </motion.a>
          ))}
        </div>

        {/* Bottom Alert Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center justify-center px-6 py-2.5 bg-[#131B35]/30 border border-[#22305C]/40 rounded-full"
        >
          <p className="text-sm text-slate-300 font-medium select-none">
            <span className="text-emerald-400 font-bold mr-2">✓</span>
            Direct access to our solution engineers. We debug with you.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default function DevelopersPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-ink">
      <CustomCursor />
      <Navbar transparentInitially={true} hideBorder={true} />

      <main>
        <DevelopersHero />
        <ToolkitSection />
        <SandboxSection />
        <SecuritySection />
        <CommunityCTA />
      </main>

      <Footer
        ctaTitle="Start your integration today."
        ctaDescription="Don't reinvent the wheel. Integrate banking-grade tokenization directly into your app. Join the asset managers moving billions on-chain with Nomyx."
        ctaButtonText="View API Reference"
        ctaButtonLink="https://nomyx-io.github.io/gemforce-docs/"
      />
    </div>
  );
}
