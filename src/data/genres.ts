import type { GenreInfo } from "@/types";

export const genres: GenreInfo[] = [
  { id: "indie-rock", label: "Indie Rock", icon: "🎸", color: "#FF6B6B" },
  { id: "electronic", label: "Electronic", icon: "🎛️", color: "#845EF7" },
  { id: "hip-hop", label: "Hip Hop", icon: "🎤", color: "#FF922B" },
  { id: "folk", label: "Folk", icon: "🪕", color: "#51CF66" },
  { id: "jazz", label: "Jazz", icon: "🎷", color: "#339AF0" },
  { id: "r-and-b", label: "R&B", icon: "🎵", color: "#F06595" },
  { id: "pop", label: "Pop", icon: "🎶", color: "#CC5DE8" },
  { id: "metal", label: "Metal", icon: "🤘", color: "#868E96" },
];

export function getGenre(id: string): GenreInfo {
  return genres.find((g) => g.id === id) ?? genres[0];
}
