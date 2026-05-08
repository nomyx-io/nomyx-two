"use client";

import { motion } from "motion/react";

export const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 },
};

export const forceHomeNavigation = (
  event: React.MouseEvent<HTMLAnchorElement>,
  href: string,
) => {
  event.preventDefault();
  window.location.href = href;
};

export const SectionIntro = ({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
}) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.35 }}
    transition={{ duration: 0.55 }}
    className="mx-auto max-w-4xl text-center"
  >
    {eyebrow && (
      <div className="mb-5 inline-flex border-2 border-accent px-5 py-2.5 text-sm font-bold uppercase tracking-[0.12em] text-accent">
        {eyebrow}
      </div>
    )}
    <h2 className="section-heading">{title}</h2>
    {description && (
      <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-ink-muted">
        {description}
      </p>
    )}
  </motion.div>
);

export const AnimatedGrid = ({ dark = false }: { dark?: boolean }) => (
  <div
    className={`pointer-events-none absolute inset-0 ${
      dark ? "opacity-[0.09]" : "opacity-[0.045]"
    } [background-image:linear-gradient(rgba(255,255,255,0.75)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.75)_1px,transparent_1px)] [background-size:56px_56px]`}
  />
);

export const HoverTextSwap = ({
  text,
  className = "",
  stagger = 0.018,
}: {
  text: string;
  className?: string;
  stagger?: number;
}) => (
  <span className={`group/hovertext inline-flex overflow-hidden ${className}`} aria-label={text}>
    <span className="flex" aria-hidden="true">
      {text.split("").map((char, index) => (
        <span key={`${char}-${index}`} className="relative inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            transition={{ duration: 0.42, delay: index * stagger, ease: [0.22, 1, 0.36, 1] }}
            variants={{
              rest: { y: "0%", rotateX: 0 },
              hover: { y: "-110%", rotateX: -55 },
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
          <motion.span
            className="absolute left-0 top-0 inline-block"
            transition={{ duration: 0.42, delay: index * stagger, ease: [0.22, 1, 0.36, 1] }}
            variants={{
              rest: { y: "110%", rotateX: 55 },
              hover: { y: "0%", rotateX: 0 },
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </span>
  </span>
);

export const HoverTextTrigger = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.span initial="rest" whileHover="hover" animate="rest" className={className}>
    {children}
  </motion.span>
);

import { ArrowRight } from "lucide-react";

export const AnimatedButton = ({
  text,
  href,
  onClick,
  variant = "ink",
  target,
  rel,
  className = "",
}: {
  text: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  variant?: "white" | "ink" | "accent" | "outline";
  target?: string;
  rel?: string;
  className?: string;
}) => {
  const baseStyles = "group/btn relative inline-flex items-center justify-center gap-3 h-[52px] px-8 text-[15px] font-medium rounded-xl transition-all duration-300";
  const variants = {
    white: "bg-white text-ink hover:bg-slate-50 border border-border",
    ink: "bg-ink text-white hover:bg-ink/90",
    accent: "bg-accent text-white hover:bg-accent/90",
    outline: "bg-transparent text-white border border-white hover:bg-white/5",
  };

  return (
    <motion.a
      href={href}
      onClick={onClick}
      target={target}
      rel={rel}
      initial="rest"
      whileHover="hover"
      animate="rest"
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      <HoverTextSwap text={text} />
      <ArrowRight 
        size={16} 
        className="transition-transform duration-300 group-hover/btn:translate-x-1" 
      />
    </motion.a>
  );
};
