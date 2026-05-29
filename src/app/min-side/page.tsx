"use client";

import { events, formatDate } from "@/data/sample";
import { motion } from "framer-motion";
import Link from "next/link";

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

const mockUser = {
  name: "Kari Nordmann",
  email: "kari@example.com",
  phone: "912 34 567",
  memberSince: "2026",
  avatar: "KN",
};

export default function MinSidePage() {
  const savedEvents = events.filter((e) => e.featured).slice(0, 3);
  const myEvents = events.filter((e) => e.organizerName !== "").slice(0, 3);

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
              {mockUser.avatar}
            </span>
          </div>
          <div>
            <h1 className="font-serif text-display-md text-ink leading-tight">
              {mockUser.name}
            </h1>
            <p className="text-muted mt-1">
              {mockUser.email} · Medlem siden {mockUser.memberSince}
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
                    <p className="text-sm text-ink mt-0.5">{mockUser.name}</p>
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wider text-muted">
                      E-post
                    </p>
                    <p className="text-sm text-ink mt-0.5">{mockUser.email}</p>
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wider text-muted">
                      Telefon
                    </p>
                    <p className="text-sm text-ink mt-0.5">{mockUser.phone}</p>
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
              </motion.div>
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
                    <button className="text-muted hover:text-error transition-colors flex-shrink-0">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M3 3L13 13M13 3L3 13"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </motion.div>
                ))}
              </motion.div>
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
              <motion.div variants={stagger} className="space-y-4">
                {myEvents.map((event) => (
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
                        {formatDate(event.date)} · {event.startTime}
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
                ))}
              </motion.div>
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
