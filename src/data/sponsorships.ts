import type { Sponsorship } from "@/types";
import { getBrandById } from "./brands";
import { campaigns } from "./campaigns";
import { SPONSORSHIP_TIERS } from "@/lib/constants";

function findCampaign(slug: string) {
  return campaigns.find((c) => c.slug === slug);
}

export const sponsorships: Sponsorship[] = [
  {
    id: "sponsorship-1",
    brandId: "redbull-music",
    brand: getBrandById("redbull-music")!,
    campaignId: "campaign-0",
    campaign: findCampaign("rooney-denver")!,
    tier: "presenting",
    amount: 7500,
    status: "active",
    perks: [...SPONSORSHIP_TIERS.presenting.perks],
    createdAt: "2026-01-15T00:00:00Z",
  },
  {
    id: "sponsorship-2",
    brandId: "converse-all-stars",
    brand: getBrandById("converse-all-stars")!,
    campaignId: "campaign-16",
    campaign: findCampaign("dayglow-austin")!,
    tier: "presenting",
    amount: 6000,
    status: "active",
    perks: [...SPONSORSHIP_TIERS.presenting.perks],
    createdAt: "2026-01-20T00:00:00Z",
  },
  {
    id: "sponsorship-3",
    brandId: "summit-brewing",
    brand: getBrandById("summit-brewing")!,
    campaignId: "campaign-8",
    campaign: findCampaign("mt-joy-nashville")!,
    tier: "supporting",
    amount: 3000,
    status: "active",
    perks: [...SPONSORSHIP_TIERS.supporting.perks],
    createdAt: "2026-02-01T00:00:00Z",
  },
  {
    id: "sponsorship-4",
    brandId: "redbull-music",
    brand: getBrandById("redbull-music")!,
    campaignId: "campaign-2",
    campaign: findCampaign("the-airborne-toxic-event-chicago")!,
    tier: "supporting",
    amount: 3500,
    status: "active",
    perks: [...SPONSORSHIP_TIERS.supporting.perks],
    createdAt: "2026-02-10T00:00:00Z",
  },
  {
    id: "sponsorship-5",
    brandId: "wanderlust-coffee",
    brand: getBrandById("wanderlust-coffee")!,
    campaignId: "campaign-7",
    campaign: findCampaign("caamp-austin")!,
    tier: "community",
    amount: 750,
    status: "active",
    perks: [...SPONSORSHIP_TIERS.community.perks],
    createdAt: "2026-02-15T00:00:00Z",
  },
];

export function getSponsorshipsByBrand(brandId: string): Sponsorship[] {
  return sponsorships.filter((s) => s.brandId === brandId);
}

export function getSponsorshipsByCampaign(campaignId: string): Sponsorship[] {
  return sponsorships.filter((s) => s.campaignId === campaignId);
}
