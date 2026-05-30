"use client";

import { useState, useEffect, useCallback } from "react";
import { formatDate, getCategoryLabel } from "@/data/sample";
import { fetchAllEvents } from "@/data/db";
import type { DbEvent } from "@/data/db";
import { motion } from "framer-motion";
import Link from "next/link";
import AuthGuard from "@/components/AuthGuard";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
  },
} as const;

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const statusConfig: Record<string, { bg: string; label: string }> = {
  approved: { bg: "bg-success/20 text-success", label: "Godkjent" },
  pending: { bg: "bg-warning/20 text-warning", label: "Venter" },
  rejected: { bg: "bg-error/20 text-error", label: "Avvist" },
};

const adminLinks = [
  { href: "/admin", label: "Oversikt" },
  { href: "/admin/arrangementer", label: "Arrangementer" },
  { href: "/admin/steder", label: "Steder" },
  { href: "/admin/brukere", label: "Brukere" },
  { href: "/admin/arrangorer", label: "Arrangører" },
];

function AdminArrangementerContent() {
  const [events, setEvents] = useState<DbEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const loadEvents = useCallback(async () => {
    try {
      setError("");
      const data = await fetchAllEvents();
      setEvents(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Kunne ikke hente arrangementer.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const handleStatusChange = async (
    eventId: string,
    newStatus: "approved" | "rejected",
  ) => {
    setActionLoading(eventId);
    try {
      const res = await fetch(`/api/admin/events/${eventId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Noe gikk galt.");
      }

      setEvents((prev) =>
        prev.map((e) => (e.id === eventId ? { ...e, status: newStatus } : e)),
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Kunne ikke oppdatere status.",
      );
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border bg-white hidden lg:block flex-shrink-0">
          <div className="p-6 border-b border-border">
            <Link
              href="/admin"
              className="font-serif text-xl text-ink hover:text-accent transition-colors"
            >
              Admin
            </Link>
            <p className="text-xs text-muted mt-1 font-mono uppercase tracking-wider">
              HeiSortland
            </p>
          </div>
          <nav className="p-4 space-y-1">
            {adminLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-2.5 text-sm font-mono uppercase tracking-wider transition-colors ${
                  link.href === "/admin/arrangementer"
                    ? "bg-ink text-warm"
                    : "text-muted hover:text-ink hover:bg-warm"
                }`}
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

        {/* Main */}
        <div className="flex-1">
          <div className="border-b border-border bg-white px-8 py-4 lg:hidden">
            <div className="flex items-center gap-2 overflow-x-auto">
              {adminLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`whitespace-nowrap px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider border transition-colors ${
                    link.href === "/admin/arrangementer"
                      ? "bg-ink text-warm border-ink"
                      : "border-border text-muted hover:text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="p-6 lg:p-10">
            <motion.div initial="hidden" animate="show" variants={stagger}>
              <motion.div variants={fadeUp} className="mb-8">
                <h2 className="font-serif text-display-md text-ink leading-tight">
                  Arrangementer
                </h2>
                <p className="text-muted mt-2">
                  Administrer alle arrangementer – godkjenn, avvis eller
                  rediger.
                </p>
              </motion.div>

              {error && (
                <motion.div
                  variants={fadeUp}
                  className="mb-6 p-4 bg-error/10 border border-error/30 text-sm text-error"
                >
                  {error}
                  <button
                    onClick={loadEvents}
                    className="ml-3 underline hover:no-underline"
                  >
                    Prøv igjen
                  </button>
                </motion.div>
              )}

              {loading ? (
                <motion.div
                  variants={fadeUp}
                  className="flex items-center justify-center py-20"
                >
                  <div className="text-center">
                    <div className="w-8 h-8 border-2 border-ink border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="mt-4 text-sm text-muted font-mono">
                      Laster arrangementer…
                    </p>
                  </div>
                </motion.div>
              ) : events.length === 0 ? (
                <motion.div
                  variants={fadeUp}
                  className="text-center py-20 text-muted"
                >
                  <p className="font-serif text-xl text-ink mb-2">
                    Ingen arrangementer
                  </p>
                  <p className="text-sm">
                    Ingen arrangementer er registrert ennå.
                  </p>
                </motion.div>
              ) : (
                <>
                  <motion.div variants={fadeUp} className="overflow-x-auto">
                    <table className="w-full border border-border text-sm">
                      <thead>
                        <tr className="bg-warm border-b border-border">
                          <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted">
                            Tittel
                          </th>
                          <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted hidden md:table-cell">
                            Kategori
                          </th>
                          <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted hidden sm:table-cell">
                            Dato
                          </th>
                          <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted">
                            Status
                          </th>
                          <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted">
                            Handlinger
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {events.map((event) => (
                          <tr
                            key={event.id}
                            className="border-b border-border hover:bg-warm/40 transition-colors"
                          >
                            <td className="px-4 py-3">
                              <Link
                                href={`/arrangementer/${event.id}`}
                                className="font-serif text-ink hover:text-accent transition-colors"
                              >
                                {event.title}
                              </Link>
                            </td>
                            <td className="px-4 py-3 text-muted text-xs hidden md:table-cell">
                              {getCategoryLabel(event.category)}
                            </td>
                            <td className="px-4 py-3 text-muted text-xs hidden sm:table-cell">
                              {formatDate(event.date)}
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`inline-block px-2 py-1 text-[10px] font-mono uppercase tracking-widest ${
                                  statusConfig[event.status]?.bg ??
                                  "bg-muted/20 text-muted"
                                }`}
                              >
                                {statusConfig[event.status]?.label ??
                                  event.status}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                {event.status === "pending" && (
                                  <>
                                    <button
                                      onClick={() =>
                                        handleStatusChange(event.id, "approved")
                                      }
                                      disabled={actionLoading === event.id}
                                      className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest bg-success/20 text-success hover:bg-success/30 transition-colors disabled:opacity-50"
                                    >
                                      {actionLoading === event.id
                                        ? "…"
                                        : "Godkjenn"}
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleStatusChange(event.id, "rejected")
                                      }
                                      disabled={actionLoading === event.id}
                                      className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest bg-error/20 text-error hover:bg-error/30 transition-colors disabled:opacity-50"
                                    >
                                      {actionLoading === event.id
                                        ? "…"
                                        : "Avvis"}
                                    </button>
                                  </>
                                )}
                                <button
                                  disabled
                                  title="Kommer snart"
                                  className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest border border-border text-muted/40 cursor-not-allowed transition-colors"
                                >
                                  Rediger
                                </button>
                                <button
                                  disabled
                                  title="Kommer snart"
                                  className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-error/20 cursor-not-allowed transition-colors"
                                >
                                  Slett
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </motion.div>

                  <motion.div
                    variants={fadeUp}
                    className="mt-6 text-xs text-muted"
                  >
                    Viser {events.length} arrangementer
                  </motion.div>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminArrangementerPage() {
  return (
    <AuthGuard requiredRole="admin">
      <AdminArrangementerContent />
    </AuthGuard>
  );
}
