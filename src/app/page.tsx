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

  const todayEvents = useMemo(
    () => mappedEvents.filter((e) => isToday(e.date)),
    [mappedEvents],
  );
  const weekEvents = useMemo(
    () =>
      mappedEvents
        .filter((e) => isThisWeek(e.date) && !isToday(e.date))
        .slice(0, 4),
    [mappedEvents],
  );
  const featuredPlaces = useMemo(() => dbPlaces.slice(0, 4), [dbPlaces]);

  const isLoading = eventsLoading || placesLoading;

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
      {/* ─── HERO ─── */}
      <section className="relative min-h-[760px] md:min-h-[820px] flex items-center bg-navy overflow-hidden">
        {/* Hero image */}
        <Image
          src="/hero-sortland.jpg"
          alt="Fjord og fjellandskap i Vesterålen"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/55 to-navy/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />

        {/* Decorative background shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute bottom-1/3 -right-40 w-[30rem] h-[30rem] rounded-full bg-sage/10 blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 pt-28 pb-20 md:pt-32 md:pb-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.span
              variants={fadeUp}
              className="inline-block text-xs font-mono uppercase tracking-[0.2em] text-white/60 mb-4"
            >
              Sortland, Vesterålen
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-warm leading-[1.08] tracking-tight"
            >
              Finn det som
              <br />
              skjer i <span className="text-accent italic">Sortland</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-5 text-base sm:text-lg text-white/65 leading-relaxed max-w-xl"
            >
              Arrangementer, aktiviteter, møteplasser, tjenester og lokale
              tilbud – samlet på ett sted.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10">
              <SearchBar large />
            </motion.div>

            <motion.div variants={fadeUp} className="mt-6">
              <FilterChips
                activeFilter={activeFilter}
                onFilter={setActiveFilter}
              />
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-12 flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/arrangementer"
                className="inline-flex items-center justify-center px-8 py-4 bg-accent text-warm text-sm font-semibold uppercase tracking-widest hover:bg-accent/90 transition-colors min-w-[200px]"
              >
                Se hva som skjer
              </Link>
              <Link
                href="/legg-til"
                className="inline-flex items-center justify-center px-8 py-4 border border-white/15 text-warm/70 text-sm font-semibold uppercase tracking-widest hover:bg-white/5 hover:text-warm transition-colors min-w-[200px]"
              >
                Legg inn arrangement
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-warm to-transparent pointer-events-none" />
      </section>

      {/* ─── SKJER I DAG ─── */}
      <section className="py-14 md:py-16 bg-warm">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <span className="inline-block text-xs font-mono uppercase tracking-[0.2em] text-sage mb-3">
              I dag
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-ink leading-tight">
              Skjer i Sortland <span className="text-accent">akkurat nå</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="mt-7"
          >
            {todayEvents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {todayEvents.map((event) => (
                  <motion.div key={event.id} variants={fadeUp}>
                    <EventCard event={event} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div variants={fadeUp}>
                <EmptyState
                  title="Ingenting i dag"
                  description="Det er ingen arrangementer i dag. Sjekk hva som skjer denne uken!"
                  actionLabel="Se denne uken"
                  actionHref="/arrangementer"
                />
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ─── DENNE UKA ─── */}
      <section className="py-14 md:py-16 bg-warm border-t border-border/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
          >
            <div>
              <span className="inline-block text-xs font-mono uppercase tracking-[0.2em] text-sage mb-3">
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
            className="mt-7"
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
                <EmptyState
                  title="Ingenting denne uken"
                  description="Det er ingen arrangementer denne uken. Se hva som kommer senere."
                  actionLabel="Se alle arrangementer"
                  actionHref="/arrangementer"
                />
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ─── UTFORSK KATEGORIER ─── */}
      <section className="py-20 md:py-28 bg-warm border-t border-border/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <span className="inline-block text-xs font-mono uppercase tracking-[0.2em] text-sage mb-3">
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
              {dbCategories.map((category) => (
                <motion.div key={category.id} variants={fadeUp}>
                  <CategoryCard category={category} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ─── POPULÆRE MØTEPLASSER ─── */}
      <section className="py-20 md:py-28 bg-warm border-t border-border/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
          >
            <div>
              <span className="inline-block text-xs font-mono uppercase tracking-[0.2em] text-sage mb-3">
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

      {/* ─── FOR ARRANGØRER ─── */}
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

      {/* ─── NYHETSBREV ─── */}
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
          <span className="inline-block text-xs font-mono uppercase tracking-[0.2em] text-white/50 mb-4">
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
