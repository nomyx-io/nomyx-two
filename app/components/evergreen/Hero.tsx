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
    <motion.span
      className="mt-2 block h-1.5 w-24 bg-accent"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}
      style={{ transformOrigin: "left" }}
    />
  </motion.h1>
);

const FundLoop = () => (
  <motion.svg
    initial={{ opacity: 0, scale: 0.94 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.2, duration: 0.65 }}
    viewBox="0 0 400 300"
    className="mx-auto w-full max-w-md"
  >
    <defs>
      <linearGradient
        id="loopGradientEvergreen"
        x1="0%"
        y1="0%"
        x2="100%"
        y2="100%"
      >
        <stop offset="0%" stopColor="#0A1128" />
        <stop offset="50%" stopColor="#1E3A8A" />
        <stop offset="100%" stopColor="#0A1128" />
      </linearGradient>
      <filter id="glowEvergreen">
        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <path
      d="M 100 150 Q 100 80, 150 80 Q 200 80, 200 150 Q 200 220, 250 220 Q 300 220, 300 150 Q 300 80, 250 80 Q 200 80, 200 150 Q 200 220, 150 220 Q 100 220, 100 150 Z"
      fill="none"
      stroke="url(#loopGradientEvergreen)"
      strokeWidth="4"
      filter="url(#glowEvergreen)"
      opacity="0.86"
    />
    <circle r="6" fill="#0A1128" filter="url(#glowEvergreen)">
      <animateMotion
        dur="8s"
        repeatCount="indefinite"
        path="M 100 150 Q 100 80, 150 80 Q 200 80, 200 150 Q 200 220, 250 220 Q 300 220, 300 150 Q 300 80, 250 80 Q 200 80, 200 150 Q 200 220, 150 220 Q 100 220, 100 150 Z"
      />
    </circle>
    <circle r="6" fill="#1E3A8A" filter="url(#glowEvergreen)">
      <animateMotion
        dur="8s"
        repeatCount="indefinite"
        begin="2s"
        path="M 100 150 Q 100 80, 150 80 Q 200 80, 200 150 Q 200 220, 250 220 Q 300 220, 300 150 Q 300 80, 250 80 Q 200 80, 200 150 Q 200 220, 150 220 Q 100 220, 100 150 Z"
      />
    </circle>
    {[
      ["Subscription", 130, 65],
      ["Deployment", 270, 65],
      ["Yield", 330, 150],
      ["NAV Update", 270, 250],
      ["Redemption", 130, 250],
    ].map(([label, x, y]) => (
      <text
        key={label}
        x={x}
        y={y}
        fill="#42546E"
        fontSize="12"
        fontWeight="700"
        textAnchor="middle"
      >
        {label}
      </text>
    ))}
  </motion.svg>
);

const SignalRail = () => (
  <div className="absolute inset-x-8 bottom-8 hidden h-px overflow-hidden bg-accent/10 lg:block">
    <motion.span
      className="block h-full w-1/3 bg-accent"
      animate={{ x: ["-100%", "320%"] }}
      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

const HeroConsole = () => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.18, duration: 0.6 }}
    className="group relative overflow-hidden border border-border bg-white shadow-[0_30px_80px_rgba(10,17,40,0.12)]"
  >
    <div className="grid grid-cols-3 border-b border-border text-center">
      {[
        ["NAV", "$10.42"],
        ["WINDOW", "24/7"],
        ["SETTLE", "T+0"],
      ].map(([label, value]) => (
        <div key={label} className="border-r border-border p-5 last:border-r-0">
          <div className="mb-1 font-mono uppercase tracking-[0.16em] text-ink-muted">
            {label}
          </div>
          <div className="text-2xl font-black text-ink">{value}</div>
        </div>
      ))}
    </div>
    <div className="relative p-8">
      <FundLoop />
      <SignalRail />
    </div>
    <div className="grid grid-cols-3 border-t border-border">
      {[
        [Activity, "Subscription accepted"],
        [Database, "NAV update queued"],
        [RefreshCw, "Redemption cleared"],
      ].map(([Icon, item]) => {
        const TypedIcon = Icon as typeof Activity;

        return (
          <motion.div
            key={item as string}
            initial="rest"
            whileHover="hover"
            animate="rest"
            className="flex items-center gap-3 border-r border-border p-4 text-sm font-semibold text-ink-muted last:border-r-0"
          >
            <TypedIcon size={15} className="text-accent" />
            {item as string}
          </motion.div>
        );
      })}
    </div>
  </motion.div>
);

export const EvergreenHero = () => (
  <section className="relative overflow-hidden border-b border-border bg-white text-ink">
    <div className="custom-container relative grid grid-cols-1 items-center gap-12 py-24 md:py-28 lg:grid-cols-[1.05fr_0.95fr]">
      <motion.div
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.12 }}
      >
        <motion.div
          variants={fadeUp}
          className="mb-7 inline-flex border border-accent/30  px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-accent"
        >
          Solution: Evergreen & Open-Ended Funds
        </motion.div>
        <AnimatedHeadline />
        <motion.p
          variants={fadeUp}
          className="mb-8 max-w-3xl text-lg leading-relaxed text-ink-muted md:text-xl"
        >
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
      <HeroConsole />
    </div>
  </section>
);
