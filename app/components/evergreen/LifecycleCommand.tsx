"use client";

import { motion } from "motion/react";
import { BarChart3, Link2, RefreshCw } from "lucide-react";
import { fadeUp, SectionIntro } from "./shared";

export const LifecycleCommand = () => (
  <section className="py-20 md:py-24">
    <div className="custom-container">
      <SectionIntro
        // eyebrow="Live Operations"
        title="Real-Time Nav. Real-Time Trust."
        description=""
      />

      <div className="mt-14 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
          className="flex items-center justify-center border-b border-border/60 p-6 lg:border-b-0 lg:border-r lg:border-border md:p-8"
        >
          <img 
            src="/Fund-Performance-evergreen.png" 
            alt="Fund Performance" 
            className="w-[700px] h-auto object-contain"
          />
        </motion.div>

        <div className="flex min-h-full flex-col lg:pl-16">
          {[
            {
              icon: Link2,
              title: "Oracle Integration",
              text: "Connect to Chainlink or internal data feeds to update token prices automatically as underlying asset values change.",
            },
            {
              icon: RefreshCw,
              title: "24/7 Liquidity",
              text: "Allow LPs to subscribe or redeem at the current NAV instantly, without waiting for end-of-quarter windows.",
            },
            {
              icon: BarChart3,
              title: "Transparent Reporting",
              text: "Give investors a live view of their holdings' value, 24/7. No more waiting for monthly statements.",
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group flex flex-1 gap-6 border-b border-border/60 py-7 lg:py-8 last:border-b-0"
              >
                <div className="flex h-10 w-12 shrink-0 items-center justify-center rounded-lg border border-border bg-white text-accent transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                  <Icon size={22} />
                </div>
                <div>
                  <h3 className="mb-2 text-[25px] font-bold tracking-tight text-ink">
                    {item.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-ink-muted">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);
