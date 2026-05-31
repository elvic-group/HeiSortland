"use client";

import { quickFilters } from "@/data/sample";
import { useTranslations } from "next-intl";

/** Maps quickFilter IDs to translation keys in the "filters" namespace */
const filterKeyMap: Record<string, string> = {
  today: "today",
  weekend: "weekend",
  free: "free",
  barn: "kids",
  ungdom: "youth",
  musikk: "music",
  kultur: "culture",
  sport: "sport",
  frivillig: "volunteer",
  kurs: "course",
};

interface Props {
  activeFilter: string | null;
  onFilter: (id: string | null) => void;
}

export default function FilterChips({ activeFilter, onFilter }: Props) {
  const t = useTranslations("filters");

  return (
    <div className="flex flex-wrap gap-2">
      {quickFilters.map((f) => {
        const isActive = activeFilter === f.id;
        const label = t(filterKeyMap[f.id] ?? f.id);
        return (
          <button
            key={f.id}
            onClick={() => onFilter(isActive ? null : f.id)}
            aria-pressed={isActive}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-widest border transition-all duration-300 whitespace-nowrap ${
              isActive
                ? "bg-ink text-warm border-ink"
                : "bg-transparent text-muted border-border hover:border-muted hover:text-ink"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
