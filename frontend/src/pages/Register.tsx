import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { HiCheckCircle } from "react-icons/hi";

import AuthLayout from "../layouts/AuthLayout";
import { Button, Input } from "../components/common";
import { auth, googleProvider } from "../firebase/firebase";

type RegisterForm = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm<RegisterForm>({
    mode: "onChange",
  });

  const password = useWatch({
    control,
    name: "password",
  });

  const confirmPassword = useWatch({
    control,
    name: "confirmPassword",
  });

  const passwordStrength = useMemo(() => {
    if (!password) return 0;

    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;
  }, [password]);

  const strengthLabel = [
    "Very Weak",
    "Weak",
    "Good",
    "Strong",
    "Excellent",
  ][passwordStrength];

  const strengthColor = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-400",
    "bg-cyan-400",
    "bg-green-500",
  ][passwordStrength];

  async function handleGoogleSignIn() {
    try {
      setLoading(true);

      await signInWithPopup(auth, googleProvider);

      alert("Welcome to TeamForge AI! 🚀");

      navigate("/dashboard");
    } catch (error) {
      console.error("Google Sign-In Error:", error);

      const errorCode =
        typeof error === "object" &&
        error !== null &&
        "code" in error
          ? String(error.code)
          : "";

      if (errorCode === "auth/popup-closed-by-user") {
        return;
      }

      if (errorCode === "auth/popup-blocked") {
        alert(
          "Google Sign-In popup was blocked. Please allow popups and try again."
        );
        return;
      }

      alert("Google Sign-In failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function onSubmit(data: RegisterForm) {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });

      return;
    }

    try {
      setLoading(true);

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );

      await updateProfile(userCredential.user, {
        displayName: data.fullName,
      });

      alert("Account created successfully! 🎉");

      navigate("/dashboard");
    } catch (error) {
      console.error("Registration Error:", error);

      const errorCode =
        typeof error === "object" &&
        error !== null &&
        "code" in error
          ? String(error.code)
          : "";

      if (errorCode === "auth/email-already-in-use") {
        setError("email", {
          type: "manual",
          message: "An account with this email already exists.",
        });
      } else if (errorCode === "auth/invalid-email") {
        setError("email", {
          type: "manual",
          message: "Please enter a valid email address.",
        });
      } else if (errorCode === "auth/weak-password") {
        setError("password", {
          type: "manual",
          message: "Password should be at least 6 characters.",
        });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join TeamForge AI and start building legendary hackathon teams."
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        {/* Full Name */}
        <Input
          label="Full Name"
          placeholder="Stuti Jain"
          {...register("fullName", {
            required: "Full name is required",
            minLength: {
              value: 3,
              message: "Minimum 3 characters",
            },
          })}
          error={errors.fullName?.message}
        />

        {/* Email */}
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email",
            },
          })}
          error={errors.email?.message}
        />

        {/* Password */}
        <Input
          label="Password"
          type="password"
          placeholder="Create a strong password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Minimum 8 characters",
            },
          })}
          error={errors.password?.message}
        />

        {/* Password Strength */}
        {password && (
          <div className="space-y-2">
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={`h-2 flex-1 rounded-full transition-all ${
                    passwordStrength >= bar
                      ? strengthColor
                      : "bg-zinc-700"
                  }`}
                />
              ))}
            </div>

            <p className="text-sm text-zinc-400">
              Password Strength:
              <span className="ml-2 font-semibold text-white">
                {strengthLabel}
              </span>
            </p>
          </div>
        )}

        {/* Confirm Password */}
        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
          })}
          error={errors.confirmPassword?.message}
        />

        {/* Password Match */}
        {confirmPassword &&
          password === confirmPassword && (
            <div className="flex items-center gap-2 text-sm text-green-400">
              <HiCheckCircle size={18} />
              Passwords match
            </div>
          )}

        {/* Create Account */}
        <Button
          type="submit"
          fullWidth
          loading={loading}
        >
          Create Account
        </Button>

        {/* Divider */}
        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-700" />
          </div>

          <div className="relative flex justify-center">
            <span className="bg-[#09090B] px-4 text-sm text-zinc-400">
              OR
            </span>
          </div>
        </div>

        {/* Google Sign-In */}
        <Button
          type="button"
          variant="secondary"
          fullWidth
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          <div className="flex items-center justify-center gap-3">
            <FcGoogle size={22} />
            Continue with Google
          </div>
        </Button>

        {/* Login Link */}
        <p className="text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-violet-400 transition hover:text-violet-300"
          >
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}