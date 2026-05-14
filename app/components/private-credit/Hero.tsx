"use client";

import { motion } from "motion/react";
import { ArrowDown, ArrowRight, Landmark, Repeat2, Wallet } from "lucide-react";
import { fadeUp, forceHomeNavigation, HoverTextSwap, AnimatedButton } from "../evergreen/shared";

const AnimatedHeadline = () => {
  const words = "Syndicate Loans On-Chain. Service Off-Chain.".split(" ");
  return (
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
  );
};

export const PrivateCreditHero = () => (
  <section 
    className="relative overflow-hidden pt-28"
    style={{
      background: "linear-gradient(to bottom, #D9EFFF 0%, #FFFFFF 100%)"
    }}
  >
    <div className="custom-container relative grid grid-cols-1 items-center gap-12 py-24 md:py-28 lg:grid-cols-[1.05fr_0.95fr]">
      <motion.div
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.12 }}
      >
        <motion.div variants={fadeUp} className="eyebrow">
          Solution: Private Credit Syndication
        </motion.div>
        <AnimatedHeadline />
        <motion.p variants={fadeUp} className="prgraphs mb-20 md:text-xl">
          {"The most efficient way to manage your LP capital stack. Aggregate liquidity on-chain, deploy fiat to borrowers, and automate yield distribution back to investors instantly."
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
            text="Streamline LP Distributions"
            variant="accent"
            className="h-11 !px-7"
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative flex justify-end"
      >
        <img
          src="/onchain-layer-hero.png"
          alt="Private Credit Syndication"
          className="w-[500px] h-auto max-w-[600px] object-contain"
        />
      </motion.div>
    </div>
  </section>
);
