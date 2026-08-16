import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";

import { auth, googleProvider } from "../firebase/firebase";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await signInWithEmailAndPassword(auth, email, password);

      navigate("/dashboard");
    } catch (error: unknown) {
      console.error("Login error:", error);

      if (error instanceof FirebaseError) {
        if (error.code === "auth/invalid-credential") {
          setError("Incorrect email or password.");
        } else if (error.code === "auth/user-not-found") {
          setError("No account found with this email.");
        } else if (error.code === "auth/wrong-password") {
          setError("Incorrect password.");
        } else {
          setError("Unable to login. Please try again.");
        }
      } else {
        setError("Unable to login. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      setError("");

      await signInWithPopup(auth, googleProvider);

      navigate("/dashboard");
    } catch (error: unknown) {
      console.error("Google login error:", error);

      if (error instanceof FirebaseError) {
        if (error.code === "auth/popup-closed-by-user") {
          setError("Google sign-in was cancelled.");
        } else {
          setError("Unable to sign in with Google.");
        }
      } else {
        setError("Unable to sign in with Google.");
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">
            Welcome Back 👋
          </h1>

          <p className="mt-3 text-slate-400">
            Sign in to continue building amazing hackathon teams.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm mb-2 text-slate-300">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-2 text-slate-300">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-linear-to-r from-violet-600 via-blue-600 to-cyan-500 py-3 font-semibold text-white transition duration-300 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(59,130,246,0.5)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="h-px flex-1 bg-white/10"></div>

          <span className="mx-4 text-sm text-slate-500">
            OR
          </span>

          <div className="h-px flex-1 bg-white/10"></div>
        </div>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={googleLoading}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 py-3 text-white transition duration-300 hover:border-cyan-400 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {googleLoading ? "Signing in..." : "Continue with Google"}
        </button>

        {/* Register */}
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