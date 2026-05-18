"use client";

import { motion } from "motion/react";
import {
  ArrowDown,
  ArrowRight,
  Check,
  Code2,
  GitBranch,
  Lock,
  Network,
  ShieldCheck,
  TimerReset,
  X,
  CheckCircle2,
} from "lucide-react";
import { CustomCursor, Footer, Navbar } from "../home";
import {
  fadeUp,
  forceHomeNavigation,
  HoverTextSwap,
  SectionIntro,
  AnimatedButton,
} from "./evergreen/shared";

const facets = [
  ["Governance Facet", "(Upgradeable)", 80, 80],
  ["Compliance Facet", "(Upgradeable)", 360, 80],
  ["Yield Facet", "(Upgradeable)", 80, 250],
  ["Core Asset Storage", "(Immutable)", 360, 250],
];

const DiamondArchitecture = () => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.65, delay: 0.18 }}
    className="relative mx-auto w-full max-w-xl overflow-hidden border border-[#0A11281A] bg-[#FAFAFA] rounded-[32px] p-6 shadow-sm select-none flex items-center justify-center aspect-[4/3]"
  >
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(33,94,199,0.06),transparent_40%),radial-gradient(circle_at_50%_48%,rgba(10,17,40,0.04),transparent_60%)]" />

    <svg viewBox="0 0 560 390" className="relative w-full">
      <defs>
        <filter id="diamondGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Dotted Connecting Lines */}
      {[
        [200, 138, 260, 190],
        [360, 138, 300, 190],
        [200, 264, 260, 220],
        [360, 264, 300, 220],
      ].map(([x1, y1, x2, y2], index) => (
        <g key={`${x1}-${y1}`}>
          <path
            d={`M${x1} ${y1} L${x2} ${y2}`}
            stroke="#215EC7"
            strokeWidth="2"
            strokeDasharray="5 6"
            opacity="0.3"
          />
          <motion.circle
            r="4.5"
            fill="#215EC7"
            filter="url(#diamondGlow)"
            animate={{ cx: [x1, x2], cy: [y1, y2], opacity: [0, 1, 0] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: index * 0.3,
              ease: "easeInOut",
            }}
          />
        </g>
      ))}

      {/* Central Core Proxy Card */}
      <g>
        <rect
          x="250"
          y="175"
          width="60"
          height="60"
          rx="8"
          fill="#0A1128"
          stroke="#215EC7"
          strokeWidth="2"
          filter="url(#diamondGlow)"
        />
        <text x="280" y="202" textAnchor="middle" fill="white" fontSize="11" fontWeight="800">
          Core
        </text>
        <text x="280" y="216" textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="600">
          Proxy
        </text>
      </g>

      {/* Four Outer Facet Cards */}
      {facets.map(([title, label, x, y], index) => {
        const isImmutable = title === "Core Asset Storage";
        return (
          <g key={title}>
            <rect
              x={x as number}
              y={y as number}
              width="120"
              height="64"
              rx="12"
              fill={isImmutable ? "#0A1128" : "#215EC7"}
              stroke={isImmutable ? "#1E293B" : "#3B82F6"}
              strokeWidth="2.5"
              filter={isImmutable ? undefined : "url(#diamondGlow)"}
            />
            <text
              x={(x as number) + 60}
              y={(y as number) + 28}
              textAnchor="middle"
              fill="white"
              fontSize="10"
              fontWeight="800"
            >
              {title}
            </text>
            <text
              x={(x as number) + 60}
              y={(y as number) + 44}
              textAnchor="middle"
              fill={isImmutable ? "#64748B" : "#93C5FD"}
              fontSize="8"
              fontWeight="700"
              opacity="0.9"
            >
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  </motion.div>
);

const DiamondHero = () => (
  <section className="relative overflow-hidden bg-white pt-32 pb-16 md:pt-40 md:pb-24 text-ink">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_30%,#D9EFFF_0%,transparent_60%),radial-gradient(circle_at_70%_26%,rgba(33,94,199,0.04),transparent_40%)]" />

    <div className="custom-container relative grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
      <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.1 }} className="text-left">
        <motion.div
          variants={fadeUp}
          className="mb-7"
        >
          <span className="eyebrow px-5 py-2.5 rounded-full border border-ink/10 bg-white/50 inline-block">
            EIP-2535 Architecture
          </span>
        </motion.div>

        <h1 className="text-display font-bold md:font-black tracking-tight text-ink mb-6 mt-1 leading-tight text-left">
          Smart Contracts <br className="hidden md:block" />
          That Never Expire.
        </h1>

        <motion.p variants={fadeUp} className="prgraphs text-ink-muted leading-relaxed font-light max-w-xl text-left mb-8">
          The immutability paradox is solved. Build on modular, upgradeable infrastructure that adapts to regulatory changes without costly migrations or token swaps.
        </motion.p>

        <motion.div variants={fadeUp}>
          <AnimatedButton
            text="Consult With Our Solutions Architect"
            href="https://calendly.com/ivan-j-nomyx/30min"
            variant="accent"
          />
        </motion.div>
      </motion.div>
      <DiamondArchitecture />
    </div>
  </section>
);

const Monoliths = () => (
  <section className="border-b border-border/40 py-20 md:py-24 bg-[#FAFAFA]">
    <div className="custom-container">
      <SectionIntro
        eyebrow="Upgradeable Infrastructure"
        title="Stop Building Monoliths."
        description="Why the standard ERC-20 model is a risk to institutional longevity."
      />

      <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Card 1: Standard ERC-20 */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="border border-[#0A11281A] bg-white rounded-[24px] p-8 md:p-10 shadow-sm flex flex-col justify-between"
        >
          <div>
            <div className="mb-8 flex justify-start">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-500 border border-rose-100">
                <Lock size={24} />
              </div>
            </div>
            <h3 className="mb-6 text-left text-2xl font-black uppercase tracking-tight text-ink">
              Standard ERC-20
            </h3>
            <div className="space-y-6">
              {[
                ["Size limit constraints (24kb)", "Complex logic requires multiple contracts."],
                ["Impossible to upgrade", "Logic is frozen at deployment."],
                ["Requires full migration if one bug is found", "New address, new audits, user disruption."],
              ].map(([title, text]) => (
                <div key={title} className="flex gap-4 items-start text-left select-none">
                  <X className="text-rose-500 bg-rose-50 rounded-full p-0.5 shrink-0 mt-0.5" size={18} />
                  <div>
                    <div className="text-sm font-bold text-ink">{title}</div>
                    <p className="text-xs md:text-sm leading-relaxed text-ink-muted mt-1">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Card 2: Nomyx Diamond Proxy */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          transition={{ delay: 0.08 }}
          className="border border-[#215EC7]/20 bg-white rounded-[24px] p-8 md:p-10 shadow-sm flex flex-col justify-between"
        >
          <div>
            <div className="mb-8 flex justify-start">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#215EC7] border border-blue-100">
                <Network size={24} />
              </div>
            </div>
            <h3 className="mb-6 text-left text-2xl font-black uppercase tracking-tight text-ink">
              Nomyx Diamond Proxy
            </h3>
            <div className="space-y-6">
              {[
                ["Unlimited size (add infinite facets)", "No contract size limits."],
                ["Granular upgrades", "Update individual modules without touching others."],
                ["Stable contract address forever", "Zero user migration. Continuous compliance."],
              ].map(([title, text]) => (
                <div key={title} className="flex gap-4 items-start text-left select-none">
                  <Check className="text-[#215EC7] bg-[#215EC7]/10 rounded-full p-0.5 shrink-0 mt-0.5" size={18} />
                  <div>
                    <div className="text-sm font-bold text-ink">{title}</div>
                    <p className="text-xs md:text-sm leading-relaxed text-ink-muted mt-1">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const UpgradeFlow = () => {
  const steps = [
    ["Develop", "Engineers write a new Compliance Facet v2 to match the new law."],
    ["Audit", "Only the new v2 facet needs to be audited, saving time and cost."],
    ["Propose", "The upgrade is proposed via on-chain governance (Multi-sig or DAO)."],
    ["Cut", "The Diamond Proxy points delegates calls to the new v2 facet. The old v1 facet is disconnected."],
  ];

  return (
    <section className="border-b border-border/40 bg-white py-20 md:py-24">
      <div className="custom-container">
        {/* Custom High-Fidelity Header Matching Mockup */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-4xl text-center mb-14"
        >
          <span className="eyebrow px-5 py-2.5 rounded-full border border-ink/10 bg-white/50 inline-block">
            Upgrade Path
          </span>
          <h2 className="text-display font-bold md:font-black tracking-tight text-ink mb-4 mt-1 text-center leading-tight">
            How An Upgrade Works.
          </h2>
          <p className="prgraphs text-ink-muted leading-relaxed font-light max-w-xl mx-auto text-center">
            Scenario: Regulation changes in 2026. Here is how you adapt.
          </p>
        </motion.div>

        <div className="mx-auto mt-14 max-w-4xl space-y-4">
          {steps.map(([title, text], index) => (
            <div key={title} className="flex flex-col items-center w-full">
              <div className="w-full bg-white border border-[#0A11281A] rounded-[16px] p-6 flex flex-row items-center gap-6 shadow-sm">
                <div className="text-4xl font-semibold text-[#215EC7] w-12 text-center shrink-0 border-r border-[#0A11281A] pr-6 py-2 select-none">
                  {index + 1}
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8 flex-1 text-left">
                  <h4 className="text-lg font-bold text-ink shrink-0 md:w-32">{title}</h4>
                  <p className="text-sm text-ink-muted font-light leading-relaxed">{text}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="my-6 flex items-center justify-center text-[#215EC7] text-2xl font-light select-none">
                  ↓
                </div>
              )}
            </div>
          ))}

          {/* Upgrade Result Box */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            className="border border-[#215EC7]/20 bg-gradient-to-b from-white via-[#F4FBF6] to-[#E8F8EC] rounded-[24px] p-10 shadow-sm mt-8 relative flex flex-col md:flex-row items-center justify-between gap-6 select-none"
          >
            {/* Center Result Label Pill with White background gap overlap */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-6 flex items-center gap-3 z-10 select-none">
              <CheckCircle2 size={24} className="text-white fill-[#215EC7]" />
              <span className="text-xl font-extrabold text-ink">Result</span>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-8 w-full pt-4">
              {[
                "Token address remains the same.",
                "User balances are untouched.",
                "The logic is updated.",
              ].map((result, rIdx) => (
                <div key={rIdx} className="flex items-center gap-1 md:whitespace-nowrap">
                  <CheckCircle2 size={20} className="text-white fill-[#215EC7] shrink-0" />
                  <span className="text-base font-bold text-ink">{result}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const LogicSeparation = () => (
  <section className="border-b border-border/40 bg-[#FAFAFA] py-20 text-ink md:py-24">
    <div className="custom-container grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
        className="text-left"
      >
        <h2 className="text-display font-bold md:font-black tracking-tight text-ink mb-6 text-left">
          Separation Of State And Logic.
        </h2>
        <p className="prgraphs text-ink-muted leading-relaxed font-light mb-8 max-w-xl">
          Nomyx utilizes &quot;Diamond Storage&quot; to ensure that state variables (who owns what) are kept distinct from logic facets. This prevents storage collisions during upgrades.
        </p>
        <div className="space-y-4">
          {[
            "Each facet has its own isolated storage namespace.",
            "Zero risk of storage slot conflicts during upgrades.",
            "Asset balances are preserved across all logic updates.",
          ].map((item) => (
            <div key={item} className="flex gap-3 text-sm md:text-base font-semibold text-ink select-none items-center">
              <ShieldCheck
                size={20}
                className="text-[#215EC7] bg-[#215EC7]/10 rounded-full p-0.5 shrink-0"
              />
              <span className="text-[#42546E] font-medium">{item}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="overflow-hidden border border-[#0A11281A] bg-[#0A1128] rounded-[24px] shadow-sm select-none"
      >
        <div className="border-b border-white/5 bg-[#0B1120] px-5 py-3 font-mono text-[11px] text-slate-400 flex items-center justify-between">
          <span>&lt;&gt; DiamondCut.sol</span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
        </div>
        <div className="overflow-x-auto p-6 md:p-8 text-xs md:text-sm leading-relaxed font-mono text-slate-300 text-left select-text">
          <div className="text-slate-500">// Add new compliance facet</div>
          <div>
            <span className="text-fuchsia-400 font-bold">IDiamondCut.FacetCut[]</span>{" "}
            <span className="text-slate-400">memory</span>{" "}
            <span className="text-white">cut</span> =
          </div>
          <div className="pl-4">
            <span className="text-slate-400">new</span>{" "}
            <span className="text-fuchsia-400 font-bold">IDiamondCut.FacetCut[]</span>(1);
          </div>

          <div className="mt-4">
            <span className="text-white">cut</span>[0] ={" "}
            <span className="text-fuchsia-400 font-bold">IDiamondCut.FacetCut</span>({'{'}
          </div>
          <div className="pl-6">
            <span className="text-cyan-400">facetAddress</span>:{" "}
            <span className="text-white font-medium">complianceFacetV2</span>,
          </div>
          <div className="pl-6">
            <span className="text-cyan-400">action</span>:{" "}
            <span className="text-white font-medium">FacetCutAction.Add</span>,
          </div>
          <div className="pl-6">
            <span className="text-cyan-400">functionSelectors</span>:{" "}
            <span className="text-white font-medium">selectors</span>
          </div>
          <div className="pl-2">{'}'});</div>

          <div className="mt-4 text-slate-500">// Execute upgrade</div>
          <div>
            <span className="text-emerald-400">diamond</span>.
            <span className="text-white">diamondCut</span>(
          </div>
          <div className="pl-4 text-white">cut,</div>
          <div className="pl-4">
            <span className="text-slate-400">address</span>(0),
          </div>
          <div className="pl-4 text-white">&quot;&quot;</div>
          <div>);</div>

          <div className="mt-6 text-emerald-400 font-bold flex items-center gap-2 select-none">
            <span>~ reserved, logic updated ✔</span>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const Complexity = () => (
  <section className="border-b border-border/40 py-20 md:py-24 bg-white">
    <div className="custom-container">
      <SectionIntro
        title="Onboard Investors In Minutes."
      />
      <div className="mt-14 border border-[#0A11281A] bg-white rounded-[24px] overflow-hidden grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#0A11281A] shadow-sm select-none">
        {[
          [GitBranch, "EIP-2535 Standard", "We did not invent this pattern; we perfected the implementation. Based on the peer-reviewed Ethereum Improvement Proposal."],
          [Lock, "Facet Isolation", "A vulnerability in the voting facet cannot compromise the custody facet. Modular security by design."],
          [TimerReset, "Time-Lock Upgrades", "All upgrades are subject to a mandatory time-lock, giving the community time to veto malicious changes."],
        ].map(([Icon, title, text]) => {
          const TypedIcon = Icon as typeof Code2;

          return (
            <div
              key={title as string}
              className="p-8 md:p-10 flex flex-col justify-start text-left"
            >
              <div className="mb-6 flex h-10 w-10 items-center justify-center bg-blue-50 text-[#215EC7] rounded-xl border border-blue-100/50">
                <TypedIcon size={20} />
              </div>
              <h3 className="mb-4 text-lg font-black text-ink">
                {title as string}
              </h3>
              <p className="text-sm font-light leading-relaxed text-ink-muted">{text as string}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default function DiamondStandard() {
  return (
    <div className="min-h-screen bg-white font-sans text-ink">
      <CustomCursor />
      <Navbar transparentInitially={true} hideBorder={true} />

      <main>
        <DiamondHero />
        <Monoliths />
        <UpgradeFlow />
        <LogicSeparation />
        <Complexity />
      </main>

      <Footer
        ctaTitle="Do Not Let Your Code Rot."
        ctaDescription="Build on modular, upgradeable infrastructure that adapts to regulatory changes. Join the asset managers moving billions on-chain with Nomyx."
        ctaButtonText="Consult With Our Solutions Architect"
        ctaButtonLink="https://calendly.com/ivan-j-nomyx/30min"
      />
    </div>
  );
}