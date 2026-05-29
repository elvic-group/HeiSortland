"use client";

import { useEvents } from "@/hooks/useEvents";
import { useMemo } from "react";
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
    transition: { staggerChildren: 0.05 },
  },
};

const adminLinks = [
  { href: "/admin", label: "Oversikt" },
  { href: "/admin/arrangementer", label: "Arrangementer" },
  { href: "/admin/steder", label: "Steder" },
  { href: "/admin/brukere", label: "Brukere" },
  { href: "/admin/arrangorer", label: "Arrangører" },
];

export default function AdminArrangorerPage() {
  const { events, loading, error } = useEvents();

  // Extract unique organizers from events data
  const organizers = useMemo(() => {
    const map = new Map<
      string,
      { name: string; email: string; phone: string; events: number }
    >();
    for (const e of events) {
      const key = e.organizer_email || e.organizer_name;
      const existing = map.get(key);
      if (existing) {
        existing.events += 1;
      } else {
        map.set(key, {
          name: e.organizer_name,
          email: e.organizer_email,
          phone: e.organizer_phone,
          events: 1,
        });
      }
    }
    return Array.from(map.values());
  }, [events]);

  return (
    <AuthGuard requiredRole="admin">
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
                    link.href === "/admin/arrangorer"
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
                      link.href === "/admin/arrangorer"
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
              {/* Loading state */}
              {loading && (
                <div className="flex items-center justify-center py-20">
                  <div className="flex items-center gap-2 text-muted text-sm font-mono">
                    <svg
                      className="animate-spin h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    Laster arrangører…
                  </div>
                </div>
              )}

              {/* Error state */}
              {error && !loading && (
                <div className="text-center py-20">
                  <p className="text-error text-sm mb-2">{error}</p>
                  <p className="text-muted text-xs">
                    Kunne ikke hente arrangører. Prøv igjen senere.
                  </p>
                </div>
              )}

              {/* Data state */}
              {!loading && !error && (
                <motion.div initial="hidden" animate="show" variants={stagger}>
                  <motion.div variants={fadeUp} className="mb-8">
                    <h2 className="font-serif text-display-md text-ink leading-tight">
                      Arrangører
                    </h2>
                    <p className="text-muted mt-2">
                      Administrer arrangører og deres tilgang.
                    </p>
                  </motion.div>

                  <motion.div variants={fadeUp} className="overflow-x-auto">
                    <table className="w-full border border-border text-sm">
                      <thead>
                        <tr className="bg-warm border-b border-border">
                          <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted">
                            Navn
                          </th>
                          <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted hidden sm:table-cell">
                            E-post
                          </th>
                          <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted hidden md:table-cell">
                            Telefon
                          </th>
                          <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted hidden md:table-cell">
                            Arrangementer
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
                        {organizers.map((organizer, i) => (
                          <tr
                            key={i}
                            className="border-b border-border hover:bg-warm/40 transition-colors"
                          >
                            <td className="px-4 py-3">
                              <span className="font-serif text-ink">
                                {organizer.name}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-muted text-xs hidden sm:table-cell">
                              {organizer.email}
                            </td>
                            <td className="px-4 py-3 text-muted text-xs hidden md:table-cell">
                              {organizer.phone}
                            </td>
                            <td className="px-4 py-3 text-muted text-xs hidden md:table-cell">
                              {organizer.events}
                            </td>
                            <td className="px-4 py-3">
                              <span className="inline-block px-2 py-1 text-[10px] font-mono uppercase tracking-widest bg-success/20 text-success">
                                Aktiv
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <button className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest border border-border text-muted hover:text-ink hover:border-ink/30 transition-colors">
                                  Rediger
                                </button>
                                <button className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-error/60 hover:text-error transition-colors">
                                  Sperr
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
                    Viser {organizers.length} arrangører
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
