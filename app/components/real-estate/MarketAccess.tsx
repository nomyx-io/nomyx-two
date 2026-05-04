"use client";

import { motion } from "motion/react";
import { ArrowRightLeft, BadgeCheck, LockKeyhole } from "lucide-react";
import { fadeUp, SectionIntro } from "../evergreen/shared";

export const MarketAccess = () => (
  <section className="border-b border-border py-20 md:py-24">
    <div className="custom-container">
      <SectionIntro
        eyebrow="Secondary Access"
        title="Liquidity Without Losing Control."
        description="Give investors a compliant transfer path while preserving issuer rules, eligibility checks, and asset-level controls."
      />
      <div className="mt-14 grid grid-cols-1 border border-border bg-white md:grid-cols-3">
        {[
          [LockKeyhole, "Permissioned Transfers", "Only whitelisted investors can receive property interests."],
          [ArrowRightLeft, "Secondary Matching", "Create controlled exits without selling the underlying building."],
          [BadgeCheck, "Issuer Controls", "Pause, approve, or restrict transfers according to your rules."],
        ].map(([Icon, title, text], index) => {
          const TypedIcon = Icon as typeof LockKeyhole;
          return (
            <motion.div
              key={title as string}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="group border-b border-border p-8 transition-colors hover:bg-slate-50 md:border-b-0 md:border-r last:md:border-r-0"
            >
              <TypedIcon className="mb-6 text-accent transition-transform group-hover:translate-x-1" size={28} />
              <h3 className="mb-4 text-2xl font-black uppercase tracking-tight text-ink">
                {title as string}
              </h3>
              <p className="text-sm leading-relaxed text-ink-muted">{text as string}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

