"use client";

import { quickFilters } from "@/data/sample";

interface Props {
  activeFilter: string | null;
  onFilter: (id: string | null) => void;
}

export default function FilterChips({ activeFilter, onFilter }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {quickFilters.map((f) => {
        const isActive = activeFilter === f.id;
        return (
          <button
            key={f.id}
            onClick={() => onFilter(isActive ? null : f.id)}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-widest border transition-all duration-300 whitespace-nowrap ${
              isActive
                ? "bg-ink text-warm border-ink"
                : "bg-transparent text-muted border-border hover:border-muted hover:text-ink"
            }`}
          >
            {f.label}
          </button>
        );
      })}
    </div>
  );
}
