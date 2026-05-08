"use client";

import { motion } from "motion/react";
import { Users } from "lucide-react";
import { fadeUp, forceHomeNavigation, AnimatedButton } from "../evergreen/shared";

const titleWords = ["Unlock", "Liquidity", "In", "Brick", "&", "Mortar."];

const BuildingVisual = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95, x: 20 }}
    animate={{ opacity: 1, scale: 1, x: 0 }}
    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
    className="relative mx-auto mt-6 flex w-full max-w-[360px] flex-col gap-10 lg:ml-auto"
  >
    {/* Top Section */}
    <div className="relative mt-6 rounded-3xl border border-slate-200 bg-white p-6 pt-0 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
      {/* Overlapping Top Card */}
      <div className="relative mx-auto -mt-6 mb-6 w-[85%] rounded-2xl bg-ink p-5 text-center shadow-xl shadow-slate-200/50">
        <div className="mb-1 text-[12px] font-bold text-white">Total Asset Value</div>
        <div className="text-3xl font-black tracking-tight text-[#31d6c7]">$5,000,000</div>
      </div>
      
      {/* Top Grid */}
      <div className="grid grid-cols-5 gap-2.5">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={`top-${i}`}
            className="h-8 rounded-[4px] bg-accent"
            animate={{ opacity: [0.75, 1, 0.75] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.05 }}
          />
        ))}
      </div>
    </div>

    {/* Bottom Section */}
    <div className="relative mt-8 rounded-3xl border border-slate-200 bg-white p-6 pt-0 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
      {/* Overlapping Bottom Card */}
      <div className="relative mx-auto -mt-8 mb-6 w-[92%] rounded-2xl bg-gradient-to-br from-[#31d6c7] to-emerald-500 p-6 text-white shadow-xl shadow-emerald-500/20">
        <div className="mb-1 text-[12px] font-bold text-white/90">Minimum Investment</div>
        <div className="mb-1 text-4xl font-black tracking-tight">$50,000</div>
        <div className="text-[11px] font-medium text-white/80">per token</div>
      </div>

      {/* Bottom Grid */}
      <div className="mb-6 grid grid-cols-10 gap-1.5">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={`bottom-${i}`}
            className="h-4 rounded-[3px] bg-accent/70"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.03 }}
          />
        ))}
      </div>

      {/* Text Footer */}
      <div className="flex items-center justify-between border-t border-slate-100 pt-5">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
          <Users size={14} />
          500 Investors
        </div>
        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
          100 Tokens
        </div>
      </div>
    </div>
  </motion.div>
);

export const RealEstateHero = () => (
  <section className="relative overflow-hidden border-b border-border bg-white pb-16 pt-28 md:pb-24 md:pt-32">
    <div className="custom-container relative z-10">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.1 }}
          className="max-w-xl"
        >
          <motion.div
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-slate-500 shadow-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-accent"></span>
            Solution: Real Estate
          </motion.div>
          
          <motion.h1 className="text-display mb-8 text-[clamp(42px,6vw,64px)] leading-[1.05] tracking-tight text-ink">
            {titleWords.map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                className="mr-[0.18em] inline-block overflow-hidden align-bottom"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.7,
                  delay: 0.1 + index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
          
          <motion.p
            variants={fadeUp}
            className="mb-10 text-lg font-medium leading-relaxed text-slate-500 md:text-xl"
          >
            Lower your minimum ticket size to access a global pool of capital.
            Manage 500+ investors as easily as one.
          </motion.p>
          
          <motion.div variants={fadeUp} className="flex flex-col items-center gap-4 sm:flex-row">
            <AnimatedButton
              href="https://calendly.com/ivan-j-nomyx"
              text="Tokenize Your Property"
              variant="ink"
              onClick={(event) => forceHomeNavigation(event, "https://calendly.com/ivan-j-nomyx")}
            />
          </motion.div>
        </motion.div>

        <BuildingVisual />
      </div>
    </div>
  </section>
);

