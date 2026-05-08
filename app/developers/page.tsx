"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Terminal, CheckCircle2, Code, TerminalSquare, Zap, Code2, ArrowRight, ShieldCheck, Key, Network, Fingerprint, Github, MessageSquare, Layers} from "lucide-react";
import { CustomCursor, Navbar, Footer } from "@/app/home";
import { AnimatedButton } from "@/app/components/evergreen/shared";

/* ── Developers Hero Section ── */
const DevelopersHero = () => (
  <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 bg-white overflow-hidden min-h-[90vh] flex items-center">
    {/* Clean White Theme Background with Grid */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
    
    {/* Subtle Glows to make the dark terminal pop */}
    <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-blue-100/50 blur-[100px] rounded-full pointer-events-none" />
    <div className="absolute bottom-[10%] left-[20%] w-[400px] h-[400px] bg-emerald-50/50 blur-[100px] rounded-full pointer-events-none" />

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
            <span className="inline-flex border-2 border-accent px-5 py-2.5 text-sm font-bold uppercase tracking-[0.12em] text-[#1E3A8A]">
              Nomyx API v2.0
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-display mb-6 mt-1"
          >
            The Infrastructure Layer for Real-World Assets.
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-ink-muted leading-relaxed mb-10 font-medium"
          >
            Don't reinvent the wheel. Integrate banking-grade tokenization, identity, and compliance directly into your application with a few lines of code.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <AnimatedButton 
              text="Read the Docs" 
              href="https://nomyx-io.github.io/gemforce-docs/" 
              variant="ink" 
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
            <div className="relative bg-[#0B1120] rounded-2xl shadow-[0_40px_100px_rgba(11,17,32,0.2)] overflow-hidden border border-slate-800">
              
              {/* macOS Window Controls */}
              <div className="px-5 py-4 flex items-center gap-2 border-b border-slate-800/60 bg-[#0B1120]">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <div className="ml-4 text-xs font-mono text-slate-500 flex items-center gap-2">
                  <Terminal size={12} /> ~/terminal
                </div>
              </div>
              
              {/* Code Content */}
              <div className="p-6 md:p-8 font-mono text-[13px] md:text-sm leading-loose text-slate-300">
                {/* Request */}
                <div className="mb-8">
                  <span className="text-emerald-400 mr-2">$</span>
                  <span className="text-emerald-300">curl</span> https://api.nomyx.io/v2/assets/mint \<br/>
                  &nbsp;&nbsp;<span className="text-sky-300">-H</span> <span className="text-amber-300">"Authorization: Bearer sk_live_..."</span> \<br/>
                  &nbsp;&nbsp;<span className="text-sky-300">-d</span> <span className="text-amber-300">'{'{"amount": 1000000, "recipient": "0x..."}'}'</span>
                </div>

                {/* Response Block (Nested styling) */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="bg-[#0f172a] rounded-xl p-5 border border-slate-700/50 shadow-inner"
                >
                  <span className="text-slate-400">{'{'}</span><br/>
                  &nbsp;&nbsp;<span className="text-sky-300">"status"</span>: <span className="text-emerald-300">"success"</span>,<br/>
                  &nbsp;&nbsp;<span className="text-sky-300">"txHash"</span>: <span className="text-amber-300">"0x7f3b..."</span>,<br/>
                  &nbsp;&nbsp;<span className="text-sky-300">"code"</span>: <span className="text-fuchsia-400">200</span><br/>
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
            
            {/* Floating Decorative Elements (for 'different animation style') */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -bottom-8 -left-8 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 z-20"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Status</div>
                <div className="text-sm font-bold text-ink">API Online</div>
              </div>
            </motion.div>
            
          </motion.div>
        </div>

      </div>
    </div>
  </section>
);

/* ── Toolkit Section (Anti-Card Row Layout) ── */
const ToolkitSection = () => {
  const features = [
    {
      icon: TerminalSquare,
      title: "GraphQL & REST",
      description: "Query your asset data with precision. Our GraphQL API allows you to fetch complex ownership structures in a single request.",
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      icon: Zap,
      title: "Webhooks & Events",
      description: "Real-time settlement. Subscribe to on-chain events like TransferSettled or ComplianceCheckFailed to update your internal UI instantly.",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    },
    {
      icon: Code2,
      title: "Type-Safe SDKs",
      description: "Ship faster with fully typed SDKs for TypeScript, Python, and Go.",
      color: "text-fuchsia-500",
      bg: "bg-fuchsia-500/10"
    }
  ];

  return (
    <section className="section-padding bg-slate-50 relative overflow-hidden">
      <div className="custom-container max-w-5xl relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-heading mb-20 md:mb-28 text-center"
        >
          A Complete Toolkit for <br className="hidden md:block"/> Fintech Engineering.
        </motion.h2>

        <div className="flex flex-col">
          {features.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-12 py-10 md:py-16 border-t border-slate-200 transition-colors cursor-pointer"
            >
              {/* Animated Hover Background */}
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10 rounded-3xl scale-95 group-hover:scale-100 shadow-[0_20px_40px_rgba(10,17,40,0.04)]" />
              
              <div className="flex items-center gap-6 md:gap-8 md:w-[45%] px-4 md:px-8">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${item.bg} ${item.color} group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500`}>
                  <item.icon size={32} strokeWidth={2} />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-ink group-hover:translate-x-2 transition-transform duration-500">
                  {item.title}
                </h3>
              </div>
              
              <div className="md:w-[55%] flex items-center justify-between gap-6 px-4 md:px-8">
                <p className="text-lg text-ink-muted leading-relaxed font-medium">
                  {item.description}
                </p>
                <div className="hidden md:flex w-12 h-12 rounded-full bg-slate-100 items-center justify-center text-slate-400 group-hover:bg-accent group-hover:text-white transition-colors shrink-0 group-hover:-rotate-45 duration-500 shadow-sm">
                  <ArrowRight size={20} />
                </div>
              </div>
            </motion.div>
          ))}
          <div className="border-t border-slate-200" />
        </div>
      </div>
    </section>
  )
}

/* ── Sandbox Section ── */
const SandboxSection = () => {
  const [isTestnet, setIsTestnet] = useState(true);

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="custom-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Side: Interactive Sandbox Widget */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative mx-auto w-full max-w-md lg:max-w-lg"
          >
            {/* Dynamic Background blur ring */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full blur-[100px] transition-colors duration-1000 pointer-events-none ${isTestnet ? 'bg-emerald-100/50' : 'bg-rose-100/50'}`} />

            <div className="relative bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_24px_48px_rgba(10,17,40,0.08)] border border-slate-100 overflow-hidden">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-xl md:text-2xl font-black text-ink">Environment</h3>
                
                {/* Interactive Toggle */}
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-bold transition-colors duration-500 ${!isTestnet ? 'text-ink' : 'text-slate-400'}`}>Mainnet</span>
                  
                  <button 
                    onClick={() => setIsTestnet(!isTestnet)}
                    className={`relative w-14 h-7 rounded-full transition-colors duration-500 flex items-center px-1 shadow-inner focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent ${isTestnet ? 'bg-emerald-500' : 'bg-slate-800'}`}
                    aria-label="Toggle Environment"
                  >
                    <motion.div 
                      layout
                      className="w-5 h-5 bg-white rounded-full shadow-sm"
                      animate={{ x: isTestnet ? 28 : 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </button>
                  
                  <span className={`text-xs font-bold transition-colors duration-500 ${isTestnet ? 'text-emerald-500' : 'text-slate-400'}`}>Testnet</span>
                </div>
              </div>

              {/* Data Rows */}
              <div className="space-y-3">
                <motion.div 
                  layout
                  className={`flex items-center justify-between p-4 md:p-5 rounded-xl transition-colors duration-500 ${isTestnet ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}
                >
                  <span className="text-sm font-bold">Mode</span>
                  <motion.span 
                    key={isTestnet ? 'test' : 'prod'}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs font-black tracking-widest uppercase"
                  >
                    {isTestnet ? 'TESTNET' : 'PRODUCTION'}
                  </motion.span>
                </motion.div>

                <div className="flex items-center justify-between p-4 md:p-5 rounded-xl bg-slate-50 text-ink">
                  <span className="text-sm font-bold">Network</span>
                  <motion.span 
                    key={isTestnet ? 'sep' : 'eth'}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-sm font-mono font-bold text-slate-500"
                  >
                    {isTestnet ? 'Sepolia' : 'Ethereum'}
                  </motion.span>
                </div>

                <div className="flex items-center justify-between p-4 md:p-5 rounded-xl bg-slate-50 text-ink">
                  <span className="text-sm font-bold">Gas Cost</span>
                  <motion.span 
                    key={isTestnet ? 'gas-free' : 'gas-paid'}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`text-sm font-mono font-bold transition-colors duration-500 ${isTestnet ? 'text-emerald-500' : 'text-rose-500'}`}
                  >
                    {isTestnet ? '$0.00' : '$14.25'}
                  </motion.span>
                </div>
              </div>

              <p className="text-center text-[13px] font-medium text-slate-400 mt-8 italic">
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
              className="section-heading mb-6"
            >
              Build Without Spending Real Money.
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-ink-muted leading-relaxed font-medium"
            >
              Develop in a safe, mirrored environment. Our Sandbox mimics mainnet conditions (including gas and block times) but uses testnet currency, so you can stress-test your application cost-free.
            </motion.p>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ── Security Section ── */
const SecuritySection = () => {
  const securityFeatures = [
    { icon: Key, text: "Granular API Scopes (Read/Write/Admin)." },
    { icon: Network, text: "IP Whitelisting for API Keys." },
    { icon: Fingerprint, text: "MFA-Protected Org Settings." },
    { icon: ShieldCheck, text: "SOC 2 Type II Certified Infrastructure." },
  ];

  return (
    <section className="section-padding bg-slate-50 relative overflow-hidden border-t border-slate-200">
      <div className="custom-container relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm"
          >
            <ShieldCheck size={32} />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-heading"
          >
            Enterprise Security Standards.
          </motion.h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {securityFeatures.map((feat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-9 rounded-2xl border border-slate-200 transition-all duration-300 group hover:border-ink hover:shadow-[0_30px_60px_rgba(10,17,40,0.06)] cursor-default"
            >
              <div className="w-14 h-14 rounded-xl bg-slate-50 flex items-center justify-center mb-8 transition-all duration-300 group-hover:bg-ink group-hover:text-white text-slate-400">
                <feat.icon size={26} />
              </div>
              
              <p className="font-bold text-ink text-lg leading-relaxed">
                {feat.text}
              </p>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

/* ── Community CTA ── */
const CommunityCTA = () => {
  const platforms = [
    { name: "GitHub", icon: Github, hoverClass: "hover:bg-[#24292F] hover:border-[#24292F]" },
    { name: "Discord", icon: MessageSquare, hoverClass: "hover:bg-[#5865F2] hover:border-[#5865F2]" },
    { name: "Stack Overflow", icon: Layers, hoverClass: "hover:bg-[#F58025] hover:border-[#F58025]" },
  ];

  return (
    <section className="pt-32 pb-40 bg-[#0A1128] relative overflow-hidden text-center">
      {/* Immersive Dark Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-500/10 blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
      
      <div className="custom-container relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-heading text-white! mb-16"
        >
          Join the Builders.
        </motion.h2>
        
        {/* Interactive Floating Platform Tiles */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8 mb-16">
          {platforms.map((plat, i) => (
            <motion.a 
              key={i}
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`flex items-center gap-3 md:gap-4 px-6 md:px-10 py-4 md:py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-lg md:text-xl transition-all duration-300 ${plat.hoverClass} shadow-lg hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] hover:-translate-y-2 group`}
            >
              <plat.icon size={28} className="text-slate-400 group-hover:text-white transition-colors" />
              {plat.name}
            </motion.a>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center justify-center px-6 py-3 bg-white/5 rounded-full border border-white/10"
        >
          <p className="text-sm md:text-base text-slate-300 font-medium">
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
      <Navbar />

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
