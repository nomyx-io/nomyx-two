"use client";

import { motion } from "motion/react";
import { AnimatedButton } from "../AnimatedButton";
import { fadeUp, forceHomeNavigation } from "../evergreen/shared";

export const RealEstateFinalCTA = () => (
  <section className="bg-ink px-6 py-20 text-center text-white md:py-24">
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55 }}
    >
      <h2 className="section-heading mx-auto mb-8 max-w-3xl text-white">
        Turn Your Property Into A Liquid Asset.
      </h2>
      <AnimatedButton
        href="/#cta"
        text="Start A Real Estate Pilot"
        bgColor="bg-white"
        hoverBgColor="hover:bg-white/90"
        textColor="text-ink"
        onClick={(event) => forceHomeNavigation(event, "/#cta")}
      />
    </motion.div>
  </section>
);

