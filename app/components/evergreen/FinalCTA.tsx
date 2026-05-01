"use client";

import { motion } from "motion/react";
import { CircleDollarSign } from "lucide-react";
import { fadeUp, forceHomeNavigation, HoverTextSwap } from "./shared";

export const FinalCTA = () => (
  <section className="relative overflow-hidden bg-ink px-6 py-20 text-center text-white md:py-24">
    <motion.div
      className="absolute left-1/2 top-0 h-px w-[70%] -translate-x-1/2 bg-white/30"
      animate={{ opacity: [0.25, 0.8, 0.25] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55 }}
      className="relative"
    >
      <CircleDollarSign className="mx-auto mb-5 text-white/70" size={30} />
      <h2 className="section-heading mx-auto mb-8 max-w-4xl text-white">
        Stop Running Evergreen Funds On Quarterly Deadlines.
      </h2>
      <motion.a
        href="/#cta"
        initial="rest"
        whileHover="hover"
        animate="rest"
        className="inline-flex h-14 items-center justify-center bg-white px-8 text-xs font-black uppercase tracking-[0.14em] text-ink transition-colors hover:bg-white/90"
        onClick={(event) => forceHomeNavigation(event, "/#cta")}
      >
        <HoverTextSwap text="Automate Your Evergreen Fund" />
      </motion.a>
    </motion.div>
  </section>
);
