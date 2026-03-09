import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

interface PillProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  icon?: string;
}

export default function Pill({
  active = false,
  icon,
  className,
  children,
  ...props
}: PillProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 cursor-pointer whitespace-nowrap",
        active
          ? "bg-btb-yellow text-black"
          : "bg-surface-elevated text-text-secondary border border-border-dark hover:border-text-muted hover:text-white",
        className,
      )}
      {...props}
    >
      {icon && <span className="text-base">{icon}</span>}
      {children}
    </button>
  );
}
