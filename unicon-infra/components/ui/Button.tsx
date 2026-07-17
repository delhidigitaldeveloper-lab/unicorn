import Link from "next/link";
import clsx from "clsx";
import { ReactNode } from "react";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
  type?: "button" | "submit";
}

export default function Button({
  href,
  onClick,
  children,
  variant = "primary",
  className,
  type = "button",
}: ButtonProps) {
  const base =
    "group relative inline-flex items-center gap-3 px-8 py-3.5 text-sm tracking-[0.15em] uppercase font-medium transition-all duration-500 overflow-hidden";

  const variants = {
    primary:
      "bg-gold-gradient text-black hover:shadow-gold-lg hover:-translate-y-0.5",
    outline:
      "border border-luxury-gold/50 text-white hover:border-luxury-gold hover:shadow-gold hover:-translate-y-0.5",
    ghost: "text-luxury-gold hover:text-white",
  };

  const classes = clsx(base, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes} data-cursor-hover>
        <span className="relative z-10">{children}</span>
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} data-cursor-hover>
      <span className="relative z-10">{children}</span>
    </button>
  );
}
