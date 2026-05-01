"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import {
  ArrowLeftRight,
  ArrowRight,
  BarChart3,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Code2,
  FileCheck2,
  Globe2,
  Menu,
  Network,
  Shield,
  ShieldCheck,
  X,
} from "lucide-react";
import pageContent from "./pageContent.json";
import Link from "next/link";

const iconMap = {
  chart: BarChart3,
  shield: Shield,
  network: Network,
  globe: Globe2,
  file: FileCheck2,
};

const navDropdowns = {
  Solutions: [
    {
      title: "Evergreen & Open-Ended Funds",
      description: "Perpetual fund automation with real-time NAV and 24/7 liquidity",
      href: "/evergreen-open-ended-funds",
    },
    {
      title: "SPVs & Deal Syndication",
      description: "Spin up compliant SPVs in hours with automated carry logic",
      href: "/spv-deal-syndication",
    },
    {
      title: "Private Credit & Syndication",
      description: "Aggregate LP capital on-chain, deploy to borrowers, automate yield distribution",
      href: "/private-credit-syndication",
    },
    {
      title: "Real Estate Tokenization",
      description: "Fractional ownership with automated rent distribution and secondary liquidity",
      href: "/real-estate-tokenization",
    },
  ],
  Platform: [
    {
      title: "Nomyx Engine",
      description: "The operating system for digital assets with infinite upgradability",
      href: "/nomyx-engine",
    },
    {
      title: "Nomyx ID",
      description: "On-chain identity and compliance verification system",
      href: "/nomyx-id",
    },
    {
      title: "Nomyx Gateway",
      description: "White-label liquidity infrastructure for your branded portal",
      href: "/nomyx-gateway",
    },
  ],
  Resources: [
    {
      title: "Technical Documentation",
      description: "Institutional library of guides, briefs, and reports",
      href: "#resources",
    },
  ],
} satisfies Partial<
  Record<
    string,
    {
      title: string;
      description: string;
      href: string;
    }[]
  >
>;

const topLevelNavRoutes: Partial<Record<string, string>> = {
  "The Diamond Standard": "/the-diamond-standard",
};

const getNavHref = (item: string) =>
  topLevelNavRoutes[item] ?? `#${item.toLowerCase().replaceAll(" ", "-")}`;

const NavBorderTrace = ({ active = false }: { active?: boolean }) => {
  const visible = active ? "scale-100" : "scale-0";

  return (
    <>
      <span
        className={`pointer-events-none absolute left-0 top-0 h-px w-full origin-left bg-accent transition-transform duration-150 ${visible} group-hover:scale-x-100`}
      />
      <span
        className={`pointer-events-none absolute right-0 top-0 h-full w-px origin-top bg-accent transition-transform delay-150 duration-150 ${visible} group-hover:scale-y-100`}
      />
      <span
        className={`pointer-events-none absolute bottom-0 right-0 h-px w-full origin-right bg-accent transition-transform delay-300 duration-150 ${visible} group-hover:scale-x-100`}
      />
      <span
        className={`pointer-events-none absolute bottom-0 left-0 h-full w-px origin-bottom bg-accent transition-transform delay-[450ms] duration-150 ${visible} group-hover:scale-y-100`}
      />
    </>
  );
};

export const CustomCursor = ({
  color = "#0A1128",
  hoverBackgroundColor = "rgba(10, 17, 40, 0.05)",
}: {
  color?: string;
  hoverBackgroundColor?: string;
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(Boolean(target.closest("a,button")));
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed left-0 top-0 z-[9999] hidden h-1.5 w-1.5 rounded-full pointer-events-none md:block"
        style={{ backgroundColor: color }}
        animate={{ x: mousePos.x - 3, y: mousePos.y - 3 }}
        transition={{ type: "spring", damping: 30, stiffness: 250, mass: 0.5 }}
      />
      <motion.div
        className="fixed left-0 top-0 z-[9998] hidden h-10 w-10 rounded-full border pointer-events-none md:block"
        style={{ borderColor: `color-mix(in srgb, ${color} 24%, transparent)` }}
        animate={{
          x: mousePos.x - 20,
          y: mousePos.y - 20,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? hoverBackgroundColor : "transparent",
        }}
        transition={{ type: "spring", damping: 25, stiffness: 150, mass: 0.8 }}
      />
    </>
  );
};

