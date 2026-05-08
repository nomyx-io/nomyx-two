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
  TerminalSquare,
  X,
} from "lucide-react";
import { AnimatedButton } from "@/app/components/evergreen/shared";
import pageContent from "./pageContent.json";
import Link from "next/link";
import type { BlogPost } from "@/lib/blogs";

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
      description:
        "Perpetual fund automation with real-time NAV and 24/7 liquidity",
      href: "/evergreen-open-ended-funds",
    },
    {
      title: "SPVs & Deal Syndication",
      description: "Spin up compliant SPVs in hours with automated carry logic",
      href: "/spv-deal-syndication",
    },
    {
      title: "Private Credit & Syndication",
      description:
        "Aggregate LP capital on-chain, deploy to borrowers, automate yield distribution",
      href: "/private-credit-syndication",
    },
    {
      title: "Real Estate Tokenization",
      description:
        "Fractional ownership with automated rent distribution and secondary liquidity",
      href: "/real-estate-tokenization",
    },
  ],
  Platform: [
    {
      title: "Nomyx Engine",
      description:
        "The operating system for digital assets with infinite upgradability",
      href: "/nomyx-engine",
    },
    {
      title: "Nomyx ID",
      description: "On-chain identity and compliance verification system",
      href: "/nomyx-id",
    },
    {
      title: "Nomyx Gateway",
      description:
        "White-label liquidity infrastructure for your branded portal",
      href: "/nomyx-gateway",
    },
  ],
  Resources: [
    {
      title: "Technical Documentation",
      description: "Institutional library of guides, briefs, and reports",
      href: "/resources",
    },
    {
      title: "Blog",
      description: "Published insights, updates, and market commentary",
      href: "/blog",
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
  Developers: "/developers",
};

const getNavHref = (item: string) =>
  topLevelNavRoutes[item] ?? `#${item.toLowerCase().replaceAll(" ", "-")}`;

const NavBorderTrace = ({ active = false }: { active?: boolean }) => (
  <motion.div
    className="pointer-events-none absolute bottom-0 left-0 right-0 flex justify-center"
    initial={false}
    animate={{ opacity: active ? 1 : 0 }}
  >
    <motion.div
      className="h-[2px] bg-accent shadow-[0_0_8px_rgba(30,58,138,0.3)]"
      initial={false}
      animate={{ width: active ? "100%" : "0%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    />
  </motion.div>
);

export const CustomCursor = ({ variant }: { variant?: "dark" | "light" }) => {
  const pathname = usePathname();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    
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
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  const isHomeRoute = pathname === "/";
  const effectiveVariant = variant || (isHomeRoute ? "dark" : "light");
  const forceDark = effectiveVariant === "light" || isScrolled;

  return (
    <>
      <motion.div
        className="fixed left-0 top-0 z-[9999] hidden h-1.5 w-1.5 rounded-full pointer-events-none md:block transition-colors duration-300"
        style={{ backgroundColor: forceDark ? "#0A1128" : "#FFFFFF" }}
        animate={{ x: mousePos.x - 3, y: mousePos.y - 3 }}
        transition={{ type: "spring", damping: 30, stiffness: 250, mass: 0.5 }}
      />
      <motion.div
        className="fixed left-0 top-0 z-[9998] hidden h-10 w-10 rounded-full border pointer-events-none md:block transition-colors duration-300"
        style={{ 
          borderColor: forceDark ? "rgba(10, 17, 40, 0.24)" : "rgba(255, 255, 255, 0.3)",
          backgroundColor: isHovering 
            ? (forceDark ? "rgba(10, 17, 40, 0.05)" : "rgba(255, 255, 255, 0.1)")
            : "transparent"
        }}
        animate={{
          x: mousePos.x - 20,
          y: mousePos.y - 20,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 150, mass: 0.8 }}
      />
    </>
  );
};

export const Navbar = ({ variant }: { variant?: "dark" | "light" }) => {
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
  const effectiveVariant = variant || (isHomeRoute ? "dark" : "light");
  const forceLightNav = effectiveVariant === "light" || isScrolled;

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
        forceLightNav
          ? "border-b border-border bg-white/95 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="custom-container w-full">
        <div className="hidden lg:grid grid-cols-[1fr_auto_1fr] items-center gap-4 xl:gap-8">
          <a href="/" className="flex items-center shrink-0">
            <img
              src="/nomyx-logo.png"
              alt="Nomyx"
              className={`h-8 xl:h-9 w-auto object-contain transition-all duration-300 ${!forceLightNav ? "brightness-0 invert" : ""}`}
            />
          </a>

          <div className="flex items-center justify-center gap-1 xl:gap-3">
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
                    className={`label-mono group relative inline-flex h-10 items-center whitespace-nowrap rounded-[6px] px-2 xl:px-4 transition-all duration-300 ${
                      isActive
                        ? forceLightNav ? "bg-accent/5 text-accent" : "bg-white/10 !text-white"
                        : forceLightNav 
                          ? "text-ink-muted hover:text-accent hover:bg-accent/5" 
                          : "!text-white hover:bg-white/10"
                    }`}
                  >
                    <span className="">{item}</span>
                    <NavBorderTrace active={isActive} />
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
                    if (
                      !event.currentTarget.contains(
                        event.relatedTarget as Node | null,
                      )
                    ) {
                      setActiveDropdown(null);
                    }
                  }}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-current={isCurrent ? "page" : undefined}
                    className={`label-mono group relative inline-flex h-10 items-center gap-1 xl:gap-1.5 overflow-hidden whitespace-nowrap rounded-[6px] px-2 xl:px-4 transition-all duration-300 ${
                      isActive 
                        ? forceLightNav ? "bg-accent/5 text-accent" : "bg-white/10 !text-white" 
                        : forceLightNav ? "text-ink-muted hover:text-accent hover:bg-accent/5" : "!text-white hover:bg-white/10"
                    }`}
                  >
                    <span>{item}</span>
                    <ChevronDown
                      size={12}
                      strokeWidth={2.4}
                      className={`transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      } ${!forceLightNav ? "text-white" : ""}`}
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
                        className="absolute left-1/2 top-full w-[380px] xl:w-[400px] -translate-x-1/2 pt-2"
                      >
                        <div className={`relative rounded-[12px] border p-4 shadow-[0_22px_48px_rgba(0,0,0,0.3)] backdrop-blur-xl ${
                          forceLightNav 
                            ? "border-border bg-white" 
                            : "border-white/10 bg-[#1B243C]/95"
                        }`}>
                          <div className={`absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-${forceLightNav ? 'accent' : 'white/20'} to-transparent` } />
                          <div className="space-y-1">
                            {dropdown.map((dropdownItem) => {
                              const isDropdownItemActive = isHrefActive(
                                dropdownItem.href,
                              );

                              return (
                                <a
                                  key={dropdownItem.title}
                                  href={dropdownItem.href}
                                  aria-current={
                                    isDropdownItemActive ? "page" : undefined
                                  }
                                  className={`group block rounded-[8px] px-4 xl:px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 ${
                                    forceLightNav 
                                      ? "hover:bg-slate-50 hover:shadow-[0_12px_28px_rgba(10,17,40,0.08)]" 
                                      : "hover:bg-white/5 hover:shadow-[0_12px_28px_rgba(0,0,0,0.2)]"
                                  } ${
                                    isDropdownItemActive
                                      ? forceLightNav ? "border-l-2 border-accent bg-accent/5" : "border-l-2 border-white/40 bg-white/5"
                                      : "border-l-2 border-transparent"
                                  }`}
                                  onClick={() => setActiveDropdown(null)}
                                >
                                  <span className="flex items-start justify-between gap-4">
                                    <span>
                                      <span className={`block text-[15px] font-bold transition-colors ${
                                        forceLightNav ? "text-ink group-hover:text-accent" : "text-white group-hover:text-white"
                                      }`}>
                                        {dropdownItem.title}
                                      </span>
                                      <span className={`mt-1 block text-sm leading-relaxed ${
                                        forceLightNav ? "text-ink-muted" : "text-white/50"
                                      }`}>
                                        {dropdownItem.description}
                                      </span>
                                    </span>
                                    <ArrowRight
                                      size={16}
                                      className={`mt-1 shrink-0 transition-all duration-300 ${
                                        isDropdownItemActive
                                          ? `translate-x-0 ${forceLightNav ? 'text-accent' : 'text-white'} opacity-100`
                                          : `translate-x-[-4px] ${forceLightNav ? 'text-accent' : 'text-white'} opacity-0 group-hover:translate-x-0 group-hover:opacity-100`
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

          <div className="flex justify-end shrink-0">
            <AnimatedButton
              text="Request Demo"
              href="https://calendly.com/ivan-j-nomyx"
              variant={isScrolled ? "accent" : "accent"}
              className="h-11 !px-7"
            />
          </div>
        </div>

        <div className="flex items-center justify-between lg:hidden">
          <a href="/" className="flex items-center shrink-0">
            <img
              src="/nomyx-logo.png"
              alt="Nomyx"
              className={`h-8 w-auto object-contain transition-all duration-300 ${!forceLightNav ? "brightness-0 invert" : ""}`}
            />
          </a>
          <button
            className={`p-2 transition-colors ${forceLightNav ? "text-ink" : "text-white"}`}
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
                const dropdown =
                  navDropdowns[item as keyof typeof navDropdowns];
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
                      {dropdown && (
                        <ChevronDown size={16} className="-rotate-90" />
                      )}
                    </a>
                    {dropdown && (
                      <div className="mt-3 space-y-2 border-l-2 border-accent pl-4">
                        {dropdown.map((dropdownItem) => {
                          const isDropdownItemActive = isHrefActive(
                            dropdownItem.href,
                          );

                          return (
                            <a
                              key={dropdownItem.title}
                              href={dropdownItem.href}
                              aria-current={
                                isDropdownItemActive ? "page" : undefined
                              }
                              className={`block rounded-[6px] px-3 py-2 transition-colors hover:bg-slate-50 ${
                                isDropdownItemActive ? "bg-accent/5" : ""
                              }`}
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <span
                                className={`block text-sm font-black ${
                                  isDropdownItemActive
                                    ? "text-accent"
                                    : "text-ink"
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
              <AnimatedButton
                text="Request Demo"
                href="#cta"
                variant="ink"
                className="h-11"
                onClick={() => setIsMobileMenuOpen(false)}
              />
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



const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-hero-bg pt-44 pb-20 lg:pt-52 lg:pb-1">
      {/* Background Gradients */}
      <div className="pointer-events-none absolute left-0 top-0 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-hero-glow blur-[120px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-[800px] w-[800px] translate-x-1/3 translate-y-1/3 rounded-full bg-hero-glow blur-[120px]" />

      <div className="custom-container relative z-10">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.2fr_1fr]">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-display mb-8 text-[48px] leading-[1.05] text-white md:text-[64px] lg:text-[72px]"
            >
              The Agile
              <br />
              Infrastructure For
              <br />
              Institutional Capital
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="prgraphs text-white mb-20 md:text-xl"
            >
              Tokenize Real-World Assets with upgradeable smart contracts.
              future-proof compliance, automated lifecycle management, and T+0
              settlement.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap gap-4"
            >
              <AnimatedButton
                text="Start Building"
                href="https://calendly.com/ivan-j-nomyx"
                variant="accent"
                className="min-w-[180px]"
              />
              <AnimatedButton
                text="View Documentation"
                href="/developers"
                variant="outline"
                className="min-w-[180px]"
              />
            </motion.div>
          </div>

          <div className="relative hidden lg:block">
            <motion.img
              src="/right-visual.png"
              alt="Nomyx Platform"
              draggable={false}
              className="w-full h-auto object-contain"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
      <div className="mt-20 lg:mt-32 pt-10 pb-10">
        <div className="custom-container text-center">
          <p className="prgraphs text-white">
            {pageContent.partners.label}
          </p>
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
    <h2 className="section-heading mx-auto">{title}</h2>
    {description && (
      <p className="mx-auto prgraphs text-[#42546E] mt-5">
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
    <section id="partners" className="border-b border-border bg-white">
      <div className="overflow-hidden border-y border-border/60">
        <motion.div
          className="flex w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        >
          {marqueePartners.map((partner, i) => (
            <div
              key={`${partner.name}-${i}`}
              className="flex h-24 shrink-0 items-center justify-center border-r border-border/60 bg-white px-10"
              style={{
                width: partner.width ? `${partner.width + 80}px` : "260px",
              }}
            >
              {"src" in partner ? (
                <img
                  src={partner.src}
                  alt={partner.name}
                  style={{
                    width: partner.width ? `${partner.width}px` : "160px",
                  }}
                  className="max-h-10 object-contain"
                />
              ) : (
                <span className="text-[22px] font-bold tracking-tight text-ink/60 uppercase">
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
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
        {pageContent.value.cards.map((card, i) => {
          const iconSrc = i === 0 ? "/Union.png" : i === 1 ? "/diamond.png" : "/connect.png";
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl bg-[#1B243C] p-10 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-2xl"
            >
              <div className="mb-8 h-12 w-12">
                <img src={iconSrc} alt="" className="h-full w-auto object-contain" />
              </div>
              <h3 className="mb-5 font-semibold text-[25px] text-white">
                {card.title}
              </h3>
              <p className="text-[15px] font-normal text-white">
                {card.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export const RoleInfrastructure = () => {
  const [activeTab, setActiveTab] = useState(0);
  const isAssetManager = activeTab === 0;
  const content = isAssetManager
    ? pageContent.roles.assetManagers
    : pageContent.roles.fundAdministrators;

  return (
    <section id="platform" className="bg-white py-10">
      <div className="custom-container">
        <div className="rounded-[40px] bg-[#D9EFFF] px-6 py-16 md:px-12 md:py-20 lg:py-24">
          <h2 className="section-heading mx-auto text-center mb-10">
            {pageContent.roles.title}
          </h2>

          <div className="mb-14 flex justify-center">
            <div className="flex overflow-hidden rounded-xl border border-[#19233D] bg-transparent">
              <button
                onClick={() => setActiveTab(0)}
                className={`flex h-12 items-center px-10 text-lg font-semibold transition-all duration-300 ${
                  activeTab === 0
                    ? "bg-[#2060D4] text-white"
                    : "text-[#19233D] hover:bg-[#2060D4]/5"
                }`}
              >
                {pageContent.roles.tabs[0]}
              </button>
              <button
                onClick={() => setActiveTab(1)}
                className={`flex h-12 items-center px-10 text-md font-semibold transition-all duration-300 ${
                  activeTab === 1
                    ? "bg-[#2060D4] text-white"
                    : "text-[#19233D] hover:bg-[#2060D4]/5"
                }`}
              >
                {pageContent.roles.tabs[1]}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_1fr]">
            <motion.div
              key={`main-${activeTab}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl bg-white p-8 shadow-sm md:p-12"
            >
              <h3 className="mb-8 text-3xl font-bold text-[#19233D]">
                {content.heading}
              </h3>
              <div className="space-y-6">
                {content.bullets.map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D9EFFF] text-[#2060D4]">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <p className="text-[17px] leading-relaxed text-[#42546E]">
                      <span className="font-bold text-[#19233D]">{item.title}:</span>{" "}
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              key={`wizard-${activeTab}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl bg-white p-8 shadow-lg md:p-10"
            >
              {isAssetManager ? (
                <>
                  <div className="mb-8 flex items-center justify-between gap-4">
                    <h3 className="text-xl font-bold text-[#19233D]">
                      {pageContent.roles.assetManagers.wizard.title}
                    </h3>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#42546E]/60">
                      {pageContent.roles.assetManagers.wizard.status}
                    </span>
                  </div>
                  <div className="space-y-5">
                    {pageContent.roles.assetManagers.wizard.rows.map(
                      ([label, value]) => (
                        <div
                          key={label}
                          className="flex items-center justify-between border-b border-slate-100 pb-5 text-[15px]"
                        >
                          <span className="font-medium text-[#42546E]">
                            {label}
                          </span>
                          <span className="font-bold text-[#19233D]">{value}</span>
                        </div>
                      ),
                    )}
                  </div>
                  <button className="mt-10 h-14 w-full rounded-xl bg-[#2060D4] text-base font-bold text-white shadow-lg transition-all hover:bg-[#2060D4]/90 active:scale-[0.98]">
                    {pageContent.roles.assetManagers.wizard.button}
                  </button>
                </>
              ) : (
                <>
                  <div className="mb-8 flex items-center justify-between gap-4">
                    <h3 className="text-xl font-bold text-[#19233D]">
                      {pageContent.roles.fundAdministrators.log.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">
                        {pageContent.roles.fundAdministrators.log.status}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-5">
                    {pageContent.roles.fundAdministrators.log.rows.map(
                      ([fund, amount, status]) => (
                        <div
                          key={fund}
                          className="flex items-center justify-between border-b border-slate-100 pb-5 text-[15px]"
                        >
                          <span className="font-medium text-[#42546E]">
                            {fund}
                          </span>
                          <div className="flex items-center gap-4">
                            <span className="font-bold text-[#19233D]">
                              {amount}
                            </span>
                            <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold text-emerald-600">
                              {status}
                            </span>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </>
              )}
            </motion.div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-[15px] font-medium text-[#42546E]/70">
              {pageContent.roles.caption}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 overflow-hidden rounded-2xl bg-white md:grid-cols-3">
            {pageContent.roles.assets.map((asset, i) => (
              <div
                key={asset.title}
                className={`p-8 md:p-10 ${
                  i < 2 ? "border-b border-slate-100 md:border-b-0 md:border-r" : ""
                }`}
              >
                <h3 className="mb-4 text-xl font-bold text-[#19233D]">
                  {asset.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-[#42546E]">
                  {asset.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const SmartContracts = () => (
  <section id="the-diamond-standard" className="border-b border-border bg-white">
    <div className="custom-container py-20 md:py-32">
      <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div className="relative">
          <motion.img
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            src="/core-storage.png"
            draggable={false}
            alt="Diamond smart contract architecture"
            className="w-full h-auto object-contain"
          />
        </div>

        <div className="max-w-xl">
          <div className="mb-8">
            <span className="inline-flex rounded-md border border-[#1B243C] px-4 py-1.5 text-sm font-medium text-[#1B243C]">
              {pageContent.smartContracts.eyebrow}
            </span>
          </div>
          
          <h2 className="section-heading mb-8">
            {pageContent.smartContracts.title}
          </h2>
          
          <p className="prgraphs mb-12 text-ink-muted">
            {pageContent.smartContracts.description}
          </p>

          <div className="mb-12 space-y-8">
            {pageContent.smartContracts.bullets.map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-accent">
                  <CheckCircle2 size={18} strokeWidth={2.5} />
                </div>
                <p className="text-[17px] leading-relaxed text-ink-muted">
                  <span className="font-bold text-ink">{item.title}</span>{" "}
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <AnimatedButton
            text={pageContent.smartContracts.cta}
            href="/developers"
            variant="accent"
            className="h-14 !px-10"
          />
        </div>
      </div>
    </div>
  </section>
);

export const Developers = () => {
  return (
    <section
      id="developers"
      className="relative overflow-hidden bg-[#0A1128] py-20 md:py-32 text-white"
    >
      {/* Background Glows */}
      <div className="pointer-events-none absolute -right-1/5 -top-1/4 h-[600px] w-[600px] rounded-full bg-blue-600/40 blur-[120px]" />
      <div className="pointer-events-none absolute -left-1/5 -bottom-1/4 h-[600px] w-[600px] rounded-full bg-blue-600/40 blur-[120px]" />

      <div className="custom-container relative z-10">
        <div className="mb-20 text-center max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-heading mb-6 !text-white"
          >
            {pageContent.developers.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="prgraphs text-white/70"
          >
            {pageContent.developers.description}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Feature Cards */}
          <div className="order-2 space-y-4 lg:order-1 lg:col-span-5">
            {pageContent.developers.bullets.map((bullet, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative rounded-2xl bg-[#1B243C] p-6 transition-all hover:bg-[#232E4A]"
              >
                <div className="flex items-center gap-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
                    <TerminalSquare size={18} />
                  </div>
                  <p className="text-[17px] font-medium leading-tight text-white/90">
                    {bullet}
                  </p>
                </div>
              </motion.div>
            ))}

            <div className="pt-6">
              <motion.a
                href="/developers"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-[#34D399] transition-all hover:gap-4"
              >
                {pageContent.developers.cta}
                <ArrowRight size={16} />
              </motion.a>
            </div>
          </div>

          {/* Large Terminal */}
          <div className="order-1 lg:order-2 lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-2xl border border-white/10 bg-[#0D121F] shadow-2xl"
            >
              {/* Terminal Header */}
              <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
                <div className="flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#FF5F56]" />
                  <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                  <span className="h-3 w-3 rounded-full bg-[#27C93F]" />
                </div>
                <div className="flex items-center gap-2 text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  api/distribute-yield
                </div>
              </div>

              {/* Terminal Content */}
              <div className="p-6 font-mono text-[13px] leading-relaxed md:p-10 md:text-sm">
                <pre className="overflow-x-auto">
                  <code className="block">
                    <span className="text-pink-400">POST</span>{" "}
                    <span className="text-emerald-400">
                      /api/v1/tokens/distribute-yield
                    </span>
                    {"\n"}
                    <span className="text-slate-500">{"{"}</span>
                    {"\n"} <span className="text-blue-300">"token_id"</span>:{" "}
                    <span className="text-yellow-200">"0x7a8f..."</span>,{"\n"}
                    <span className="text-blue-300">"amount_usd"</span>:{" "}
                    <span className="text-orange-300">250000</span>,{"\n"}
                    <span className="text-blue-300">
                      "distribution_date"
                    </span>:{" "}
                    <span className="text-yellow-200">"2025-01-15"</span>,{"\n"}
                    <span className="text-blue-300">
                      "compliance_check"
                    </span>: <span className="text-blue-400">true</span>
                    {"\n"}
                    <span className="text-slate-500">{"}"}</span>
                    {"\n\n"}
                    <span className="text-slate-500">// Response</span>
                    {"\n"}
                    <span className="text-slate-500">{"{"}</span>
                    {"\n"} <span className="text-blue-300">"status"</span>:{" "}
                    <span className="text-yellow-200">"success"</span>,{"\n"}
                    <span className="text-blue-300">"tx_hash"</span>:{" "}
                    <span className="text-yellow-200">"0x9b2c..."</span>
                    {"\n"}
                    <span className="text-slate-500">{"}"}</span>
                  </code>
                </pre>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Security = () => (
  <section id="resources" className="border-b border-border bg-white">
    <div className="py-20 md:py-32">
      <div className="custom-container mb-16 text-center">
        <h2 className="section-heading mb-6">
          {pageContent.security.title}
        </h2>
        <p className="prgraphs mx-auto max-w-3xl text-ink-muted">
          {pageContent.security.description}
        </p>
      </div>

      <div className="custom-container">
        <div className="rounded-3xl border border-border bg-white overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {pageContent.security.items.map((item, i) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap];
              return (
                <div
                  key={item.title}
                  className="relative flex flex-col items-center px-8 py-16 text-center"
                >
                  {/* Vertical Separator */}
                  {i < 2 && (
                    <div className="absolute right-0 top-4 bottom-4 hidden w-px bg-border md:block" />
                  )}
                  {/* Horizontal Separator for Mobile */}
                  {i < 2 && (
                    <div className="absolute bottom-0 left-12 right-12 h-px bg-border md:hidden" />
                  )}

                  <div className="mb-8 flex h-16 w-16 items-center justify-center text-[#2060D4]">
                    <Icon size={56} strokeWidth={1.5} />
                  </div>
                  
                  <h3 className="mb-4 text-[25px] font-bold uppercase tracking-tight text-[#19233D]">
                    {item.title}
                  </h3>
                  
                  <p className="text-[15px] leading-relaxed text-[#42546E]">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const formatBlogDate = (value: string | null) => {
  if (!value) {
    return "Unscheduled";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
};

const FeaturedBlogs = ({ blogs }: { blogs: BlogPost[] }) => {
  if (blogs.length === 0) {
    return null;
  }

  return (
    <section className="border-b border-border bg-white py-20 md:py-24">
      <div className="custom-container">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-accent">
              Featured Insights
            </p>
            <h2 className="section-heading max-w-3xl">From The Blog</h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex h-11 items-center justify-center border border-border px-5 text-xs font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-slate-50"
          >
            View All Posts
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {blogs.map((blog) => (
            <article key={blog.id} className="border border-border bg-white">
              {blog.cover_image_url ? (
                <img
                  src={blog.cover_image_url}
                  alt={blog.title}
                  className="h-64 w-full object-cover"
                />
              ) : (
                <div className="flex h-64 items-center justify-center bg-slate-100 text-sm font-bold uppercase tracking-[0.16em] text-ink-muted">
                  No Image
                </div>
              )}

              <div className="p-6">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-accent">
                  {formatBlogDate(blog.published_at)}
                </p>
                <h3 className="mb-4 text-2xl font-black uppercase tracking-tight">
                  {blog.title}
                </h3>
                <p className="mb-6 text-base leading-relaxed text-ink-muted">
                  {blog.excerpt || "Featured article"}
                </p>
                <Link
                  href={`/blog/${blog.slug}`}
                  className="inline-flex h-11 items-center justify-center border border-border px-5 text-xs font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-slate-50"
                >
                  Read More
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Footer = () => (
  <footer className="relative w-full bg-white overflow-hidden">
    <div className="relative w-full bg-[#F2F9FF] rounded-t-[60px] md:rounded-t-[100px] pt-20 pb-12 overflow-hidden">
      {/* Background Decorative Logos */}
      <img 
        src="/footer-logo-left.png" 
        alt="" 
        className="absolute left-0 top-[20%] h-auto w-[20%] pointer-events-none opacity-60"
      />
      <img 
        src="/footer-logo-right.png" 
        alt="" 
        className="absolute right-0 top-[10%] h-auto w-[20%] pointer-events-none opacity-60"
      />

      <div className="custom-container relative z-10">
        {/* CTA Content */}
        <div className="mb-32 text-center">
          <h2 className="mb-6 text-[45px] font-bold tracking-tight text-[#19233D] md:text-[54px]">
            {pageContent.cta.title}
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-[18px] text-[#42546E]">
            {pageContent.cta.description}
          </p>
          <AnimatedButton
            text={pageContent.cta.button}
            href="https://calendly.com/ivan-j-nomyx"
            variant="accent"
            className="h-14 !px-10"
          />
        </div>

      {/* Footer Content */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Link href="/" className="mb-6 block">
            <img src="/nomyx-logo.png" alt="Nomyx" className="h-12 w-auto" />
          </Link>
          <p className="max-w-sm text-[15px] font-medium leading-relaxed text-[#42546E]">
            {pageContent.footer.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:col-span-7">
          {pageContent.footer.columns.map((column) => (
            <div key={column.title}>
              <h4 className="mb-6 text-[13px] font-bold uppercase tracking-[0.15em] text-[#19233D]">
                {column.title}
              </h4>
              <ul className="space-y-4">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-[15px] font-medium text-[#42546E] transition-colors hover:text-accent"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-32 flex flex-col items-center justify-between gap-8 border-t border-slate-200 pt-10 lg:flex-row">
        <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#42546E]/60">
          {pageContent.footer.copyright}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-[13px] font-medium text-[#42546E]">
          {pageContent.footer.legal.map((link) => (
            <Link
              key={link}
              href="/legal"
              className="transition-colors hover:text-accent"
            >
              {link}
            </Link>
          ))}
        </div>
        </div>
      </div>
    </div>
  </footer>
);

export default function Home({
  featuredBlogs = [],
}: {
  featuredBlogs?: BlogPost[];
}) {
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
        <FeaturedBlogs blogs={featuredBlogs} />
        <Footer />
      </main>
    </div>
  );
}
