import type { Campaign, RewardTier, ActivityEvent } from "@/types";
import { artists, getArtistById } from "./artists";
import { getCity } from "./cities";
import { getVenue } from "./venues";
import { getBrandById } from "./brands";

function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function makeTiers(campaignSlug: string, basePrice: number): RewardTier[] {
  const h = simpleHash(campaignSlug);
  return [
    {
      id: `${campaignSlug}-ga`,
      name: "General Admission",
      price: basePrice,
      description: "Entry to the show with general standing",
      perks: ["Entry to show", "Access to fan wall", "Digital campaign badge"],
      totalSlots: 300,
      claimedSlots: (h % 200) + 50,
    },
    {
      id: `${campaignSlug}-preferred`,
      name: "Preferred Standing",
      price: basePrice + 20,
      description: "Priority entry and preferred viewing area",
      perks: ["Priority entry", "Preferred viewing area", "10% merch discount", "All GA perks"],
      totalSlots: 120,
      claimedSlots: ((h >> 3) % 80) + 20,
    },
    {
      id: `${campaignSlug}-vip`,
      name: "VIP Meet & Greet",
      price: basePrice + 60,
      description: "Meet the artist after the show plus premium perks",
      perks: ["Meet & greet after show", "Signed poster", "Early entry", "All Preferred perks"],
      totalSlots: 40,
      claimedSlots: ((h >> 6) % 30) + 5,
    },
    {
      id: `${campaignSlug}-superfan`,
      name: "Superfan Package",
      price: basePrice + 125,
      description: "The ultimate fan experience with exclusive access",
      perks: [
        "Soundcheck access",
        "Exclusive merch bundle",
        "Photo with artist",
        "Name on guest list for future shows",
        "All VIP perks",
      ],
      totalSlots: 15,
      claimedSlots: ((h >> 9) % 12) + 2,
    },
  ];
}

function makeActivity(campaignSlug: string, count: number): ActivityEvent[] {
  const names = [
    "Sarah M.", "Jake T.", "Mia C.", "Noah R.", "Emma L.",
    "Liam K.", "Olivia P.", "Ethan W.", "Sophia D.", "Mason B.",
    "Ava G.", "Lucas H.", "Isabella F.", "Jackson N.", "Charlotte V.",
  ];
  const tiers = ["General Admission", "Preferred Standing", "VIP Meet & Greet", "Superfan Package"];
  const types: ActivityEvent["type"][] = ["pledge", "pledge", "pledge", "referral", "ambassador_upgrade"];

  return Array.from({ length: count }, (_, i) => {
    const type = types[i % types.length];
    const name = names[i % names.length];
    const tier = tiers[simpleHash(`${campaignSlug}-tier-${i}`) % 3];
    const minutesAgo = i * 7 + (simpleHash(`${campaignSlug}-time-${i}`) % 15);
    const timestamp = new Date(Date.now() - minutesAgo * 60_000).toISOString();

    let message = "";
    if (type === "pledge") message = `${name} pledged for ${tier}`;
    else if (type === "referral") message = `${name} referred a friend who pledged`;
    else if (type === "ambassador_upgrade") message = `${name} reached Superfan status!`;

    return {
      id: `${campaignSlug}-activity-${i}`,
      type,
      fanName: name,
      fanAvatarUrl: `https://picsum.photos/seed/fan-${i}/100/100`,
      message,
      timestamp,
      tierName: type === "pledge" ? tier : undefined,
    };
  });
}

