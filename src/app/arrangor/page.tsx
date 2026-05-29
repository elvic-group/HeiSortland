"use client";

import { useOrganizerEvents } from "@/hooks/useEvents";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import Link from "next/link";
import AuthGuard from "@/components/AuthGuard";

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
    transition: { staggerChildren: 0.08 },
  },
};

const benefits = [
  {
    title: "Nå flere folk",
    desc: "Arrangementet ditt blir synlig for alle som besøker HeiSortland – både fastboende og tilreisende.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
        <circle
          cx="17"
          cy="8"
          r="2.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M3 20C3 17 5.7 14.5 9 14.5C12.3 14.5 15 17 15 20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M15 15.5C17.5 15.5 19.5 17.3 20.5 19.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Enkelt og gratis",
    desc: "Det er helt gratis å legge inn arrangementer. Fyll ut skjemaet, så publiserer vi det etter rask godkjenning.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect
          x="4"
          y="6"
          width="16"
          height="14"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M8 6V4M16 6V4M4 10H20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M9 14L11 16L15 12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Samlet på ett sted",
    desc: "HeiSortland samler alt som skjer i Sortland – fra konserter til idrett, kurs og frivillighet. Alt på ett sted.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 3L20 8V16L12 21L4 16V8L12 3Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M12 12L20 8M12 12L4 8M12 12V21"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

const steps = [
  {
    number: "01",
    title: "Fyll ut skjemaet",
    desc: "Legg inn informasjon om arrangementet ditt – tittel, dato, sted, beskrivelse og kontaktinfo.",
  },
  {
    number: "02",
    title: "Vi godkjenner",
    desc: "Vi gjennomgår arrangementet og publiserer det. Du får beskjed når det er klart.",
  },
  {
    number: "03",
    title: "Nå publikum",
    desc: "Arrangementet ditt blir synlig for alle besøkende på HeiSortland. Del gjerne lenken videre.",
  },
];

const statusColors: Record<string, string> = {
  approved: "bg-success/20 text-success",
  pending: "bg-warning/20 text-warning",
  rejected: "bg-error/20 text-error",
};

const statusLabels: Record<string, string> = {
  approved: "Godkjent",
  pending: "Venter",
  rejected: "Avvist",
};

function OrganizerContent() {
  const { user } = useAuth();
  const {
    events: myEvents,
    loading,
    error,
    reload,
  } = useOrganizerEvents(user?.email);

  return (
    <div className="bg-navy min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-1/3 left-1/4 w-56 h-56 rounded-full bg-accent blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-14 sm:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-2xl"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-warm/40 hover:text-accent transition-colors mb-8"
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
            <h1 className="font-serif text-display-md sm:text-display-lg text-warm leading-tight">
              For arrangører
            </h1>
            <p className="mt-4 text-lg text-warm/60 leading-relaxed max-w-xl">
              Legg inn arrangementer, nå publikum og bli en del av Sortlands
              arrangementskalender.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Benefits */}
      <div className="border-b border-border bg-white">
        <div className="max-w-7xl mx-auto px-6 py-14 sm:py-16">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
          >
            <span className="text-xs font-mono uppercase tracking-widest text-accent mb-4 block">
              Hvorfor delta?
            </span>
            <h2 className="font-serif text-display-md text-ink leading-tight">
              Hvorfor legge inn arrangementer på HeiSortland?
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="p-6 border border-border bg-warm"
              >
                <div className="w-12 h-12 flex items-center justify-center border border-ink/10 text-ink mb-5">
                  {benefit.icon}
                </div>
                <h3 className="font-serif text-xl text-ink">{benefit.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {benefit.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* How it works */}
      <div className="border-b border-border bg-warm">
        <div className="max-w-7xl mx-auto px-6 py-14 sm:py-16">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
          >
            <span className="text-xs font-mono uppercase tracking-widest text-sage mb-4 block">
              Slik fungerer det
            </span>
            <h2 className="font-serif text-display-md text-ink leading-tight">
              Slik fungerer det
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8"
          >
            {steps.map((step, i) => (
              <motion.div key={i} variants={fadeUp} className="relative">
                <div className="flex items-center gap-4 mb-4">
                  <span className="font-mono text-xs text-accent tracking-widest">
                    {step.number}
                  </span>
                  {i < steps.length - 1 && (
                    <div className="hidden sm:block flex-1 h-px bg-border" />
                  )}
                </div>
                <h3 className="font-serif text-xl text-ink">{step.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10"
          >
            <Link
              href="/legg-til"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-warm text-sm font-mono uppercase tracking-widest hover:bg-accent/90 transition-colors"
            >
              Legg til arrangement
            </Link>
          </motion.div>
        </div>
      </div>

      {/* My events table */}
      <div className="border-b border-border bg-white">
        <div className="max-w-7xl mx-auto px-6 py-14 sm:py-16">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
          >
            <span className="text-xs font-mono uppercase tracking-widest text-accent mb-4 block">
              Dine arrangementer
            </span>
            <h2 className="font-serif text-display-md text-ink leading-tight">
              Mine arrangementer
            </h2>
            <p className="mt-3 text-muted text-lg">
              Her ser du en oversikt over arrangementer du har sendt inn.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="mt-10 overflow-x-auto"
          >
            {loading && (
              <table className="w-full border border-border text-sm">
                <thead>
                  <tr className="bg-warm border-b border-border">
                    <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted">
                      Arrangement
                    </th>
                    <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted hidden sm:table-cell">
                      Dato
                    </th>
                    <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted">
                      Status
                    </th>
                    <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted hidden md:table-cell">
                      Opprettet
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 3 }, (_, i) => (
                    <tr key={i} className="border-b border-border">
                      <td className="px-4 py-3">
                        <div className="h-4 w-32 bg-warm animate-pulse rounded" />
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <div className="h-4 w-16 bg-warm animate-pulse rounded" />
                      </td>
                      <td className="px-4 py-3">
                        <div className="h-4 w-20 bg-warm animate-pulse rounded" />
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <div className="h-4 w-20 bg-warm animate-pulse rounded" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {error && !loading && (
              <div className="text-center py-10">
                <p className="text-muted font-serif text-lg mb-4">{error}</p>
                <button
                  onClick={reload}
                  className="inline-flex items-center gap-2 px-5 py-2 border border-ink text-ink text-xs font-mono uppercase tracking-widest hover:bg-ink hover:text-warm transition-colors"
                >
                  Prøv igjen
                </button>
              </div>
            )}

            {!loading && !error && myEvents.length === 0 && (
              <div className="text-center py-10 border border-border">
                <p className="text-muted font-serif text-lg">
                  Du har ingen arrangementer ennå.
                </p>
                <Link
                  href="/legg-til"
                  className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-accent text-warm text-sm font-mono uppercase tracking-widest hover:bg-accent/90 transition-colors"
                >
                  Legg til ditt første arrangement
                </Link>
              </div>
            )}

            {!loading && !error && myEvents.length > 0 && (
              <table className="w-full border border-border text-sm">
                <thead>
                  <tr className="bg-warm border-b border-border">
                    <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted">
                      Arrangement
                    </th>
                    <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted hidden sm:table-cell">
                      Dato
                    </th>
                    <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted">
                      Status
                    </th>
                    <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wider text-muted hidden md:table-cell">
                      Opprettet
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {myEvents.map((event) => (
                    <tr
                      key={event.id}
                      className="border-b border-border hover:bg-warm/50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <Link
                          href={`/arrangementer/${event.id}`}
                          className="text-ink hover:text-accent transition-colors font-serif"
                        >
                          {event.title}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-muted hidden sm:table-cell">
                        {new Date(event.date + "T12:00:00").toLocaleDateString(
                          "nb-NO",
                          {
                            day: "numeric",
                            month: "short",
                          },
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block px-2 py-1 text-[10px] font-mono uppercase tracking-widest ${
                            statusColors[event.status]
                          }`}
                        >
                          {statusLabels[event.status]}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted text-xs hidden md:table-cell">
                        {new Date(
                          event.created_at + "T12:00:00",
                        ).toLocaleDateString("nb-NO", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </motion.div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-navy">
        <div className="max-w-7xl mx-auto px-6 py-12 sm:py-14 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-display-md text-warm leading-tight">
              Klar til å legge inn ditt arrangement?
            </h2>
            <p className="mt-3 text-warm/60 text-lg max-w-lg mx-auto">
              Det er gratis, enkelt og tar bare noen minutter.
            </p>
            <Link
              href="/legg-til"
              className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-accent text-warm text-sm font-mono uppercase tracking-widest hover:bg-accent/90 transition-colors"
            >
              Legg til arrangement
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function ArrangorPage() {
  return (
    <AuthGuard requiredRole="organizer">
      <OrganizerContent />
    </AuthGuard>
  );
}
