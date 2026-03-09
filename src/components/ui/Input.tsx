import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  variant?: "dark" | "light";
}

export default function Input({
  label,
  error,
  variant = "dark",
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className={cn(
            "text-sm font-medium",
            variant === "dark" ? "text-text-secondary" : "text-text-dark-secondary",
          )}
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          "w-full px-4 py-2.5 rounded-lg text-sm transition-colors outline-none",
          variant === "dark"
            ? "bg-surface-dark border border-border-dark text-white placeholder:text-text-muted focus:border-btb-yellow"
            : "bg-white border border-border-light text-text-dark placeholder:text-text-dark-muted focus:border-btb-yellow",
          error && "border-error focus:border-error",
          className,
        )}
        {...props}
      />
      {error && <p className="text-xs text-error">{error}</p>}
    </div>
  );
}
