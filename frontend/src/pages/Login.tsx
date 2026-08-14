import { Link } from "react-router-dom";
import { Mail } from "lucide-react";   

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">
            Welcome Back 👋
          </h1>

          <p className="mt-3 text-slate-400">
            Sign in to continue building amazing hackathon teams.
          </p>
        </div>

        <form className="space-y-5">

          <div>
            <label className="block text-sm mb-2 text-slate-300">
              Email
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-slate-300">
              Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-linear-to-r from-violet-600 via-blue-600 to-cyan-500 py-3 font-semibold text-white transition duration-300 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(59,130,246,0.5)]"
          >
            Login
          </button>
        </form>

        <div className="my-6 flex items-center">
          <div className="h-px flex-1 bg-white/10"></div>

          <span className="mx-4 text-sm text-slate-500">
            OR
          </span>

          <div className="h-px flex-1 bg-white/10"></div>
        </div>

        <button
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 py-3 text-white transition duration-300 hover:border-cyan-400 hover:bg-white/10"
        >
          <Mail size={20} />

          Continue with Google
        </button>

        <p className="mt-8 text-center text-slate-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-cyan-400 hover:text-cyan-300"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;