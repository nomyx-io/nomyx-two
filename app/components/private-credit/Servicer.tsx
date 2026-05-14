"use client";

import { motion } from "motion/react";

import { fadeUp, forceHomeNavigation } from "../evergreen/shared";

export const Servicer = () => (
  <section className="relative overflow-hidden bg-ink py-20 text-center text-white md:py-32">
    {/* Decorative Radial Gradients */}
    <div className="pointer-events-none absolute -right-[10%] -top-[10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(32,96,212,0.15)_0%,transparent_70%)]" />
    <div className="pointer-events-none absolute -bottom-[10%] -left-[10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(32,96,212,0.15)_0%,transparent_70%)]" />

    <div className="custom-container relative">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.55 }}
      >
        <h2 className="section-heading mx-auto mb-6 max-w-4xl text-white!">
          Works With Your Servicer.
        </h2>
        <p className="mx-auto mb-14 max-w-2xl text-[17px] leading-relaxed text-white/70 md:text-xl">
          API-first integration for seamless data flow.
        </p>
        <div className="mx-auto grid max-w-5xl grid-cols-1 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm md:grid-cols-3">
          {[
            ["Webhooks", "Payment confirmation"],
            ["Oracles", "Interest rate updates"],
            ["API Integration", "Fiat/crypto ramp connectivity"],
          ].map(([title, text], index) => (
            <div 
              key={title} 
              className={`relative p-10 transition-colors hover:bg-white/5 ${
                index !== 2 ? "border-b border-white/10 md:border-b-0 md:border-r" : ""
              }`}
            >
              <h3 className="mb-3 text-[23px] text-white">{title}</h3>
              <p className="text-[15px] leading-relaxed text-white">{text}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);
