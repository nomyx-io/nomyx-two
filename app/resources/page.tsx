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
          className="inline-flex items-center justify-center px-5 py-2 bg-emerald-50 border border-emerald-100 rounded-full mb-8 shadow-sm"
        >
          <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-widest text-center">
            Institutional Library
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="section-heading mb-6"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
        >
          Insights, Documentation, <br className="hidden md:block" />
          and Research.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-ink-muted leading-relaxed font-medium max-w-2xl mx-auto mb-10"
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
            variant="ink"
          />
        </motion.div>
      </div>
    </div>
  </section>
);

/* ── Build on Nomyx ── */
const BuildOnNomyx = () => (
  <section className="section-padding bg-slate-50 relative overflow-hidden">
    {/* Subtle Grid Background Pattern */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]" />

    <div className="custom-container relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left: Text Content */}
        <div className="max-w-xl">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-heading mb-6 text-left"
          >
            Build on Nomyx.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-ink-muted leading-relaxed mb-10"
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
              variant="ink"
            />
          </motion.div>
        </div>

        {/* Right: Premium Terminal Visual */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full max-w-xl mx-auto lg:mr-0"
        >
          <div className="bg-[#0B1120] rounded-[2rem] shadow-[0_32px_80px_rgba(10,17,40,0.15)] border border-slate-800 overflow-hidden flex flex-col font-mono">
            <div className="px-6 py-4 border-b border-slate-800/60 flex items-center gap-2 bg-[#0B1120]">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
            </div>

            <div className="p-8 md:p-10 text-[14px] md:text-base leading-relaxed text-slate-300">
              <div className="flex items-center gap-3 text-emerald-400 mb-8">
                <span className="text-xl">&gt;_</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-emerald-400">$</span>
                  <span className="text-slate-200">npm install @nomyx/sdk</span>
                </div>

                <div className="text-slate-500">Installing dependencies...</div>

                <div className="flex items-center gap-3 text-emerald-400/90">
                  <CheckCircle size={16} />
                  <span>Smart contract interfaces</span>
                </div>

                <div className="flex items-center gap-3 text-emerald-400/90">
                  <CheckCircle size={16} />
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
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-accent/10 blur-[100px] rounded-full pointer-events-none" />
        </motion.div>
      </div>
    </div>
  </section>
);

/* ── Ebook Feature ── */
const EbookFeature = ({ onDownloadClick }: { onDownloadClick: () => void }) => (
  <section className="section-padding bg-white relative overflow-hidden">
    <div className="custom-container relative z-10">
      <div className="bg-slate-50 rounded-[2.5rem] p-8 md:p-12 lg:p-16 shadow-[0_8px_30px_rgba(10,17,40,0.04)] border border-border relative overflow-hidden">
        {/* Decorative subtle glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Book Cover Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex flex-col items-center justify-center"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative w-full max-w-[340px] aspect-[3/4]"
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
              className="mt-8 text-sm font-bold text-slate-400 tracking-wide"
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
              className="section-heading mb-6 text-left"
            >
              Why Tokenize My Fund?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-ink-muted leading-relaxed mb-8 font-medium"
            >
              Unlock the liquidity premium. Download our definitive guide on
              operational efficiency, secondary markets, and the shift to
              'Institutional-Native' funds.
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
                  className="flex items-start gap-3 text-ink-muted font-medium"
                >
                  <CheckCircle2
                    size={20}
                    className="text-emerald-500 shrink-0 mt-0.5"
                  />
                  <span>{item}</span>
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
                variant="ink"
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
      <Navbar />

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
