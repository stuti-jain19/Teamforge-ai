import { motion } from "framer-motion";
import clsx from "clsx";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

interface ButtonProps extends Omit<ComponentPropsWithoutRef<typeof motion.button>, "children"> {
  children: ReactNode;
  loading?: boolean;
  variant?: "primary" | "secondary" | "ghost";
  fullWidth?: boolean;
}

export default function Button({
  children,
  loading = false,
  variant = "primary",
  fullWidth = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses =
    "relative overflow-hidden rounded-lg font-display font-bold transition-all duration-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60";

  const variants = {
    primary:
      "bg-[#FFC857] text-[#0B0D17] border-2 border-white shadow-[4px_4px_0_#7C5CFF] hover:shadow-[6px_6px_0_#7C5CFF] hover:-translate-x-0.5 hover:-translate-y-0.5",
    secondary:
      "bg-[#13162B] border-2 border-[rgba(255,255,255,0.14)] text-white hover:border-[#7C5CFF]",
    ghost:
      "bg-transparent border-2 border-[rgba(255,255,255,0.14)] text-[#A9A6C2] hover:border-[#7C5CFF] hover:text-white",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={clsx(baseClasses, variants[variant], fullWidth ? "w-full" : "", "px-6 py-3", className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </motion.button>
  );
}