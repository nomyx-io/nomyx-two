"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { HoverTextSwap } from "./evergreen/shared";

export const AnimatedButton = ({
  href,
  text,
  bgColor = "bg-ink",
  hoverBgColor = "hover:bg-accent",
  textColor = "text-white",
  onClick,
  className = "",
  showArrow = true,
}: {
  href: string;
  text: string;
  bgColor?: string;
  hoverBgColor?: string;
  textColor?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  className?: string;
  showArrow?: boolean;
}) => (
  <motion.a
    href={href}
    initial="rest"
    whileHover="hover"
    animate="rest"
    onClick={onClick}
    className={`inline-flex h-14 items-center justify-center gap-3 px-8 text-xs font-black uppercase tracking-[0.14em] transition-colors ${bgColor} ${hoverBgColor} ${textColor} ${className}`}
  >
    <HoverTextSwap text={text} />
    {showArrow && <ArrowRight size={16} />}
  </motion.a>
);

