import clsx from "clsx";
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({
  children,
  className,
}: CardProps) {
  return (
    <div
      className={clsx(
        `
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-white/5
        backdrop-blur-2xl
        shadow-[0_0_60px_rgba(139,92,246,0.15)]
        transition-all
        duration-500
        hover:border-violet-500/40
        hover:shadow-[0_0_80px_rgba(139,92,246,0.25)]
        `,
        className
      )}
    >
      {/* Gradient Glow */}
      <div className="absolute inset-0 bg-linear-to-br from-violet-500/10 via-transparent to-cyan-500/10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}