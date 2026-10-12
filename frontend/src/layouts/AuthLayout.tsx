import type { ReactNode } from "react";
import { Sparkles, Users, Trophy } from "lucide-react";

import AnimatedBackground from "../components/auth/AnimatedBackground";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0B0D17] text-white font-body">
      <AnimatedBackground />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center justify-between px-6 lg:px-12">
        <div className="hidden w-1/2 flex-col justify-center lg:flex">
          <span className="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-[#4BD6C2] px-4 py-2 text-sm font-bold text-[#0B0D17] font-display">
            ⚡ AI-Powered Hackathon Platform
          </span>

          <h1 className="font-display text-6xl font-extrabold leading-tight">
            TeamForge <span className="text-[#FFC857]">AI</span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-8 text-[#A9A6C2]">
            Find your perfect hackathon teammates. Build stronger teams, faster, and win together.
          </p>

          <div className="mt-12 space-y-3">
            <div className="flex items-center gap-4 border border-[rgba(255,255,255,0.14)] border-l-[3px] border-l-[#7C5CFF] bg-[rgba(255,255,255,0.02)] p-4">
              <Sparkles className="text-[#7C5CFF]" size={24} />
              <div>
                <h3 className="font-display font-bold">AI Team Matching</h3>
                <p className="text-sm text-[#A9A6C2]">Find teammates based on skills, interests and goals.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 border border-[rgba(255,255,255,0.14)] border-l-[3px] border-l-[#4BD6C2] bg-[rgba(255,255,255,0.02)] p-4">
              <Users className="text-[#4BD6C2]" size={24} />
              <div>
                <h3 className="font-display font-bold">Build Dream Teams</h3>
                <p className="text-sm text-[#A9A6C2]">Connect with developers, designers and innovators.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 border border-[rgba(255,255,255,0.14)] border-l-[3px] border-l-[#FFC857] bg-[rgba(255,255,255,0.02)] p-4">
              <Trophy className="text-[#FFC857]" size={24} />
              <div>
                <h3 className="font-display font-bold">Win More Hackathons</h3>
                <p className="text-sm text-[#A9A6C2]">Form balanced teams that maximize your chances.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full justify-center lg:w-1/2">
          <div className="w-full max-w-md rounded-[20px] border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.06)] p-8 backdrop-blur-xl">
            <h2 className="font-display text-4xl font-bold">{title}</h2>
            <p className="mt-3 mb-8 text-[#A9A6C2]">{subtitle}</p>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}