"use client";

import { motion } from "motion/react";
import { Users } from "lucide-react";
import { fadeUp, forceHomeNavigation, AnimatedButton } from "../evergreen/shared";

const titleWords = ["Unlock", "Liquidity", "In", "Brick", "&", "Mortar."];

const BuildingVisual = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: 0.3 }}
    className="relative flex flex-col items-center gap-6 md:flex-row md:items-stretch lg:justify-end"
  >
    {/* Left Box: Total Asset Value */}
    <div className="relative w-full max-w-[320px] rounded-[32px] border border-[#0A112815] bg-white p-6 pt-0 shadow-[0_15px_45px_rgba(0,0,0,0.04)]">
      <div className="relative mx-auto -mt-6 mb-6 rounded-2xl bg-[#0A1128] p-6 text-center shadow-2xl">
        <div className="mb-2 text-[12px] font-semibold tracking-widest text-white">Total Asset Value</div>
        <div className="text-[32px] font-bold tracking-tight text-white">$5,000,000</div>
      </div>
      
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={`top-${i}`}
            className="h-9 rounded-md bg-[#2060D4]/80"
            initial={{ opacity: 0.4 }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.1 }}
          />
        ))}
      </div>
    </div>

    {/* Right Box: Minimum Investment */}
    <div className="relative w-full max-w-[320px] rounded-[32px] border border-[#0A112815] bg-white p-6 pt-0 shadow-[0_15px_45px_rgba(0,0,0,0.04)]">
      <div className="relative mx-auto -mt-6 mb-6 rounded-2xl bg-[#2060D4] p-6 text-center shadow-2xl">
        <div className="mb-2 text-[12px] font-semibold tracking-widest text-white">Minimum Investment</div>
        <div className="text-[32px] font-bold tracking-tight text-white">$50,000</div>
        <div className="text-[11px] font-medium text-white/60">per token</div>
      </div>

      <div className="mb-6 grid grid-cols-5 gap-2">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`bottom-${i}`}
            className="h-9 rounded-md bg-[#2060D4]/30"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-[#0A112810] pt-4">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-ink-muted">
          <Users size={14} />
          500 Investors
        </div>
        <div className="text-[10px] font-bold uppercase tracking-widest text-ink-muted">
          100 Tokens
        </div>
      </div>
    </div>
  </motion.div>
);

export const RealEstateHero = () => {
  const words = "Unlock Liquidity In Brick & Mortar.".split(" ");
  return (
    <section 
      className="relative overflow-hidden pt-28"
      style={{
        background: "linear-gradient(to bottom, #D9EFFF 0%, #FFFFFF 100%)"
      }}
    >
      <div className="custom-container relative py-20 md:py-28">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1fr_1.1fr]">
          <motion.div
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.12 }}
          >
            <motion.div variants={fadeUp} className="eyebrow">
              Solution: Real Estate
            </motion.div>
            
            <motion.h1 
              className="text-display mb-8 mt-1"
              initial="hidden"
              animate="show"
              transition={{ staggerChildren: 0.08 }}
            >
              {words.map((word, index) => (
                <motion.span
                  key={`${word}-${index}`}
                  variants={fadeUp}
                  className="mr-[0.18em] inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>
            
            <motion.p
              variants={fadeUp}
              className="prgraphs mb-20 md:text-xl"
            >
              {"Lower your minimum ticket size to access a global pool of capital. Manage 500+ investors as easily as one."
                .split(" ")
                .map((word, index) => (
                  <motion.span
                    key={`${word}-${index}`}
                    className="mr-1 inline-block"
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      show: { opacity: 1, y: 0 }
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
            </motion.p>
            
            <motion.div variants={fadeUp}>
              <AnimatedButton
                href="https://calendly.com/ivan-j-nomyx"
                text="Tokenize Your Property"
                variant="accent"
                className="h-11 !px-7"
              />
            </motion.div>
          </motion.div>

          <BuildingVisual />
        </div>
      </div>
    </section>
  );
};

