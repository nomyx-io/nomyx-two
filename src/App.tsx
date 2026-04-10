import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Shield,
  Zap,
  Layers,
  CheckCircle2,
  Menu,
  X,
  ArrowRight,
  Cpu,
  Clock3,
  ArrowLeftRight,
  ShieldCheck
} from 'lucide-react';

const navItems = ['Infrastructure', 'Technology', 'Insights', 'Partners'];

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('button') || target.closest('a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-ink rounded-full pointer-events-none z-[9999]"
        animate={{ x: mousePos.x - 3, y: mousePos.y - 3 }}
        transition={{ type: 'spring', damping: 30, stiffness: 250, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-ink/20 rounded-full pointer-events-none z-[9998]"
        animate={{
          x: mousePos.x - 20,
          y: mousePos.y - 20,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(10, 17, 40, 0.05)' : 'transparent'
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 150, mass: 0.8 }}
      />
    </>
  );
};
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[200] h-20 flex items-center transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="w-full max-w-[88rem] mx-auto px-6 md:px-8">
        <div className="hidden md:grid grid-cols-[1fr_auto_1fr] items-center">
          <a href="#" className="flex items-center">
            <img src="/nomyx-logo.png" alt="Nomyx" className="h-9 w-auto" />
          </a>

          <div className="flex items-center justify-center gap-10">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="label-mono hover:text-ink transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex justify-end">
            <a
              href="#cta"
              className="h-11 px-7 inline-flex items-center justify-center bg-ink text-white text-xs font-bold uppercase tracking-[0.18em] hover:bg-ink/90 transition-colors"
            >
              Access
            </a>
          </div>
        </div>

        <div className="md:hidden flex items-center justify-between">
          <a href="#" className="flex items-center">
            <img src="/nomyx-logo.png" alt="Nomyx" className="h-8 w-auto" />
          </a>
          <button className="text-ink" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
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
            className="absolute top-20 left-0 right-0 bg-white border-b border-border p-6 md:hidden shadow-xl"
          >
            <div className="flex flex-col gap-5">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-lg font-bold text-ink"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <a
                href="#cta"
                className="h-11 inline-flex items-center justify-center bg-ink text-white text-xs font-bold uppercase tracking-[0.18em]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Access
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const kickerWords = ['Compliance-Native', 'Diamond Architecture', 'Institutional Grade'];
  const [kickerIndex, setKickerIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setKickerIndex((prev) => (prev + 1) % kickerWords.length);
    }, 2200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="pt-28 pb-8 md:pt-28 md:pb-12 border-b border-border">
      <div className="max-w-[88rem] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-12 items-start">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-7"
            >
              <div className="inline-flex items-center gap-3 bg-ink text-white pl-4 pr-5 py-2.5 shadow-[0_10px_30px_rgba(10,17,40,0.18)]">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300" />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.12em]">Institutional Tokenization</span>
                <span className="h-4 w-px bg-white/30" />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={kickerWords[kickerIndex]}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/90 min-w-[150px]"
                  >
                    {kickerWords[kickerIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-display text-[clamp(48px,8.8vw,112px)] mb-6"
            >
              Unlock <span className="text-accent">$25T</span> In
              <br />
              Private Markets.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-xl text-ink-muted leading-relaxed max-w-2xl mb-8"
            >
              Tokenization for fund managers, not just crypto natives. Faster setup, real liquidity,
              and seamless integrations.
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
                Get Started
                <ArrowRight size={18} />
              </a>
              <a
                href="#infrastructure"
                className="h-14 min-w-[190px] px-8 inline-flex items-center justify-center border border-border bg-white text-ink font-bold uppercase tracking-[0.14em] hover:bg-slate-50 transition-colors"
              >
                Explore
              </a>
            </motion.div>
          </div>

          <div className="border border-border bg-white divide-y divide-border mt-6 lg:mt-10">
            {[
              {
                label: 'Setup Time',
                value: 'Minutes',
                sub: 'Vs. months on legacy',
                icon: <Clock3 size={24} className="text-ink" />
              },
              {
                label: 'Settlement',
                value: 'T+0',
                sub: 'Atomic on-chain finality',
                icon: <ArrowLeftRight size={24} className="text-ink" />
              },
              {
                label: 'Compliance',
                value: 'Built-in',
                sub: 'Protocol-level enforcement',
                icon: <ShieldCheck size={24} className="text-ink" />
              }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.55 + i * 0.1 }}
                className="p-7 md:p-8 flex items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="text-xs uppercase tracking-[0.12em] text-ink-muted font-semibold mb-2">{stat.label}</div>
                  <div className="text-4xl md:text-[42px] font-black tracking-tight text-ink mb-1">{stat.value}</div>
                  <div className="text-sm text-ink-muted uppercase tracking-[0.08em]">{stat.sub}</div>
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

const SectionHeader = ({ title, label }: { title: string; label?: string }) => (
  <div className="max-w-[88rem] mx-auto px-6 md:px-8 py-14 md:py-16 text-center">
    {label && (
      <div className="mb-5">
        <span className="inline-flex bg-ink text-white text-sm font-bold uppercase tracking-[0.12em] px-5 py-2.5">
          {label}
        </span>
      </div>
    )}
    <h2 className="text-display text-[clamp(34px,6vw,76px)]">{title}</h2>
  </div>
);

const ValueProp = () => {
  const cards = [
    {
      title: 'What Nomyx Is?',
      desc: 'Complete tokenization infrastructure for institutional funds. We provide the rails for the next generation of private markets.',
      icon: <Layers className="text-accent" size={24} />
    },
    {
      title: "What's Different?",
      desc: 'Built for institutions that need infrastructure, not just a wrapper. Compliance is wired into the protocol, not bolted on.',
      icon: <Shield className="text-accent" size={24} />
    },
    {
      title: 'No Complexity',
      desc: 'Tokenization without friction. Infrastructure that handles the heavy lifting so you can focus on fund management.',
      icon: <Zap className="text-accent" size={24} />
    }
  ];

  return (
    <section id="infrastructure" className="border-b border-border">
      <SectionHeader label="Infrastructure" title="Infrastructure without friction." />

      <div className="max-w-[88rem] mx-auto px-6 md:px-8 pb-16 md:pb-20 space-y-8">
        <div className="flex justify-center">
          <div className="bg-ink text-white px-6 py-4 md:px-8 md:py-5 w-fit max-w-full">
            <p className="text-lg md:text-2xl font-semibold leading-relaxed text-center max-w-4xl">
              Agile infrastructure for institutional capital. Tokenization-as-a-Service for the $25
              trillion private markets sector.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-border">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-8 md:p-9 border-b md:border-b-0 md:border-r last:border-r-0 border-border bg-white hover:bg-slate-50 transition-colors text-center flex flex-col items-center"
            >
              <div className="mb-6 flex justify-center">{card.icon}</div>
              <h3 className="text-3xl font-black tracking-tight uppercase mb-4 text-center">{card.title}</h3>
              <p className="text-ink-muted leading-relaxed text-base text-center">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Technology = () => {
  const [activeFacets, setActiveFacets] = useState(['KYC', 'AML', 'OFAC']);
  const facets = ['KYC', 'AML', 'OFAC', 'PEP', 'Freeze', 'Dividends'];

  const toggleFacet = (facet: string) => {
    if (activeFacets.includes(facet)) {
      setActiveFacets(activeFacets.filter((f) => f !== facet));
    } else {
      setActiveFacets([...activeFacets, facet]);
    }
  };

  return (
    <section id="technology" className="border-b border-border">
      <SectionHeader label="Technology" title="The Diamond Standard." />

      <div className="max-w-[88rem] mx-auto px-6 md:px-8 pb-16 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          <div className="border border-border bg-white p-8 md:p-9">
            <p className="text-lg md:text-[22px] text-ink-muted leading-relaxed mb-9">
              Every smart contract ever written is immutable. When compliance requirements change,
              institutions face months of costly redeployment. Nomyx uses an architecture that
              separates logic from data, so updates remain fast and safe.
            </p>

            <div className="space-y-7">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 border border-border flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 size={18} className="text-ink" />
                </div>
                <div>
                  <h4 className="text-2xl font-black uppercase tracking-tight mb-2">
                    Upgrade without redeployment
                  </h4>
                  <p className="text-base text-ink-muted leading-relaxed">
                    Compliance changes deploy as facet swaps in under two seconds.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 border border-border flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 size={18} className="text-ink" />
                </div>
                <div>
                  <h4 className="text-2xl font-black uppercase tracking-tight mb-2">
                    Protocol-level enforcement
                  </h4>
                  <p className="text-base text-ink-muted leading-relaxed">
                    KYC, AML, and OFAC checks are enforced directly at the contract layer.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-border bg-white p-8 md:p-9 flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Cpu size={18} className="text-accent" />
                <span className="text-sm uppercase tracking-[0.16em] font-semibold text-ink-muted">
                  Live Compliance Engine
                </span>
              </div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-ink-muted">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Active
              </div>
            </div>

            <div className="relative w-[320px] h-[320px] mb-6">
              <div className="absolute inset-[54px] rounded-full border border-border bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-[11px] uppercase tracking-[0.12em] text-ink-muted font-semibold">Selected</div>
                  <div className="text-2xl font-black text-ink">{activeFacets.length}</div>
                </div>
              </div>

              {facets.map((f, i) => {
                const angle = (i / facets.length) * Math.PI * 2 - Math.PI / 2;
                const radius = 128;
                const x = 160 + radius * Math.cos(angle);
                const y = 160 + radius * Math.sin(angle);

                return (
                  <button
                    key={f}
                    onClick={() => toggleFacet(f)}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full font-mono text-[11px] font-bold uppercase tracking-[0.1em] transition-colors border ${
                      activeFacets.includes(f)
                        ? 'bg-ink text-white border-ink'
                        : 'bg-white text-ink-muted border-border hover:border-ink/30'
                    }`}
                    style={{ left: `${x}px`, top: `${y}px` }}
                  >
                    {f}
                  </button>
                );
              })}
            </div>

            <div className="w-full bg-ink p-5 font-mono text-[11px] text-white/80 leading-relaxed">
              <div className="mb-1">DIAMOND_PROXY_ACTIVE</div>
              <div>{`facets: [${activeFacets.join(', ')}]`}</div>
              <div>status: compliant_verified</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Partners = () => {
  const partners = [
    { src: '/mastercard.webp', alt: 'Mastercard', className: 'w-48' },
    { src: '/stellar.avif', alt: 'Stellar', className: 'h-14 w-48' },
    { text: 'Plume', alt: 'Plume' },
    { src: '/plugandplay.png', alt: 'Plug & Play' },
    { src: '/XDC.svg', alt: 'XDC', className: 'w-20' },
    { src: '/persona.png', alt: 'Persona' },
    { src: '/halborn.png', alt: 'Halborn', className: 'h-14 w-48' },
    { text: 'Dfns', alt: 'Dfns' }
  ];

  const marqueePartners = [...partners, ...partners];

  return (
    <section id="partners" className="border-b border-border py-16 md:py-20">
      <div className="max-w-[88rem] mx-auto px-6 md:px-8 mb-10 text-center">
        <div className="mb-5">
          <span className="inline-flex bg-ink text-white text-sm font-bold uppercase tracking-[0.12em] px-5 py-2.5">
            Partners
          </span>
        </div>
        <h2 className="text-display text-[clamp(34px,6vw,72px)]">Trusted by institutions.</h2>
      </div>

      <div className="overflow-hidden border-y border-border">
        <motion.div
          className="flex w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
        >
          {marqueePartners.map((p, i) => (
            <div
              key={`${p.alt}-${i}`}
              className="w-[220px] md:w-[250px] h-28 px-8 border-r border-border flex items-center justify-center bg-white"
            >
              {p.src ? (
                <img src={p.src} alt={p.alt} className={`object-contain ${p.className ?? 'h-10 w-36'}`} />
              ) : (
                <span className="text-[30px] font-semibold text-ink/80 tracking-tight">{p.text}</span>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section id="cta" className="py-20 md:py-24 border-b border-border bg-slate-50/50">
      <div className="max-w-5xl mx-auto px-6 md:px-8 text-center">
        <h2 className="text-display text-[clamp(40px,8vw,92px)] mb-8">Ready to tokenize?</h2>
        <p className="text-xl text-ink-muted leading-relaxed mb-12 max-w-3xl mx-auto">
          Join the institutions shaping the future of private markets with Nomyx infrastructure.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="https://nomyx.io"
            target="_blank"
            rel="noopener"
            className="h-14 min-w-[230px] px-10 inline-flex items-center justify-center bg-ink text-white font-black uppercase tracking-[0.14em] text-base hover:bg-ink/90 transition-colors"
          >
            Request Demo
          </a>
          <a
            href="mailto:info@nomyx.io"
            className="h-14 min-w-[230px] px-10 inline-flex items-center justify-center border border-ink bg-white text-ink font-black uppercase tracking-[0.14em] text-base hover:bg-slate-100 transition-colors"
          >
            Contact Sales
          </a>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-16 md:py-20">
      <div className="max-w-[88rem] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 border-b border-border pb-12 items-start">
          <div className="lg:col-span-4">
            <a href="#" className="mb-5 block">
              <img src="/nomyx-logo.png" alt="Nomyx" className="h-10 w-auto" />
            </a>
            <p className="text-sm text-ink-muted leading-relaxed max-w-xs">
              Agile infrastructure for institutional capital. Built for the $25T private markets
              sector.
            </p>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-ink mb-4">Platform</h4>
            <ul className="space-y-3 text-sm text-ink-muted">
              <li><a href="#infrastructure" className="hover:text-ink transition-colors">Infrastructure</a></li>
              <li><a href="#technology" className="hover:text-ink transition-colors">Technology</a></li>
              <li><a href="#partners" className="hover:text-ink transition-colors">Partners</a></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-ink mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-ink-muted">
              <li><a href="#" className="hover:text-ink transition-colors">About</a></li>
              <li><a href="#" className="hover:text-ink transition-colors">Insights</a></li>
              <li><a href="#" className="hover:text-ink transition-colors">Contact</a></li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-ink mb-4">Newsletter</h4>
            <div className="flex border border-border h-11">
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="flex-1 bg-white px-4 text-xs font-bold uppercase tracking-[0.12em] outline-none"
              />
              <button className="h-full px-6 bg-ink text-white text-xs font-bold uppercase tracking-[0.14em]">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8">
          <div className="text-xs uppercase tracking-[0.12em] text-ink-muted">
            © 2026 Nomyx Technology Labs Inc.
          </div>
          <div className="flex items-center gap-7">
            <a href="#" aria-label="X" className="text-ink-muted hover:text-ink transition-colors">
              <svg viewBox="0 0 1200 1227" className="w-5 h-5 fill-current" aria-hidden="true">
                <path d="M714 519L1160 0H1054L667 450L357 0H0L468 681L0 1227H106L515 750L843 1227H1200L714 519ZM569 687L521 618L128 56H290L607 509L655 578L1067 1172H905L569 687Z" />
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn" className="text-ink-muted hover:text-ink transition-colors">
              <img src="/linkedin.png" alt="LinkedIn" className="h-5 w-auto opacity-80 hover:opacity-100 transition-opacity" />
            </a>
            <a href="#" aria-label="Medium" className="text-ink-muted hover:text-ink transition-colors">
              <img src="/medium.png" alt="Medium" className="h-6 w-auto opacity-80 hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="bg-bg min-h-screen text-ink font-sans">
      <CustomCursor />
      <Navbar />

      <main>
        <Hero />
        <ValueProp />
        <Technology />
        <Partners />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}










