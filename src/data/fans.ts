import type { Fan, Pledge } from "@/types";
import { campaigns } from "./campaigns";
import { getCity } from "./cities";

function makePledges(fanIndex: number): Pledge[] {
  const count = [3, 5, 2, 4, 1][fanIndex % 5];
  const statuses: Pledge["status"][] = ["active", "confirmed", "completed", "active", "refunded"];
  const tierNames = ["General Admission", "Preferred Standing", "VIP Meet & Greet", "Superfan Package"];

  return Array.from({ length: count }, (_, i) => {
    const campaign = campaigns[(fanIndex * 3 + i) % campaigns.length];
    const tier = campaign.rewardTiers[i % campaign.rewardTiers.length];
    return {
      id: `pledge-${fanIndex}-${i}`,
      campaignId: campaign.id,
      campaign,
      tierName: tierNames[i % tierNames.length],
      amount: tier.price,
      status: statuses[(fanIndex + i) % statuses.length],
      pledgedAt: new Date(Date.now() - (i * 3 + fanIndex) * 86_400_000).toISOString(),
    };
  });
}

export const fans: Fan[] = [
  {
    id: "fan-jordan",
    name: "Jordan Rivera",
    displayName: "Jordan R.",
    avatarUrl: "https://picsum.photos/seed/fan-jordan/200/200",
    city: getCity("denver"),
    ambassadorTier: "ambassador",
    totalPledges: 14,
    totalReferrals: 12,
    points: 2400,
    joinedAt: "2025-06-15T00:00:00Z",
    pledges: makePledges(0),
  },
  {
    id: "fan-sarah",
    name: "Sarah Chen",
    displayName: "Sarah C.",
    avatarUrl: "https://picsum.photos/seed/fan-sarah/200/200",
    city: getCity("austin"),
    ambassadorTier: "champion",
    totalPledges: 22,
    totalReferrals: 31,
    points: 5800,
    joinedAt: "2025-04-01T00:00:00Z",
    pledges: makePledges(1),
  },
  {
    id: "fan-mike",
    name: "Mike Thompson",
    displayName: "Mike T.",
    avatarUrl: "https://picsum.photos/seed/fan-mike/200/200",
    city: getCity("nashville"),
    ambassadorTier: "superfan",
    totalPledges: 7,
    totalReferrals: 5,
    points: 950,
    joinedAt: "2025-09-20T00:00:00Z",
    pledges: makePledges(2),
  },
  {
    id: "fan-emma",
    name: "Emma Larsen",
    displayName: "Emma L.",
    avatarUrl: "https://picsum.photos/seed/fan-emma/200/200",
    city: getCity("chicago"),
    ambassadorTier: "fan",
    totalPledges: 2,
    totalReferrals: 0,
    points: 200,
    joinedAt: "2026-01-10T00:00:00Z",
    pledges: makePledges(3),
  },
  {
    id: "fan-alex",
    name: "Alex Nakamura",
    displayName: "Alex N.",
    avatarUrl: "https://picsum.photos/seed/fan-alex/200/200",
    city: getCity("portland"),
    ambassadorTier: "superfan",
    totalPledges: 9,
    totalReferrals: 4,
    points: 1100,
    joinedAt: "2025-07-30T00:00:00Z",
    pledges: makePledges(4),
  },
];

export function getFan(id: string): Fan | undefined {
  return fans.find((f) => f.id === id);
}

export function getCurrentFan(): Fan {
  return fans[0];
}
