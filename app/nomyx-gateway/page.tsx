"use client";

import { motion } from "motion/react";
import { ArrowUpRight, TrendingUp, UserCheck, Shield, PieChart, CreditCard, ArrowRight } from "lucide-react";
import Image from "next/image";
import { CustomCursor, Navbar, Footer } from "@/app/home";
import { AnimatedButton } from "@/app/components/evergreen/shared";

/* ── Gateway Hero Section ── */
const GatewayHero = () => (
  <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-white min-h-[85vh] flex items-center">
    {/* Subtle Background Glows */}
    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[150px] pointer-events-none translate-x-1/3 -translate-y-1/4" />

    <div className="custom-container relative z-10 w-full">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 lg:gap-12 xl:gap-20 items-center">
        
        {/* Left Side: Text Content */}
        <div className="text-left max-w-2xl mx-auto xl:mx-0">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-heading mb-6"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
          >
            The Gateway: Your White-Label Liquidity Engine.
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-ink-muted leading-relaxed mb-10"
          >
            Deploy a branded, compliant marketplace infrastructure. From primary issuance to secondary trading, manage the entire lifecycle of your digital assets in one platform.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-start justify-start gap-4"
          >
            <AnimatedButton 
              text="Launch Your Market" 
              href="https://calendly.com/ivan-j-nomyx" 
              variant="ink" 
            />
          </motion.div>
        </div>

        {/* Right Side: Floating Mockup */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative w-full max-w-2xl mx-auto xl:max-w-none"
        >
          <div className="bg-[#0A1128] rounded-[2rem] p-8 md:p-10 border border-[#1a2340] shadow-[0_32px_80px_rgba(10,17,40,0.15)] overflow-hidden relative">
            {/* Subtle internal glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-[100px] pointer-events-none" />

            <h3 className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-[0.15em] mb-8 relative z-10">
              Marketplace Admin View
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2 gap-6 relative z-10">
              {/* Stat Card 1 */}
              <div className="bg-[#121933]/80 backdrop-blur-md border border-[#1f2947] p-6 rounded-[1.5rem] flex flex-col hover:bg-[#121933] transition-colors">
                <span className="text-xs font-semibold text-slate-400 mb-2">Total Volume</span>
                <div className="text-3xl md:text-4xl font-black text-white tracking-tight mb-6">
                  $127.5M
                </div>
                <div className="flex items-center gap-1.5 text-[10px] md:text-[11px] font-bold text-emerald-400 bg-emerald-400/10 self-start px-3 py-1.5 rounded-full mt-auto border border-emerald-500/20">
                  <TrendingUp size={14} strokeWidth={3} />
                  23.5% this month
                </div>
              </div>

              {/* Stat Card 2 */}
              <div className="bg-[#121933]/80 backdrop-blur-md border border-[#1f2947] p-6 rounded-[1.5rem] flex flex-col hover:bg-[#121933] transition-colors">
                <span className="text-xs font-semibold text-slate-400 mb-2">Active Investors</span>
                <div className="text-3xl md:text-4xl font-black text-white tracking-tight mb-6">
                  2,847
                </div>
                <div className="flex items-center gap-1.5 text-[10px] md:text-[11px] font-bold text-emerald-400 bg-emerald-400/10 self-start px-3 py-1.5 rounded-full mt-auto border border-emerald-500/20">
                  <TrendingUp size={14} strokeWidth={3} />
                  158 new this week
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

/* ── Primary Distribution ── */
const primaryFeatures = [
  {
    title: "Automated Compliance",
    desc: "Rules are enforced at the smart contract level before distribution occurs.",
  },
  {
    title: "Instant Settlement",
    desc: "Reduce reconciliation time from days to seconds.",
  },
  {
    title: "Broad Access",
    desc: "Reach a global network of investors with a single issuance event.",
  },
];

const PrimaryDistribution = () => (
  <section className="section-padding bg-slate-50/50 border-y border-border overflow-hidden relative">
    <div className="custom-container relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        
        {/* Left Side: Visual / GIF Showcase */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="order-2 lg:order-1 relative w-full max-w-2xl mx-auto lg:max-w-none"
        >
          <div className="relative w-full aspect-square md:aspect-[4/3] rounded-[2.5rem] bg-gradient-to-br from-blue-50 to-indigo-50/30 border border-blue-100/50 shadow-[0_20px_60px_rgba(37,99,235,0.05)] overflow-hidden flex items-center justify-center p-8 md:p-12">
            <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />
            
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-white shadow-sm border border-white/50 flex items-center justify-center p-6">
              <div className="relative w-full h-full">
                <Image 
                  src="/primary-distribution-network.gif" 
                  alt="Primary Distribution Network Visualization" 
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Text Content */}
        <div className="order-1 lg:order-2 max-w-2xl mx-auto lg:mx-0">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-heading mb-6 text-left"
          >
            Seamless Primary Distribution.
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-lg text-ink-muted leading-relaxed mb-10"
          >
            Streamline the capital formation process. The Gateway acts as your central hub, automating the distribution of assets from the issuer directly to verified investors.
          </motion.p>

          <div className="space-y-8">
            {primaryFeatures.map((feat, i) => (
              <motion.div 
                key={feat.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + (i * 0.1) }}
                className="flex gap-5"
              >
                <div className="shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                </div>
                <div>
                  <h4 className="text-base font-bold text-ink mb-1.5">{feat.title}</h4>
                  <p className="text-sm text-ink-muted leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  </section>
);

/* ── Any Asset. One Platform. ── */
const assetFeatures = [
  {
    title: "Seamless Onboarding",
    desc: "Satisfies KYC/AML requirements instantly. Simplify the registration process so users can join and trade quickly without friction.",
    icon: UserCheck,
  },
  {
    title: "Secure Wallet Infrastructure",
    desc: "Top-tier security via Multi-Party Computation (MPC). Offer both custodial wallets for ease of use and non-custodial wallets for self-sovereignty.",
    icon: Shield,
  },
  {
    title: "Automated Distributions",
    desc: "Instantly allocate transaction proceeds to all stakeholders. Reduce errors with smart contract precision and maintain a transparent audit trail.",
    icon: PieChart,
  },
];

const AnyAssetOnePlatform = () => (
  <section className="py-24 md:py-32 bg-white relative">
    <div className="custom-container">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
        
        {/* Sticky Left Column */}
        <div className="w-full lg:w-1/3 lg:sticky lg:top-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-heading mb-6 text-left">
              Any Asset. <br className="hidden lg:block" />
              <span className="text-accent">One Platform.</span>
            </h2>
            <p className="text-lg text-ink-muted leading-relaxed font-medium">
              Whether you are managing real estate, equities, or alternative assets, the Gateway is asset-agnostic.
            </p>
          </motion.div>
        </div>

        {/* Scrolling Right Column */}
        <div className="w-full lg:w-2/3 flex flex-col gap-8 md:gap-10">
          {assetFeatures.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white border border-border rounded-[2rem] p-8 md:p-12 shadow-[0_8px_30px_rgba(10,17,40,0.04)] hover:shadow-[0_24px_60px_rgba(10,17,40,0.08)] transition-all duration-500 flex flex-col sm:flex-row gap-6 md:gap-8 items-start group"
            >
              <div className="w-16 h-16 shrink-0 rounded-2xl bg-accent/5 border border-accent/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-accent group-hover:border-accent transition-all duration-500">
                <feat.icon size={28} className="text-accent group-hover:text-white transition-colors duration-500" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-ink tracking-tight mb-4 group-hover:text-accent transition-colors duration-300">
                  {feat.title}
                </h3>
                <p className="text-base md:text-lg text-ink-muted leading-relaxed font-medium">
                  {feat.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  </section>
);

/* ── Effortless On/Off Ramps ── */
const EffortlessRamps = () => (
  <section className="section-padding bg-slate-50/50 border-t border-border overflow-hidden relative">
    <div className="custom-container relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        
        {/* Left Side: Text Content */}
        <div className="max-w-2xl mx-auto lg:mx-0">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-heading mb-6 text-left"
          >
            Effortless On/Off Ramps.
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-lg text-ink-muted leading-relaxed"
          >
            Bridge the gap between traditional banking and digital currency. The Gateway supports global traditional payment methods (ACH/Wire), allowing users to move funds in and out with minimal friction.
          </motion.p>
        </div>

        {/* Right Side: Tailwind UI Mockup */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full max-w-[440px] mx-auto lg:ml-auto lg:mr-0"
        >
          {/* Decorative Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-accent/5 blur-[80px] rounded-full pointer-events-none" />

          {/* Transfer Mockup Card */}
          <div className="relative bg-white rounded-3xl border border-border shadow-[0_32px_80px_rgba(10,17,40,0.06)] p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                <CreditCard size={18} />
              </div>
              <h3 className="text-base font-bold text-ink">Transfer In</h3>
            </div>

            <div className="h-px bg-slate-100 mb-6 w-full" />

            <div className="flex flex-col gap-4 relative">
              {/* Source */}
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2.5 block ml-1">Source</label>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:border-accent/30 transition-colors cursor-default">
                  <span className="text-[15px] font-semibold text-ink">ACH Push</span>
                </div>
              </div>

              {/* Arrow Connector */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-[0_4px_16px_rgba(10,17,40,0.08)] flex items-center justify-center z-10 text-accent border border-slate-100">
                <ArrowRight size={16} className="rotate-90 text-accent/70" />
              </div>

              {/* Destination */}
              <div className="mt-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2.5 block ml-1">Destination</label>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:border-accent/30 transition-colors cursor-default">
                  <span className="text-[15px] font-semibold text-ink">USDC</span>
                </div>
              </div>
            </div>

            <div className="mt-10 text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Direct Fiat Integration
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  </section>
);

/* ── Secure Asset Distribution & Trade ── */
const SecureAssetDistribution = () => (
  <section className="section-padding bg-slate-50/50 relative overflow-hidden">
    <div className="custom-container relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center">
        
        {/* Left Side: Text */}
        <div className="lg:col-span-5 pr-0 lg:pr-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full mb-8 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">Marketplace Live</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-heading mb-6 text-left"
          >
            Secure Asset Distribution & Trade.
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-ink-muted leading-relaxed font-medium"
          >
            Plug and play with a white-labeled exchange tailored to your specific needs. Expand asset liquidity to reach global markets while retaining complete control over the user experience.
          </motion.p>
        </div>

        {/* Right Side: Bento Box Data View */}
        <div className="lg:col-span-7">
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6"
          >
            {/* TVL Block */}
            <div className="sm:col-span-1 bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_8px_30px_rgba(10,17,40,0.04)] border border-border flex flex-col justify-center min-h-[220px] hover:shadow-[0_20px_60px_rgba(10,17,40,0.08)] transition-all duration-500 hover:-translate-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Total Value Locked</span>
              <span className="text-4xl lg:text-5xl font-black text-ink tracking-tight">$24.5M</span>
            </div>

            {/* Investors Block */}
            <div className="sm:col-span-1 bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_8px_30px_rgba(10,17,40,0.04)] border border-border flex flex-col justify-center min-h-[220px] hover:shadow-[0_20px_60px_rgba(10,17,40,0.08)] transition-all duration-500 hover:-translate-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Active Investors</span>
              <span className="text-4xl lg:text-5xl font-black text-ink tracking-tight">1,247</span>
            </div>

            {/* CTA Block (Spans full width) */}
            <div className="sm:col-span-2 bg-[#0F766E] p-8 md:p-10 rounded-[2rem] shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 relative overflow-hidden group">
              {/* Background glow effect inside teal card */}
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <h4 className="text-white font-bold text-xl md:text-2xl mb-2 tracking-tight">Marketplace Project View</h4>
                <p className="text-[#99F6E4] text-xs font-bold uppercase tracking-widest opacity-90">Instant liquidity for your investors</p>
              </div>
              
              <AnimatedButton 
                text="Swap Collateral" 
                variant="white" 
              />
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  </section>
);

export default function NomyxGatewayPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-ink">
      <CustomCursor />
      <Navbar />

      <main>
        <GatewayHero />
        <PrimaryDistribution />
        <AnyAssetOnePlatform />
        <EffortlessRamps />
        <SecureAssetDistribution />
      </main>

      <Footer 
        ctaTitle="Your Ecosystem. Powered by Nomyx."
        ctaDescription="We provide the banking-grade rails. You provide the vision. Deliver a seamless digital experience that keeps your investors within your brand."
        ctaButtonText="Deploy Your Branded Portal"
        ctaButtonLink="https://calendly.com/ivan-j-nomyx"
      />
    </div>
  );
}
