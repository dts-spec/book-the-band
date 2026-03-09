"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { cities } from "@/data/cities";

export default function SignupPage() {
  const [role, setRole] = useState<"fan" | "artist">("fan");

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <div className="w-full max-w-md px-4">
        <div className="bg-surface-light border border-border-light rounded-2xl shadow-[var(--shadow-card)] p-8">
          <h1 className="font-display text-2xl font-bold text-text-dark uppercase tracking-wide text-center">
            Join Book the Band
          </h1>
          <p className="text-sm text-text-dark-secondary text-center mt-1">
            Create your account and start bringing live music to your city
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
              label="Full Name"
              type="text"
              placeholder={role === "fan" ? "Your name" : "Artist / Band name"}
              variant="light"
            />
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              variant="light"
            />
            <Input
              label="Password"
              type="password"
              placeholder="Create a password"
              variant="light"
            />

            {role === "fan" && (
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-text-dark-secondary">
                  Your City
                </label>
                <select className="w-full px-4 py-2.5 rounded-lg text-sm bg-surface-light border border-border-light text-text-dark focus:border-btb-yellow outline-none">
                  <option value="">Select a city</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}, {city.state}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {role === "artist" && (
              <Input
                label="Genre"
                type="text"
                placeholder="e.g. Indie Rock, Electronic"
                variant="light"
              />
            )}

            <Button variant="primary" size="lg" fullWidth>
              Create Account
            </Button>
          </form>

          <p className="text-xs text-text-dark-muted text-center mt-4">
            By creating an account, you agree to our Terms of Service and Privacy Policy.
          </p>

          <p className="text-sm text-text-dark-secondary text-center mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-btb-yellow-dark font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
