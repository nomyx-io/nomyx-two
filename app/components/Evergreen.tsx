"use client";

import { motion } from "motion/react";
import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  FileText,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";

const navItems = ["Solutions", "Platform", "Resources", "The Diamond Standard", "Developers"];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 },
};

const getHomeHref = (item: string) =>
  item === "Solutions" ? "/#solutions" : `/#${item.toLowerCase().replaceAll(" ", "-")}`;

const forceHomeNavigation = (
  event: React.MouseEvent<HTMLAnchorElement>,
  href: string,
) => {
  event.preventDefault();
  window.location.href = href;
};

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <motion.h2
    variants={fadeUp}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.35 }}
    transition={{ duration: 0.55 }}
    className="section-heading mx-auto max-w-4xl text-center"
  >
    {children}
  </motion.h2>
);

const MiniNavbar = () => (
  <nav className="sticky top-0 z-[200] border-b border-border bg-white/95 backdrop-blur-md">
    <div className="custom-container flex h-20 items-center justify-between gap-8">
      <a
        href="/"
        className="flex items-center"
        onClick={(event) => forceHomeNavigation(event, "/")}
      >
        <img src="/nomyx-logo.png" alt="Nomyx" className="h-9 w-auto" />
      </a>
      <div className="hidden items-center gap-6 lg:flex">
        {navItems.map((item, index) => {
          const href = getHomeHref(item);

          return (
            <a
              key={item}
              href={href}
              className="label-mono group relative inline-flex h-10 items-center gap-1 whitespace-nowrap px-2 transition-colors hover:text-accent"
              onClick={(event) => forceHomeNavigation(event, href)}
            >
              {item}
              {index < 3 && <ChevronDown size={13} />}
              <span className="absolute bottom-1 left-2 right-2 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          );
        })}
      </div>
      <a
        href="/#cta"
        className="hidden h-11 items-center justify-center bg-ink px-7 text-xs font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-ink/90 md:inline-flex"
        onClick={(event) => forceHomeNavigation(event, "/#cta")}
      >
        Request Demo
      </a>
    </div>
  </nav>
);

const FundLoop = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.25, duration: 0.65 }}
    className="relative mx-auto w-full max-w-md"
  >
    <svg viewBox="0 0 400 300" className="w-full max-w-md">
      <defs>
        <linearGradient id="loopGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E3A8A" />
          <stop offset="50%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d="M 100 150 Q 100 80, 150 80 Q 200 80, 200 150 Q 200 220, 250 220 Q 300 220, 300 150 Q 300 80, 250 80 Q 200 80, 200 150 Q 200 220, 150 220 Q 100 220, 100 150 Z"
        fill="none"
        stroke="url(#loopGradient)"
        strokeWidth="4"
        filter="url(#glow)"
        opacity="0.8"
      />
      <circle r="6" fill="#FFFFFF" filter="url(#glow)">
        <animateMotion
          dur="8s"
          repeatCount="indefinite"
          path="M 100 150 Q 100 80, 150 80 Q 200 80, 200 150 Q 200 220, 250 220 Q 300 220, 300 150 Q 300 80, 250 80 Q 200 80, 200 150 Q 200 220, 150 220 Q 100 220, 100 150 Z"
        />
      </circle>
      <circle r="6" fill="#1E3A8A" filter="url(#glow)">
        <animateMotion
          dur="8s"
          repeatCount="indefinite"
          begin="2s"
          path="M 100 150 Q 100 80, 150 80 Q 200 80, 200 150 Q 200 220, 250 220 Q 300 220, 300 150 Q 300 80, 250 80 Q 200 80, 200 150 Q 200 220, 150 220 Q 100 220, 100 150 Z"
        />
      </circle>
      <text x="130" y="65" fill="#94a3b8" fontSize="12" textAnchor="middle">
        Subscription
      </text>
      <text x="270" y="65" fill="#94a3b8" fontSize="12" textAnchor="middle">
        Deployment
      </text>
      <text x="330" y="150" fill="#94a3b8" fontSize="12" textAnchor="middle">
        Yield
      </text>
      <text x="270" y="250" fill="#94a3b8" fontSize="12" textAnchor="middle">
        NAV Update
      </text>
      <text x="130" y="250" fill="#94a3b8" fontSize="12" textAnchor="middle">
        Redemption
      </text>
    </svg>
  </motion.div>
);

