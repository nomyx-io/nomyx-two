"use client";

import { motion } from "motion/react";
import { ArrowRight, Activity, Database, RefreshCw } from "lucide-react";
import {
  fadeUp,
  forceHomeNavigation,
  HoverTextSwap,
  AnimatedButton,
} from "./shared";

const headlineWords = ["The", "Perpetual", "Fund.", "Automated."];

const AnimatedHeadline = () => (
  <motion.h1
    className="text-display mb-6 mt-1"
    aria-label="The Perpetual Fund. Automated."
  >
    {headlineWords.map((word, index) => (
      <motion.span
        key={word}
        className="mr-[0.18em] inline-block overflow-hidden align-bottom"
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.65,
          delay: 0.18 + index * 0.12,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {word}
      </motion.span>
    ))}
  </motion.h1>
);

export const EvergreenHero = () => (
  <section
    className="relative overflow-hidden text-ink pt-18"
    style={{
      background: "linear-gradient(to bottom, #D9EFFF 0%, #FFFFFF 100%)",
    }}
  >
    <div className="custom-container relative grid grid-cols-1 items-center gap-12 py-24 md:py-28 lg:grid-cols-[1.05fr_0.95fr]">
      <motion.div
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.12 }}
      >
        <motion.div variants={fadeUp} className="eyebrow">
          Solution: Evergreen & Open-Ended Funds
        </motion.div>
        <AnimatedHeadline />
        <motion.p variants={fadeUp} className="prgraphs mb-20 md:text-xl">
          {"Replace quarterly operational drag with 'always-on' efficiency. Support continuous subscriptions, real-time redemptions, and dynamic NAV updates."
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                className="mr-1 inline-block"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.55 + index * 0.025 }}
              >
                {word}
              </motion.span>
            ))}
        </motion.p>
        <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
          <AnimatedButton
            text="Modernize Your Fund"
            href="https://calendly.com/ivan-j-nomyx/30min"
            variant="accent"
            className="h-11 !px-7"
            onClick={(event) =>
              forceHomeNavigation(
                event,
                "https://calendly.com/ivan-j-nomyx/30min",
              )
            }
          />

          {/* <motion.a
            href="#live-operations"
            initial="rest"
            whileHover="hover"
            animate="rest"
            className="inline-flex h-14 items-center border border-border bg-white px-8 text-xs font-black uppercase tracking-[0.14em] text-ink transition-colors hover:bg-slate-50"
          >
            <HoverTextSwap text="View Workflow" />
          </motion.a> */}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative flex justify-end"
      >
        <img
          src="/evergreen-hero-visual.png"
          alt="Evergreen Fund Visual"
          className="w-[600px] h-auto object-contain"
        />
      </motion.div>
    </div>
  </section>
);
