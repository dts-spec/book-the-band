"use client";

import { useState } from "react";
import { cities } from "@/data/cities";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import Pill from "@/components/ui/Pill";

const stepLabels = ["Select Cities", "Set Thresholds", "Add Reward Tiers", "Review & Launch"];

export default function TourBuilderPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [thresholds, setThresholds] = useState<Record<string, string>>({});

  function toggleCity(cityId: string) {
    setSelectedCities((prev) =>
      prev.includes(cityId) ? prev.filter((c) => c !== cityId) : [...prev, cityId],
    );
  }

  return (
    <div className="min-h-screen bg-surface-light">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="font-display text-3xl font-bold text-text-dark uppercase tracking-wide mb-2">
          Tour Builder
        </h1>
        <p className="text-text-dark-secondary mb-8">
          Create campaigns in the cities where your fans want to see you.
        </p>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-8">
          {stepLabels.map((label, i) => (
            <div key={label} className="flex items-center gap-2 flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  i <= currentStep
                    ? "bg-btb-yellow text-black"
                    : "bg-surface-light-elevated text-text-dark-muted"
                }`}
              >
                {i + 1}
              </div>
              <span className={`text-xs hidden sm:block ${
                i <= currentStep ? "text-text-dark" : "text-text-dark-muted"
              }`}>
                {label}
              </span>
              {i < stepLabels.length - 1 && (
                <div className={`flex-1 h-px ${i < currentStep ? "bg-btb-yellow" : "bg-border-light"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Select Cities */}
        {currentStep === 0 && (
          <Card variant="light" padding="lg">
            <h2 className="font-display text-xl font-bold text-text-dark uppercase mb-4">
              Where do you want to play?
            </h2>
            <p className="text-sm text-text-dark-secondary mb-6">
              Select the cities for your campaign. We&apos;ll gauge fan demand in each.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {cities.map((city) => (
                <button
                  key={city.id}
                  onClick={() => toggleCity(city.id)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedCities.includes(city.id)
                      ? "border-btb-yellow bg-btb-yellow/5"
                      : "border-border-light hover:border-text-dark-muted"
                  }`}
                >
                  <p className="font-semibold text-text-dark">{city.name}</p>
                  <p className="text-xs text-text-dark-muted">{city.state}</p>
                </button>
              ))}
            </div>
          </Card>
        )}

        {/* Step 2: Set Thresholds */}
        {currentStep === 1 && (
          <Card variant="light" padding="lg">
            <h2 className="font-display text-xl font-bold text-text-dark uppercase mb-4">
              Set Your Thresholds
            </h2>
            <p className="text-sm text-text-dark-secondary mb-6">
              How many pledges do you need to make each show viable?
            </p>
            <div className="space-y-4">
              {selectedCities.map((cityId) => {
                const city = cities.find((c) => c.id === cityId)!;
                return (
                  <div key={cityId} className="flex items-center gap-4">
                    <span className="text-sm font-medium text-text-dark w-28">{city.name}</span>
                    <Input
                      variant="light"
                      type="number"
                      placeholder="e.g. 300"
                      value={thresholds[cityId] || ""}
                      onChange={(e) =>
                        setThresholds((prev) => ({ ...prev, [cityId]: e.target.value }))
                      }
                      className="max-w-[160px]"
                    />
                    <span className="text-xs text-text-dark-muted">pledges</span>
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        {/* Step 3: Reward Tiers (simplified) */}
        {currentStep === 2 && (
          <Card variant="light" padding="lg">
            <h2 className="font-display text-xl font-bold text-text-dark uppercase mb-4">
              Reward Tiers
            </h2>
            <p className="text-sm text-text-dark-secondary mb-6">
              We&apos;ll set up standard tiers for you. You can customize them later.
            </p>
            <div className="space-y-3">
              {[
                { name: "General Admission", price: "$25", desc: "Entry to the show" },
                { name: "Preferred Standing", price: "$45", desc: "Priority entry + viewing area" },
                { name: "VIP Meet & Greet", price: "$85", desc: "Meet the artist + signed poster" },
                { name: "Superfan Package", price: "$150", desc: "Soundcheck access + merch bundle" },
              ].map((tier) => (
                <div
                  key={tier.name}
                  className="flex items-center justify-between p-4 bg-surface-light-elevated rounded-lg border border-border-light"
                >
                  <div>
                    <p className="text-sm font-semibold text-text-dark">{tier.name}</p>
                    <p className="text-xs text-text-dark-muted">{tier.desc}</p>
                  </div>
                  <span className="text-lg font-bold font-display text-text-dark">{tier.price}</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Step 4: Review */}
        {currentStep === 3 && (
          <Card variant="light" padding="lg">
            <h2 className="font-display text-xl font-bold text-text-dark uppercase mb-4">
              Review & Launch
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-text-dark-muted uppercase font-semibold">Cities</p>
                <div className="flex gap-2 mt-1">
                  {selectedCities.map((id) => {
                    const city = cities.find((c) => c.id === id)!;
                    return <Pill key={id} active>{city.name}</Pill>;
                  })}
                </div>
              </div>
              <div>
                <p className="text-xs text-text-dark-muted uppercase font-semibold">Thresholds</p>
                <div className="mt-1 space-y-1">
                  {selectedCities.map((id) => {
                    const city = cities.find((c) => c.id === id)!;
                    return (
                      <p key={id} className="text-sm text-text-dark">
                        {city.name}: <span className="font-semibold">{thresholds[id] || "—"} pledges</span>
                      </p>
                    );
                  })}
                </div>
              </div>
              <div className="p-4 bg-btb-yellow/10 rounded-lg border border-btb-yellow/30">
                <p className="text-sm text-text-dark">
                  This is a POC demo. In production, launching would create live campaigns.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
            disabled={currentStep === 0}
            className="border-border-light text-text-dark hover:bg-surface-light-hover"
          >
            Back
          </Button>
          <Button
            variant="primary"
            onClick={() => setCurrentStep((s) => Math.min(stepLabels.length - 1, s + 1))}
            disabled={currentStep === 0 && selectedCities.length === 0}
          >
            {currentStep === stepLabels.length - 1 ? "Launch Campaign" : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
}