const PerformanceCard = () => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.55 }}
    className="border border-border bg-white p-6 shadow-xl"
  >
    <div className="mb-5 flex items-start justify-between gap-4">
      <div>
        <h3 className="text-lg font-black uppercase tracking-tight text-ink">Fund Performance</h3>
        <p className="text-sm text-ink-muted">Evergreen Growth Fund I</p>
      </div>
      <div className="text-right">
        <div className="text-2xl font-black text-ink">$10.42</div>
        <div className="text-xs font-bold uppercase tracking-[0.12em] text-accent">+4.2% YTD</div>
      </div>
    </div>
    <div className="relative h-44 overflow-hidden border border-border bg-slate-50 p-6">
      <span className="absolute right-5 top-4 bg-ink px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-white">
        Oracle Update: $10.42/token
      </span>
      <svg viewBox="0 0 360 160" className="h-full w-full">
        <path d="M20 118 L70 106 L118 101 L170 88 L216 94 L272 75 L335 64" fill="none" stroke="#1E3A8A" strokeWidth="4" />
        <path d="M20 118 L70 106 L118 101 L170 88 L216 94 L272 75 L335 64 L335 150 L20 150 Z" fill="rgba(30,58,138,0.1)" />
        <circle cx="335" cy="64" r="5" fill="#1E3A8A" />
      </svg>
    </div>
    <div className="mt-5 grid grid-cols-3 gap-3 border-t border-border pt-5 text-sm">
      {[
        ["AUM", "$124.5M"],
        ["Investors", "1,847"],
        ["Liquidity", "24/7"],
      ].map(([label, value]) => (
        <div key={label}>
          <div className="text-xs text-ink-muted">{label}</div>
          <div className="font-black text-ink">{value}</div>
        </div>
      ))}
    </div>
  </motion.div>
);

const FeatureList = () => (
  <div className="space-y-8">
    {[
      {
        icon: <BarChart3 size={20} />,
        title: "Oracle Integration",
        text: "Connect to Chainlink or internal data feeds to update token prices automatically as underlying asset values change.",
      },
      {
        icon: <Clock3 size={20} />,
        title: "24/7 Liquidity",
        text: "Allow LPs to subscribe or redeem at the current NAV instantly, without waiting for end-of-quarter windows.",
      },
      {
        icon: <FileText size={20} />,
        title: "Transparent Reporting",
        text: "Give investors a live view of their holdings' value with clean reporting and no monthly statement delays.",
      },
    ].map((item, index) => (
      <motion.div
        key={item.title}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        className="group flex gap-4 border-b border-border pb-6 last:border-b-0"
      >
        <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-border bg-white text-accent transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-white">
          {item.icon}
        </div>
        <div>
          <h3 className="mb-1 text-lg font-black uppercase tracking-tight text-ink">{item.title}</h3>
          <p className="text-sm leading-relaxed text-ink-muted">{item.text}</p>
        </div>
      </motion.div>
    ))}
  </div>
);

