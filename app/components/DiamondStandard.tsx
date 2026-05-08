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
} from "lucide-react";
import { CustomCursor, Footer, Navbar } from "../home";
import {
  fadeUp,
  forceHomeNavigation,
  HoverTextSwap,
  SectionIntro,
  AnimatedButton,
} from "./evergreen/shared";

const titleWords = ["Smart", "Contracts", "That", "Never", "Expire."];

const facets = [
  ["Governance Facet", "(Upgradeable)", 86, 82, "bg-[#2f6de6]"],
  ["Compliance Facet", "(Upgradeable)", 354, 82, "bg-[#2f6de6]"],
  ["Yield Facet", "(Upgradeable)", 86, 256, "bg-[#2f6de6]"],
  ["Core Asset Storage", "(Immutable)", 354, 256, "bg-slate-600"],
];

const DiamondArchitecture = () => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.65, delay: 0.18 }}
    className="relative mx-auto w-full max-w-2xl overflow-hidden border border-border bg-white p-6 shadow-[0_30px_80px_rgba(10,17,40,0.12)]"
  >
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(34,211,238,0.18),transparent_34%),radial-gradient(circle_at_50%_48%,rgba(47,109,230,0.16),transparent_52%)]" />
    <motion.div
      className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/10"
      animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.2, 0.55, 0.2] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    />

    <svg viewBox="0 0 560 390" className="relative w-full">
      <defs>
        <filter id="diamondGlow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {[
        [200, 138, 260, 190],
        [360, 138, 300, 190],
        [200, 264, 260, 220],
        [360, 264, 300, 220],
      ].map(([x1, y1, x2, y2], index) => (
        <g key={`${x1}-${y1}`}>
          <path
            d={`M${x1} ${y1} L${x2} ${y2}`}
            stroke="#18d3d1"
            strokeWidth="2"
            strokeDasharray="6 7"
            opacity="0.45"
          />
          <motion.circle
            r="5"
            fill="#22d3ee"
            filter="url(#diamondGlow)"
            animate={{ cx: [x1, x2], cy: [y1, y2], opacity: [0, 1, 0] }}
            transition={{
              duration: 2.1,
              repeat: Infinity,
              delay: index * 0.28,
              ease: "easeInOut",
            }}
          />
        </g>
      ))}

      <g>
        <motion.rect
          x="250"
          y="175"
          width="60"
          height="60"
          rx="4"
          fill="#03a9d9"
          stroke="#22d3ee"
          strokeWidth="2"
          filter="url(#diamondGlow)"
          animate={{
            rotate: [-6, 8, -6],
            scale: [1, 1.04, 1],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            transformBox: "fill-box",
            transformOrigin: "center",
          }}
        />
        <text x="280" y="202" textAnchor="middle" fill="white" fontSize="12" fontWeight="800">
          Core
        </text>
        <text x="280" y="218" textAnchor="middle" fill="#dffcff" fontSize="9" fontWeight="700">
          Proxy
        </text>
      </g>

      {facets.map(([title, label, x, y], index) => (
        <motion.g
          key={title}
          animate={{
            y: [0, index % 2 === 0 ? -7 : 7, 0],
            opacity: [0.88, 1, 0.88],
          }}
          transition={{ duration: 3.4, repeat: Infinity, delay: index * 0.18 }}
        >
          <rect
            x={x as number}
            y={y as number}
            width="120"
            height="64"
            rx="7"
            fill={title === "Core Asset Storage" ? "#475569" : "#2f6de6"}
            stroke={title === "Core Asset Storage" ? "#94a3b8" : "#68a0ff"}
            strokeWidth="2"
            filter={title === "Core Asset Storage" ? undefined : "url(#diamondGlow)"}
          />
          <text
            x={(x as number) + 60}
            y={(y as number) + 28}
            textAnchor="middle"
            fill="white"
            fontSize="11"
            fontWeight="800"
          >
            {title}
          </text>
          <text
            x={(x as number) + 60}
            y={(y as number) + 46}
            textAnchor="middle"
            fill="#dbeafe"
            fontSize="9"
            fontWeight="700"
            opacity="0.9"
          >
            {label}
          </text>
        </motion.g>
      ))}
    </svg>
  </motion.div>
);

const DiamondHero = () => (
  <section className="relative overflow-hidden border-b border-border bg-white pt-28 text-ink">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_26%,rgba(30,58,138,0.08),transparent_32%)]" />

    <div className="custom-container relative grid grid-cols-1 items-center gap-12 py-20 md:py-24 lg:grid-cols-[0.95fr_1.05fr]">
      <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.1 }}>
        <motion.div
          variants={fadeUp}
          className="mb-7 inline-flex border border-accent/30  px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-accent"
        >
          EIP-2535 Architecture
        </motion.div>
        <h1 className="text-display text-[clamp(48px,8.0vw,60px)] mb-6 mt-1">
          {titleWords.map((word, index) => (
            <motion.span
              key={word}
              className="mr-[0.16em] inline-block overflow-hidden align-bottom"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.65, delay: 0.16 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}
            </motion.span>
          ))}
        </h1>
        <motion.p variants={fadeUp} className="mb-8 max-w-3xl text-lg leading-relaxed text-ink-muted md:text-xl">
          The immutability paradox is solved. Build on modular, upgradeable infrastructure that adapts to regulatory changes without costly migrations or token swaps.
        </motion.p>
        
      </motion.div>
      <DiamondArchitecture />
    </div>
  </section>
);

