"use client";

import { motion } from "motion/react";
import { AnimatedButton } from "../AnimatedButton";
import { fadeUp, forceHomeNavigation } from "../evergreen/shared";

export const SpvFinalCTA = () => (
  <section className="relative overflow-hidden bg-ink px-6 py-20 text-center text-white md:py-24">
    <motion.div
      className="absolute left-1/2 top-0 h-px w-[72%] -translate-x-1/2 bg-white/30"
      animate={{ opacity: [0.2, 0.85, 0.2] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55 }}
    >
      <h2 className="section-heading mx-auto mb-8 max-w-3xl text-white">
        Ready For Your Next Deal?
      </h2>
      <AnimatedButton
        href="/#cta"
        text="Launch An SPV Demo"
        bgColor="bg-white"
        hoverBgColor="hover:bg-white/90"
        textColor="text-ink"
        onClick={(event) => forceHomeNavigation(event, "/#cta")}
      />
    </motion.div>
  </section>
);

