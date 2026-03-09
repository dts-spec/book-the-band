import type { City } from "@/types";

export const cities: City[] = [
  { id: "denver", name: "Denver", state: "CO", shortName: "DEN", activeCampaigns: 5 },
  { id: "austin", name: "Austin", state: "TX", shortName: "ATX", activeCampaigns: 4 },
  { id: "nashville", name: "Nashville", state: "TN", shortName: "NSH", activeCampaigns: 4 },
  { id: "chicago", name: "Chicago", state: "IL", shortName: "CHI", activeCampaigns: 4 },
  { id: "portland", name: "Portland", state: "OR", shortName: "PDX", activeCampaigns: 3 },
];

export function getCity(id: string): City {
  return cities.find((c) => c.id === id) ?? cities[0];
}