const Monoliths = () => (
  <section className="border-b border-border py-20 md:py-24">
    <div className="custom-container">
      <SectionIntro
        eyebrow="Upgradeable Infrastructure"
        title="Stop Building Monoliths."
        description="Why the standard ERC-20 model is a risk to institutional longevity."
      />

      <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="border border-border bg-white p-8"
        >
          <div className="mb-8 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center border-8 border-slate-300 bg-slate-600 text-white">
              <Lock size={30} />
            </div>
          </div>
          <h3 className="mb-6 text-center text-2xl font-black uppercase tracking-tight text-ink">
            Standard ERC-20
          </h3>
          <div className="space-y-5">
            {[
              ["Size limit constraints (24kb)", "Complex logic requires multiple contracts."],
              ["Impossible to upgrade", "Logic is frozen at deployment."],
              ["Requires full migration if one bug is found", "New address, new audits, user disruption."],
            ].map(([title, text]) => (
              <div key={title} className="flex gap-3">
                <X className="mt-1 shrink-0 text-red-400" size={17} />
                <div>
                  <div className="text-sm font-black text-ink">{title}</div>
                  <p className="text-sm leading-relaxed text-ink-muted">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          transition={{ delay: 0.08 }}
          className="border border-accent/45 bg-white p-8 shadow-[0_22px_54px_rgba(30,58,138,0.10)]"
        >
          <div className="mb-8 flex justify-center">
            <motion.div
              className="relative h-20 w-20"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            >
              {[0, 60, 120, 180, 240, 300].map((rotation) => (
                <span
                  key={rotation}
                  className="absolute left-1/2 top-1/2 h-1 w-9 origin-left bg-accent"
                  style={{ transform: `rotate(${rotation}deg)` }}
                />
              ))}
              {[0, 60, 120, 180, 240, 300].map((rotation) => (
                <span
                  key={`dot-${rotation}`}
                  className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
                  style={{
                    transform: `rotate(${rotation}deg) translateX(36px) translate(-50%, -50%)`,
                  }}
                />
              ))}
              <span className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
            </motion.div>
          </div>
          <h3 className="mb-6 text-center text-2xl font-black uppercase tracking-tight text-ink">
            Nomyx Diamond Proxy
          </h3>
          <div className="space-y-5">
            {[
              ["Unlimited size (add infinite facets)", "No contract size limits."],
              ["Granular upgrades", "Update individual modules without touching others."],
              ["Stable contract address forever", "Zero user migration. Continuous compliance."],
            ].map(([title, text]) => (
              <div key={title} className="flex gap-3">
                <Check className="mt-1 shrink-0 text-emerald-500" size={17} />
                <div>
                  <div className="text-sm font-black text-ink">{title}</div>
                  <p className="text-sm leading-relaxed text-ink-muted">{text}</p>
                </div>
              </div>
            ))}
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
    <section className="border-b border-border bg-slate-50/70 py-20 md:py-24">
      <div className="custom-container">
        <SectionIntro
          eyebrow="Upgrade Path"
          title="How An Upgrade Works."
          description="Scenario: Regulation changes in 2026. Here is how you adapt."
        />

        <div className="mx-auto mt-14 max-w-4xl">
          {steps.map(([title, text], index) => (
            <div key={title} className="relative grid grid-cols-[44px_1fr] gap-5">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.35 }}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-black text-white"
              >
                {index + 1}
              </motion.div>
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: index * 0.06 }}
                className="mb-8 border border-border bg-white p-6 shadow-sm"
              >
                <h3 className="mb-2 text-lg font-black uppercase tracking-tight text-ink">{title}</h3>
                <p className="text-sm leading-relaxed text-ink-muted">{text}</p>
              </motion.div>
              {index < steps.length - 1 && (
                <ArrowDown className="absolute bottom-1 left-[13px] text-accent/40" size={16} />
              )}
            </div>
          ))}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            className="border border-emerald-300 bg-emerald-50 p-7"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-white">
                <Check size={18} />
              </div>
              <h3 className="text-lg font-black uppercase tracking-tight text-ink">Result</h3>
            </div>
            <div className="space-y-3 text-sm font-semibold text-ink">
              <div className="flex items-center gap-3">
                <Check size={16} className="text-emerald-600" />
                <p>Token address remains the same.</p>
              </div>
              <div className="flex items-center gap-3">
                <Check size={16} className="text-emerald-600" />
                <p>User balances are untouched.</p>
              </div>
              <div className="flex items-center gap-3">
                <Check size={16} className="text-emerald-600" />
                <p>The logic is updated.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const LogicSeparation = () => (
  <section className="border-b border-border bg-white py-20 text-ink md:py-24">
    <div className="custom-container grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
      >
        <h2 className="section-heading mb-6 text-ink">Separation Of State And Logic.</h2>
        <p className="mb-8 max-w-xl text-lg leading-relaxed text-ink-muted">
          Nomyx utilizes "Diamond Storage" to ensure that state variables (who owns what) are kept distinct from logic facets. This prevents storage collisions during upgrades.
        </p>
        <div className="space-y-4">
          {[
            "Each facet has its own isolated storage namespace.",
            "Zero risk of storage slot conflicts during upgrades.",
            "Asset balances are preserved across all logic updates.",
          ].map((item) => (
            <div key={item} className="flex gap-3 text-sm font-semibold text-ink">
              <ShieldCheck className="mt-0.5 shrink-0 text-accent" size={17} />
              {item}
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="overflow-hidden border border-white/10 bg-[#050b1b] shadow-[0_24px_70px_rgba(0,0,0,0.34)]"
      >
        <div className="border-b border-white/10 bg-white/10 px-5 py-3 font-mono text-xs text-white/58">
          &lt;&gt; DiamondCut.sol
        </div>
        <div className="overflow-x-auto p-6 text-sm leading-6 font-mono text-slate-300">
          <div className="text-slate-500">// Add new compliance facet</div>
          <div>
            <span>IDiamondCut.FacetCut[]</span>{" "}
            <span className="text-slate-400">memory</span>{" "}
            <span className="text-white">cut</span> =
          </div>
          <div className="pl-2">
            <span className="text-slate-400">new</span>{" "}
            <span>IDiamondCut.FacetCut[]</span>(1);
          </div>
          
          <div className="mt-4">
            <span className="text-white">cut</span>[0] ={" "}
            <span>IDiamondCut.FacetCut</span>({'{'}
          </div>
          <div className="pl-4">
            <span className="text-cyan-400">facetAddress</span>:{" "}
            <span className="text-white">complianceFacetV2</span>,
          </div>
          <div className="pl-4">
            <span className="text-cyan-400">action</span>:{" "}
            <span className="text-white">FacetCutAction.Add</span>,
          </div>
          <div className="pl-4">
            <span className="text-fuchsia-400">functionSelectors</span>:{" "}
            <span className="text-white">selectors</span>
          </div>
          <div>{'}'});</div>
          
          <div className="mt-4 text-slate-500">// Execute upgrade</div>
          <div>
            <span className="text-emerald-400">diamond</span>.
            <span className="text-white">diamondCut</span>(
          </div>
          <div className="pl-4 text-white">cut,</div>
          <div className="pl-4">
            <span className="text-slate-400">address</span>(0),
          </div>
          <div className="pl-4 text-white">""</div>
          <div>);</div>
          
          <div className="mt-4 text-slate-500">// State preserved, logic updated ✓</div>
        </div>
      </motion.div>
    </div>
  </section>
);

const Complexity = () => (
  <section className="border-b border-border py-20 md:py-24">
    <div className="custom-container">
      <SectionIntro
        // eyebrow="Audited Complexity"
        title="Audited Complexity."
        // description="A modular contract system still needs institutional guardrails. These are designed into the architecture."
      />
      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
        {[
          [GitBranch, "EIP-2535 Standard", "We did not invent this pattern; we perfected the implementation. Based on the peer-reviewed Ethereum Improvement Proposal."],
          [Lock, "Facet Isolation", "A vulnerability in the voting facet cannot compromise the custody facet. Modular security by design."],
          [TimerReset, "Time-Lock Upgrades", "All upgrades are subject to a mandatory time-lock, giving the community time to veto malicious changes."],
        ].map(([Icon, title, text], index) => {
          const TypedIcon = Icon as typeof Code2;

          return (
            <motion.div
              key={title as string}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.08 }}
              className="group border border-border bg-white p-8 transition-colors hover:border-accent/40 hover:bg-slate-50"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                <TypedIcon size={22} />
              </div>
              <h3 className="mb-4 text-xl font-black uppercase tracking-tight text-ink">
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

const DiamondFinalCTA = () => (
  <section className="relative overflow-hidden border-b border-border bg-white px-6 py-20 text-center text-ink md:py-24">
    <motion.div
      className="absolute left-1/2 top-0 h-px w-[72%] -translate-x-1/2 bg-accent/35"
      animate={{ opacity: [0.2, 0.9, 0.2] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55 }}
    >
      <h2 className="section-heading mx-auto mb-8 max-w-3xl text-ink">
        Do Not Let Your Code Rot.
      </h2>
      <AnimatedButton 
        text="Consult With Our Solutions Architect" 
        href="https://calendly.com/ivan-j-nomyx/30min" 
        variant="ink" 
        onClick={(event) => forceHomeNavigation(event, "https://calendly.com/ivan-j-nomyx/30min")}
      />
    </motion.div>
  </section>
);

export default function DiamondStandard() {
  return (
    <div className="min-h-screen bg-bg font-sans text-ink">
      <CustomCursor />
      <Navbar />

      <main>
        <DiamondHero />
        <Monoliths />
        <UpgradeFlow />
        <LogicSeparation />
        <Complexity />
        <DiamondFinalCTA />
      </main>

      <Footer />
    </div>
  );
}