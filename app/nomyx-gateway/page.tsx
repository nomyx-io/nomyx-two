"use client";

import { motion } from "motion/react";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { CustomCursor, Navbar, Footer } from "@/app/home";

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
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-ink tracking-tight leading-[1.05] mb-6"
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
            <button className="h-12 md:h-14 px-8 rounded-full bg-accent text-white font-bold text-sm md:text-base hover:bg-accent/90 transition-all shadow-[0_8px_24px_rgba(37,99,235,0.25)] flex items-center justify-center gap-2 group w-full sm:w-auto">
              Launch Your Market
              <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
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

export default function NomyxGatewayPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-ink">
      <CustomCursor />
      <Navbar />

      <main>
        <GatewayHero />
      </main>

      <Footer />
    </div>
  );
}
