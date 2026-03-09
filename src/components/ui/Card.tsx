import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type CardVariant = "dark" | "light" | "elevated";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  hoverable?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const variantStyles: Record<CardVariant, string> = {
  dark: "bg-surface-elevated border border-border-dark",
  light: "bg-surface-light border border-border-light shadow-[var(--shadow-card)]",
  elevated: "bg-surface-elevated border border-border-dark",
};

const paddingStyles = {
  none: "",
  sm: "p-3",
  md: "p-5",
  lg: "p-6",
};

export default function Card({
  variant = "dark",
  hoverable = false,
  padding = "md",
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl overflow-hidden transition-all duration-200",
        variantStyles[variant],
        paddingStyles[padding],
        hoverable && "hover:shadow-[var(--shadow-card-hover)] hover:scale-[1.02] cursor-pointer",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
