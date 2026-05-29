"use client";

import { useState } from "react";
import { usePlaces } from "@/hooks/usePlaces";
import { SkeletonGrid } from "@/components/Skeleton";
import PlaceCard from "@/components/PlaceCard";
import { motion } from "framer-motion";
import Link from "next/link";

const typeFilters = [
  { id: "all", label: "Alle" },
  { id: "kulturhus", label: "Kulturhus" },
  { id: "bibliotek", label: "Bibliotek" },
  { id: "hotell", label: "Hotell" },
  { id: "idrett", label: "Idrett" },
  { id: "frivillig", label: "Frivillig" },
  { id: "kafe", label: "Kafé" },
  { id: "park", label: "Park" },
  { id: "kommunalt", label: "Kommunalt" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
} as const;

export default function StederPage() {
  const [activeType, setActiveType] = useState("all");
  const { places, loading, error, reload } = usePlaces();

  const filteredPlaces =
    activeType === "all" ? places : places.filter((p) => p.type === activeType);

  return (
    <div className="bg-warm min-h-screen">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 pt-28 pb-14 sm:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-2xl"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted hover:text-accent transition-colors mb-8"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="rotate-180"
              >
                <path
                  d="M6 12L10 8L6 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Tilbake til forsiden
            </Link>
            <h1 className="font-serif text-display-md sm:text-display-lg text-ink leading-tight">
              Steder i Sortland
            </h1>
            <p className="mt-4 text-lg text-muted leading-relaxed max-w-lg">
              Oppdag møteplasser, kulturhus, kaféer, parker og andre steder i
              byen vår.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-border bg-white/60">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex flex-wrap gap-2">
            {typeFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveType(filter.id)}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-widest border transition-all duration-200 ${
                  activeType === filter.id
                    ? "bg-ink text-warm border-ink"
                    : "bg-white text-muted border-border hover:border-ink/30 hover:text-ink"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16 sm:py-20">
        {loading && <SkeletonGrid count={6} variant="place" />}

        {error && !loading && (
          <div className="text-center py-20">
            <p className="text-muted font-serif text-xl mb-6">{error}</p>
            <button
              onClick={reload}
              className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-warm text-sm font-mono uppercase tracking-widest hover:bg-ink/90 transition-colors"
            >
              Prøv igjen
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              key={activeType}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredPlaces.map((place) => (
                <motion.div key={place.id} variants={item}>
                  <PlaceCard place={place} />
                </motion.div>
              ))}
            </motion.div>

            {filteredPlaces.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted font-serif text-xl">
                  Ingen steder funnet for dette filteret.
                </p>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
