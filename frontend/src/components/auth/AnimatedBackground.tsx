import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-dot-grid">
      <motion.svg
        viewBox="0 0 540 540"
        className="absolute top-10 -right-15 w-120 h-120 opacity-40"
        animate={{ x: [0, 20, -10, 0], y: [0, -15, 10, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <line x1="90" y1="150" x2="260" y2="60" stroke="#FFC857" strokeWidth="2" opacity="0.5" />
        <line x1="260" y1="60" x2="410" y2="140" stroke="#4BD6C2" strokeWidth="2" opacity="0.4" />
        <line x1="90" y1="150" x2="190" y2="320" stroke="#7C5CFF" strokeWidth="2" opacity="0.5" />
        <line x1="190" y1="320" x2="390" y2="355" stroke="#7C5CFF" strokeWidth="3" strokeDasharray="6 7" />
        <circle cx="90" cy="150" r="24" fill="#FFC857" />
        <circle cx="260" cy="60" r="20" fill="#7C5CFF" />
        <circle cx="410" cy="140" r="17" fill="#4BD6C2" />
        <circle cx="190" cy="320" r="22" fill="#7C5CFF" />
        <circle cx="390" cy="355" r="18" fill="#FFC857" />
      </motion.svg>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0B0D17_92%)]" />
    </div>
  );
}