const CostCard = ({
  variant,
  title,
  items,
}: {
  variant: "old" | "new";
  title: string;
  items: { title: string; text: string }[];
}) => {
  const isNew = variant === "new";

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55 }}
      className={`border bg-white p-8 transition-colors hover:bg-slate-50 ${
        isNew ? "border-accent" : "border-border"
      }`}
    >
      <div className="mb-7 flex items-center gap-4">
        <div className={`flex h-11 w-11 items-center justify-center border ${
          isNew ? "border-accent bg-accent text-white" : "border-border bg-slate-50 text-ink-muted"
        }`}>
          {isNew ? <Zap size={20} /> : <Clock3 size={20} />}
        </div>
        <h3 className="text-xl font-black uppercase tracking-tight text-ink">{title}</h3>
      </div>
      <div className="space-y-5">
        {items.map((item) => (
          <div key={item.title} className="flex gap-3">
            {isNew ? <Check size={16} className="mt-1 shrink-0 text-accent" /> : <FileText size={16} className="mt-1 shrink-0 text-ink-muted" />}
            <div>
              <div className="text-sm font-black text-ink">{item.title}</div>
              <p className="text-xs leading-relaxed text-ink-muted">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={`mt-7 inline-flex border px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] ${
        isNew ? "border-accent bg-accent text-white" : "border-border text-ink-muted"
      }`}>
        {isNew ? "Instant" : "T+30 Days"}
      </div>
    </motion.div>
  );
};

const SecondaryMarket = () => (
  <section className="bg-slate-50/80 py-20 md:py-24">
    <div className="custom-container grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55 }}
        className="border border-border bg-white shadow-xl"
      >
        <div className="bg-ink px-6 py-4 text-sm font-black uppercase tracking-tight text-white">
          Secondary Market Bulletin Board
        </div>
        <div className="space-y-4 p-6">
          {[
            ["500 Tokens Available", "$105.50 per token", "Seller: LP #4782"],
            ["1,200 Tokens Available", "$104.25 per token", "Seller: LP #2103"],
            ["850 Tokens Available", "$106.00 per token", "Seller: LP #8891"],
          ].map(([title, price, seller]) => (
            <div key={title} className="flex items-center justify-between gap-4 border border-border bg-slate-50 p-4 transition-colors hover:border-accent/40 hover:bg-white">
              <div>
                <h3 className="font-black text-ink">{title}</h3>
                <p className="text-sm text-ink-muted">{price}</p>
                <p className="text-xs text-ink-muted">{seller} - listed 2 days ago</p>
              </div>
              <span className="border border-accent/30 bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] text-accent">
                Compliance: Passed
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, delay: 0.1 }}
      >
        <h2 className="section-heading mb-6">Give LPs The Exit They Want.</h2>
        <p className="mb-7 max-w-xl text-lg leading-relaxed text-ink-muted">
          Liquidity is the new leverage. Offer Limited Partners the option to exit early through a controlled secondary market, without forcing the fund to liquidate underlying assets.
        </p>
        <div className="space-y-3">
          {[
            "Whitelisted buyers only - maintain investor quality",
            "Price discovery through market forces",
            "No impact on fund's operational capital",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 text-sm font-semibold text-ink-muted">
              <Check size={16} className="text-accent" />
              {item}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

const EvergreenFooter = () => (
  <footer className="bg-ink py-14 text-white md:py-16">
    <div className="custom-container grid grid-cols-1 gap-10 md:grid-cols-4">
      <div>
        <h3 className="mb-4 text-xl font-black uppercase tracking-tight">Nomyx</h3>
        <p className="text-sm text-white/60">The infrastructure for real-world assets.</p>
      </div>
      {[
        ["Solutions", "Evergreen Funds", "SPVs & Deal Syndication", "Private Credit", "Real Estate"],
        ["Platform", "Nomyx Engine", "Nomyx ID", "Nomyx Gateway", "Diamond Standard"],
        ["Resources", "Developers", "Resources", "Legal Center"],
      ].map(([title, ...links]) => (
        <div key={title}>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-white">{title}</h4>
          <div className="space-y-3">
            {links.map((link) => (
              <a
                key={link}
                href="/"
                className="block text-sm text-white/65 transition-colors hover:text-white"
                onClick={(event) => forceHomeNavigation(event, "/")}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
    <div className="custom-container mt-12 border-t border-white/10 pt-8 text-xs text-white/50">
      (C) 2025 Nomyx Inc. All rights reserved.
    </div>
  </footer>
);

export default function Evergreen() {
  return (
    <div className="min-h-screen bg-bg font-sans text-ink">
      <MiniNavbar />

      <main>
        <section className="overflow-hidden bg-ink py-20 text-white md:py-28">
          <div className="custom-container grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
            <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.12 }}>
              <motion.div
                variants={fadeUp}
                className="mb-7 inline-flex border border-white/20 bg-white/5 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-white"
              >
                Solution: Open-Ended Structures
              </motion.div>
              <motion.h1 variants={fadeUp} className="text-display mb-6 text-[clamp(46px,6vw,82px)] text-white">
                The Perpetual Fund. Automated.
              </motion.h1>
              <motion.p variants={fadeUp} className="mb-8 max-w-2xl text-lg leading-relaxed text-white/78">
                Replace quarterly operational drag with always-on efficiency. Support continuous subscriptions, real-time redemptions, and dynamic NAV updates.
              </motion.p>
              <motion.a
                variants={fadeUp}
                href="/#cta"
                className="inline-flex h-14 items-center gap-3 bg-white px-8 text-xs font-black uppercase tracking-[0.14em] text-ink transition-colors hover:bg-white/90"
                onClick={(event) => forceHomeNavigation(event, "/#cta")}
              >
                Modernize Your Fund
                <ArrowRight size={16} />
              </motion.a>
            </motion.div>
            <FundLoop />
          </div>
        </section>

        <section className="py-20 md:py-24">
          <div className="custom-container">
            <SectionTitle>Real-Time NAV. Real-Time Trust.</SectionTitle>
            <div className="mt-14 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
              <PerformanceCard />
              <FeatureList />
            </div>
          </div>
        </section>

        <section className="pb-20 md:pb-24">
          <div className="custom-container">
            <SectionTitle>Slash Administration Costs by 40%.</SectionTitle>
            <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
              <CostCard
                variant="old"
                title="Traditional Admin"
                items={[
                  { title: "Manual Subscription Docs", text: "Paper-based workflows" },
                  { title: "Quarterly Liquidity Windows", text: "Limited access periods" },
                  { title: "Email-based Reconciliation", text: "Error-prone coordination" },
                  { title: "Delayed NAV Calculation", text: "T+30 settlement delays" },
                ]}
              />
              <CostCard
                variant="new"
                title="Nomyx Infrastructure"
                items={[
                  { title: "Digital Onboarding (KYC/AML)", text: "Automated compliance checks" },
                  { title: "24/7 Subscription/Redemption", text: "Always-on capital access" },
                  { title: "Real-Time Cap Table", text: "Instant reconciliation" },
                  { title: "Atomic Settlement", text: "Immediate execution" },
                ]}
              />
            </div>
          </div>
        </section>

        <SecondaryMarket />

        <section className="bg-slate-50/80 py-20 md:py-24">
          <div className="custom-container">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55 }}
              className="mx-auto max-w-3xl border border-border bg-white p-10 text-center shadow-xl md:p-14"
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center border border-border bg-slate-50 text-accent">
                <Shield size={28} />
              </div>
              <h2 className="section-heading mb-5">Built For The Long Haul.</h2>
              <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-ink-muted">
                Evergreen funds need evergreen technology. Powered by the Diamond Standard, your fund's smart contracts are upgradeable. Adapt to new regulations without migrating assets or disrupting your LPs.
              </p>
              <div className="grid grid-cols-1 border border-border sm:grid-cols-3">
                {[
                  [Sparkles, "Future-Proof", "Upgrade without migration"],
                  [Check, "Regulatory Ready", "Adapt to new compliance"],
                  [Zap, "Zero Disruption", "LPs stay uninterrupted"],
                ].map(([Icon, title, text]) => {
                  const TypedIcon = Icon as typeof Sparkles;
                  return (
                    <div key={title as string} className="border-b border-border p-5 sm:border-b-0 sm:border-r last:sm:border-r-0">
                      <TypedIcon className="mx-auto mb-3 text-accent" size={22} />
                      <div className="text-sm font-black uppercase tracking-tight text-ink">{title as string}</div>
                      <div className="text-xs text-ink-muted">{text as string}</div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="bg-ink px-6 py-20 text-center text-white md:py-24">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55 }}
          >
            <CircleDollarSign className="mx-auto mb-5 text-white/70" size={30} />
            <h2 className="section-heading mx-auto mb-8 max-w-3xl text-white">
              Stop Running Your Fund On Quarterly Deadlines.
            </h2>
            <a
              href="/#cta"
              className="inline-flex h-14 items-center justify-center bg-white px-8 text-xs font-black uppercase tracking-[0.14em] text-ink transition-colors hover:bg-white/90"
              onClick={(event) => forceHomeNavigation(event, "/#cta")}
            >
              Automate Your Evergreen Fund
            </a>
          </motion.div>
        </section>
      </main>

      <EvergreenFooter />
    </div>
  );
}
