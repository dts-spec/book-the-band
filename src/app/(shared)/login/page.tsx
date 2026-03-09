"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function LoginPage() {
  const [role, setRole] = useState<"fan" | "artist">("fan");

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <div className="w-full max-w-md px-4">
        <div className="bg-surface-light border border-border-light rounded-2xl shadow-[var(--shadow-card)] p-8">
          <h1 className="font-display text-2xl font-bold text-text-dark uppercase tracking-wide text-center">
            Welcome Back
          </h1>
          <p className="text-sm text-text-dark-secondary text-center mt-1">
            Sign in to your Book the Band account
          </p>

          {/* Role tabs */}
          <div className="flex mt-6 p-1 bg-surface-light-elevated rounded-lg">
            <button
              onClick={() => setRole("fan")}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all cursor-pointer ${
                role === "fan"
                  ? "bg-surface-light text-text-dark shadow-sm"
                  : "text-text-dark-muted hover:text-text-dark"
              }`}
            >
              Fan
            </button>
            <button
              onClick={() => setRole("artist")}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all cursor-pointer ${
                role === "artist"
                  ? "bg-surface-light text-text-dark shadow-sm"
                  : "text-text-dark-muted hover:text-text-dark"
              }`}
            >
              Artist
            </button>
          </div>

          <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              variant="light"
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              variant="light"
            />
            <Button variant="primary" size="lg" fullWidth>
              Sign In
            </Button>
          </form>

          <p className="text-sm text-text-dark-secondary text-center mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-btb-yellow-dark font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
