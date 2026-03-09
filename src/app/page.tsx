"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import CampaignCard from "@/components/campaign/CampaignCard";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { getTrendingCampaigns, campaigns, getCampaignsByCity } from "@/data/campaigns";
import { cities } from "@/data/cities";
import { formatNumber } from "@/lib/formatters";

/* ── Static images ── */
const HERO_BG =
  "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1920&q=80";
const HOW1_IMG =
  "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800&q=80";
const HOW2_IMG =
  "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&q=80";
const HOW3_IMG =
  "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&q=80";
const VENUE_BG =
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1920&q=80";
const SPEAKEASY_BG =
  "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=1920&q=80";

/* City hero images */
const CITY_IMAGES: Record<string, string> = {
  denver:
    "https://images.unsplash.com/photo-1546156929-a4c0ac411f47?w=800&q=80",
  austin:
    "https://images.unsplash.com/photo-1531218150217-54595bc2b934?w=800&q=80",
  nashville:
    "https://images.unsplash.com/photo-1587162146766-e06b1189b907?w=800&q=80",
  chicago:
    "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80",
  portland:
    "https://images.unsplash.com/photo-1535448033526-c0e85c9e6968?w=800&q=80",
};

/* ── Stats ── */
const stats = [
  {
    label: "Active Campaigns",
    value: formatNumber(
      campaigns.filter((c) => c.status === "active").length
    ),
  },
  {
    label: "Shows Booked",
    value: formatNumber(
      campaigns.filter(
        (c) => c.status === "confirmed" || c.status === "completed"
      ).length
    ),
  },
  {
    label: "Total Pledges",
    value: formatNumber(
      campaigns.reduce((sum, c) => sum + c.currentPledges, 0)
    ),
  },
  { label: "Cities", value: "5" },
];

/* ── How It Works steps ── */
const steps = [
  {
    img: HOW1_IMG,
    title: "Pledge Your Spot",
    subtitle: "01",
    description:
      "Pick an artist, pick your city. Reserve your spot — you won\u2019t be charged until the show is confirmed.",
  },
  {
    img: HOW2_IMG,
    title: "Rally the Crowd",
    subtitle: "02",
    description:
      "Share with friends and watch the pledge count climb. When enough fans commit, the show is a go.",
  },
  {
    img: HOW3_IMG,
    title: "Show Gets Booked",
    subtitle: "03",
    description:
      "A venue is matched, your ticket is locked, and you helped make it happen. That\u2019s fan power.",
  },
];