export const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const syncHash = () => setActiveHash(window.location.hash);

    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  const isHomeRoute = pathname === "/";
  const isHrefActive = (href: string) => {
    if (href.startsWith("#")) {
      return isHomeRoute && activeHash === href;
    }

    return pathname === href;
  };

  const isNavItemActive = (item: string) => {
    const dropdown = navDropdowns[item as keyof typeof navDropdowns];

    if (dropdown?.some((dropdownItem) => isHrefActive(dropdownItem.href))) {
      return true;
    }

    return isHrefActive(getNavHref(item));
  };

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-[200] flex h-20 items-center transition-all duration-300 ${
        isScrolled
          ? "border-b border-border bg-white/95 backdrop-blur-md"
          : "bg-white/95"
          // : "bg-transparent"
      }`}
    >
      <div className="custom-container w-full">
        <div className="hidden grid-cols-[1fr_auto_1fr] items-center gap-8 md:grid">
          <a href="/" className="flex items-center">
            <img src="/nomyx-logo.png" alt="Nomyx" className="h-9 w-auto" />
          </a>

          <div className="flex items-center justify-center gap-2 xl:gap-3">
            {pageContent.nav.map((item) => {
              const dropdown = navDropdowns[item as keyof typeof navDropdowns];
              const isOpen = activeDropdown === item;
              const isCurrent = isNavItemActive(item);
              const isActive = isOpen || isCurrent;

              if (!dropdown) {
                return (
                  <a
                    key={item}
                    href={getNavHref(item)}
                    aria-current={isCurrent ? "page" : undefined}
                    className={`label-mono group relative inline-flex h-10 items-center whitespace-nowrap rounded-[6px] px-3 transition-colors xl:px-4 ${
                      isCurrent ? "bg-accent/5 text-accent" : "hover:text-accent"
                    }`}
                  >
                    {item}
                    <span
                      className={`absolute bottom-1 left-4 right-4 h-px origin-left bg-accent transition-transform duration-300 group-hover:scale-x-100 ${
                        isCurrent ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </a>
                );
              }

              return (
                <div
                  key={item}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item)}
                  onMouseLeave={() => setActiveDropdown(null)}
                  onFocus={() => setActiveDropdown(item)}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                      setActiveDropdown(null);
                    }
                  }}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-current={isCurrent ? "page" : undefined}
                    className={`label-mono group relative inline-flex h-10 items-center gap-1.5 overflow-hidden whitespace-nowrap rounded-[6px] px-3 transition-colors duration-200 xl:px-4 ${
                      isActive
                        ? "bg-accent/5 text-accent"
                        : "hover:text-accent"
                    }`}
                  >
                    {item}
                    <ChevronDown
                      size={14}
                      strokeWidth={2.4}
                      className={`transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                    <NavBorderTrace active={isActive} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="absolute left-1/2 top-full w-[400px] -translate-x-1/2 pt-2"
                      >
                        <div className="relative rounded-[6px] border border-border bg-white p-4 shadow-[0_22px_48px_rgba(10,17,40,0.14)]">
                          <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
                          <div className="space-y-1">
                            {dropdown.map((dropdownItem) => {
                              const isDropdownItemActive = isHrefActive(dropdownItem.href);

                              return (
                                <a
                                  key={dropdownItem.title}
                                  href={dropdownItem.href}
                                  aria-current={isDropdownItemActive ? "page" : undefined}
                                  className={`group block rounded-[6px] px-5 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-[0_12px_28px_rgba(10,17,40,0.08)] ${
                                    isDropdownItemActive
                                      ? "border-l-2 border-accent bg-accent/5"
                                      : "border-l-2 border-transparent"
                                  }`}
                                  onClick={() => setActiveDropdown(null)}
                                >
                                  <span className="flex items-start justify-between gap-4">
                                    <span>
                                      <span className="block text-sm font-black text-ink transition-colors group-hover:text-accent">
                                        {dropdownItem.title}
                                      </span>
                                      <span className="mt-1 block text-sm leading-relaxed text-ink-muted">
                                        {dropdownItem.description}
                                      </span>
                                    </span>
                                    <ArrowRight
                                      size={16}
                                      className={`mt-1 shrink-0 transition-all duration-200 ${
                                        isDropdownItemActive
                                          ? "translate-x-0 text-accent opacity-100"
                                          : "translate-x-[-4px] text-accent opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                                      }`}
                                    />
                                  </span>
                                </a>
                              );
                            })}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end">
            <a
              href="#cta"
              aria-current={isHrefActive("#cta") ? "page" : undefined}
              className={`inline-flex h-11 items-center justify-center px-7 text-xs font-bold uppercase tracking-[0.18em] text-white transition-colors ${
                isHrefActive("#cta") ? "bg-accent" : "bg-ink hover:bg-ink/90"
              }`}
            >
              Request Demo
            </a>
          </div>
        </div>

        <div className="flex items-center justify-between md:hidden">
          <a href="/" className="flex items-center">
            <img src="/nomyx-logo.png" alt="Nomyx" className="h-8 w-auto" />
          </a>
          <button
            className="text-ink"
            aria-label="Toggle navigation"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-0 right-0 top-20 border-b border-border bg-white p-6 shadow-xl md:hidden"
          >
            <div className="flex flex-col gap-5">
              {pageContent.nav.map((item) => {
                const dropdown = navDropdowns[item as keyof typeof navDropdowns];
                const isCurrent = isNavItemActive(item);

                return (
                  <div key={item}>
                    <a
                      href={getNavHref(item)}
                      aria-current={isCurrent ? "page" : undefined}
                      className={`flex items-center justify-between rounded-[6px] px-3 py-2 text-lg font-bold ${
                        isCurrent ? "bg-accent/5 text-accent" : "text-ink"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item}
                      {dropdown && <ChevronDown size={16} className="-rotate-90" />}
                    </a>
                    {dropdown && (
                      <div className="mt-3 space-y-2 border-l-2 border-accent pl-4">
                        {dropdown.map((dropdownItem) => {
                          const isDropdownItemActive = isHrefActive(dropdownItem.href);

                          return (
                            <a
                              key={dropdownItem.title}
                              href={dropdownItem.href}
                              aria-current={isDropdownItemActive ? "page" : undefined}
                              className={`block rounded-[6px] px-3 py-2 transition-colors hover:bg-slate-50 ${
                                isDropdownItemActive ? "bg-accent/5" : ""
                              }`}
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <span
                                className={`block text-sm font-black ${
                                  isDropdownItemActive ? "text-accent" : "text-ink"
                                }`}
                              >
                                {dropdownItem.title}
                              </span>
                              <span className="mt-0.5 block text-sm leading-relaxed text-ink-muted">
                                {dropdownItem.description}
                              </span>
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
              <a
                href="#cta"
                aria-current={isHrefActive("#cta") ? "page" : undefined}
                className={`inline-flex h-11 items-center justify-center text-xs font-bold uppercase tracking-[0.14em] text-white ${
                  isHrefActive("#cta") ? "bg-accent" : "bg-ink"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Request Demo
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const DiamondVisual = ({ compact = false }: { compact?: boolean }) => (
  <div
    className={`relative mx-auto flex aspect-[1.55/1] w-full max-w-3xl items-center justify-center overflow-hidden border border-border bg-ink shadow-2xl ${
      compact ? "max-w-xl" : ""
    }`}
  >
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.22),transparent_55%)]" />
    <div className="absolute bottom-[18%] h-[9%] w-[55%] rounded-full border border-cyan-300/80 shadow-[0_0_28px_rgba(34,211,238,0.8)]" />
    <div className="relative h-[34%] w-[32%] rotate-45 border-2 border-cyan-200 bg-cyan-300/20 shadow-[0_0_45px_rgba(34,211,238,0.9)]">
      <div className="absolute inset-[16%] border border-cyan-100/80" />
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-cyan-100/60" />
      <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-cyan-100/60" />
    </div>
  </div>
);

const DiamondArchitectureVisual = () => {
  const [issuance, subscription, compliance, yieldLogic] =
    pageContent.smartContracts.callouts;

  return (
    <div className="relative mx-auto w-full max-w-3xl overflow-visible rounded-none border border-border bg-white p-5 shadow-2xl sm:p-8 md:p-10">
      <div className="relative aspect-[1.12/1] w-full overflow-visible rounded-none bg-ink">
        <img
          src="/diamond%20image.png"
          alt="Diamond smart contract architecture"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-[52%]">
          <div className="relative whitespace-pre-line rounded-[8px] bg-[#36aaa0] px-5 py-3 text-center text-sm font-black leading-tight text-white shadow-lg sm:text-base">
            {issuance.replace(" (", "\n(")}
            <span className="absolute left-1/2 top-full h-12 w-px -translate-x-1/2 bg-[#28bbb0]" />
          </div>
        </div>

        <div className="absolute right-0 top-[18%] z-20 translate-x-[30%] max-lg:translate-x-[8%]">
          <div className="relative whitespace-pre-line rounded-[8px] bg-[#168f85] px-5 py-3 text-center text-sm font-black leading-tight text-white shadow-lg sm:min-w-[220px] sm:text-base">
            {subscription.replace(" (", "\n(")}
            <span className="absolute right-full top-1/2 hidden h-px w-24 -translate-y-1/2 bg-[#28bbb0] sm:block" />
          </div>
        </div>

        <div className="absolute left-0 top-[70%] z-20 -translate-x-[52%] max-lg:translate-x-[-8%]">
          <div className="relative whitespace-pre-line rounded-[8px] bg-[#1b9c91] px-5 py-3 text-center text-sm font-black leading-tight text-white shadow-lg sm:min-w-[190px] sm:text-base">
            {compliance.replace(" (", "\n(")}
            <span className="absolute left-full top-1/2 hidden h-px w-16 -translate-y-1/2 bg-[#28bbb0] sm:block" />
          </div>
        </div>

        <div className="absolute bottom-0 left-[68%] z-20 translate-y-[50%] max-sm:left-1/2 max-sm:-translate-x-1/2">
          <div className="relative whitespace-pre-line rounded-[8px] bg-[#36aaa0] px-5 py-3 text-center text-sm font-black leading-tight text-white shadow-lg sm:min-w-[190px] sm:text-base">
            {yieldLogic.replace(" (", "\n(")}
            <span className="absolute bottom-full left-1/2 h-12 w-px -translate-x-1/2 bg-[#28bbb0]" />
          </div>
        </div>

        <div className="absolute left-1/2 top-[52%] z-20 -translate-x-1/2 -translate-y-1/2 whitespace-pre-line rounded-[8px] bg-accent px-5 py-3 text-center text-sm font-black leading-tight text-white shadow-lg sm:text-base">
          {pageContent.smartContracts.core.replace(" (", "\n(")}
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-4 text-sm font-bold text-ink-muted sm:mt-14 sm:grid-cols-2">
        <div className="flex items-center justify-center gap-3">
          <span className="h-4 w-4 rounded-full bg-accent" />
          {pageContent.smartContracts.legend[0]}
        </div>
        <div className="flex items-center justify-center gap-3">
          <span className="h-4 w-4 rounded-full bg-[#159a90]" />
          {pageContent.smartContracts.legend[1]}
        </div>
      </div>
    </div>
  );
};

const Hero = () => {
  const titleParts = pageContent.hero.title.split(pageContent.hero.accent);

  return (
    <section className="pt-32 pb-8 md:pt-36 md:pb-12 border-b border-border">
      <div className="custom-container">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-12 items-start">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-display text-[clamp(48px,8.0vw,60px)] mb-6 mt-1"
            >
              The <span className="text-accent">Agile</span>
              <br />
              Infrastructure
              <br />
              for Institutional
              <br />
              Capital.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-xl text-ink-muted leading-relaxed max-w-2xl mb-8"
            >
              Tokenize Real-World Assets with upgradeable smart contracts.
              Future-proof compliance, automated lifecycle management, and T+0
              settlement.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="#cta"
                className="h-14 min-w-[190px] px-8 inline-flex items-center justify-center gap-3 bg-ink text-white font-bold uppercase tracking-[0.14em] hover:bg-ink/90 transition-colors"
              >
                Start Building
                <ArrowRight size={18} />
              </a>
              <a
                href="#infrastructure"
                className="h-14 min-w-[190px] px-8 inline-flex items-center justify-center border border-border bg-white text-ink font-bold uppercase tracking-[0.14em] hover:bg-slate-50 transition-colors"
              >
                View Documentation
              </a>
            </motion.div>
          </div>

          <div className="border border-border bg-white divide-y divide-border">
            {[
              {
                label: "Setup Time",
                value: "Minutes",
                sub: "Vs. months on legacy",
                icon: <Clock3 size={24} className="text-ink" />,
              },
              {
                label: "Settlement",
                value: "T+0",
                sub: "Atomic on-chain finality",
                icon: <ArrowLeftRight size={24} className="text-ink" />,
              },
              {
                label: "Compliance",
                value: "Built-in",
                sub: "Protocol-level enforcement",
                icon: <ShieldCheck size={24} className="text-ink" />,
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.55 + i * 0.1 }}
                className="p-7 md:p-8 flex items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="text-xs uppercase tracking-[0.12em] text-ink-muted font-semibold mb-2">
                    {stat.label}
                  </div>
                  <div className="text-4xl md:text-[42px] font-black tracking-tight text-ink mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-ink-muted uppercase tracking-[0.08em]">
                    {stat.sub}
                  </div>
                </div>
                <div className="w-14 h-14 border border-border flex items-center justify-center flex-shrink-0">
                  {stat.icon}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const SectionHeader = ({
  title,
  description,
  label,
}: {
  title: string;
  description?: string;
  label?: string;
}) => (
  <div className="custom-container py-14 text-center md:py-16">
    {label && (
      <div className="mb-5">
        <span className="inline-flex border-2 border-accent px-5 py-2.5 text-sm font-bold uppercase tracking-[0.12em] text-[#1E3A8A]">
          {label}
        </span>
      </div>
    )}
    <h2 className="section-heading mx-auto max-w-5xl">{title}</h2>
    {description && (
      <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-ink-muted md:text-lg">
        {description}
      </p>
    )}
  </div>
);

export const Partners = () => {
  const marqueePartners = [
    ...pageContent.partners.items,
    ...pageContent.partners.items,
  ];

  return (
    <section id="partners" className="border-b border-border bg-slate-50/60 py-10">
      <div className="custom-container mb-7 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-muted">
          {pageContent.partners.label}
        </p>
      </div>

      <div className="overflow-hidden border-y border-border">
        <motion.div
          className="flex w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, ease: "linear", repeat: Infinity }}
        >
          {marqueePartners.map((partner, i) => (
            <div
              key={`${partner.name}-${i}`}
              className="flex h-28 w-[220px] items-center justify-center border-r border-border bg-white px-8 md:w-[250px]"
            >
              {"src" in partner ? (
                <img
                  src={partner.src}
                  alt={partner.name}
                  className="max-h-12 w-40 object-contain"
                />
              ) : (
                <span className="text-[30px] font-semibold tracking-tight text-ink/80">
                  {partner.name}
                </span>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export const ValueProp = () => (
  <section id="solutions" className="border-b border-border">
    <SectionHeader
      title={pageContent.value.title}
      description={pageContent.value.description}
    />

    <div className="custom-container pb-16 md:pb-20">
      <div className="grid grid-cols-1 border border-border md:grid-cols-3">
        {pageContent.value.cards.map((card, i) => {
          const Icon = iconMap[card.icon as keyof typeof iconMap];
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="border-b border-border bg-white p-8 transition-colors hover:bg-slate-50 md:border-b-0 md:border-r md:p-9 last:md:border-r-0"
            >
              <Icon className="mb-6 text-accent" size={28} />
              <h3 className="mb-4 text-2xl font-black uppercase tracking-tight text-ink md:text-3xl">
                {card.title}
              </h3>
              <p className="text-base leading-relaxed text-ink-muted">
                {card.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export const RoleInfrastructure = () => (
  <section id="platform" className="border-b border-border bg-slate-50/60">
    <SectionHeader title={pageContent.roles.title} />

    <div className="custom-container pb-16 md:pb-20">
      <div className="mb-10 flex justify-center">
        <div className="inline-flex border border-border bg-white p-1">
          {pageContent.roles.tabs.map((tab, i) => (
            <button
              key={tab}
              className={`h-10 px-4 text-xs font-bold uppercase tracking-[0.12em] ${
                i === 0 ? "bg-ink text-white" : "text-ink-muted"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_1fr]">
        <div className="border border-border bg-white p-8 md:p-9">
          <h3 className="mb-7 text-3xl font-black uppercase tracking-tight">
            {pageContent.roles.heading}
          </h3>
          <div className="space-y-5">
            {pageContent.roles.bullets.map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <Check size={18} className="mt-1 shrink-0 text-accent" />
                <p className="text-base leading-relaxed text-ink-muted">
                  <span className="font-bold text-ink">{item.title}</span>{" "}
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-border bg-white p-8 shadow-xl md:p-9">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h3 className="text-2xl font-black uppercase tracking-tight">
              {pageContent.roles.wizard.title}
            </h3>
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-ink-muted">
              {pageContent.roles.wizard.status}
            </span>
          </div>
          <div className="space-y-4">
            {pageContent.roles.wizard.rows.map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between border-b border-border pb-4 text-sm"
              >
                <span className="font-bold uppercase tracking-[0.12em] text-ink-muted">
                  {label}
                </span>
                <span className="font-black text-ink">{value}</span>
              </div>
            ))}
          </div>
          <button className="mt-6 h-12 w-full bg-ink text-xs font-bold uppercase tracking-[0.14em] text-white">
            {pageContent.roles.wizard.button}
          </button>
        </div>
      </div>

      <p className="my-12 text-center text-sm uppercase tracking-[0.16em] text-ink-muted">
        {pageContent.roles.caption}
      </p>

      <div className="grid grid-cols-1 border border-border md:grid-cols-3">
        {pageContent.roles.assets.map((asset) => (
          <div
            key={asset.title}
            className="border-b border-border bg-white p-7 md:border-b-0 md:border-r last:md:border-r-0"
          >
            <h3 className="mb-3 text-xl font-black uppercase tracking-tight">
              {asset.title}
            </h3>
            <p className="text-sm leading-relaxed text-ink-muted">
              {asset.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const SmartContracts = () => (
  <section id="the-diamond-standard" className="border-b border-border">
    <div className="custom-container py-16 md:py-20">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <div className="lg:-ml-4">
          <DiamondArchitectureVisual />
        </div>

        <div>
          <div className="mb-5">
            <span className="inline-flex border-2 border-accent px-5 py-2.5 text-sm font-bold uppercase tracking-[0.12em] text-[#1E3A8A]">
              {pageContent.smartContracts.eyebrow}
            </span>
          </div>
          <h2 className="section-heading mb-6">
            {pageContent.smartContracts.title}
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-ink-muted">
            {pageContent.smartContracts.description}
          </p>
          <div className="space-y-5">
            {pageContent.smartContracts.bullets.map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <CheckCircle2 size={20} className="mt-1 shrink-0 text-accent" />
                <p className="text-base leading-relaxed text-ink-muted">
                  <span className="font-bold text-ink">{item.title}</span>{" "}
                  {item.text}
                </p>
              </div>
            ))}
          </div>
          <a
            href="#developers"
            className="mt-9 inline-flex h-12 items-center gap-3 border border-border bg-white px-6 text-xs font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-slate-50"
          >
            {pageContent.smartContracts.cta}
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </div>
  </section>
);

export const Developers = () => (
  <section id="developers" className="border-b border-border bg-ink text-white">
    <div className="custom-container py-16 md:py-20">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <div className="border border-white/10 bg-white/5 p-6 font-mono text-xs leading-relaxed text-white/80 md:p-8">
          <div className="mb-5 flex gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </div>
          <pre className="overflow-x-auto whitespace-pre-wrap">{`API: /v1/yield-distribution-cycle

{
  "asset_id": "PrivateCredit",
  "frequency": "weekly",
  "distribution_rate": "7.50%",
  "compliance_check": true
}

// Response
{
  "status": "success",
  "tx_hash": "0x..."
}`}</pre>
        </div>

        <div>
          <Code2 className="mb-6 text-white" size={28} />
          <h2 className="section-heading mb-6 text-white">
            {pageContent.developers.title}
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-white/75">
            {pageContent.developers.description}
          </p>
          <div className="space-y-4">
            {pageContent.developers.bullets.map((bullet) => (
              <div key={bullet} className="flex items-start gap-3">
                <ArrowRight size={16} className="mt-1 shrink-0 text-white" />
                <p className="text-base text-white/80">{bullet}</p>
              </div>
            ))}
          </div>
          <a
            href="#cta"
            className="mt-9 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-white"
          >
            {pageContent.developers.cta}
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </div>
  </section>
);

export const Security = () => (
  <section id="resources" className="border-b border-border">
    <SectionHeader
      title={pageContent.security.title}
      description={pageContent.security.description}
    />
    <div className="custom-container pb-16 md:pb-20">
      <div className="grid grid-cols-1 border border-border md:grid-cols-3">
        {pageContent.security.items.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap];
          return (
            <div
              key={item.title}
              className="flex flex-col items-center border-b border-border bg-white p-8 text-center md:border-b-0 md:border-r last:md:border-r-0"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center border border-border">
                <Icon size={22} className="text-accent" />
              </div>
              <h3 className="mb-2 text-xl font-black uppercase tracking-tight">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-ink-muted">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export const CTA = () => (
  <section id="cta" className="border-b border-border bg-slate-50/50 py-20 md:py-24">
    <div className="custom-container text-center">
      <h2 className="section-heading mb-8">{pageContent.cta.title}</h2>
      <p className="mx-auto mb-12 max-w-3xl text-xl leading-relaxed text-ink-muted">
        {pageContent.cta.description}
      </p>
      <a
        href="https://nomyx.io"
        target="_blank"
        rel="noopener"
        className="inline-flex h-14 min-w-[230px] items-center justify-center bg-ink px-10 text-base font-black uppercase tracking-[0.14em] text-white transition-colors hover:bg-ink/90"
      >
        {pageContent.cta.button}
      </a>
    </div>
  </section>
);

export const Footer = () => (
  <footer className="bg-white py-14 md:py-16">
    <div className="custom-container">
      <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Link href="/" className="mb-5 block">
            <img src="/nomyx-logo.png" alt="Nomyx" className="h-10 w-auto" />
          </Link>
          <p className="max-w-xs text-sm leading-relaxed ">
            {pageContent.footer.description}
          </p>
        </div>

        {pageContent.footer.columns.map((column) => (
          <div key={column.title} className="lg:col-span-2">
            <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] ">
              {column.title}
            </h4>
            <ul className="space-y-3 text-sm /65">
              {column.links.map((link) => (
                <li key={link}>
                  <Link href="#" className="transition-colors ">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center justify-between gap-5 pt-8 lg:flex-row">
        <div className="text-xs uppercase tracking-[0.12em] ">
          {pageContent.footer.copyright}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs ">
          {pageContent.footer.legal.map((link) => (
            <Link key={link} href="#" className="transition-colors">
              {link}
            </Link>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-bg font-sans text-ink">
      <CustomCursor />
      <Navbar />

      <main>
        <Hero />
        <Partners />
        <ValueProp />
        <RoleInfrastructure />
        <SmartContracts />
        <Developers />
        <Security />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
