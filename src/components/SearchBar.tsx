"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function SearchBar({
  placeholder,
  large = false,
}: {
  placeholder?: string;
  large?: boolean;
}) {
  const t = useTranslations("home");
  const [query, setQuery] = useState("");
  const router = useRouter();
  const resolvedPlaceholder = placeholder ?? t("searchPlaceholder");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/arrangementer?søk=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <input
        type="text"
        placeholder={resolvedPlaceholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={`w-full bg-white border border-border text-ink placeholder:text-muted/60 focus:outline-none focus:border-ink transition-colors duration-300 ${
          large ? "pl-6 pr-16 py-5 text-base" : "pl-5 pr-14 py-3.5 text-sm"
        }`}
        aria-label="Søk etter arrangementer"
      />
      <button
        type="submit"
        aria-label="Søk"
        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-muted hover:text-ink transition-colors"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle
            cx="7.5"
            cy="7.5"
            r="5.5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M12 12L16.5 16.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </form>
  );
}
