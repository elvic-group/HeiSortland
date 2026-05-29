"use client";

import { useState, useMemo, useEffect, Suspense, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import EventCard from "@/components/EventCard";
import SearchBar from "@/components/SearchBar";
import FilterChips from "@/components/FilterChips";
import EmptyState from "@/components/EmptyState";
import { PageSkeleton, SkeletonCard } from "@/components/Skeleton";
import { useEvents } from "@/hooks/useEvents";
import { useCategories } from "@/hooks/useCategories";
import {
  mapDbEventToEventData,
  isToday,
  isTomorrow,
  isThisWeekend,
  isThisMonth,
} from "@/lib/map-db";

const tabs = [
  { id: "today", label: "I dag" },
  { id: "tomorrow", label: "I morgen" },
  { id: "weekend", label: "Denne helgen" },
  { id: "month", label: "Denne måneden" },
  { id: "all", label: "Alle" },
] as const;

type TabId = (typeof tabs)[number]["id"];

function ArrangementerContent() {
  const searchParams = useSearchParams();
  const urlSearch = searchParams.get("søk") || "";

  const {
    events: dbEvents,
    loading: eventsLoading,
    error: eventsError,
    reload: reloadEvents,
  } = useEvents();
  const {
    categories: dbCategories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  const [activeTab, setActiveTab] = useState<TabId>("all");
  const [activeQuickFilter, setActiveQuickFilter] = useState<string | null>(
    null,
  );
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState(urlSearch);

  // Sync URL search param to local state on navigation
  useEffect(() => {
    setSearchQuery(urlSearch);
  }, [urlSearch]);

  const mappedEvents = useMemo(
    () => dbEvents.map(mapDbEventToEventData),
    [dbEvents],
  );

  const filteredEvents = useMemo(() => {
    return mappedEvents.filter((event) => {
      // --- Tab filter (date-based) ---
      if (activeTab === "today" && !isToday(event.date)) return false;
      if (activeTab === "tomorrow" && !isTomorrow(event.date)) return false;
      if (activeTab === "weekend" && !isThisWeekend(event.date)) return false;
      if (activeTab === "month" && !isThisMonth(event.date)) return false;
      // "all" — no date filter

      // --- Quick filter ---
      if (activeQuickFilter) {
        switch (activeQuickFilter) {
          case "today":
            if (!isToday(event.date)) return false;
            break;
          case "weekend":
            if (!isThisWeekend(event.date)) return false;
            break;
          case "free":
            if (!event.isFree) return false;
            break;
          case "barn":
            if (!event.suitableFor.includes("barn")) return false;
            break;
          case "ungdom":
            if (!event.suitableFor.includes("ungdom")) return false;
            break;
          case "musikk":
            if (event.category !== "kultur-og-musikk") return false;
            break;
          case "kultur":
            if (event.category !== "kultur-og-musikk") return false;
            break;
          case "sport":
            if (event.category !== "sport-og-fritid") return false;
            break;
          case "frivillig":
            if (event.category !== "frivillighet") return false;
            break;
          case "kurs":
            if (event.category !== "kurs-og-læring") return false;
            break;
          case "mat-sosialt":
            if (event.category !== "mat-og-sosialt") return false;
            break;
        }
      }

      // --- Category filter ---
      if (activeCategory !== "all" && event.category !== activeCategory)
        return false;

      // --- Search query ---
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          event.title.toLowerCase().includes(q) ||
          event.shortDescription.toLowerCase().includes(q) ||
          event.categoryLabel.toLowerCase().includes(q);
        if (!matchesSearch) return false;
      }

      return true;
    });
  }, [activeTab, activeQuickFilter, activeCategory, searchQuery, mappedEvents]);

  const handleQuickFilter = (id: string | null) => {
    setActiveQuickFilter(id);
  };

  const handleCategoryFilter = (id: string) => {
    setActiveCategory(id);
  };

  const isLoading = eventsLoading || categoriesLoading;

  // ── Loading state ──
  if (isLoading) {
    return <PageSkeleton variant="event" count={8} />;
  }

  // ── Error state ──
  if (eventsError) {
    return (
      <div className="min-h-screen bg-warm flex items-center justify-center px-5">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-border/50 flex items-center justify-center">
            <svg
              width="24"
              height="24"
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
          <h1 className="font-serif text-3xl text-ink mb-3">
            Kunne ikke laste arrangementer
          </h1>
          <p className="text-muted text-sm mb-8">{eventsError}</p>
          <button
            onClick={reloadEvents}
            className="inline-block px-6 py-3 bg-ink text-warm text-xs font-mono uppercase tracking-widest hover:bg-ink/90 transition-colors"
          >
            Prøv igjen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm">
      {/* ── Page Header ── */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-10 sm:pt-24 sm:pb-14">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-xs font-mono uppercase tracking-[0.15em] text-sage mb-3"
          >
            Arrangementer
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ink leading-tight"
          >
            Hva skjer i Sortland?
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.18 }}
            className="mt-8 max-w-xl"
          >
            <SearchBar />
          </motion.div>
        </div>
      </section>

      {/* ── Filters Section ── */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-8 pb-4">
        {/* Tab Navigation */}
        <div className="flex gap-1 border-b border-border pb-0 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-5 py-3 text-xs font-mono uppercase tracking-widest whitespace-nowrap transition-colors duration-300 ${
                  isActive
                    ? "text-warm"
                    : "text-muted hover:text-ink border-transparent"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeTab"
                    className="absolute inset-0 bg-ink"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Quick Filter Chips */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="mt-6"
        >
          <FilterChips
            activeFilter={activeQuickFilter}
            onFilter={handleQuickFilter}
          />
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-5 overflow-x-auto scrollbar-none -mx-5 sm:-mx-8 px-5 sm:px-8"
        >
          <div className="flex gap-2 pb-2 min-w-max">
            <button
              onClick={() => handleCategoryFilter("all")}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-widest border transition-all duration-300 whitespace-nowrap ${
                activeCategory === "all"
                  ? "bg-ink text-warm border-ink"
                  : "bg-transparent text-muted border-border hover:border-muted hover:text-ink"
              }`}
            >
              Alle kategorier
            </button>
            {dbCategories.map((cat: any) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryFilter(cat.id)}
                  className={`px-4 py-2 text-xs font-mono uppercase tracking-widest border transition-all duration-300 whitespace-nowrap ${
                    isActive
                      ? "bg-ink text-warm border-ink"
                      : "bg-transparent text-muted border-border hover:border-muted hover:text-ink"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.35 }}
          className="mt-8 text-sm text-muted font-mono"
        >
          Viser <span className="text-ink">{filteredEvents.length}</span>{" "}
          arrangement{filteredEvents.length === 1 ? "" : "er"}
        </motion.p>
      </section>

      {/* ── Event Grid ── */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-24 pt-4">
        <AnimatePresence mode="wait">
          {filteredEvents.length > 0 ? (
            <motion.div
              key={activeTab + activeQuickFilter + activeCategory + searchQuery}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.04,
                    ease: "easeOut",
                  }}
                >
                  <EventCard event={event} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <EmptyState
                title="Fant ingen arrangementer"
                description="Prøv å endre filteret, juster søket, eller se om det er flere arrangementer senere."
                actionLabel="Se alle arrangementer"
                actionHref="/arrangementer"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}

export default function ArrangementerPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-warm flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-6 h-6 border-2 border-ink/20 border-t-ink rounded-full animate-spin" />
            <p className="text-sm font-mono text-muted">
              Laster arrangementer…
            </p>
          </div>
        </div>
      }
    >
      <ArrangementerContent />
    </Suspense>
  );
}
