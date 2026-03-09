export const SITE_NAME = "Band On Demand";
export const SITE_TAGLINE = "Where demand meets the stage.";
export const PLATFORM_FEE_ARTIST = 0.08;
export const PLATFORM_FEE_FAN = 0.05;
export const TRUST_COPY = "You won\u2019t be charged until the show is confirmed.";
export const TRUST_COPY_SHORT = "You won\u2019t be charged yet.";

export const NAV_LINKS_FAN = [
  { label: "Discover", href: "/discover" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "My Dashboard", href: "/dashboard" },
] as const;

export const NAV_LINKS_ARTIST = [
  { label: "Dashboard", href: "/artist-dashboard" },
  { label: "Tour Builder", href: "/tour-builder" },
  { label: "How It Works", href: "/how-it-works" },
] as const;

export const NAV_LINKS_BRAND = [
  { label: "Browse Artists", href: "/brand-discover" },
  { label: "Dashboard", href: "/brand-dashboard" },
  { label: "How It Works", href: "/how-it-works" },
] as const;

export const SPONSORSHIP_TIERS = {
  presenting: {
    label: "Presenting Sponsor",
    minAmount: 5000,
    color: "#FF5722",
    perks: [
      "Logo on all campaign materials",
      "On-stage brand mention",
      "VIP section branding",
      "Social media features",
      "Post-show recap feature",
    ],
  },
  supporting: {
    label: "Supporting Sponsor",
    minAmount: 2000,
    color: "#FF9100",
    perks: [
      "Logo on campaign page",
      "Brand mention in emails",
      "Merch table presence",
      "Social media mention",
    ],
  },
  community: {
    label: "Community Sponsor",
    minAmount: 500,
    color: "#00C853",
    perks: [
      "Logo on campaign page",
      "Thank-you mention at show",
      "Listed in sponsor section",
    ],
  },
} as const;

export const AMBASSADOR_TIERS = {
  fan: { label: "Fan", minReferrals: 0, color: "#A1A1A1" },
  superfan: { label: "Superfan", minReferrals: 3, color: "#FF5722" },
  ambassador: { label: "Ambassador", minReferrals: 10, color: "#FF9100" },
  champion: { label: "Champion", minReferrals: 25, color: "#00C853" },
} as const;
