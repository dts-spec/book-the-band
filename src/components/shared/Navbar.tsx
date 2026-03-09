"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NAV_LINKS_FAN, NAV_LINKS_ARTIST, NAV_LINKS_BRAND, SITE_NAME } from "@/lib/constants";
import type { UserRole } from "@/types";
import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";

interface NavbarProps {
  variant?: "dark" | "light" | "transparent";
}

const ROLES: UserRole[] = ["fan", "artist", "brand"];

export default function Navbar({ variant = "dark" }: NavbarProps) {
  const pathname = usePathname();
  const [role, setRole] = useState<UserRole>("fan");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const links = role === "fan" ? NAV_LINKS_FAN : role === "artist" ? NAV_LINKS_ARTIST : NAV_LINKS_BRAND;

  /* When transparent, solidify navbar after scrolling 80px */
  useEffect(() => {
    if (variant !== "transparent") return;
    function handleScroll() {
      setScrolled(window.scrollY > 80);
    }
    handleScroll(); // check on mount
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [variant]);

  const isTransparent = variant === "transparent";
  const showSolid = isTransparent ? scrolled : true;
  // Always dark text scheme for dark + transparent variants
  const isDark = variant === "dark" || isTransparent;

  return (
    <nav
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isTransparent && !scrolled
          ? "bg-transparent"
          : isDark
            ? "bg-surface-dark backdrop-blur-md border-b border-border-dark"
            : "bg-surface-light backdrop-blur-md border-b border-border-light",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-display text-xl font-bold uppercase tracking-wide text-btb-yellow">
              {SITE_NAME}
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "text-btb-yellow"
                    : isDark
                      ? "text-text-secondary hover:text-white"
                      : "text-text-dark-secondary hover:text-text-dark",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Role switcher */}
            <div
              className={cn(
                "hidden sm:flex items-center rounded-full p-0.5 text-xs",
                isDark ? "bg-surface-elevated" : "bg-surface-light-elevated",
              )}
            >
              {ROLES.map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={cn(
                    "px-2.5 py-1 rounded-full transition-all cursor-pointer capitalize",
                    role === r
                      ? "bg-btb-yellow text-black font-semibold"
                      : isDark
                        ? "text-text-muted hover:text-white"
                        : "text-text-dark-muted hover:text-text-dark",
                  )}
                >
                  {r}
                </button>
              ))}
            </div>

            <Link href="/login">
              <Button variant={isDark ? "outline" : "primary"} size="sm">
                Sign In
              </Button>
            </Link>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <div className="space-y-1.5">
                <span className={cn("block w-5 h-0.5 transition-all", isDark ? "bg-white" : "bg-text-dark")} />
                <span className={cn("block w-5 h-0.5 transition-all", isDark ? "bg-white" : "bg-text-dark")} />
                <span className={cn("block w-3 h-0.5 transition-all", isDark ? "bg-white" : "bg-text-dark")} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className={cn(
            "md:hidden pb-4 border-t",
            isDark ? "border-border-dark" : "border-border-light",
          )}>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block py-3 text-sm font-medium",
                  pathname === link.href
                    ? "text-btb-yellow"
                    : isDark
                      ? "text-text-secondary"
                      : "text-text-dark-secondary",
                )}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
