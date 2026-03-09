"use client";

import { useState, useMemo } from "react";
import { campaigns } from "@/data/campaigns";
import CampaignCard from "@/components/campaign/CampaignCard";
import SearchBar from "@/components/shared/SearchBar";
import CitySelector from "@/components/shared/CitySelector";
import GenreFilter from "@/components/shared/GenreFilter";

const HERO_IMG =
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=80";

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return campaigns.filter((c) => {
      if (c.status === "completed" || c.status === "expired") return false;
      if (selectedCity && c.city.id !== selectedCity) return false;
      if (selectedGenre && c.artist.genre !== selectedGenre) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          c.artist.name.toLowerCase().includes(q) ||
          c.city.name.toLowerCase().includes(q) ||
          c.title.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [searchQuery, selectedCity, selectedGenre]);

  return (
    <div className="min-h-screen">
      {/* Hero banner — pulls up under fixed navbar */}
      <div className="relative h-[280px] overflow-hidden -mt-16">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_IMG}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface-dark/80 via-surface-dark/60 to-surface-dark" />
        <div className="relative z-10 flex flex-col justify-end h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white uppercase tracking-wide">
            Discover
          </h1>
          <p className="mt-2 text-white/70 text-lg">
            Find campaigns in your city and help bring artists to your stage.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="space-y-4 mb-8">
          <SearchBar onSearch={setSearchQuery} variant="dark" />
          <CitySelector
            selectedCity={selectedCity}
            onSelect={setSelectedCity}
          />
          <GenreFilter
            selectedGenre={selectedGenre}
            onSelect={setSelectedGenre}
          />
        </div>

        {/* Results */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-text-muted">No campaigns found</p>
            <p className="text-sm text-text-muted mt-2">
              Try adjusting your filters or search query.
            </p>
          </div>
        )}

        <div className="mt-6 text-sm text-text-muted">
          {filtered.length} campaign{filtered.length !== 1 ? "s" : ""} found
        </div>
      </div>
    </div>
  );
}
