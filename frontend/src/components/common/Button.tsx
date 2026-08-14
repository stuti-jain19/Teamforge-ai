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
    "relative overflow-hidden rounded-2xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:cursor-not-allowed disabled:opacity-60";

  const variants = {
    primary:
      "bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-500 text-white hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(139,92,246,0.45)]",

    secondary:
      "bg-zinc-900 border border-zinc-700 text-white hover:border-violet-500 hover:bg-zinc-800",

    ghost:
      "bg-transparent border border-zinc-700 text-zinc-300 hover:border-violet-500 hover:text-white",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      whileHover={{ y: -2 }}
      className={clsx(
        baseClasses,
        variants[variant],
        fullWidth ? "w-full" : "",
        "px-6 py-3",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </motion.button>
  );
}