"use client";

import { useState } from "react";
import { getArtist } from "@/data/artists";
import { cities } from "@/data/cities";
import { formatNumber } from "@/lib/formatters";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { useParams } from "next/navigation";

export default function BookArtistPage() {
  const params = useParams();
  const artist = getArtist(params.slug as string);
  const [submitted, setSubmitted] = useState(false);

  if (!artist) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-text-muted text-lg">Artist not found.</p>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card variant="dark" padding="lg" className="max-w-lg mx-4 text-center">
          <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-display text-2xl font-bold text-white uppercase tracking-wide">
            Inquiry Submitted!
          </h2>
          <p className="text-text-secondary mt-3">
            Your booking request for <span className="text-white font-semibold">{artist.name}</span> has
            been received. Our team will connect you with the artist&apos;s management within 48 hours.
          </p>
          <div className="mt-6">
            <Button variant="primary" size="md" onClick={() => setSubmitted(false)}>
              Submit Another Inquiry
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Artist Hero */}
      <div className="relative h-[320px] overflow-hidden -mt-16">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={artist.heroImageUrl}
          alt={artist.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface-dark/80 via-surface-dark/60 to-surface-dark" />
        <div className="relative z-10 flex flex-col justify-end h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={artist.imageUrl}
              alt={artist.name}
              className="w-20 h-20 rounded-xl object-cover border-2 border-border-dark"
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="font-display text-3xl sm:text-4xl font-bold text-white uppercase tracking-wide">
                  {artist.name}
                </h1>
                {artist.verified && (
                  <Badge variant="success">Verified</Badge>
                )}
              </div>
              <p className="text-white/70 text-sm capitalize">
                {artist.genre.replace("-", " ")} &middot; {formatNumber(artist.monthlyListeners)} monthly listeners
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-3">
            <h2 className="font-display text-2xl font-bold text-white uppercase tracking-wide mb-2">
              Book {artist.name} for Your Event
            </h2>
            <p className="text-text-secondary text-sm mb-8">
              Fill out the form below and our team will connect you with the artist&apos;s management.
            </p>

            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <Input
                label="Event Name"
                placeholder="e.g. Summer Brand Launch Party"
                variant="dark"
              />

              <Input
                label="Event Date"
                type="date"
                variant="dark"
              />

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-text-secondary">
                  City
                </label>
                <select className="w-full px-4 py-2.5 rounded-lg text-sm bg-surface-elevated border border-border-dark text-white focus:border-btb-yellow outline-none">
                  <option value="">Select a city</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}, {city.state}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Expected Attendees"
                  type="number"
                  placeholder="e.g. 500"
                  variant="dark"
                />
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-text-secondary">
                    Budget Range
                  </label>
                  <select className="w-full px-4 py-2.5 rounded-lg text-sm bg-surface-elevated border border-border-dark text-white focus:border-btb-yellow outline-none">
                    <option value="">Select range</option>
                    <option value="5000-10000">$5,000 – $10,000</option>
                    <option value="10000-25000">$10,000 – $25,000</option>
                    <option value="25000-50000">$25,000 – $50,000</option>
                    <option value="50000+">$50,000+</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-text-secondary">
                  Additional Notes
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your event, audience, and any special requirements..."
                  className="w-full px-4 py-2.5 rounded-lg text-sm bg-surface-elevated border border-border-dark text-white placeholder:text-text-muted focus:border-btb-yellow outline-none resize-none"
                />
              </div>

              <div className="pt-2">
                <Button variant="primary" size="lg" fullWidth>
                  Submit Inquiry
                </Button>
              </div>
            </form>
          </div>

          {/* Artist Info Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            <Card variant="dark" padding="lg">
              <h3 className="font-display text-sm font-bold text-white uppercase tracking-wide mb-3">
                Artist Stats
              </h3>
              <div className="space-y-3">
                {[
                  { label: "Monthly Listeners", value: formatNumber(artist.monthlyListeners) },
                  { label: "Shows Booked", value: String(artist.showsBooked) },
                  { label: "Total Pledges", value: formatNumber(artist.totalPledges) },
                ].map((stat) => (
                  <div key={stat.label} className="flex justify-between items-center">
                    <span className="text-sm text-text-muted">{stat.label}</span>
                    <span className="text-sm font-semibold text-white">{stat.value}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card variant="dark" padding="lg">
              <h3 className="font-display text-sm font-bold text-white uppercase tracking-wide mb-3">
                Top Tracks
              </h3>
              <div className="space-y-2">
                {artist.topTracks.slice(0, 5).map((track, i) => (
                  <div key={track.name} className="flex items-center gap-3">
                    <span className="text-xs text-text-muted w-4">{i + 1}</span>
                    <span className="text-sm text-white truncate flex-1">{track.name}</span>
                    <span className="text-xs text-text-muted">{track.duration}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card variant="dark" padding="lg">
              <h3 className="font-display text-sm font-bold text-white uppercase tracking-wide mb-3">
                What You Get
              </h3>
              <ul className="space-y-2">
                {[
                  "Private or branded performance",
                  "Custom setlist coordination",
                  "Photo & video rights for event",
                  "Artist meet & greet (optional)",
                  "Social media mention from artist",
                ].map((perk) => (
                  <li key={perk} className="flex items-start gap-2 text-sm text-text-secondary">
                    <span className="text-success mt-0.5">&#10003;</span>
                    {perk}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
