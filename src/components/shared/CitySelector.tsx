"use client";

import Pill from "@/components/ui/Pill";
import { cities } from "@/data/cities";

interface CitySelectorProps {
  selectedCity: string | null;
  onSelect: (cityId: string | null) => void;
  className?: string;
}

export default function CitySelector({ selectedCity, onSelect, className }: CitySelectorProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className ?? ""}`}>
      <Pill
        active={selectedCity === null}
        onClick={() => onSelect(null)}
      >
        All Cities
      </Pill>
      {cities.map((city) => (
        <Pill
          key={city.id}
          active={selectedCity === city.id}
          onClick={() => onSelect(selectedCity === city.id ? null : city.id)}
        >
          {city.name}
        </Pill>
      ))}
    </div>
  );
}
