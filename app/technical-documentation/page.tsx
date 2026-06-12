"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Search,
  BookOpen,
  FileText,
  ArrowUpRight,
  Code,
  Terminal,
  CheckCircle,
  Copy,
  Download,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import { CustomCursor, Navbar, Footer } from "@/app/home";
import { AnimatedButton } from "@/app/components/evergreen/shared";
import { ResourceModal } from "./ResourceModal";

/* ── Resources Hero Section ── */
const ResourcesHero = () => (
  <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-white overflow-hidden">
    {/* Decorative background elements */}
    <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-slate-50 to-transparent pointer-events-none" />
    <div className="absolute top-[-20%] left-[50%] -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-blue-50/50 blur-[120px] pointer-events-none" />

    <div className="custom-container relative z-10 w-full">
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center justify-center px-6 py-2 bg-[#0A1128] rounded-full mb-8 shadow-sm select-none"
        >
          <span className="text-[10px] font-bold text-white uppercase tracking-widest text-center">
            Institutional Library
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-display font-bold md:font-black tracking-tight text-ink mb-6 text-center leading-tight"
        >
          Insights, Documentation, <br className="hidden md:block" />
          And Research.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prgraphs text-ink-muted leading-relaxed font-light max-w-3xl mx-auto mb-10 text-center"
        >
          Explore our technical guides, strategic reports, and developer
          documentation to understand the infrastructure powering the next
          generation of assets.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <AnimatedButton
            text="Visit Developer Docs"
            href="https://nomyx-io.github.io/gemforce-docs/"
            target="_blank"
            rel="noopener noreferrer"
            variant="accent"
          />
        </motion.div>
      </div>
    </div>
  </section>
);

/* ── Build on Nomyx ── */
const BuildOnNomyx = () => (
  <section className="py-20 md:py-28 bg-[#FAFAFA] relative overflow-hidden border-b border-border/40">
    <div className="custom-container relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left: Text Content */}
        <div className="max-w-xl">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-display font-bold md:font-black tracking-tight text-ink mb-6 text-left"
          >
            Build on Nomyx.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="prgraphs text-ink-muted font-light leading-relaxed mb-10"
          >
            Access our comprehensive API references, SDKs, and smart contract
            architecture guides. Everything your engineering team needs to
            integrate.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <AnimatedButton
              text="Visit Developer Docs"
              href="https://nomyx-io.github.io/gemforce-docs/"
              target="_blank"
              rel="noopener noreferrer"
              variant="accent"
            />
          </motion.div>
        </div>

        {/* Right: Premium Terminal Visual */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full max-w-xl mx-auto lg:mr-0 select-none"
        >
          <div className="bg-[#0A1128] rounded-[24px] shadow-[0_24px_60px_rgba(10,17,40,0.06)] border border-white/5 overflow-hidden flex flex-col font-mono">
            {/* Colored Windows dots */}
            <div className="px-6 py-4 border-b border-white/5 flex items-center gap-2 bg-[#0A1128]">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
            </div>

            <div className="p-8 md:p-10 text-[14px] md:text-base leading-relaxed text-slate-300">
              <div className="flex items-center gap-3 text-emerald-400 mb-8">
                <span className="text-xl font-bold">&gt;_</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <span className="text-cyan-400 font-bold">$</span>
                  <span className="text-white font-medium">npm install @nomyx/sdk</span>
                </div>

                <div className="text-slate-500 text-sm">Installing dependencies...</div>

                <div className="flex items-center gap-3 text-emerald-400/90 font-medium">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  <span>Smart contract interfaces</span>
                </div>

                <div className="flex items-center gap-3 text-emerald-400/90 font-medium">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  <span>Compliance modules</span>
                </div>

                <div className="flex items-center gap-3 pt-4">
                  <div className="w-1.5 h-5 bg-emerald-500 rounded-full" />
                  <span className="font-bold text-emerald-500 uppercase tracking-widest text-xs">
                    Ready to build
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Background Glow */}
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-accent/5 blur-[100px] rounded-full pointer-events-none" />
        </motion.div>
      </div>
    </div>
  </section>
);

/* ── Ebook Feature ── */
const EbookFeature = ({ onDownloadClick }: { onDownloadClick: () => void }) => (
  <section className="py-20 md:py-28 bg-white relative overflow-hidden">
    <div className="custom-container relative z-10">
      <div className="bg-[#FAFAFA] rounded-[32px] p-8 md:p-12 lg:p-16 shadow-sm border border-[#0A11281A] relative overflow-hidden">
        {/* Decorative subtle glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Book Cover Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex flex-col items-center justify-center select-none"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative w-full max-w-[300px] aspect-[3/4]"
            >
              <Image
                src="/ebook-cover.png"
                alt="Why Tokenize My Fund? eBook Cover"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-8 text-xs font-bold text-slate-400 tracking-wider uppercase select-none"
            >
              Read by 500+ Asset Managers.
            </motion.p>
          </motion.div>

          {/* Right: Text Content */}
          <div className="relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-display font-bold md:font-black tracking-tight text-ink mb-6 text-left"
            >
              Why Tokenize My Fund?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="prgraphs text-ink-muted font-light leading-relaxed mb-8"
            >
              Unlock the liquidity premium. Download our definitive guide on
              operational efficiency, secondary markets, and the shift to
              &apos;Institutional-Native&apos; funds.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4 mb-10"
            >
              {[
                "The ROI of tokenization for fund managers",
                "Step-by-step implementation roadmap",
                "Compliance and regulatory considerations",
                "Case studies from leading institutions",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-ink-muted font-medium select-none"
                >
                  <CheckCircle2
                    size={20}
                    className="text-[#215EC7] bg-[#215EC7]/10 rounded-full p-0.5 shrink-0"
                  />
                  <span className="text-sm md:text-base text-[#42546E] font-medium">{item}</span>
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <AnimatedButton
                text="Download PDF"
                onClick={(e) => {
                  e.preventDefault();
                  onDownloadClick();
                }}
                variant="accent"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default function ResourcesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans text-ink">
      <CustomCursor />
      <Navbar transparentInitially={true} hideBorder={true} />

      <main>
        <ResourcesHero />
        <BuildOnNomyx />
        <EbookFeature onDownloadClick={() => setIsModalOpen(true)} />
      </main>

      <ResourceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        resourceTitle="Why Tokenize My Fund?"
      />

      <Footer
        ctaTitle="Need a deeper dive?"
        ctaDescription="Schedule a personalized walkthrough with our technical team. Join the asset managers moving billions on-chain with Nomyx."
        ctaButtonText="Schedule a Technical Demo"
        ctaButtonLink="https://calendly.com/ivan-j-nomyx"
      />
    </div>
  );
}