const campaignDefs: Array<{
  artistId: string;
  cityId: string;
  threshold: number;
  current: number;
  status: Campaign["status"];
  daysRemaining: number;
  basePrice: number;
  gradientColors: [string, string];
  venueId?: string;
  showDate?: string;
  sponsorBrandId?: string;
}> = [
  // Rooney — power pop comeback tour
  { artistId: "rooney", cityId: "denver", threshold: 500, current: 438, status: "active", daysRemaining: 12, basePrice: 30, gradientColors: ["#1a1033", "#0d1b2a"], sponsorBrandId: "redbull-music" },
  { artistId: "rooney", cityId: "austin", threshold: 400, current: 412, status: "threshold_met", daysRemaining: 8, basePrice: 35, gradientColors: ["#1a1033", "#2d1810"], venueId: "mohawk-austin" },
  // The Airborne Toxic Event — always touring
  { artistId: "the-airborne-toxic-event", cityId: "chicago", threshold: 800, current: 623, status: "active", daysRemaining: 18, basePrice: 40, gradientColors: ["#0d0d2b", "#1a0d2b"] },
  { artistId: "the-airborne-toxic-event", cityId: "portland", threshold: 600, current: 601, status: "threshold_met", daysRemaining: 3, basePrice: 35, gradientColors: ["#0d0d2b", "#1b1a0d"], venueId: "doug-fir" },
  // Local Natives — confirmed Nashville show
  { artistId: "local-natives", cityId: "nashville", threshold: 1000, current: 1047, status: "confirmed", daysRemaining: 0, basePrice: 40, gradientColors: ["#1a1518", "#2b1a0d"], venueId: "exit-in", showDate: "2026-04-18" },
  { artistId: "local-natives", cityId: "denver", threshold: 750, current: 189, status: "active", daysRemaining: 30, basePrice: 35, gradientColors: ["#1a1518", "#0d1a1a"] },
  // Caamp — folk community building
  { artistId: "caamp", cityId: "portland", threshold: 400, current: 401, status: "threshold_met", daysRemaining: 15, basePrice: 25, gradientColors: ["#0d1a10", "#1a1a0d"], venueId: "doug-fir" },
  { artistId: "caamp", cityId: "austin", threshold: 500, current: 163, status: "active", daysRemaining: 20, basePrice: 25, gradientColors: ["#0d1a10", "#1a100d"] },
  // Mt. Joy — almost there in Nashville
  { artistId: "mt-joy", cityId: "nashville", threshold: 600, current: 567, status: "active", daysRemaining: 5, basePrice: 30, gradientColors: ["#101a0d", "#0d1a1a"] },
  // Hippo Campus — threshold met in Chicago
  { artistId: "hippo-campus", cityId: "chicago", threshold: 700, current: 700, status: "threshold_met", daysRemaining: 10, basePrice: 35, gradientColors: ["#1a0d1a", "#0d0d1a"], venueId: "thalia-hall" },
  { artistId: "hippo-campus", cityId: "denver", threshold: 600, current: 225, status: "active", daysRemaining: 22, basePrice: 35, gradientColors: ["#1a0d1a", "#1a1a0d"] },
  // Peach Pit — chill vibes building demand
  { artistId: "peach-pit", cityId: "austin", threshold: 500, current: 412, status: "active", daysRemaining: 14, basePrice: 30, gradientColors: ["#0d1a2b", "#1a0d1a"] },
  { artistId: "peach-pit", cityId: "portland", threshold: 450, current: 450, status: "confirmed", daysRemaining: 0, basePrice: 30, gradientColors: ["#0d1a2b", "#0d1a10"], venueId: "doug-fir", showDate: "2026-05-02" },
  // Houndmouth — roots rock on the road
  { artistId: "houndmouth", cityId: "nashville", threshold: 400, current: 178, status: "active", daysRemaining: 28, basePrice: 25, gradientColors: ["#1a1a0d", "#0d1a0d"] },
  { artistId: "houndmouth", cityId: "chicago", threshold: 500, current: 145, status: "active", daysRemaining: 35, basePrice: 25, gradientColors: ["#1a1a0d", "#0d0d1a"] },
  // Dayglow — hot demand everywhere
  { artistId: "dayglow", cityId: "denver", threshold: 800, current: 795, status: "active", daysRemaining: 2, basePrice: 35, gradientColors: ["#1a0d2b", "#2b0d1a"] },
  { artistId: "dayglow", cityId: "austin", threshold: 750, current: 772, status: "threshold_met", daysRemaining: 7, basePrice: 35, gradientColors: ["#1a0d2b", "#1a100d"], venueId: "mohawk-austin", sponsorBrandId: "converse-all-stars" },
  // boy pablo — international indie darling
  { artistId: "boy-pablo", cityId: "portland", threshold: 600, current: 334, status: "active", daysRemaining: 18, basePrice: 30, gradientColors: ["#0d0d1a", "#1a0d1a"] },
  { artistId: "boy-pablo", cityId: "nashville", threshold: 500, current: 52, status: "active", daysRemaining: 40, basePrice: 30, gradientColors: ["#0d0d1a", "#0d1a0d"] },
  // Local Natives — more demand in Chicago
  { artistId: "local-natives", cityId: "chicago", threshold: 900, current: 450, status: "active", daysRemaining: 16, basePrice: 40, gradientColors: ["#1a1518", "#0d0d1a"] },
];

export const campaigns: Campaign[] = campaignDefs.map((def, i) => {
  const artist = getArtistById(def.artistId)!;
  const city = getCity(def.cityId);
  const slug = `${artist.slug}-${city.id}`;
  const venue = def.venueId ? getVenue(def.venueId) : undefined;

  return {
    id: `campaign-${i}`,
    slug,
    artistId: def.artistId,
    artist,
    city,
    venueId: def.venueId,
    venue,
    title: `${artist.name} in ${city.name}`,
    description: `Help bring ${artist.name} to ${city.name}! Pledge your spot and make this show happen. When we hit ${def.threshold} pledges, the show is booked and your ticket is confirmed.`,
    currentPledges: def.current,
    threshold: def.threshold,
    pledgeAmountTotal: def.current * def.basePrice * 1.3,
    startDate: new Date(Date.now() - 14 * 86_400_000).toISOString(),
    endDate: new Date(Date.now() + def.daysRemaining * 86_400_000).toISOString(),
    showDate: def.showDate,
    status: def.status,
    rewardTiers: makeTiers(slug, def.basePrice),
    artworkUrl: `https://picsum.photos/seed/campaign-${slug}/600/600`,
    gradientColors: def.gradientColors,
    recentActivity: makeActivity(slug, 12),
    daysRemaining: def.daysRemaining,
    createdAt: new Date(Date.now() - 21 * 86_400_000).toISOString(),
    sponsorBrandId: def.sponsorBrandId,
    sponsorBrand: def.sponsorBrandId ? getBrandById(def.sponsorBrandId) : undefined,
  };
});

export function getCampaign(slug: string): Campaign | undefined {
  return campaigns.find((c) => c.slug === slug);
}

export function getCampaignsByCity(cityId: string): Campaign[] {
  return campaigns.filter((c) => c.city.id === cityId);
}

export function getCampaignsByArtist(artistId: string): Campaign[] {
  return campaigns.filter((c) => c.artistId === artistId);
}

export function getTrendingCampaigns(): Campaign[] {
  return [...campaigns]
    .filter((c) => c.status === "active")
    .sort((a, b) => (b.currentPledges / b.threshold) - (a.currentPledges / a.threshold))
    .slice(0, 8);
}

export function getAlmostThereCampaigns(): Campaign[] {
  return campaigns
    .filter((c) => c.status === "active" && c.currentPledges / c.threshold >= 0.75)
    .sort((a, b) => b.currentPledges / b.threshold - a.currentPledges / a.threshold);
}
