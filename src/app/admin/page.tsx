"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import AuthGuard from "@/components/AuthGuard";
import { fetchAllEvents, type DbEvent } from "@/data/db";
import { usePlaces } from "@/hooks/usePlaces";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
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

const adminLinks = [
  {
    href: "/admin/arrangementer",
    label: "Arrangementer",
    desc: "Administrer alle arrangementer",
  },
  {
    href: "/admin/steder",
    label: "Steder",
    desc: "Administrer steder og møteplasser",
  },
  {
    href: "/admin/brukere",
    label: "Brukere",
    desc: "Se og administrer brukere",
  },
  {
    href: "/admin/arrangorer",
    label: "Arrangører",
    desc: "Se og administrer arrangører",
  },
];

function Spinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <svg
        className="animate-spin h-8 w-8 text-muted"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
    </div>
  );
}

export default function AdminPage() {
  const [events, setEvents] = useState<DbEvent[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [eventsError, setEventsError] = useState<string | null>(null);

  const { places, loading: placesLoading, error: placesError } = usePlaces();

  useEffect(() => {
    fetchAllEvents()
      .then(setEvents)
      .catch((err) =>
        setEventsError(
          err instanceof Error ? err.message : "Kunne ikke laste arrangementer",
        ),
      )
      .finally(() => setEventsLoading(false));
  }, []);

  const loading = eventsLoading || placesLoading;
  const error = eventsError || placesError;

  const totalEvents = events.length;
  const pendingApprovals = events.filter((e) => e.status === "pending").length;
  const totalApproved = events.filter((e) => e.status === "approved").length;
  const totalPlaces = places.length;
  const uniqueOrganizers = new Set(events.map((e) => e.organizer_name)).size;

  return (
    <AuthGuard requiredRole="admin">
      <div className="min-h-screen">
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="w-64 border-r border-border bg-white hidden lg:block flex-shrink-0">
            <div className="p-6 border-b border-border">
              <h1 className="font-serif text-xl text-ink">Admin</h1>
              <p className="text-xs text-muted mt-1 font-mono uppercase tracking-wider">
                HeiSortland
              </p>
            </div>
            <nav className="p-4 space-y-1">
              <Link
                href="/admin"
                className="block px-4 py-2.5 text-sm bg-ink text-warm font-mono uppercase tracking-wider"
              >
                Oversikt
              </Link>
              {adminLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-2.5 text-sm text-muted hover:text-ink hover:bg-warm font-mono uppercase tracking-wider transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-border pt-4 mt-4">
                <Link
                  href="/"
                  className="block px-4 py-2.5 text-sm text-muted hover:text-ink font-mono uppercase tracking-wider transition-colors"
                >
                  ← Til forsiden
                </Link>
              </div>
            </nav>
          </aside>

          {/* Main content */}
          <div className="flex-1">
            {/* Top bar */}
            <div className="border-b border-border bg-white px-8 py-4 lg:hidden">
              <div className="flex items-center justify-between">
                <h1 className="font-serif text-xl text-ink">Admin</h1>
                <div className="flex gap-2 overflow-x-auto">
                  {adminLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="whitespace-nowrap px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider border border-border text-muted hover:text-ink transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 lg:p-10">
              {loading ? (
                <Spinner />
              ) : error ? (
                <div className="p-6 border border-error/30 bg-error/5 text-error text-sm">
                  {error}
                </div>
              ) : (
                <motion.div initial="hidden" animate="show" variants={stagger}>
                  <motion.div variants={fadeUp} className="mb-10">
                    <h2 className="font-serif text-display-md text-ink leading-tight">
                      Adminoversikt
                    </h2>
                    <p className="text-muted mt-2">
                      Dashboard for HeiSortland-administrasjon.
                    </p>
                  </motion.div>

                  {/* Stats cards */}
                  <motion.div
                    variants={stagger}
                    className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-10"
                  >
                    <motion.div
                      variants={fadeUp}
                      className="p-6 border border-border bg-white"
                    >
                      <p className="font-serif text-3xl text-ink">
                        {totalEvents}
                      </p>
                      <p className="text-xs text-muted mt-1 font-mono uppercase tracking-wider">
                        Arrangementer
                      </p>
                    </motion.div>
                    <motion.div
                      variants={fadeUp}
                      className="p-6 border border-border bg-white"
                    >
                      <p className="font-serif text-3xl text-warning">
                        {pendingApprovals}
                      </p>
                      <p className="text-xs text-muted mt-1 font-mono uppercase tracking-wider">
                        Venter på godkjenning
                      </p>
                    </motion.div>
                    <motion.div
                      variants={fadeUp}
                      className="p-6 border border-border bg-white"
                    >
                      <p className="font-serif text-3xl text-ink">
                        {totalApproved}
                      </p>
                      <p className="text-xs text-muted mt-1 font-mono uppercase tracking-wider">
                        Godkjente
                      </p>
                    </motion.div>
                    <motion.div
                      variants={fadeUp}
                      className="p-6 border border-border bg-white"
                    >
                      <p className="font-serif text-3xl text-ink">
                        {uniqueOrganizers}
                      </p>
                      <p className="text-xs text-muted mt-1 font-mono uppercase tracking-wider">
                        Arrangører
                      </p>
                    </motion.div>
                    <motion.div
                      variants={fadeUp}
                      className="p-6 border border-border bg-white"
                    >
                      <p className="font-serif text-3xl text-ink">
                        {totalPlaces}
                      </p>
                      <p className="text-xs text-muted mt-1 font-mono uppercase tracking-wider">
                        Steder
                      </p>
                    </motion.div>
                  </motion.div>

                  {/* Quick links */}
                  <motion.div variants={fadeUp}>
                    <h3 className="font-serif text-2xl text-ink mb-6">
                      Administrasjonssider
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {adminLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="p-5 border border-border bg-white hover:border-muted/30 transition-colors group"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-serif text-lg text-ink group-hover:text-accent transition-colors">
                                {link.label}
                              </h4>
                              <p className="text-sm text-muted mt-1">
                                {link.desc}
                              </p>
                            </div>
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              className="text-muted group-hover:text-accent transition-colors"
                            >
                              <path
                                d="M8 4L14 10L8 16"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
