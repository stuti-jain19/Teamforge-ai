import { Link } from "react-router-dom";
import AnimatedSection from "../components/AnimatedSection";
import FeatureCard from "../components/FeatureCard";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import StepCard from "../components/StepCard";

function Home() {
  return (
    <div className="min-h-screen bg-dot-grid font-body">
      <Navbar />

      {/* Hero */}
      <AnimatedSection>
        <header className="px-8 pt-20 pb-0">
          <div className="max-w-295 mx-auto grid md:grid-cols-[1fr_540px] gap-6 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-sm font-bold text-[#0B0D17] bg-[#4BD6C2] px-3.5 py-1.5 rounded-full mb-5 font-display">
                ⬡ 2,400+ builders matched
              </span>

              <h1 className="font-display text-5xl md:text-[64px] font-extrabold leading-[1.03] text-white">
                Find your<br />hackathon{" "}
                <span className="text-[#FFC857]">people.</span>
              </h1>

              <p className="mt-6 text-lg text-[#A9A6C2] max-w-110">
                Match with teammates by skills, interests, and goals — not whoever you happened to sit next to.
              </p>

              <div className="mt-9 flex gap-4 flex-wrap">
                <Link
                  to="/register"
                  className="font-display font-bold px-7 py-3.5 rounded-lg bg-[#FFC857] text-[#0B0D17] border-2 border-white shadow-[4px_4px_0_#7C5CFF] hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0_#7C5CFF] transition-all"
                >
                  Get Started
                </Link>
                <a
                  href="#how-it-works"
                  className="font-display font-bold px-7 py-3.5 rounded-lg border-2 border-[rgba(255,255,255,0.14)] text-white hover:border-[#7C5CFF] transition"
                >
                  See how it works
                </a>
              </div>
            </div>

            <div className="relative w-full aspect-square max-w-135" aria-hidden="true">
              <svg viewBox="0 0 540 540" width="100%" height="100%">
                <line x1="90" y1="150" x2="260" y2="60" stroke="#FFC857" strokeWidth="2" opacity="0.5" />
                <line x1="260" y1="60" x2="410" y2="140" stroke="#4BD6C2" strokeWidth="2" opacity="0.4" />
                <line x1="90" y1="150" x2="190" y2="320" stroke="#7C5CFF" strokeWidth="2" opacity="0.5" />
                <line x1="190" y1="320" x2="390" y2="355" stroke="#7C5CFF" strokeWidth="3" strokeDasharray="6 7" />
                <line x1="390" y1="355" x2="70" y2="420" stroke="#4BD6C2" strokeWidth="2" opacity="0.35" />

                <circle cx="90" cy="150" r="28" fill="#FFC857" />
                <text x="90" y="156" textAnchor="middle" fontFamily="Space Grotesk" fontWeight="700" fontSize="15" fill="#0B0D17">R</text>

                <circle cx="260" cy="60" r="24" fill="#7C5CFF" />
                <text x="260" y="66" textAnchor="middle" fontFamily="Space Grotesk" fontWeight="700" fontSize="15" fill="#F4F2FF">D</text>

                <circle cx="410" cy="140" r="20" fill="#4BD6C2" />
                <text x="410" y="145" textAnchor="middle" fontFamily="Space Grotesk" fontWeight="700" fontSize="15" fill="#0B0D17">A</text>

                <circle cx="190" cy="320" r="26" fill="#7C5CFF" />
                <text x="190" y="326" textAnchor="middle" fontFamily="Space Grotesk" fontWeight="700" fontSize="15" fill="#F4F2FF">S</text>

                <circle cx="390" cy="355" r="22" fill="#FFC857" />
                <text x="390" y="361" textAnchor="middle" fontFamily="Space Grotesk" fontWeight="700" fontSize="15" fill="#0B0D17">K</text>

                <circle cx="70" cy="420" r="18" fill="#4BD6C2" />
                <text x="70" y="425" textAnchor="middle" fontFamily="Space Grotesk" fontWeight="700" fontSize="13" fill="#0B0D17">M</text>
              </svg>
              <div
                className="absolute font-display text-xs font-bold px-3 py-1.5 rounded-full bg-[#0B0D17] border-2 border-[#7C5CFF] text-[#7C5CFF]"
                style={{ top: "58%", left: "48%" }}
              >
                ⚡ Matched
              </div>
            </div>
          </div>
        </header>
      </AnimatedSection>

      {/* Marquee */}
      <div className="border-y border-[rgba(255,255,255,0.14)] bg-[#13162B] overflow-hidden py-4 mt-14">
        <div className="flex w-max gap-10 animate-marquee">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex gap-10 font-display font-bold text-sm whitespace-nowrap">
              <span className="text-[#A9A6C2]">REACT</span><span className="text-[#A9A6C2]">•</span>
              <span className="text-[#FFC857]">PYTHON</span><span className="text-[#A9A6C2]">•</span>
              <span className="text-[#A9A6C2]">FIGMA</span><span className="text-[#A9A6C2]">•</span>
              <span className="text-[#A9A6C2]">UI/UX</span><span className="text-[#A9A6C2]">•</span>
              <span className="text-[#FFC857]">MACHINE LEARNING</span><span className="text-[#A9A6C2]">•</span>
              <span className="text-[#A9A6C2]">NODE.JS</span><span className="text-[#A9A6C2]">•</span>
              <span className="text-[#A9A6C2]">CYBERSECURITY</span><span className="text-[#A9A6C2]">•</span>
              <span className="text-[#FFC857]">SWIFT</span><span className="text-[#A9A6C2]">•</span>
              <span className="text-[#A9A6C2]">GO</span><span className="text-[#A9A6C2]">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <AnimatedSection>
        <section id="features" className="px-8 py-20">
          <div className="max-w-295 mx-auto">
            <div className="max-w-140 mb-12">
              <h2 className="font-display text-4xl font-extrabold text-white">
                Why it feels different
              </h2>
              <p className="mt-3 text-[#A9A6C2]">
                Built for the chaos of hackathon weekend, not a corporate org chart.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <FeatureCard
                icon="🤖"
                title="Skill-based matching"
                description="We line up your profile against everyone looking for a team, so you meet people who fill the gaps in your own skillset."
                accent="violet"
              />
              <FeatureCard
                icon="🚀"
                title="Built for the weekend"
                description="No long onboarding. Make a profile, browse open teams, and you're building within minutes."
                accent="citrus"
              />
              <FeatureCard
                icon="💬"
                title="Say yes in one click"
                description="Join an open team or add someone to yours straight away — no DMs, no waiting on a reply."
                accent="mint"
              />
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* How It Works */}
      <AnimatedSection>
        <section id="how-it-works" className="px-8 py-20">
          <div className="max-w-295 mx-auto">
            <div className="max-w-140 mb-12">
              <h2 className="font-display text-4xl font-extrabold text-white">
                How it works
              </h2>
              <p className="mt-3 text-[#A9A6C2]">
                Three steps between "I don't have a team" and "we're building."
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <StepCard
                number="01"
                icon="👤"
                title="Create Profile"
                description="Add your skills, interests, and hackathon goals."
              />
              <StepCard
                number="02"
                icon="🧠"
                title="Browse or create a team"
                description="Start your own team, or look through open ones that still need people."
              />
              <StepCard
                number="03"
                icon="🚀"
                title="Start building"
                description="Join up and get straight to the part that actually matters — the project."
              />
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* CTA Band */}
      <AnimatedSection>
        <section className="px-8 pb-20">
          <div className="max-w-295 mx-auto border-2 border-[#F4F2FF] bg-[#7C5CFF] p-12 flex items-center justify-between gap-6 flex-wrap">
            <h2 className="font-display text-3xl font-extrabold text-white max-w-105">
              Your next hackathon team is one profile away.
            </h2>
            <Link
              to="/register"
              className="font-display font-bold px-7 py-3.5 rounded-lg bg-[#FFC857] text-[#0B0D17] border-2 border-[#0B0D17] shadow-[4px_4px_0_#0B0D17] hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0_#0B0D17] transition-all"
            >
              Create your profile
            </Link>
          </div>
        </section>
      </AnimatedSection>

      <Footer />
    </div>
  );
}

export default Home;