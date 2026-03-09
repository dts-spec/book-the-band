import type { BrandBooking } from "@/types";
import { getBrandById } from "./brands";
import { getArtistById } from "./artists";
import { getCity } from "./cities";
import { getVenue } from "./venues";

export const brandBookings: BrandBooking[] = [
  {
    id: "booking-1",
    brandId: "redbull-music",
    brand: getBrandById("redbull-music")!,
    artistId: "mt-joy",
    artist: getArtistById("mt-joy")!,
    eventName: "Red Bull Sound Select: Summer Launch",
    eventDate: "2026-06-15",
    venueId: "bluebird-room",
    venue: getVenue("bluebird-room"),
    city: getCity("denver"),
    budget: 15000,
    attendees: 300,
    status: "confirmed",
    notes: "Product launch event with live performance and branded experience zone.",
    createdAt: "2026-02-01T00:00:00Z",
  },
  {
    id: "booking-2",
    brandId: "converse-all-stars",
    brand: getBrandById("converse-all-stars")!,
    artistId: "dayglow",
    artist: getArtistById("dayglow")!,
    eventName: "Converse All Stars Live: SXSW Showcase",
    eventDate: "2026-03-14",
    venueId: "mohawk-austin",
    venue: getVenue("mohawk-austin"),
    city: getCity("austin"),
    budget: 25000,
    attendees: 500,
    status: "completed",
    notes: "SXSW brand activation with exclusive Converse merch drop and live set.",
    createdAt: "2025-12-15T00:00:00Z",
  },
  {
    id: "booking-3",
    brandId: "vinyl-tech",
    brand: getBrandById("vinyl-tech")!,
    artistId: "local-natives",
    artist: getArtistById("local-natives")!,
    eventName: "Vinyl Tech Product Demo: Studio Sessions",
    eventDate: "2026-05-20",
    venueId: "exit-in",
    venue: getVenue("exit-in"),
    city: getCity("nashville"),
    budget: 12000,
    attendees: 200,
    status: "inquiry",
    notes: "Intimate studio session showcasing new speaker line with live performance.",
    createdAt: "2026-02-28T00:00:00Z",
  },
  {
    id: "booking-4",
    brandId: "redbull-music",
    brand: getBrandById("redbull-music")!,
    artistId: "hippo-campus",
    artist: getArtistById("hippo-campus")!,
    eventName: "Red Bull Music Festival: Chicago Edition",
    eventDate: "2026-07-04",
    venueId: "thalia-hall",
    venue: getVenue("thalia-hall"),
    city: getCity("chicago"),
    budget: 20000,
    attendees: 400,
    status: "confirmed",
    notes: "July 4th music festival headliner with full Red Bull branded stage.",
    createdAt: "2026-01-20T00:00:00Z",
  },
];

export function getBookingsByBrand(brandId: string): BrandBooking[] {
  return brandBookings.filter((b) => b.brandId === brandId);
}
