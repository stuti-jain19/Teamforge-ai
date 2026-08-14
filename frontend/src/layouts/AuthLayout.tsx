import type { ReactNode } from "react";
import { Sparkles, Users, Trophy } from "lucide-react";

import AnimatedBackground from "../components/auth/AnimatedBackground";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthLayout({
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#09090B] text-white">

      <AnimatedBackground />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center justify-between px-6 lg:px-12">

        {/* LEFT SIDE */}

        <div className="hidden w-1/2 flex-col justify-center lg:flex">

          <span className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
            ⚡ AI Powered Hackathon Platform
          </span>

          <h1 className="text-6xl font-black leading-tight">
            TeamForge
            <span className="bg-linear-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}
              AI
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-8 text-zinc-400">
            Find your perfect hackathon teammates with AI.
            Build stronger teams, faster, and win together.
          </p>

          <div className="mt-12 space-y-5">

            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
              <Sparkles className="text-violet-400" size={26} />
              <div>
                <h3 className="font-semibold">
                  AI Team Matching
                </h3>
                <p className="text-sm text-zinc-400">
                  Find teammates based on skills,
                  interests and goals.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
              <Users className="text-cyan-400" size={26} />
              <div>
                <h3 className="font-semibold">
                  Build Dream Teams
                </h3>
                <p className="text-sm text-zinc-400">
                  Connect with developers,
                  designers and innovators.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
              <Trophy className="text-yellow-400" size={26} />
              <div>
                <h3 className="font-semibold">
                  Win More Hackathons
                </h3>
                <p className="text-sm text-zinc-400">
                  Form balanced teams that
                  maximize your chances.
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="flex w-full justify-center lg:w-1/2">

          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl shadow-[0_0_80px_rgba(139,92,246,0.15)]">

            <h2 className="text-4xl font-bold">
              {title}
            </h2>

            <p className="mt-3 mb-8 text-zinc-400">
              {subtitle}
            </p>

            {children}

          </div>

        </div>

      </div>

    </div>
  );
}