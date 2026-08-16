import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user, signOutUser } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <header className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-bold">
              TeamForge AI 🚀
            </h1>

            <p className="text-slate-400 mt-1">
              Build your dream team.
            </p>
          </div>

          <button
            onClick={signOutUser}
            className="px-5 py-2.5 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white transition"
          >
            Logout
          </button>
        </header>

        {/* Welcome Section */}
        <section className="mb-10">
          <p className="text-blue-400 text-sm font-medium mb-2">
            YOUR DASHBOARD
          </p>

          <h2 className="text-4xl font-bold mb-3">
            Welcome{user?.displayName ? `, ${user.displayName}` : ""}! 👋
          </h2>

          <p className="text-slate-400">
            Find the right people, build amazing projects, and create
            something great together.
          </p>
        </section>

        {/* Dashboard Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Profile Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition">
            <div className="text-3xl mb-4">
              👤
            </div>

            <h3 className="text-xl font-semibold mb-2">
              Your Profile
            </h3>

            <p className="text-slate-400 text-sm">
              Tell TeamForge about your skills, interests, and experience.
            </p>

            <Link
              to="/profile"
              className="inline-block mt-5 text-blue-400 font-medium hover:text-blue-300 transition"
            >
              Complete Profile →
            </Link>
          </div>

          {/* Find Team Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition">
            <div className="text-3xl mb-4">
              🤝
            </div>

            <h3 className="text-xl font-semibold mb-2">
              Find Your Team
            </h3>

            <p className="text-slate-400 text-sm">
              Discover teammates whose skills complement yours.
            </p>

            <button className="mt-5 text-blue-400 font-medium hover:text-blue-300 transition">
              Find Teammates →
            </button>
          </div>

          {/* Projects Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition">
            <div className="text-3xl mb-4">
              🚀
            </div>

            <h3 className="text-xl font-semibold mb-2">
              Your Projects
            </h3>

            <p className="text-slate-400 text-sm">
              Keep track of the teams and projects you're working on.
            </p>

            <button className="mt-5 text-blue-400 font-medium hover:text-blue-300 transition">
              View Projects →
            </button>
          </div>

        </section>

      </div>
    </div>
  );
}

export default Dashboard;