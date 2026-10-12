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
    <div className="min-h-screen bg-dot-grid flex items-center justify-center px-6 py-10 font-body text-[#F4F2FF]">
      <div className="relative w-full max-w-md">

        {/* Depth echoes */}
        <div
          className="absolute inset-0 rounded-[20px] border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.03)]"
          style={{ transform: "rotate(7deg) translateY(16px)", opacity: 0.28 }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 rounded-[20px] border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.03)]"
          style={{ transform: "rotate(-6deg) translateY(10px)", opacity: 0.5 }}
          aria-hidden="true"
        />

        {/* Floating skill chips */}
        <span
          className="absolute text-xs font-semibold px-3 py-1.5 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(124,92,255,0.4)] text-[#7C5CFF] font-display"
          style={{ top: "-26px", left: "-46px", transform: "rotate(-8deg)" }}
          aria-hidden="true"
        >
          ⬡ React
        </span>
        <span
          className="absolute text-xs px-3 py-1.5 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.14)] text-[#A9A6C2] font-display"
          style={{ bottom: "40px", right: "-58px", transform: "rotate(6deg)" }}
          aria-hidden="true"
        >
          Figma
        </span>

        {/* Card */}
        <div className="relative z-10 rounded-[20px] border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.06)] backdrop-blur-xl p-10">

          <div className="text-center mb-8">
            <div className="font-display font-bold text-lg mb-4">
              Team<span className="text-[#FFC857]">Forge</span>
            </div>
            <h1 className="font-display text-2xl font-bold text-white">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-[#A9A6C2]">
              Sign in to keep building your hackathon team.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-[#F4F2FF]">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@school.edu"
                required
                className="w-full rounded-lg border border-[rgba(255,255,255,0.14)] bg-[#0B0D17] px-4 py-3 text-white outline-none transition focus:border-[#7C5CFF]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-[#F4F2FF]">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full rounded-lg border border-[rgba(255,255,255,0.14)] bg-[#0B0D17] px-4 py-3 text-white outline-none transition focus:border-[#7C5CFF]"
              />
            </div>

            {error && (
              <div className="rounded-lg border border-red-800 bg-red-950/40 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#FFC857] text-[#0B0D17] border-2 border-white font-display font-bold py-3 shadow-[4px_4px_0_#7C5CFF] transition hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0_#7C5CFF] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs text-[#A9A6C2]">
            <div className="h-px flex-1 bg-[rgba(255,255,255,0.14)]" />
            OR
            <div className="h-px flex-1 bg-[rgba(255,255,255,0.14)]" />
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            className="flex w-full items-center justify-center gap-3 rounded-lg border-2 border-[rgba(255,255,255,0.14)] py-3 text-white transition hover:border-[#7C5CFF] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {googleLoading ? "Signing in..." : "Continue with Google"}
          </button>

          <p className="mt-6 text-center text-sm text-[#A9A6C2]">
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold text-[#7C5CFF] hover:text-[#9b85ff]">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;