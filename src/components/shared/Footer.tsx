import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

interface FooterProps {
  variant?: "dark" | "light";
}

export default function Footer({ variant = "dark" }: FooterProps) {
  const isDark = variant === "dark";

  return (
    <footer
      className={isDark ? "bg-surface-dark border-t border-border-dark" : "bg-surface-cream border-t border-border-light"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <span className="font-display text-lg font-bold uppercase tracking-wide text-btb-yellow">
              {SITE_NAME}
            </span>
            <p className={`text-sm mt-2 ${isDark ? "text-text-muted" : "text-text-dark-muted"}`}>
              Where demand meets the stage.
            </p>
          </div>

          {/* For Fans */}
          <div>
            <h4 className={`text-sm font-semibold mb-3 ${isDark ? "text-white" : "text-text-dark"}`}>
              For Fans
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Discover Shows", href: "/discover" },
                { label: "How It Works", href: "/how-it-works" },
                { label: "My Dashboard", href: "/dashboard" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm ${isDark ? "text-text-muted hover:text-white" : "text-text-dark-muted hover:text-text-dark"} transition-colors`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Artists */}
          <div>
            <h4 className={`text-sm font-semibold mb-3 ${isDark ? "text-white" : "text-text-dark"}`}>
              For Artists
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Artist Dashboard", href: "/artist-dashboard" },
                { label: "Tour Builder", href: "/tour-builder" },
                { label: "Get Started", href: "/signup" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm ${isDark ? "text-text-muted hover:text-white" : "text-text-dark-muted hover:text-text-dark"} transition-colors`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Brands */}
          <div>
            <h4 className={`text-sm font-semibold mb-3 ${isDark ? "text-white" : "text-text-dark"}`}>
              For Brands
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Browse Artists", href: "/brand-discover" },
                { label: "Brand Dashboard", href: "/brand-dashboard" },
                { label: "Become a Sponsor", href: "/signup" },
              ].map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className={`text-sm ${isDark ? "text-text-muted hover:text-white" : "text-text-dark-muted hover:text-text-dark"} transition-colors`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className={`text-sm font-semibold mb-3 ${isDark ? "text-white" : "text-text-dark"}`}>
              Company
            </h4>
            <ul className="space-y-2">
              {[
                { label: "About", href: "#" },
                { label: "Blog", href: "#" },
                { label: "Contact", href: "#" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`text-sm ${isDark ? "text-text-muted hover:text-white" : "text-text-dark-muted hover:text-text-dark"} transition-colors`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={`mt-10 pt-6 border-t ${isDark ? "border-border-dark" : "border-border-light"}`}>
          <p className={`text-xs ${isDark ? "text-text-muted" : "text-text-dark-muted"}`}>
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved. This is a proof-of-concept demo.
          </p>
        </div>
      </div>
    </footer>
  );
}
