import type { Brand } from "@/types";

export const brands: Brand[] = [
  {
    id: "redbull-music",
    slug: "redbull-music",
    name: "Red Bull Music",
    category: "beverage",
    bio: "Red Bull Music has been at the forefront of live music culture for over a decade, supporting emerging and established artists through events, studios, and sponsorships worldwide.",
    logoUrl: "https://picsum.photos/seed/brand-redbull/200/200",
    heroImageUrl: "https://picsum.photos/seed/hero-redbull/1200/600",
    website: "https://redbull.com/music",
    contactEmail: "music@redbull.example.com",
    totalSponsorships: 12,
    totalEventsBooked: 4,
    totalSpent: 85000,
    joinedAt: "2025-03-01T00:00:00Z",
  },
  {
    id: "converse-all-stars",
    slug: "converse-all-stars",
    name: "Converse All Stars",
    category: "apparel",
    bio: "Converse has been synonymous with music culture since the days of punk rock. We partner with artists and venues to bring authentic live experiences to fans everywhere.",
    logoUrl: "https://picsum.photos/seed/brand-converse/200/200",
    heroImageUrl: "https://picsum.photos/seed/hero-converse/1200/600",
    website: "https://converse.com",
    contactEmail: "music@converse.example.com",
    totalSponsorships: 8,
    totalEventsBooked: 2,
    totalSpent: 62000,
    joinedAt: "2025-06-15T00:00:00Z",
  },
  {
    id: "summit-brewing",
    slug: "summit-brewing",
    name: "Summit Brewing Co.",
    category: "beverage",
    bio: "A beloved Denver craft brewery bringing community and great beer together. We sponsor local shows because live music and craft beer are a perfect pair.",
    logoUrl: "https://picsum.photos/seed/brand-summit/200/200",
    heroImageUrl: "https://picsum.photos/seed/hero-summit/1200/600",
    website: "https://summitbrewing.example.com",
    contactEmail: "events@summitbrewing.example.com",
    totalSponsorships: 5,
    totalEventsBooked: 1,
    totalSpent: 18000,
    joinedAt: "2025-09-01T00:00:00Z",
  },
  {
    id: "vinyl-tech",
    slug: "vinyl-tech",
    name: "Vinyl Tech Audio",
    category: "tech",
    bio: "Premium audio equipment maker supporting emerging artists through gear sponsorships and live event partnerships. Great sound starts with great tech.",
    logoUrl: "https://picsum.photos/seed/brand-vinyl/200/200",
    heroImageUrl: "https://picsum.photos/seed/hero-vinyl/1200/600",
    website: "https://vinyltech.example.com",
    contactEmail: "partnerships@vinyltech.example.com",
    totalSponsorships: 6,
    totalEventsBooked: 3,
    totalSpent: 42000,
    joinedAt: "2025-05-20T00:00:00Z",
  },
  {
    id: "wanderlust-coffee",
    slug: "wanderlust-coffee",
    name: "Wanderlust Coffee",
    category: "food",
    bio: "Austin-based specialty coffee roaster with deep roots in the local music scene. We fuel the artists, the fans, and the late nights that make live music magic.",
    logoUrl: "https://picsum.photos/seed/brand-wanderlust/200/200",
    heroImageUrl: "https://picsum.photos/seed/hero-wanderlust/1200/600",
    website: "https://wanderlustcoffee.example.com",
    contactEmail: "hello@wanderlustcoffee.example.com",
    totalSponsorships: 3,
    totalEventsBooked: 0,
    totalSpent: 8500,
    joinedAt: "2025-11-10T00:00:00Z",
  },
];

export function getBrand(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}

export function getBrandById(id: string): Brand | undefined {
  return brands.find((b) => b.id === id);
}

export function getCurrentBrand(): Brand {
  return brands[0]; // Red Bull Music as default mock brand
}
