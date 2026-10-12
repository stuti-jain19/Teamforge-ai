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
        <label className="text-sm font-semibold text-[#F4F2FF]">{label}</label>

        <div className="relative">
          <input
            ref={ref}
            type={isPassword ? (showPassword ? "text" : "password") : type}
            className={`w-full rounded-lg border border-[rgba(255,255,255,0.14)] bg-[#0B0D17]/70 px-4 py-3 text-white placeholder-[#5A5774] outline-none transition focus:border-[#7C5CFF] ${className}`}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((prev: boolean) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A9A6C2] transition hover:text-white"
            >
              {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
            </button>
          )}
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;