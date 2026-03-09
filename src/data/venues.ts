import type { Venue } from "@/types";
import { getCity } from "./cities";

export const venues: Venue[] = [
  {
    id: "bluebird-room",
    slug: "bluebird-room",
    name: "The Bluebird Room",
    city: getCity("denver"),
    address: "3317 E Colfax Ave, Denver, CO 80206",
    capacity: 500,
    imageUrl: "https://picsum.photos/seed/venue-bluebird-room/800/400",
    type: "Intimate Club",
    amenities: ["Full Bar", "Sound System", "Green Room", "Merch Table"],
  },
  {
    id: "mohawk-austin",
    slug: "mohawk-austin",
    name: "Mohawk Austin",
    city: getCity("austin"),
    address: "912 Red River St, Austin, TX 78701",
    capacity: 800,
    imageUrl: "https://picsum.photos/seed/venue-mohawk-austin/800/400",
    type: "Outdoor Stage",
    amenities: ["Outdoor Stage", "Indoor Stage", "Full Bar", "Patio"],
  },
  {
    id: "exit-in",
    slug: "exit-in",
    name: "Exit/In",
    city: getCity("nashville"),
    address: "2208 Elliston Pl, Nashville, TN 37203",
    capacity: 450,
    imageUrl: "https://picsum.photos/seed/venue-exit-in/800/400",
    type: "Historic Club",
    amenities: ["Historic Venue", "Full Bar", "Sound System", "Green Room"],
  },
  {
    id: "thalia-hall",
    slug: "thalia-hall",
    name: "Thalia Hall",
    city: getCity("chicago"),
    address: "1807 S Allport St, Chicago, IL 60608",
    capacity: 900,
    imageUrl: "https://picsum.photos/seed/venue-thalia-hall/800/400",
    type: "Theater",
    amenities: ["Balcony Seating", "Full Bar", "Restaurant", "Historic Architecture"],
  },
  {
    id: "doug-fir",
    slug: "doug-fir",
    name: "Doug Fir Lounge",
    city: getCity("portland"),
    address: "830 E Burnside St, Portland, OR 97214",
    capacity: 350,
    imageUrl: "https://picsum.photos/seed/venue-doug-fir/800/400",
    type: "Basement Club",
    amenities: ["Restaurant", "Full Bar", "Intimate Setting", "Log Cabin Decor"],
  },
];

export function getVenue(id: string): Venue | undefined {
  return venues.find((v) => v.id === id);
}
