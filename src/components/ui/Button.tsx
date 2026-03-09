"use client";

import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-btb-yellow text-black font-semibold hover:bg-btb-yellow-hover active:scale-[0.98] shadow-sm",
  secondary:
    "bg-surface-elevated text-white border border-border-dark hover:bg-surface-hover",
  outline:
    "bg-transparent border border-border-dark text-white hover:bg-surface-hover",
  ghost: "bg-transparent text-text-secondary hover:text-white hover:bg-surface-hover",
  danger: "bg-error text-white font-semibold hover:brightness-110",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm rounded-lg",
  md: "px-5 py-2.5 text-sm rounded-lg",
  lg: "px-8 py-3.5 text-base rounded-xl font-display uppercase tracking-wide",
};

export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer",
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && "w-full",
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
