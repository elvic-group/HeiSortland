"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import SearchBar from "@/components/SearchBar";
import FilterChips from "@/components/FilterChips";
import EventCard from "@/components/EventCard";
import CategoryCard from "@/components/CategoryCard";
import PlaceCard from "@/components/PlaceCard";
import CTASection from "@/components/CTASection";
import EmptyState from "@/components/EmptyState";
import { PageSkeleton, SkeletonGrid } from "@/components/Skeleton";
import { useEvents } from "@/hooks/useEvents";
import { usePlaces } from "@/hooks/usePlaces";
import { useCategories } from "@/hooks/useCategories";
import { mapDbEventToEventData, isToday, isThisWeek } from "@/lib/map-db";
import {
  events as sampleEvents,
  places as samplePlaces,
  categories as sampleCategories,
} from "@/data/sample";

// ── Animations ──

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const stagger = {
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

// ── Hero quick-filter chips ──

const heroChips = [
  { label: "Arrangementer", href: "/kategorier/arrangementer" },
  { label: "Barn og familie", href: "/kategorier/barn-og-familie" },
  { label: "Frivillighet", href: "/kategorier/frivillighet" },
  { label: "Kurs", href: "/kategorier/kurs-og-laering" },
  { label: "Mat og sosialt", href: "/kategorier/mat-og-sosialt" },
  { label: "Transport", href: "/kategorier/transport" },
];

// ── Stats icons (inline SVGs) ──

const CalendarIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <rect
      x="3"
      y="4"
      width="18"
      height="18"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path d="M3 10h18" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M8 2v4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M16 2v4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const PinIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M12 21c-3-3.87-7-7.25-7-11a7 7 0 1114 0c0 3.75-4 7.13-7 11z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const GridIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <rect
      x="3"
      y="3"
      width="7"
      height="7"
      rx="1"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <rect
      x="14"
      y="3"
      width="7"
      height="7"
      rx="1"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <rect
      x="3"
      y="14"
      width="7"
      height="7"
      rx="1"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <rect
      x="14"
      y="14"
      width="7"
      height="7"
      rx="1"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const PlusIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M12 8v8M8 12h8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

// ── Page ──

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const {
    events: dbEvents,
    loading: eventsLoading,
    error: eventsError,
    reload: reloadEvents,
  } = useEvents();
  const {
    places: dbPlaces,
    loading: placesLoading,
    error: placesError,
  } = usePlaces();
  const {
    categories: dbCategories,
    loading: categoriesLoading,
    error: categoriesError,
    reload: reloadCategories,
  } = useCategories();

  const mappedEvents = useMemo(
    () => dbEvents.map(mapDbEventToEventData),
    [dbEvents],
  );

  // ── Demo fallback: use sample data when DB returns empty ──
  const displayEvents = useMemo(
    () => (dbEvents.length > 0 ? mappedEvents : sampleEvents),
    [dbEvents, mappedEvents],
  );
  const displayPlaces = useMemo(
    () => (dbPlaces.length > 0 ? dbPlaces : samplePlaces),
    [dbPlaces],
  );
  const displayCategories = useMemo(
    () => (dbCategories.length > 0 ? dbCategories : sampleCategories),
    [dbCategories],
  );

  // ── Derived data ──
  const popularEvents = useMemo(
    () =>
      displayEvents
        .filter((e) => e.status === "approved" && e.featured)
        .slice(0, 6),
    [displayEvents],
  );

  const weekEvents = useMemo(
    () => displayEvents.filter((e) => isThisWeek(e.date)).slice(0, 4),
    [displayEvents],
  );

  const featuredPlaces = useMemo(
    () => displayPlaces.slice(0, 4),
    [displayPlaces],
  );

  const isLoading = eventsLoading || placesLoading;

  // ── Stats ──
  const stats = [
    {
      icon: <CalendarIcon />,
      value: displayEvents.filter((e) => e.status === "approved").length,
      label: "Lokale arrangementer",
    },
    {
      icon: <PinIcon />,
      value: displayPlaces.length,
      label: "Møteplasser",
    },
    {
      icon: <GridIcon />,
      value: displayCategories.length,
      label: "Tjenester",
    },
    {
      icon: <PlusIcon />,
      value: "Gratis",
      label: "For arrangører",
    },
  ];

  // ── Loading state ──
  if (isLoading) {
    return <PageSkeleton variant="event" count={8} />;
  }

  // ── Error state ──
  if (eventsError || placesError) {
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
            Kunne ikke laste innhold
          </h1>
          <p className="text-muted text-sm mb-8">
            {eventsError || placesError}
          </p>
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
    <>
      {/* ═══════════════════════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] md:min-h-[85vh] flex items-center bg-navy overflow-hidden">
        {/* Hero image */}
        <Image
          src="/hero-sortland.jpg"
          alt="Fjord og fjellandskap i Vesterålen"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />

        {/* Decorative background shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute bottom-1/3 -right-40 w-[30rem] h-[30rem] rounded-full bg-sage/10 blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-12 pt-28 pb-20 md:pt-32 md:pb-24">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            {/* Small label */}
            <motion.span
              variants={fadeUp}
              className="inline-block text-sm tracking-[0.3em] uppercase text-white/60 mb-4"
            >
              Sortland, Vesterålen
            </motion.span>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[1.05]"
            >
              Finn det som
              <br />
              skjer i <span className="text-accent italic">Sortland</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              className="mt-5 text-lg md:text-xl text-white/70 leading-relaxed max-w-xl"
            >
              Arrangementer, aktiviteter, møteplasser, tjenester og lokale
              tilbud – samlet på ett sted.
            </motion.p>

            {/* Search bar */}
            <motion.div variants={fadeUp} className="mt-8 max-w-2xl">
              <SearchBar large />
            </motion.div>

            {/* Quick filter chips */}
            <motion.div variants={fadeUp} className="mt-4">
              <div className="flex flex-wrap gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {heroChips.map((chip) => (
                  <Link
                    key={chip.label}
                    href={chip.href}
                    className="inline-flex items-center px-4 py-2 text-xs font-mono uppercase tracking-widest border border-white/20 text-white/70 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300 whitespace-nowrap shrink-0"
                  >
                    {chip.label}
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/arrangementer"
                className="inline-flex items-center justify-center px-8 py-4 bg-accent text-white text-sm font-semibold uppercase tracking-widest hover:bg-accent/90 transition-colors min-w-[200px]"
              >
                Utforsk nå
              </Link>
              <Link
                href="/legg-til"
                className="inline-flex items-center justify-center px-8 py-4 border border-white/30 text-white text-sm font-semibold uppercase tracking-widest hover:bg-white/10 transition-colors min-w-[200px]"
              >
                Legg inn arrangement
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-warm to-transparent pointer-events-none" />
      </section>

      {/* ═══════════════════════════════════════════════════════════
          QUICK STATS ROW
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-warm border-b border-navy/8">
        <div className="max-w-7xl mx-auto px-6 py-8 md:py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
              custom={i}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 mb-3 text-accent">
                {stat.icon}
              </div>
              <div className="font-serif text-3xl md:text-4xl text-ink font-semibold">
                {stat.value}
              </div>
              <p className="text-xs text-muted mt-1 tracking-wider uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          POPULÆRT AKKURAT NÅ
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-warm">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
          >
            <div>
              <span className="inline-block text-sm tracking-[0.2em] uppercase text-accent mb-4">
                Populært
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-ink leading-tight">
                Populært akkurat <span className="text-accent">nå</span>
              </h2>
            </div>
            <Link
              href="/arrangementer"
              className="text-xs font-mono uppercase tracking-[0.2em] text-accent hover:text-ink transition-colors shrink-0 pb-1"
            >
              Se alle arrangementer →
            </Link>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="mt-10"
          >
            {popularEvents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {popularEvents.map((event) => (
                  <motion.div key={event.id} variants={fadeUp}>
                    <EventCard event={event} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div variants={fadeUp}>
                <EmptyState
                  title="Ingen arrangementer registrert ennå."
                  description="Vær først ute med å legge inn et arrangement!"
                  actionLabel="Legg inn arrangement"
                  actionHref="/legg-til"
                />
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FINN DIN KATEGORI
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-warm border-t border-border/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <span className="inline-block text-sm tracking-[0.2em] uppercase text-accent mb-4">
              Utforsk
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-ink leading-tight">
              Finn din <span className="text-accent">kategori</span>
            </h2>
          </motion.div>

          {categoriesLoading ? (
            <div className="mt-10">
              <SkeletonGrid count={8} variant="category" />
            </div>
          ) : categoriesError ? (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className="mt-10 text-center py-16"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-border/50 flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
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
              <p className="text-muted text-sm mb-6">{categoriesError}</p>
              <button
                onClick={reloadCategories}
                className="inline-block px-6 py-3 bg-ink text-warm text-xs font-mono uppercase tracking-widest hover:bg-ink/90 transition-colors"
              >
                Prøv igjen
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
            >
              {displayCategories.map((category) => (
                <motion.div key={category.id} variants={fadeUp}>
                  <CategoryCard category={category} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          DENNE UKA I SORTLAND
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-warm border-t border-border/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
          >
            <div>
              <span className="inline-block text-sm tracking-[0.2em] uppercase text-accent mb-4">
                Denne uka
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-ink leading-tight">
                Denne uka i <span className="text-accent">Sortland</span>
              </h2>
            </div>
            <Link
              href="/arrangementer"
              className="text-xs font-mono uppercase tracking-[0.2em] text-accent hover:text-ink transition-colors shrink-0 pb-1"
            >
              Se alle arrangementer →
            </Link>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="mt-10"
          >
            {weekEvents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {weekEvents.map((event) => (
                  <motion.div key={event.id} variants={fadeUp}>
                    <EventCard event={event} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div variants={fadeUp}>
                <div className="py-10 md:py-12 text-center">
                  <div className="w-12 h-12 mx-auto mb-5 rounded-full bg-border/40 flex items-center justify-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-muted"
                      aria-hidden="true"
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
                  <h3 className="font-serif text-xl md:text-2xl text-ink mb-2">
                    Ingen arrangementer denne uka.
                  </h3>
                  <p className="text-muted text-sm max-w-sm mx-auto mb-6">
                    Det er ingen arrangementer registrert for denne uken ennå.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link
                      href="/arrangementer"
                      className="inline-block px-5 py-2.5 bg-ink text-warm text-xs font-mono uppercase tracking-widest hover:bg-ink/90 transition-colors"
                    >
                      Utforsk kategorier
                    </Link>
                    <Link
                      href="/legg-til"
                      className="inline-block px-5 py-2.5 border border-ink/20 text-ink text-xs font-mono uppercase tracking-widest hover:bg-ink/5 transition-colors"
                    >
                      Legg inn arrangement
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          POPULÆRE MØTEPLASSER
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-warm border-t border-border/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
          >
            <div>
              <span className="inline-block text-sm tracking-[0.2em] uppercase text-accent mb-4">
                Møteplasser
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-ink leading-tight">
                Populære <span className="text-accent">møteplasser</span>
              </h2>
            </div>
            <Link
              href="/steder"
              className="text-xs font-mono uppercase tracking-[0.2em] text-accent hover:text-ink transition-colors shrink-0 pb-1"
            >
              Se alle steder →
            </Link>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {featuredPlaces.map((place: any) => (
              <motion.div key={place.id} variants={fadeUp}>
                <PlaceCard place={place} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          ER DU ARRANGØR? (CTA)
          ═══════════════════════════════════════════════════════════ */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
      >
        <CTASection
          title="Er du arrangør?"
          description="Legg inn arrangementer, nå ut til Sortland og bli synlig for hele lokalsamfunnet."
          primaryLabel="Legg inn arrangement"
          primaryHref="/legg-til"
          secondaryLabel="For arrangører"
          secondaryHref="/arrangor"
        />
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════
          NYHETSBREV
          ═══════════════════════════════════════════════════════════ */}
      <section className="bg-navy relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-accent/[0.03] to-transparent pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-sage/5 blur-3xl pointer-events-none" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="relative z-10 max-w-2xl mx-auto px-6 md:px-12 py-20 md:py-28 text-center"
        >
          <span className="inline-block text-sm tracking-[0.2em] uppercase text-accent mb-4">
            Nyhetsbrev
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-warm leading-tight">
            Få ukens aktiviteter på e-post
          </h2>
          <p className="mt-4 text-white/60 text-base md:text-lg max-w-md mx-auto leading-relaxed">
            Motta en ukentlig oversikt over hva som skjer i Sortland.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-10 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto opacity-60"
          >
            <input
              type="email"
              disabled
              aria-label="E-postadresse for nyhetsbrev"
              placeholder="din@epost.no"
              className="flex-1 px-5 py-4 bg-white/5 border border-white/10 text-warm placeholder:text-white/40 text-sm transition-colors cursor-not-allowed"
            />
            <button
              type="submit"
              disabled
              className="px-8 py-4 bg-accent text-warm text-xs font-semibold uppercase tracking-widest transition-colors shrink-0 cursor-not-allowed"
            >
              Kommer snart
            </button>
          </form>

          <p className="mt-4 text-[11px] text-white/35">
            Ingen spam. Kun én e-post i uka. Du kan melde deg av når som helst.
          </p>
        </motion.div>
      </section>
    </>
  );
}
