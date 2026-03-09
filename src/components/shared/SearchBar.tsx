"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  variant?: "dark" | "light";
  className?: string;
}

export default function SearchBar({
  placeholder = "Search artists, cities, or campaigns...",
  onSearch,
  variant = "dark",
  className,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const isDark = variant === "dark";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSearch?.(query);
  }

  return (
    <form onSubmit={handleSubmit} className={cn("relative", className)}>
      <div
        className={cn(
          "flex items-center rounded-xl border transition-colors",
          isDark
            ? "bg-surface-elevated border-border-dark focus-within:border-btb-yellow"
            : "bg-white border-border-light shadow-sm focus-within:border-btb-yellow",
        )}
      >
        <span className="pl-4 text-text-muted">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "w-full px-3 py-3 bg-transparent text-sm outline-none",
            isDark
              ? "text-white placeholder:text-text-muted"
              : "text-text-dark placeholder:text-text-dark-muted",
          )}
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              onSearch?.("");
            }}
            className="pr-4 text-text-muted hover:text-white transition-colors cursor-pointer"
          >
            &times;
          </button>
        )}
      </div>
    </form>
  );
}
