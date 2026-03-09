"use client";

import Pill from "@/components/ui/Pill";
import { genres } from "@/data/genres";

interface GenreFilterProps {
  selectedGenre: string | null;
  onSelect: (genreId: string | null) => void;
  className?: string;
}

export default function GenreFilter({ selectedGenre, onSelect, className }: GenreFilterProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className ?? ""}`}>
      <Pill
        active={selectedGenre === null}
        onClick={() => onSelect(null)}
      >
        All Genres
      </Pill>
      {genres.map((genre) => (
        <Pill
          key={genre.id}
          active={selectedGenre === genre.id}
          icon={genre.icon}
          onClick={() => onSelect(selectedGenre === genre.id ? null : genre.id)}
        >
          {genre.label}
        </Pill>
      ))}
    </div>
  );
}
