"use client";

import { useAuth } from "@/context/AuthContext";
import { useSavedEventsData } from "@/hooks/useSavedEventsData";
import { useOrganizerEvents } from "@/hooks/useEvents";
import { formatDate } from "@/lib/map-db";
import { motion } from "framer-motion";
import Link from "next/link";
import SaveButton from "@/components/SaveButton";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
} as const;

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

export default function MinSidePage() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const { events: savedEvents, loading: savedLoading } = useSavedEventsData();
  const {
    events: myEvents,
    loading: orgLoading,
    error: orgError,
  } = useOrganizerEvents(isAuthenticated ? user?.email : null);

  const isLoading = authLoading || savedLoading;

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
        </motion.div>

        {/* ── User Profile Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
            delay: 0.1,
          }}
          className="flex items-center gap-6 mb-10"
        >
          <div className="w-16 h-16 rounded-full bg-ink flex items-center justify-center flex-shrink-0">
            <span className="font-serif text-xl text-warm">
              {user?.name?.charAt(0)?.toUpperCase() || "?"}
            </span>
          </div>
          <div>
            <h1 className="font-serif text-display-md text-ink leading-tight">
              {user?.name || "Min side"}
            </h1>
            <p className="text-muted mt-1">
              {user?.email || ""}
              {user?.createdAt && (
                <> · Medlem siden {new Date(user.createdAt).getFullYear()}</>
              )}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left column - profile + settings */}
          <div className="lg:col-span-1 space-y-8">
            {/* Profile info */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={stagger}
              className="p-6 border border-border bg-white"
            >
              <motion.div variants={fadeUp}>
                <h2 className="font-serif text-xl text-ink mb-4">Profil</h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wider text-muted">
                      Navn
                    </p>
                    <p className="text-sm text-ink mt-0.5">
                      {user?.name || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wider text-muted">
                      E-post
                    </p>
                    <p className="text-sm text-ink mt-0.5">
                      {user?.email || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wider text-muted">
                      Rolle
                    </p>
                    <p className="text-sm text-ink mt-0.5">
                      {user?.role === "admin"
                        ? "Administrator"
                        : user?.role === "organizer"
                          ? "Arrangør"
                          : "Bruker"}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Settings */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={stagger}
              className="p-6 border border-border bg-white"
            >
              <motion.div variants={fadeUp}>
                <h2 className="font-serif text-xl text-ink mb-4">
                  Innstillinger
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-ink">E-postvarsling</p>
                      <p className="text-xs text-muted">
                        Få varsler om nye arrangementer
                      </p>
                    </div>
                    <div className="w-10 h-6 bg-sage rounded-full relative cursor-pointer">
                      <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-ink">Påminnelser</p>
                      <p className="text-xs text-muted">
                        Få påminnelse før arrangementer
                      </p>
                    </div>
                    <div className="w-10 h-6 bg-border rounded-full relative cursor-pointer">
                      <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1" />
                    </div>
                  </div>
                  <div className="border-t border-border pt-4 mt-4">
                    <button className="text-sm text-error hover:text-error/80 transition-colors">
                      Slett konto
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right column - saved + my events */}
          <div className="lg:col-span-2 space-y-10">
            {/* Saved events */}
            <motion.div initial="hidden" animate="show" variants={stagger}>
              <motion.div variants={fadeUp} className="mb-6">
                <h2 className="font-serif text-display-md text-ink leading-tight">
                  Lagrede arrangementer
                </h2>
                {savedEvents.length > 0 && (
                  <p className="text-muted text-sm mt-1">
                    {savedEvents.length} arrangement
                    {savedEvents.length !== 1 ? "er" : ""} lagret
                  </p>
                )}
              </motion.div>

              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex items-center gap-5 p-5 border border-border bg-white animate-pulse"
                    >
                      <div className="w-14 h-14 rounded-full bg-navy/5" />
                      <div className="flex-1 space-y-2">
                        <div className="h-5 w-2/3 bg-navy/5 rounded-none" />
                        <div className="h-3 w-1/2 bg-navy/5 rounded-none" />
                      </div>
                      <div className="w-6 h-6 bg-navy/5" />
                    </div>
                  ))}
                </div>
              ) : savedEvents.length === 0 ? (
                <motion.div
                  variants={fadeUp}
                  className="p-10 border border-border bg-white text-center"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-border/40 flex items-center justify-center">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="text-muted"
                    >
                      <path
                        d="M8 14C6.5 14 5 13 4 11.5"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M2 8.5C2 5.5 4.5 3 8 3C11.5 3 14 5.5 14 8.5C14 9.5 13.5 11 12.5 12"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M12.5 12C10.5 13.5 8 15 8 15C8 15 5.5 12.5 4 11"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p className="font-serif text-lg text-ink mb-1">
                    Ingen lagrede arrangementer
                  </p>
                  <p className="text-sm text-muted mb-4">
                    Trykk på hjerte-ikonet på arrangementer du vil huske.
                  </p>
                  <Link
                    href="/arrangementer"
                    className="inline-block px-5 py-2.5 bg-ink text-warm text-xs font-mono uppercase tracking-widest hover:bg-ink/90 transition-colors"
                  >
                    Utforsk arrangementer
                  </Link>
                </motion.div>
              ) : (
                <motion.div variants={stagger} className="space-y-4">
                  {savedEvents.map((event) => (
                    <motion.div
                      key={event.id}
                      variants={fadeUp}
                      className="flex items-center gap-5 p-5 border border-border bg-white hover:border-muted/30 transition-colors"
                    >
                      <div
                        className={`w-14 h-14 rounded-full bg-gradient-to-br ${event.gradient} flex items-center justify-center flex-shrink-0`}
                      >
                        <span className="text-white text-lg font-bold">
                          {event.title.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/arrangementer/${event.id}`}
                          className="font-serif text-lg text-ink hover:text-accent transition-colors"
                        >
                          {event.title}
                        </Link>
                        <p className="text-sm text-muted mt-0.5">
                          {formatDate(event.date)} · {event.startTime} ·{" "}
                          {event.location}
                        </p>
                      </div>
                      <SaveButton eventId={event.id} size="sm" />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>

            {/* My events (organizer) */}
            <motion.div initial="hidden" animate="show" variants={stagger}>
              <motion.div variants={fadeUp} className="mb-6">
                <h2 className="font-serif text-display-md text-ink leading-tight">
                  Mine arrangementer
                </h2>
                <p className="text-muted mt-1">
                  Arrangementer du har opprettet som arrangør.
                </p>
              </motion.div>

              {orgLoading ? (
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="flex items-center gap-5 p-5 border border-border bg-white animate-pulse"
                    >
                      <div className="w-14 h-14 rounded-full bg-navy/5" />
                      <div className="flex-1 space-y-2">
                        <div className="h-5 w-2/3 bg-navy/5 rounded-none" />
                        <div className="h-3 w-1/2 bg-navy/5 rounded-none" />
                      </div>
                      <div className="w-16 h-5 bg-navy/5 rounded-none" />
                    </div>
                  ))}
                </div>
              ) : orgError ? (
                <p className="text-sm text-muted">{orgError}</p>
              ) : myEvents.length === 0 ? (
                <motion.div
                  variants={fadeUp}
                  className="p-10 border border-border bg-white text-center"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-border/40 flex items-center justify-center">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="text-muted"
                    >
                      <path
                        d="M8 2V14M2 8H14"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <p className="font-serif text-lg text-ink mb-1">
                    Ingen arrangementer opprettet
                  </p>
                  <p className="text-sm text-muted mb-4">
                    Opprett ditt første arrangement og del det med Sortland.
                  </p>
                  <Link
                    href="/legg-til"
                    className="inline-block px-5 py-2.5 bg-ink text-warm text-xs font-mono uppercase tracking-widest hover:bg-ink/90 transition-colors"
                  >
                    Legg til arrangement
                  </Link>
                </motion.div>
              ) : (
                <motion.div variants={stagger} className="space-y-4">
                  {myEvents.map((event) => {
                    const mapped = {
                      id: event.id,
                      title: event.title,
                      date: event.date,
                      startTime: event.start_time,
                      location: event.location,
                      gradient: "from-navy/80 to-navy/80",
                      status: event.status,
                    };
                    return (
                      <motion.div
                        key={event.id}
                        variants={fadeUp}
                        className="flex items-center gap-5 p-5 border border-border bg-white hover:border-muted/30 transition-colors"
                      >
                        <div
                          className={`w-14 h-14 rounded-full bg-gradient-to-br ${mapped.gradient} flex items-center justify-center flex-shrink-0`}
                        >
                          <span className="text-white text-lg font-bold">
                            {event.title.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/arrangementer/${event.id}`}
                            className="font-serif text-lg text-ink hover:text-accent transition-colors"
                          >
                            {event.title}
                          </Link>
                          <p className="text-sm text-muted mt-0.5">
                            {formatDate(event.date)} · {event.start_time}
                          </p>
                        </div>
                        <span
                          className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest ${
                            event.status === "approved"
                              ? "bg-success/20 text-success"
                              : event.status === "pending"
                                ? "bg-warning/20 text-warning"
                                : "bg-error/20 text-error"
                          }`}
                        >
                          {event.status === "approved"
                            ? "Godkjent"
                            : event.status === "pending"
                              ? "Venter"
                              : "Avvist"}
                        </span>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
              <motion.div variants={fadeUp} className="mt-6">
                <Link
                  href="/legg-til"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-muted text-xs font-mono uppercase tracking-widest hover:text-ink hover:border-ink/30 transition-colors"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M6 2V10M2 6H10"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </svg>
                  Legg til nytt arrangement
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
