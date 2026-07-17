import clsx from "clsx";
import { ReactNode } from "react";

export default function GlassCard({
  children,
  className,
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={clsx(
        "glass rounded-2xl p-6 md:p-8 transition-all duration-500",
        hover && "hover:border-luxury-gold/60 hover:shadow-gold-lg hover:-translate-y-1",
        className
      )}
    >
      {children}
    </div>
  );
}
