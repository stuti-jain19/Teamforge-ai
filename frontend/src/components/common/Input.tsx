import { forwardRef, useState, type InputHTMLAttributes } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, type = "text", className = "", ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";

    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-300">
          {label}
        </label>

        <div className="relative">
          <input
            ref={ref}
            type={
              isPassword
                ? showPassword
                  ? "text"
                  : "password"
                : type
            }
            className={`w-full rounded-2xl border border-zinc-700 bg-zinc-900/70 px-4 py-3 text-white placeholder-zinc-500 outline-none transition-all duration-300 backdrop-blur-md focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 ${className}`}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((prev: boolean) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 transition hover:text-white"
            >
              {showPassword ? (
                <HiEyeOff size={20} />
              ) : (
                <HiEye size={20} />
              )}
            </button>
          )}
        </div>

        {error && (
          <p className="text-sm text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;