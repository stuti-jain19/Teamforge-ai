import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#09090B]">

      {/* Purple Blob */}
      <motion.div
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -60, 40, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-10 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl"
      />

      {/* Cyan Blob */}
      <motion.div
        animate={{
          x: [0, -70, 30, 0],
          y: [0, 60, -30, 0],
          scale: [1, 0.9, 1.15, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 right-10 h-120 w-120 rounded-full bg-cyan-500/15 blur-3xl"
      />

      {/* Pink Accent */}
      <motion.div
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/10 blur-3xl"
      />

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial Fade */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#09090B_90%)]" />
    </div>
  );
}