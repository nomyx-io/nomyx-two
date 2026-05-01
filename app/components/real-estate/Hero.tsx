"use client";

import { motion } from "motion/react";
import { ArrowRight, Building2, Coins, Users } from "lucide-react";
import { fadeUp, forceHomeNavigation, HoverTextSwap } from "../evergreen/shared";

const titleWords = ["Unlock", "Liquidity", "In", "Brick", "&", "Mortar."];

const BuildingVisual = () => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    className="relative mx-auto w-full max-w-md"
  >
    {/* border border-border bg-white p-8 shadow-[0_30px_80px_rgba(10,17,40,0.12)] */}
    <div className="relative overflow-hidden ">
       {/* [background-image:linear-gradient(#0A1128_1px,transparent_1px),linear-gradient(90deg,#0A1128_1px,transparent_1px)] [background-size:28px_28px] */}
      <div className="absolute inset-0 opacity-[0.045]" />
      <motion.div
        className="absolute right-8 top-8 h-24 w-24 rotate-45 border border-accent/15"
        animate={{ rotate: [45, 60, 45], opacity: [0.35, 0.75, 0.35] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="relative mx-auto mb-7 max-w-xs border border-border bg-slate-50 p-5 text-center">
        <Building2 className="mx-auto mb-3 text-[#31d6c7]" size={32} />
        <div className="text-xs font-black uppercase tracking-[0.14em] text-ink-muted">Total Asset Value</div>
        <motion.div
          className="text-3xl font-black text-[#31d6c7]"
          animate={{ opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 2.4, repeat: Infinity }}
        >
          $5,000,000
        </motion.div>
      </div>

      <div className="relative mx-auto grid max-w-xs grid-cols-5 gap-2">
        {Array.from({ length: 50 }).map((_, index) => {
          const active = index < 32;
          return (
            <motion.span
              key={index}
              className={`h-5 border ${active ? "border-accent/40 bg-accent" : "border-border bg-slate-100"}`}
              animate={{
                scale: active ? [1, 1.08, 1] : 1,
                opacity: active ? [0.72, 1, 0.72] : 0.45,
              }}
              transition={{ duration: 2.2, repeat: Infinity, delay: index * 0.025 }}
            />
          );
        })}
      </div>

      <motion.div
        className="relative mx-auto mt-8 max-w-sm border border-accent/35 bg-accent/10 p-5 text-ink"
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-ink-muted">Minimum Investment</div>
            <div className="text-3xl font-black">$50,000</div>
            <div className="text-[10px] uppercase text-ink-muted">per token</div>
          </div>
          <Coins className="text-[#31d6c7]" size={34} />
        </div>
        <div className="flex items-center justify-between border-t border-border pt-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-ink-muted">
            <Users size={14} />
            500 Investors
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted">100 Tokens</div>
        </div>
      </motion.div>

      <svg viewBox="0 0 420 80" className="relative mt-7 h-20 w-full">
        <motion.path
          d="M40 38 C118 8 142 72 210 38 C282 0 308 76 380 38"
          fill="none"
          stroke="#31d6c7"
          strokeWidth="3"
          strokeDasharray="8 8"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        {[40, 210, 380].map((x, index) => (
          <motion.circle
            key={x}
            cx={x}
            cy="38"
            r="6"
            fill="#31d6c7"
            animate={{ r: [5, 9, 5], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: index * 0.35 }}
          />
        ))}
      </svg>
    </div>
  </motion.div>
);

export const RealEstateHero = () => (
  <section className="relative overflow-hidden border-b border-border bg-white pt-28">
    <div className="absolute inset-0 opacity-[0.055] [background-image:linear-gradient(#0A1128_1px,transparent_1px),linear-gradient(90deg,#0A1128_1px,transparent_1px)] [background-size:54px_54px]" />
    <motion.div
      className="absolute left-[7%] top-32 h-32 w-32 border border-accent/15"
      animate={{ rotate: [0, 8, 0], y: [0, 12, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    />
    <div className="custom-container relative grid grid-cols-1 items-center gap-12 py-20 md:py-24 lg:grid-cols-[1.05fr_0.95fr]">
      <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.1 }}>
        <motion.div variants={fadeUp} className="mb-7 inline-flex border border-accent/30 bg-accent/5 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-accent">
          Solution: Real Estate
        </motion.div>
        <motion.h1 className="text-display mb-6 max-w-4xl text-[clamp(50px,6.6vw,96px)] text-ink">
          {titleWords.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              className="mr-[0.18em] inline-block overflow-hidden align-bottom"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.65, delay: 0.16 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>
        <motion.p variants={fadeUp} className="mb-8 max-w-3xl text-lg leading-relaxed text-ink-muted md:text-xl">
          Lower your minimum ticket size to access a global pool of capital. Manage 500+ investors as easily as one.
        </motion.p>
        <motion.a
          href="/#cta"
          initial="rest"
          whileHover="hover"
          animate="rest"
          onClick={(event) => forceHomeNavigation(event, "/#cta")}
          className="inline-flex h-14 items-center gap-3 bg-ink px-8 text-xs font-black uppercase tracking-[0.14em] text-white transition-colors hover:bg-accent"
        >
          <HoverTextSwap text="Tokenize Your Property" />
          <ArrowRight size={16} />
        </motion.a>
      </motion.div>
      <BuildingVisual />
    </div>
  </section>
);

