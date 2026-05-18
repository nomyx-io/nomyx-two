"use client";

import { motion } from "motion/react";
import { ArrowUpRight, TrendingUp, UserCheck, Shield, PieChart, CreditCard, ArrowRight } from "lucide-react";
import Image from "next/image";
import { CustomCursor, Navbar, Footer } from "@/app/home";
import { AnimatedButton } from "@/app/components/evergreen/shared";

/* ── Gateway Hero Section ── */
const GatewayHero = () => (
  <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-[#F4F7FC] min-h-[85vh] flex items-center border-b border-border/40">
    {/* Subtle Background Glows */}
    <div className="absolute top-0 right-0 w-[400px] h-[400px] md:w-[800px] md:h-[800px] bg-accent/5 rounded-full blur-[150px] pointer-events-none translate-x-1/3 -translate-y-1/4" />

    <div className="custom-container relative z-10 w-full">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 lg:gap-12 xl:gap-20 items-center">

        {/* Left Side: Text Content */}
        <div className="text-left max-w-2xl mx-auto xl:mx-0">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-display font-bold md:font-black tracking-tight text-ink mb-6"
          >
            The Gateway: Your White-Label Liquidity Engine.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="prgraphs text-ink-muted font-light mb-10 max-w-xl leading-relaxed"
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
              variant="accent"
            />
          </motion.div>
        </div>

        {/* Right Side: Floating Mockup */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative w-full max-w-md mx-auto xl:max-w-none xl:mx-0 flex justify-center xl:justify-end"
        >
          <div className="bg-white border border-[#0A11281A] rounded-[32px] p-8 md:p-10 shadow-[0_24px_60px_rgba(10,17,40,0.06)] relative flex flex-col items-center w-full max-w-[420px] select-none">

            <h3 className="text-xs md:text-sm font-semibold text-[#42546E] uppercase tracking-[0.12em] mb-6 text-center select-none relative z-10">
              Marketplace Admin View
            </h3>

            <div className="flex flex-col gap-5 w-full relative z-10">
              {/* Stat Card 1 */}
              <div className="bg-[#0A1128] border border-white/[0.05] p-6 rounded-[24px] flex flex-col justify-between min-h-[145px]">
                <span className="text-xs font-semibold text-[#94A3B8] mb-2">Total Volume</span>
                <div className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
                  $127.5M
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#215EC7] bg-[#215EC7]/10 border border-[#215EC7]/10 self-start px-4 py-1.5 rounded-full">
                  <TrendingUp size={14} strokeWidth={2.5} />
                  23.5% this month
                </div>
              </div>

              {/* Stat Card 2 */}
              <div className="bg-[#0A1128] border border-white/[0.05] p-6 rounded-[24px] flex flex-col justify-between min-h-[145px]">
                <span className="text-xs font-semibold text-[#94A3B8] mb-2">Active Investors</span>
                <div className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
                  2,847
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#215EC7] bg-[#215EC7]/10 border border-[#215EC7]/10 self-start px-4 py-1.5 rounded-full">
                  <TrendingUp size={14} strokeWidth={2.5} />
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
  <section className="py-20 md:py-28 bg-white border-b border-border/40 overflow-hidden relative">
    <div className="custom-container relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

        {/* Left Side: Visual Showcase */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="order-2 lg:order-1 relative w-full max-w-2xl mx-auto lg:max-w-none"
        >
          <div className="relative w-full aspect-square rounded-[2.5rem] bg-[#F4F7FC]/70 border border-[#0A11281A] overflow-hidden flex items-center justify-center p-8 md:p-10 select-none">
            <div className="relative w-full h-full rounded-[20px] overflow-hidden bg-white border border-[#0A11281A] flex items-center justify-center p-8 shadow-sm">
              <div className="relative w-full h-full">
                <Image
                  src="/primary-distribution-network.gif"
                  alt="Primary Distribution Network"
                  fill
                  className="object-contain"
                  unoptimized
                  draggable={false}
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
            className="text-display font-bold md:font-black tracking-tight text-ink mb-6 text-left"
          >
            Seamless Primary Distribution.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="prgraphs text-ink-muted font-light mb-10 max-w-xl leading-relaxed"
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
                <div className="shrink-0 mt-0.5">
                  <div className="w-9 h-9 rounded-full bg-[#215EC7]/10 border border-[#215EC7]/10 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-[#215EC7]" />
                  </div>
                </div>
                <div>
                  <h4 className="text-base font-bold text-ink mb-1.5">{feat.title}</h4>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed">
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
    icon: Shield,
  },
  {
    title: "Secure Wallet Infrastructure",
    desc: "Top-tier security via Multi-Party Computation (MPC). Offer both custodial wallets for ease of use and non-custodial wallets for self-sovereignty.",
    icon: UserCheck,
  },
  {
    title: "Automated Distributions",
    desc: "Instantly allocate transaction proceeds to all stakeholders. Reduce errors with smart contract precision and maintain a transparent audit trail.",
    icon: PieChart,
  },
];

const AnyAssetOnePlatform = () => (
  <section className="py-20 md:py-28 bg-[#FAFAFA] relative overflow-hidden">
    <div className="custom-container">
      {/* Centered Title & Subtext */}
      <div className="text-center mb-16 max-w-3xl mx-auto px-4 md:px-0">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-display font-bold md:font-black tracking-tight text-ink mb-6">
            Any Asset. <span className="text-[#215EC7]">One Platform.</span>
          </h2>
          <p className="prgraphs text-ink-muted leading-relaxed font-light">
            Whether you are managing real estate, equities, or alternative assets, the Gateway is asset-agnostic.
          </p>
        </motion.div>
      </div>

      {/* Centered Vertical Stack of Horizontal Cards */}
      <div className="flex flex-col gap-6 max-w-5xl mx-auto px-4 md:px-0">
        {assetFeatures.map((feat, i) => (
          <motion.div
            key={feat.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="bg-white border border-[#0A11281A] rounded-[24px] p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center hover:bg-[#F8FAFC]/50 hover:shadow-md transition-all duration-300 select-none group"
          >
            {/* Column 1: Standalone Icon with Right Divider */}
            <div className="w-16 md:w-24 shrink-0 flex items-center justify-start md:justify-center pr-0 md:pr-6 pb-4 md:pb-0 border-b md:border-b-0 md:border-r border-[#0A11281A] self-stretch md:self-auto">
              <feat.icon size={36} className="text-[#215EC7] shrink-0 animate-none" />
            </div>

            {/* Column 2: Title */}
            <div className="w-full md:w-56 shrink-0 pl-0 md:pl-8 pt-4 md:pt-0 flex items-center">
              <h3 className="text-lg md:text-xl font-bold text-ink leading-tight select-none">
                {feat.title}
              </h3>
            </div>

            {/* Column 3: Description */}
            <div className="flex-1 pl-0 md:pl-8 pt-2 md:pt-0 flex items-center">
              <p className="text-sm md:text-[15px] text-slate-400 font-medium leading-relaxed">
                {feat.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ── Effortless On/Off Ramps ── */
const EffortlessRamps = () => (
  <section className="py-20 md:py-28 bg-white border-b border-border/40 overflow-hidden relative">
    <div className="custom-container relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

        {/* Left Side: Text Content */}
        <div className="max-w-2xl mx-auto lg:mx-0">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-display font-bold md:font-black tracking-tight text-ink mb-6 text-left"
          >
            Effortless On/Off Ramps.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="prgraphs text-ink-muted font-light max-w-xl leading-relaxed"
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
          className="relative w-full max-w-[440px] mx-auto lg:ml-auto lg:mr-0 select-none"
        >
          {/* Decorative Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-accent/5 blur-[80px] rounded-full pointer-events-none" />

          {/* Transfer Mockup Card */}
          <div className="relative bg-white border border-[#0A11281A] rounded-[32px] shadow-[0_24px_60px_rgba(10,17,40,0.06)] p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-[#215EC7]/10 flex items-center justify-center text-[#215EC7]">
                <CreditCard size={18} />
              </div>
              <h3 className="text-base font-bold text-ink select-none">Transfer In</h3>
            </div>

            <div className="h-px bg-slate-100/80 mb-6 w-full" />

            <div className="flex flex-col gap-4 relative">
              {/* Source */}
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2.5 block ml-1 select-none">Source</label>
                <div className="bg-[#F8FAFC] border border-[#0A11281A] rounded-[20px] p-5 select-none">
                  <span className="text-[15px] font-semibold text-ink">ACH Push</span>
                </div>
              </div>

              {/* Arrow Connector */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-sm border border-[#0A11281A] flex items-center justify-center z-10 text-[#215EC7]">
                <ArrowRight size={16} className="rotate-90 text-[#215EC7]" />
              </div>

              {/* Destination */}
              <div className="mt-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2.5 block ml-1 select-none">Destination</label>
                <div className="bg-[#F8FAFC] border border-[#0A11281A] rounded-[20px] p-5 select-none">
                  <span className="text-[15px] font-semibold text-ink">USDC</span>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest select-none">
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
  <section className="py-20 md:py-28 bg-[#FAFAFA] relative overflow-hidden border-b border-border/40">
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
            className="text-display font-bold md:font-black tracking-tight text-ink mb-6 text-left"
          >
            Secure Asset Distribution & Trade.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="prgraphs text-ink-muted font-light max-w-xl leading-relaxed"
          >
            Plug and play with a white-labeled exchange tailored to your specific needs. Expand asset liquidity to reach global markets while retaining complete control over the user experience.
          </motion.p>
        </div>

        {/* Right Side: Bento Box Data View */}
        <div className="lg:col-span-7 select-none">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6"
          >
            {/* TVL Block */}
            <div className="sm:col-span-1 bg-white p-8 md:p-10 rounded-[24px] shadow-sm border border-[#0A11281A] flex flex-col justify-center min-h-[175px] hover:shadow-md hover:bg-[#F8FAFC]/50 transition-all duration-300">
              <span className="text-xs font-semibold text-slate-400 mb-4 uppercase tracking-wider select-none">Total Value Locked</span>
              <span className="text-4xl lg:text-5xl font-bold text-ink tracking-tight select-none">$24.5M</span>
            </div>

            {/* Investors Block */}
            <div className="sm:col-span-1 bg-white p-8 md:p-10 rounded-[24px] shadow-sm border border-[#0A11281A] flex flex-col justify-center min-h-[175px] hover:shadow-md hover:bg-[#F8FAFC]/50 transition-all duration-300">
              <span className="text-xs font-semibold text-slate-400 mb-4 uppercase tracking-wider select-none">Active Investors</span>
              <span className="text-4xl lg:text-5xl font-bold text-ink tracking-tight select-none">1,247</span>
            </div>

            {/* CTA Block (Spans full width) */}
            <div className="sm:col-span-2 bg-[#0A1128] p-8 md:p-10 rounded-[24px] shadow-md border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 relative overflow-hidden group hover:bg-[#131B32] transition-colors duration-300">
              <div className="relative z-10">
                <h4 className="text-white font-bold text-xl md:text-2xl mb-2 tracking-tight select-none">Marketplace Project View</h4>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest select-none">Instant liquidity for your investors</p>
              </div>

              <button className="bg-white hover:bg-slate-100 text-ink font-bold text-sm px-6 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 select-none shrink-0 shadow-sm border border-slate-200">
                <span>Swap Collateral</span>
                <ArrowRight size={16} className="text-ink" />
              </button>
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
      <Navbar transparentInitially={true} hideBorder={true} />

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
