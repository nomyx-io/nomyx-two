"use client";

import { motion } from "motion/react";
import { AnimatedButton } from "../AnimatedButton";
import { fadeUp, forceHomeNavigation } from "../evergreen/shared";

export const Servicer = () => (
  <>
    <section className="border-b border-border bg-ink py-20 text-center text-white md:py-24">
      <div className="custom-container">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55 }}
        >
          <h2 className="section-heading mx-auto mb-5 max-w-4xl text-white">
            Works With Your Servicer.
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-white/70">
            API-first integration for seamless data flow.
          </p>
          <div className="mx-auto grid max-w-4xl grid-cols-1 border border-white/15 md:grid-cols-3">
            {[
              ["Webhooks", "Payment confirmation"],
              ["Oracles", "Interest rate updates"],
              ["API Integration", "Fiat/crypto ramp connectivity"],
            ].map(([title, text]) => (
              <div key={title} className="border-b border-white/15 p-6 md:border-b-0 md:border-r last:md:border-r-0">
                <h3 className="mb-2 font-black uppercase tracking-tight text-white">{title}</h3>
                <p className="text-sm text-white/55">{text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>

    <section className="border-b border-border bg-white px-6 py-16 text-center">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55 }}
      >
        <h2 className="section-heading mx-auto mb-8 max-w-4xl">
          Scale Your AUM Without Scaling Your Back Office.
        </h2>
        <AnimatedButton
          href="/#cta"
          text="Demo The Distribution Engine"
          bgColor="bg-ink"
          hoverBgColor="hover:bg-accent"
          textColor="text-white"
          onClick={(event) => forceHomeNavigation(event, "/#cta")}
        />
      </motion.div>
    </section>
  </>
);

