"use client";

import { useState, useMemo } from "react";
import { events, formatDate } from "@/data/sample";
import { usePlaces } from "@/hooks/usePlaces";
import { mapDbEventToEventData } from "@/lib/map-db";
import { SkeletonGrid } from "@/components/Skeleton";
import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";

// Lazy-load the map to avoid SSR issues with Leaflet
const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] bg-navy border border-border flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-6 h-6 border-2 border-warm/20 border-t-warm/50 rounded-full animate-spin" />
        <p className="text-sm font-mono text-warm/50">Laster kart…</p>
      </div>
    </div>
  ),
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
} as const;

const staggerChild = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const icons = {
  arrangement: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect
        x="1"
        y="2"
        width="12"
        height="11"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path d="M1 5H13" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M4.5 1V3"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M9.5 1V3"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  ),
  place: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M7 1C4.5 1 2.5 3 2.5 5.5C2.5 8.5 7 13 7 13C7 13 11.5 8.5 11.5 5.5C11.5 3 9.5 1 7 1Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="7" cy="5.5" r="1.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  ),
};

export default function KartPage() {
  const [activeTab, setActiveTab] = useState<"places" | "events">("events");

  const {
    places: dbPlaces,
    loading: placesLoading,
    error: placesError,
    reload: reloadPlaces,
  } = usePlaces();

  const approvedEvents = events.filter((e) => e.status === "approved");
  const mappedEvents = useMemo(
    () => approvedEvents.map((e) => ({ ...e })), // use sample data as-is
    [approvedEvents],
  );

  return (
    <div className="min-h-screen bg-warm">
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted hover:text-accent transition-colors mb-6"
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
          <h1 className="font-serif text-display-md text-ink leading-tight">
            Kart – finn arrangementer og steder
          </h1>
          <p className="mt-3 text-muted text-lg max-w-xl mb-10">
            Utforsk hva som skjer i Sortland og hvor du finner byens
            møteplasser.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left panel – filterable list */}
          <div className="lg:col-span-1">
            <motion.div
              initial="hidden"
              animate="show"
              variants={staggerChild}
              className="space-y-4"
            >
              {/* Tab toggle */}
              <div className="flex border border-border">
                <button
                  onClick={() => setActiveTab("events")}
                  className={`flex-1 py-3 text-xs font-mono uppercase tracking-widest transition-colors ${
                    activeTab === "events"
                      ? "bg-ink text-warm"
                      : "bg-white text-muted hover:text-ink"
                  }`}
                >
                  Arrangementer
                </button>
                <button
                  onClick={() => setActiveTab("places")}
                  className={`flex-1 py-3 text-xs font-mono uppercase tracking-widest transition-colors ${
                    activeTab === "places"
                      ? "bg-ink text-warm"
                      : "bg-white text-muted hover:text-ink"
                  }`}
                >
                  Steder
                </button>
              </div>

              {/* Event list */}
              {activeTab === "events" && (
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                  {mappedEvents.map((event) => (
                    <motion.div
                      key={event.id}
                      variants={fadeUp}
                      className="p-4 border border-border bg-white hover:border-accent/30 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-accent mt-0.5 flex-shrink-0">
                          {icons.arrangement}
                        </span>
                        <div className="min-w-0">
                          <Link
                            href={`/arrangementer/${event.id}`}
                            className="text-sm font-serif text-ink hover:text-accent transition-colors line-clamp-1"
                          >
                            {event.title}
                          </Link>
                          <p className="text-xs text-muted mt-1">
                            {formatDate(event.date)} · {event.startTime}
                          </p>
                          <p className="text-xs text-muted mt-0.5 line-clamp-1">
                            {event.location}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Places list */}
              {activeTab === "places" && (
                <>
                  {placesLoading ? (
                    <SkeletonGrid count={4} variant="place" />
                  ) : placesError ? (
                    <div className="text-center py-12">
                      <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-border/50 flex items-center justify-center">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="text-muted"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="9"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            opacity="0.3"
                          />
                          <path
                            d="M12 8V12M12 16H12.01"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <p className="text-muted text-xs mb-4">{placesError}</p>
                      <button
                        onClick={reloadPlaces}
                        className="inline-block px-5 py-2.5 bg-ink text-warm text-[10px] font-mono uppercase tracking-widest hover:bg-ink/90 transition-colors"
                      >
                        Prøv igjen
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                      {dbPlaces.map((place) => (
                        <motion.div
                          key={place.id}
                          variants={fadeUp}
                          className="p-4 border border-border bg-white hover:border-sage/30 transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-sage mt-0.5 flex-shrink-0">
                              {icons.place}
                            </span>
                            <div className="min-w-0">
                              <p className="text-sm font-serif text-ink line-clamp-1">
                                {place.name}
                              </p>
                              <p className="text-xs text-muted mt-1 line-clamp-1">
                                {place.address}
                              </p>
                              <span className="text-[10px] font-mono uppercase tracking-wider text-sage mt-1 block">
                                {place.typeLabel}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </div>

          {/* Right panel – real interactive map */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.1,
              }}
            >
              <div className="aspect-[4/3] lg:aspect-[16/10]">
                <MapView
                  events={mappedEvents}
                  places={dbPlaces}
                  activeTab={activeTab}
                />
              </div>

              {/* Legend / pins */}
              <div className="mt-6 flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-xs text-muted">
                  <span className="w-3 h-3 rounded-full bg-accent" />
                  Arrangementer
                </div>
                <div className="flex items-center gap-2 text-xs text-muted">
                  <span className="w-3 h-3 rounded-full bg-sage" />
                  Steder / møteplasser
                </div>
              </div>

              {/* Quick stats */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 border border-border bg-white text-center">
                  <p className="font-serif text-2xl text-ink">
                    {approvedEvents.length}
                  </p>
                  <p className="text-xs text-muted mt-1 font-mono uppercase tracking-wider">
                    Arrangementer
                  </p>
                </div>
                <div className="p-4 border border-border bg-white text-center">
                  <p className="font-serif text-2xl text-ink">
                    {placesLoading ? "..." : dbPlaces.length}
                  </p>
                  <p className="text-xs text-muted mt-1 font-mono uppercase tracking-wider">
                    Steder
                  </p>
                </div>
                <div className="p-4 border border-border bg-white text-center">
                  <p className="font-serif text-2xl text-ink">
                    {approvedEvents.filter((e) => e.isFree).length}
                  </p>
                  <p className="text-xs text-muted mt-1 font-mono uppercase tracking-wider">
                    Gratis
                  </p>
                </div>
                <div className="p-4 border border-border bg-white text-center">
                  <p className="font-serif text-2xl text-ink">
                    {placesLoading
                      ? "..."
                      : dbPlaces.filter(
                          (p) =>
                            p.type === "kafe" ||
                            p.type === "bibliotek" ||
                            p.type === "kulturhus",
                        ).length}
                  </p>
                  <p className="text-xs text-muted mt-1 font-mono uppercase tracking-wider">
                    Møteplasser
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
