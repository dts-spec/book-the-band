"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Link from "next/link";

/* ── Imagery ── */
const HERO_IMG =
  "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1920&q=80";

/* ── Per-step images for each perspective ── */
const STEP_IMAGES = {
  fans: [
    "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=900&q=80", // browsing phone at concert
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80", // ticket / mobile payment
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=80", // friends together
    "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=900&q=80", // concert crowd enjoying
  ],
  artists: [
    "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=900&q=80", // studio / laptop creative
    "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=900&q=80", // growing crowd / demand
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=900&q=80", // venue lights / confirmed
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=900&q=80", // artist on stage
  ],
  venues: [
    "https://images.unsplash.com/photo-1578946956088-940c3b502864?w=900&q=80", // venue interior
    "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=900&q=80", // packed crowd
    "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=900&q=80", // event operations
    "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=900&q=80", // epic venue shot
  ],
};

/* ── Step icons as SVG paths ── */
const STEP_ICONS = {
  fans: [
    // Search / discover
    "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z",
    // Ticket / pledge
    "M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z",
    // Share / megaphone
    "M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46",
    // Music / enjoy
    "M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.34A1.125 1.125 0 0010.678 1.25l-9 2.568A1.125 1.125 0 001 4.944v8.529a2.25 2.25 0 01-1.07 1.916l-.832.498a1.803 1.803 0 10.99 3.467l1.32-.377A2.25 2.25 0 003 16.794V7.5l9-2.567",
  ],
  artists: [
    // Rocket / launch
    "M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z",
    // Chart / growth
    "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
    // Check circle / confirmed
    "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    // Musical note / play
    "M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.34A1.125 1.125 0 0010.678 1.25l-9 2.568A1.125 1.125 0 001 4.944v8.529a2.25 2.25 0 01-1.07 1.916l-.832.498a1.803 1.803 0 10.99 3.467l1.32-.377A2.25 2.25 0 003 16.794V7.5l9-2.567",
  ],
  venues: [
    // Building / venue
    "M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 4.5H21m-3.75 4.5H21",
    // Users / audience
    "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z",
    // Cog / operations
    "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
    // Star / reputation
    "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z",
  ],
};

const perspectives = [
  {
    id: "fans" as const,
    label: "For Fans",
    steps: [
      {
        title: "Find Your Artist",
        desc: "Browse campaigns or search for artists you love. Filter by city, genre, or popularity.",
      },
      {
        title: "Pledge Your Spot",
        desc: "Choose your reward tier and pledge. Your card is authorized but not charged until the show is confirmed.",
      },
      {
        title: "Spread the Word",
        desc: "Share with friends to hit the threshold faster. Earn ambassador points and unlock exclusive perks.",
      },
      {
        title: "Enjoy the Show",
        desc: "Once the threshold is met, the venue is booked, your ticket is confirmed, and you helped make it happen.",
      },
    ],
  },
  {
    id: "artists" as const,
    label: "For Artists",
    steps: [
      {
        title: "Create a Campaign",
        desc: "Use the Tour Builder to select cities and set pledge thresholds for each market.",
      },
      {
        title: "Build Demand",
        desc: "Your fans pledge for shows in their cities. Real data shows you where demand is strongest.",
      },
      {
        title: "Threshold Met",
        desc: "When enough fans pledge, we match a venue and confirm the show. No risk, no empty rooms.",
      },
      {
        title: "Play the Show",
        desc: "Perform for a crowd that already bought in. Get paid directly via Stripe Connect.",
      },
    ],
  },
  {
    id: "venues" as const,
    label: "For Venues",
    steps: [
      {
        title: "Get Matched",
        desc: "When a campaign in your city hits its threshold, we match you based on capacity and fit.",
      },
      {
        title: "Guaranteed Audience",
        desc: "Every ticket is pre-sold. No risk of empty shows. You know exactly how many fans are coming.",
      },
      {
        title: "Easy Operations",
        desc: "We handle ticketing, payments, and fan communication. You focus on the experience.",
      },
      {
        title: "Grow Your Reputation",
        desc: "Host shows for rising artists with passionate fanbases. Build your venue's brand.",
      },
    ],
  },
];

const faqs = [
  {
    q: "When am I charged?",
    a: "Your card is authorized when you pledge, but you\u2019re only charged when the pledge threshold is met and the show is confirmed. If the campaign doesn\u2019t reach its goal, you\u2019re never charged.",
  },
  {
    q: "What if the show doesn't happen?",
    a: "If the campaign doesn\u2019t reach its pledge threshold by the deadline, the campaign expires and no one is charged. There\u2019s zero risk.",
  },
  {
    q: "Can I get a refund?",
    a: "Before the threshold is met, you can cancel your pledge at any time. After the show is confirmed, standard ticket refund policies apply.",
  },
  {
    q: "How are venues selected?",
    a: "We match venues based on the city, expected attendance, artist genre, and venue capacity. The venue is confirmed once the pledge threshold is met.",
  },
  {
    q: "How do artists get paid?",
    a: "Artists receive payment directly through Stripe Connect after the show, minus the platform fee (8% artist commission).",
  },
  {
    q: "What are ambassador tiers?",
    a: "Fans earn points by pledging and referring friends. As you accumulate points, you unlock tiers: Fan, Superfan, Ambassador, and Champion \u2014 each with exclusive perks.",
  },
];

