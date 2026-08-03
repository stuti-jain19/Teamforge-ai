import AnimatedSection from "../components/AnimatedSection";
import FeatureCard from "../components/FeatureCard";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import StepCard from "../components/StepCard";

function Home() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      {/* Hero Section */}
      <AnimatedSection>
        <section
          id="home"
          className="flex flex-col items-center justify-center py-24 text-center px-6"
        >
          <h1 className="text-6xl font-bold text-white">
            Find Your Perfect
          </h1>

          <h1 className="mt-3 bg-linear-to-r from-blue-500 to-cyan-400 bg-clip-text text-6xl font-bold text-transparent">
            Hackathon Team
          </h1>

          <p className="mt-8 max-w-2xl text-xl text-gray-400">
            TeamForge AI helps students discover teammates based on skills,
            interests, and hackathon goals.
          </p>

          <div className="mt-10 flex gap-5">
            <button className="rounded-xl bg-blue-600 px-8 py-4 text-white transition-all duration-300 hover:scale-105 hover:bg-blue-700">
              Get Started
            </button>

            <button className="rounded-xl border border-gray-600 px-8 py-4 text-white transition-all duration-300 hover:scale-105 hover:bg-gray-800">
              Explore Teams
            </button>
          </div>
        </section>
      </AnimatedSection>

      {/* Features Section */}
      <AnimatedSection>
        <section
          id="features"
          className="mx-auto max-w-7xl px-8 py-24"
        >
          <h2 className="mb-16 text-center text-5xl font-bold text-white">
            Why Choose
            <span className="text-cyan-400"> TeamForge AI?</span>
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            <FeatureCard
              icon="🤖"
              title="AI Matching"
              description="Find teammates whose strengths perfectly complement your own skills."
            />

            <FeatureCard
              icon="🚀"
              title="Hackathon Ready"
              description="Build balanced teams in minutes instead of spending hours searching."
            />

            <FeatureCard
              icon="💬"
              title="Instant Connection"
              description="Send requests, connect instantly and start building together."
            />
          </div>
        </section>
      </AnimatedSection>

      {/* Stats Section */}
      <AnimatedSection>
        <section className="bg-slate-900 py-24">
          <h2 className="mb-16 text-center text-5xl font-bold text-white">
            TeamForge AI in Numbers
          </h2>

          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
            <StatsCard number="1000+" label="Students" />
            <StatsCard number="250+" label="Hackathons" />
            <StatsCard number="95%" label="AI Match Accuracy" />
            <StatsCard number="24/7" label="Availability" />
          </div>
        </section>
      </AnimatedSection>

      {/* How It Works Section */}
      <AnimatedSection>
        <section
          id="how-it-works"
          className="mx-auto max-w-7xl px-8 py-28"
        >
          <h2 className="mb-16 text-center text-5xl font-bold text-white">
            How It Works
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            <StepCard
              icon="👤"
              title="Create Profile"
              description="Add your skills, interests, and hackathon goals."
            />

            <StepCard
              icon="🧠"
              title="AI Matching"
              description="Our AI recommends teammates with complementary skills."
            />

            <StepCard
              icon="🚀"
              title="Build Together"
              description="Connect instantly and start building your winning project."
            />
          </div>
        </section>
      </AnimatedSection>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;