export default function LandingPage() {
  const trending = getTrendingCampaigns();
  const heroRef = useRef<HTMLDivElement>(null);
  const venueRef = useRef<HTMLDivElement>(null);

  /* Parallax scroll handler */
  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${scrollY * 0.35}px)`;
      }
      if (venueRef.current) {
        const rect = venueRef.current.getBoundingClientRect();
        const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * 0.15;
        venueRef.current.style.backgroundPositionY = `calc(50% + ${offset}px)`;
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-surface-dark">
      {/* Navbar - transparent over hero */}
      <Navbar variant="transparent" />

      {/* ═══════════════════════════════════════════
          HERO — full-viewport concert crowd
         ═══════════════════════════════════════════ */}
      <section className="relative h-screen min-h-[600px] overflow-hidden flex items-center justify-center">
        {/* Background image with parallax */}
        <div
          ref={heroRef}
          className="absolute inset-0 -top-[20%] h-[120%] bg-cover bg-center will-change-transform"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        {/* Gradient overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-surface-dark" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />

        {/* Hero content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold text-white uppercase tracking-wide leading-[0.9]">
            Bring Your
            <br />
            <span className="text-btb-yellow">Favorite Artists</span>
            <br />
            to Your City
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
            Pledge your spot. Hit the threshold. The show gets booked.
            <br className="hidden sm:block" />
            Fan-powered live music is here.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/discover">
              <Button variant="primary" size="lg">
                Explore Campaigns
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10"
              >
                How It Works
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-white/50 uppercase tracking-widest">
            Scroll
          </span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="text-white/50"
          >
            <path
              d="M10 4v12m0 0l-4-4m4 4l4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          STATS BAR
         ═══════════════════════════════════════════ */}
      <section className="relative z-10 bg-surface-dark border-y border-border-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl sm:text-4xl font-bold font-display text-btb-yellow">
                  {stat.value}
                </p>
                <p className="text-sm text-text-muted mt-1 uppercase tracking-wide">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          HOW IT WORKS — visual cards with concert imagery
         ═══════════════════════════════════════════ */}
      <section className="bg-surface-cream py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text-dark uppercase tracking-wide text-center">
            How It Works
          </h2>
          <p className="mt-4 text-text-dark-secondary text-center max-w-2xl mx-auto text-lg">
            Three steps to turning fan demand into live shows.
          </p>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <Link
                key={step.subtitle}
                href="/how-it-works"
                className="group relative rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer"
              >
                {/* Card background image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={step.img}
                  alt={step.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-end h-full p-6 sm:p-8">
                  <span className="font-display text-5xl font-extrabold text-btb-yellow/80">
                    {step.subtitle}
                  </span>
                  <h3 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-white uppercase tracking-wide">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-white/80 text-sm sm:text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Hover hint */}
                <div className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs text-white/80 font-medium">Learn more →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PARALLAX VENUE DIVIDER
         ═══════════════════════════════════════════ */}
      <section
        ref={venueRef}
        className="relative h-[50vh] min-h-[400px] bg-cover bg-center bg-fixed flex items-center justify-center overflow-hidden"
        style={{ backgroundImage: `url(${VENUE_BG})` }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center max-w-3xl px-6">
          <blockquote className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-wide leading-tight">
            &ldquo;The best shows happen when the fans decide.&rdquo;
          </blockquote>
          <p className="mt-4 text-white/60 text-sm uppercase tracking-widest">
            Fan-powered since day one
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TRENDING CAMPAIGNS
         ═══════════════════════════════════════════ */}
      <section className="relative bg-surface-dark py-24 noise-overlay">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white uppercase tracking-wide">
                Trending Campaigns
              </h2>
              <p className="mt-2 text-text-secondary">
                Shows gaining momentum right now.
              </p>
            </div>
            <Link href="/discover">
              <Button variant="ghost" size="sm">
                View All &rarr;
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trending.slice(0, 4).map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SHOWS BY CITIES
         ═══════════════════════════════════════════ */}
      <section className="bg-surface-cream py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text-dark uppercase tracking-wide">
              Shows by City
            </h2>
            <p className="mt-4 text-text-dark-secondary text-lg max-w-2xl mx-auto">
              See what&apos;s happening near you. Pick a city and discover campaigns waiting for your pledge.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {cities.map((city) => {
              const cityCampaigns = getCampaignsByCity(city.id).filter(
                (c) => c.status === "active" || c.status === "threshold_met"
              );
              return (
                <Link
                  key={city.id}
                  href="/discover"
                  className="group relative rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer"
                >
                  {/* City image */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={CITY_IMAGES[city.id] || ""}
                    alt={city.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/90 transition-all duration-300" />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col justify-end h-full p-4 sm:p-5">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white uppercase tracking-wide">
                      {city.name}
                    </h3>
                    <p className="text-white/60 text-xs uppercase tracking-widest mt-1">
                      {city.state}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-btb-yellow animate-pulse" />
                      <span className="text-sm text-white/80 font-medium">
                        {cityCampaigns.length} active campaign{cityCampaigns.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link href="/discover">
              <Button variant="primary" size="md">
                Explore All Cities &rarr;
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ARTIST CTA — speakeasy / dark venue vibe
         ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${SPEAKEASY_BG})` }}
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-btb-yellow/20 via-transparent to-btb-yellow/10" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white uppercase tracking-wide">
            Are You an Artist?
          </h2>
          <p className="mt-5 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            Let your fans tell you where to play. Launch a campaign, build
            demand city by city, and book shows where people actually want to
            see you. No gatekeepers. Just fans.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup">
              <Button variant="primary" size="lg">
                Start Your Campaign
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          BRAND CTA — corporate partnership
         ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-surface-dark">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface-dark via-surface-dark/90 to-surface-dark" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="yellow" className="mb-4">For Brands</Badge>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white uppercase tracking-wide">
                Are You a Brand?
              </h2>
              <p className="mt-5 text-lg text-text-secondary leading-relaxed">
                Connect with passionate music fans through sponsorships and
                private events. From presenting-level campaign sponsorships to
                booking artists for exclusive brand experiences — reach
                audiences that are already engaged.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-start gap-4">
                <Link href="/signup">
                  <Button variant="primary" size="lg">
                    Become a Sponsor
                  </Button>
                </Link>
                <Link href="/brand-discover">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    Browse Opportunities
                  </Button>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "🎤", label: "Sponsor Campaigns", desc: "Put your brand behind fan-powered shows" },
                { icon: "🏢", label: "Private Events", desc: "Book artists for branded experiences" },
                { icon: "📊", label: "Audience Insights", desc: "Reach engaged, passionate music fans" },
                { icon: "🤝", label: "Authentic Connection", desc: "Build brand affinity through live music" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-surface-elevated/50 backdrop-blur-sm border border-border-dark rounded-xl p-5 hover:border-btb-yellow/30 transition-colors"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <h4 className="font-display text-sm font-bold text-white uppercase tracking-wide mt-3">
                    {item.label}
                  </h4>
                  <p className="text-xs text-text-muted mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer variant="dark" />
    </div>
  );
}
