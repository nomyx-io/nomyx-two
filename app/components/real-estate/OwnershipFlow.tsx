"use client";

import { motion } from "motion/react";
import { Banknote, FileSearch, KeyRound, Users } from "lucide-react";
import { fadeUp, SectionIntro } from "../evergreen/shared";

export const OwnershipFlow = () => (
  <section className="border-b border-border py-20 md:py-24">
    <div className="custom-container">
      <SectionIntro
        eyebrow="Asset Lifecycle"
        title="From Property Title To Investor Wallet."
        description="Nomyx turns a real estate asset into programmable ownership, with compliance, subscriptions, and distributions in one workflow."
      />

      <div className="relative mt-14 grid grid-cols-1 border border-border bg-white md:grid-cols-4">
        <motion.div
          className="absolute left-[12%] top-1/2 hidden h-px w-[76%] bg-accent/25 md:block"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          style={{ transformOrigin: "left" }}
        />
        {[
          [FileSearch, "Verify", "Title, documents, and asset data are captured as the source of truth."],
          [KeyRound, "Structure", "Create ownership classes, transfer rules, and investor permissions."],
          [Users, "Subscribe", "Qualified investors receive tokenized ownership positions."],
          [Banknote, "Distribute", "Rent and proceeds are routed to holders automatically."],
        ].map(([Icon, title, text], index) => {
          const TypedIcon = Icon as typeof FileSearch;
          return (
            <motion.div
              key={title as string}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="group relative border-b border-border p-8 transition-colors hover:bg-slate-50 md:border-b-0 md:border-r last:md:border-r-0"
            >
              <div className="mb-7 flex h-14 w-14 items-center justify-center border border-border text-accent transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                <TypedIcon size={24} />
              </div>
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