export default function HowItWorksPage() {
  const [activePerspective, setActivePerspective] = useState<"fans" | "artists" | "venues">("fans");
  const [activeStep, setActiveStep] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const current = perspectives.find((p) => p.id === activePerspective)!;
  const currentImages = STEP_IMAGES[activePerspective];
  const currentIcons = STEP_ICONS[activePerspective];

  function handlePerspectiveChange(id: "fans" | "artists" | "venues") {
    setActivePerspective(id);
    setActiveStep(0);
  }

  return (
    <div className="min-h-screen">
      {/* ── Hero banner — pulls up under fixed navbar ── */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden flex items-center justify-center -mt-16">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_IMG}
          alt="Concert crowd"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-surface-light" />
        <div className="relative z-10 text-center">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white uppercase tracking-wide">
            How It Works
          </h1>
          <p className="mt-3 text-white/80 text-lg max-w-xl mx-auto">
            Fan-powered live music in three simple perspectives.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Perspective tabs */}
        <div className="flex justify-center gap-3 mb-16">
          {perspectives.map((p) => (
            <button
              key={p.id}
              onClick={() => handlePerspectiveChange(p.id)}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                activePerspective === p.id
                  ? "bg-btb-yellow text-white shadow-lg shadow-btb-yellow/25"
                  : "bg-surface-light-elevated text-text-dark-muted hover:text-text-dark hover:bg-surface-light-hover"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* ═══════════════════════════════════════════
            DICE-STYLE STEPS + IMAGE CROSSFADE
           ═══════════════════════════════════════════ */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
          {/* Steps side — left on desktop */}
          <div className="space-y-2 order-2 md:order-1">
            {current.steps.map((step, i) => (
              <div
                key={step.title}
                onMouseEnter={() => setActiveStep(i)}
                className={`group flex gap-5 p-5 rounded-xl cursor-pointer transition-all duration-300 ${
                  activeStep === i
                    ? "opacity-100 bg-surface-light-elevated"
                    : "opacity-35 hover:opacity-60"
                }`}
              >
                {/* Icon */}
                <div className="flex-shrink-0 mt-0.5">
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
                      activeStep === i
                        ? "bg-btb-yellow shadow-lg shadow-btb-yellow/25"
                        : "bg-surface-light-elevated"
                    }`}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      className={`transition-colors duration-300 ${
                        activeStep === i ? "text-white" : "text-text-dark-muted"
                      }`}
                    >
                      <path
                        d={currentIcons[i]}
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Text */}
                <div className="pt-0.5">
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
                        activeStep === i
                          ? "text-btb-yellow"
                          : "text-text-dark-muted"
                      }`}
                    >
                      Step {i + 1}
                    </span>
                    {activeStep === i && (
                      <div className="h-px flex-1 bg-btb-yellow/30" />
                    )}
                  </div>
                  <h3
                    className={`mt-1.5 font-display text-xl font-bold uppercase tracking-wide transition-colors duration-300 ${
                      activeStep === i
                        ? "text-text-dark"
                        : "text-text-dark-secondary"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`mt-2 leading-relaxed transition-colors duration-300 ${
                      activeStep === i
                        ? "text-text-dark-secondary"
                        : "text-text-dark-muted"
                    }`}
                  >
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Image side — right on desktop, stacked image crossfade */}
          <div className="relative rounded-2xl overflow-hidden aspect-[4/5] order-1 md:order-2">
            {currentImages.map((img, i) => (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                key={`${activePerspective}-${i}`}
                src={img}
                alt={current.steps[i]?.title ?? ""}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
                  activeStep === i ? "opacity-100" : "opacity-0"
                }`}
                loading="lazy"
              />
            ))}
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            {/* Step label overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <span className="inline-block px-3 py-1 rounded-full bg-btb-yellow/90 text-white text-xs font-bold uppercase tracking-widest mb-3">
                Step {activeStep + 1}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white uppercase tracking-wide">
                {current.steps[activeStep]?.title}
              </h3>
            </div>

            {/* Progress dots */}
            <div className="absolute top-6 right-6 flex flex-col gap-2">
              {current.steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeStep === i
                      ? "bg-btb-yellow scale-125"
                      : "bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Mobile step images (visible only on small screens) ── */}
        <div className="md:hidden space-y-6 mb-16 -mt-8">
          {current.steps.map((step, i) => (
            <div key={step.title} className="rounded-xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentImages[i]}
                alt={step.title}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Divider image strip */}
        <div className="relative rounded-2xl overflow-hidden h-[200px] mb-20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1200&q=80"
            alt="Live concert atmosphere"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <p className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-white uppercase tracking-wide text-center px-4">
              Every show starts with a single pledge
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-dark uppercase tracking-wide text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={faq.q}
                className="border border-border-light rounded-xl overflow-hidden bg-surface-light"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between cursor-pointer hover:bg-surface-light-hover transition-colors"
                >
                  <span className="font-semibold text-text-dark">
                    {faq.q}
                  </span>
                  <span
                    className={`text-btb-yellow text-xl ml-4 transition-transform duration-200 ${
                      openFaq === i ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 border-t border-border-light">
                    <p className="text-text-dark-secondary mt-3 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-text-dark-secondary mb-4 text-lg">
            Ready to experience fan-powered live music?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/discover">
              <Button variant="primary" size="lg">
                Explore Campaigns
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                variant="outline"
                size="lg"
                className="border-border-light text-text-dark hover:bg-surface-light-elevated"
              >
                Sign Up Free
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
