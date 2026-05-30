"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEvent } from "@/hooks/useEvents";
import { eventHeroImages } from "@/data/images";
import { mapDbEventToEventData, formatDate } from "@/lib/map-db";
import { PageSkeleton } from "@/components/Skeleton";
import SaveButton from "@/components/SaveButton";

export default function EventDetailPage() {
  const params = useParams();
  const { event: dbEvent, loading, error } = useEvent(params.id as string);

  // ── Loading state ──
  if (loading) {
    return <PageSkeleton variant="event" count={1} />;
  }

  // ── Error state ──
  if (error) {
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
            Kunne ikke laste arrangementet
          </h1>
          <p className="text-muted text-sm mb-8">{error}</p>
          <Link
            href="/arrangementer"
            className="inline-block px-6 py-3 bg-ink text-warm text-xs font-mono uppercase tracking-widest hover:bg-ink/90 transition-colors"
          >
            ← Tilbake til arrangementer
          </Link>
        </div>
      </div>
    );
  }

  // ── Not found state ──
  if (!dbEvent) {
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
            Arrangement ikke funnet
          </h1>
          <p className="text-muted text-sm mb-8">
            Dette arrangementet finnes ikke lenger, eller lenken er ugyldig.
          </p>
          <Link
            href="/arrangementer"
            className="inline-block px-6 py-3 bg-ink text-warm text-xs font-mono uppercase tracking-widest hover:bg-ink/90 transition-colors"
          >
            ← Tilbake til arrangementer
          </Link>
        </div>
      </div>
    );
  }

  const event = mapDbEventToEventData(dbEvent);

  // ── Build JSON-LD structured data ──
  const buildIsoDate = (dateStr: string, timeStr: string): string => {
    const [h, m] = timeStr.split(":").map(Number);
    const d = new Date(dateStr + "T12:00:00");
    d.setHours(h || 0, m || 0, 0, 0);
    return d.toISOString();
  };

  const eventStatusMap: Record<string, string> = {
    published: "https://schema.org/EventScheduled",
    cancelled: "https://schema.org/EventCancelled",
    postponed: "https://schema.org/EventPostponed",
    rescheduled: "https://schema.org/EventRescheduled",
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    startDate: buildIsoDate(event.date, event.startTime),
    endDate: buildIsoDate(event.endDate || event.date, event.endTime),
    eventStatus:
      eventStatusMap[event.status] || "https://schema.org/EventScheduled",
    isAccessibleForFree: event.isFree,
    location: {
      "@type": "Place",
      name: event.location,
      address: event.address || event.location,
    },
    organizer: {
      "@type": "Organization",
      name: event.organizerName,
    },
    ...(event.image && { image: event.image }),
    ...(event.website && { url: event.website }),
  };

  return (
    <div className="min-h-screen bg-warm">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ── Back Link ── */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-6">
        <Link
          href="/arrangementer"
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-muted hover:text-ink transition-colors duration-300"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="rotate-180"
          >
            <path
              d="M5 3L9 7L5 11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Tilbake til arrangementer
        </Link>
      </div>

      {/* ── Hero Area ── */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pt-8 pb-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`relative overflow-hidden bg-navy aspect-[3/1] sm:aspect-[4/1]`}
        >
          {(event.image?.startsWith("http") || eventHeroImages[event.id]) && (
            <Image
              src={
                event.image?.startsWith("http")
                  ? event.image
                  : eventHeroImages[event.id]
              }
              alt={event.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/20 to-navy/10" />

          {/* Badges */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex gap-2">
            {event.isFree && (
              <span className="px-3 py-1 bg-sage text-warm text-[10px] font-mono uppercase tracking-widest">
                Gratis
              </span>
            )}
            {event.featured && !event.isFree && (
              <span className="px-3 py-1 bg-accent text-warm text-[10px] font-mono uppercase tracking-widest">
                Anbefalt
              </span>
            )}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
            <p className="text-white/60 text-xs font-mono uppercase tracking-wider mb-1.5">
              {event.categoryLabel}
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white leading-tight max-w-2xl">
              {event.title}
            </h1>
            <div className="flex flex-wrap gap-x-6 gap-y-1 mt-3 text-sm text-white/80">
              <span className="flex items-center gap-1.5">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="text-white/50"
                >
                  <rect
                    x="1.5"
                    y="2.5"
                    width="11"
                    height="10"
                    rx="1"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M1.5 5.5H12.5"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M4.5 1V3.5M9.5 1V3.5"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
                {formatDate(event.date)}
                {event.endDate && <> – {formatDate(event.endDate)}</>}
              </span>
              <span className="flex items-center gap-1.5">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="text-white/50"
                >
                  <circle
                    cx="7"
                    cy="7"
                    r="5.5"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M7 4V7L9 8.5"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
                {event.startTime}–{event.endTime}
              </span>
              <span className="flex items-center gap-1.5">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="text-white/50"
                >
                  <path
                    d="M7 1C4.2 1 2 3.2 2 6C2 9.5 7 13 7 13C7 13 12 9.5 12 6C12 3.2 9.8 1 7 1Z"
                    fill="currentColor"
                    opacity="0.4"
                  />
                  <circle cx="7" cy="6" r="1.5" fill="currentColor" />
                </svg>
                {event.location}
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Main Content ── */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
          {/* Left Column – Description (2/3) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-2"
          >
            <div className="prose prose-sm sm:prose-base max-w-none text-ink/90 leading-relaxed whitespace-pre-line">
              {event.description}
            </div>

            {/* Practical Info */}
            <div className="mt-10 pt-8 border-t border-border">
              <h2 className="font-serif text-2xl text-ink mb-4">
                Praktisk informasjon
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="p-4 border border-border bg-white">
                  <p className="text-xs font-mono text-muted uppercase tracking-wider mb-1">
                    Dato
                  </p>
                  <p className="text-ink">
                    {formatDate(event.date)}
                    {event.endDate && <> – {formatDate(event.endDate)}</>}
                  </p>
                </div>
                <div className="p-4 border border-border bg-white">
                  <p className="text-xs font-mono text-muted uppercase tracking-wider mb-1">
                    Tid
                  </p>
                  <p className="text-ink">
                    {event.startTime}–{event.endTime}
                  </p>
                </div>
                <div className="p-4 border border-border bg-white">
                  <p className="text-xs font-mono text-muted uppercase tracking-wider mb-1">
                    Sted
                  </p>
                  <p className="text-ink">{event.location}</p>
                  <p className="text-muted text-xs mt-0.5">{event.address}</p>
                </div>
                <div className="p-4 border border-border bg-white">
                  <p className="text-xs font-mono text-muted uppercase tracking-wider mb-1">
                    Pris
                  </p>
                  <p className="text-ink">
                    {event.isFree ? (
                      <span className="text-sage font-mono">Gratis</span>
                    ) : (
                      <>{event.price} kr</>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Suitable For */}
            {event.suitableFor.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xs font-mono text-muted uppercase tracking-wider mb-3">
                  Passer for
                </h3>
                <div className="flex flex-wrap gap-2">
                  {event.suitableFor.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 text-xs font-mono uppercase tracking-wider border border-border bg-white text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Right Column – Sidebar (1/3) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="border border-border bg-white p-6 sm:p-8 sticky top-6">
              {/* Date & Time */}
              <div className="pb-6 border-b border-border">
                <h4 className="text-xs font-mono text-muted uppercase tracking-wider mb-3">
                  Dato og tid
                </h4>
                <p className="text-ink font-medium">{formatDate(event.date)}</p>
                <p className="text-sm text-muted mt-0.5">
                  {event.startTime}–{event.endTime}
                </p>
                {event.endDate && (
                  <p className="text-sm text-muted mt-1">
                    Til {formatDate(event.endDate)}
                  </p>
                )}
              </div>

              {/* Location */}
              <div className="py-6 border-b border-border">
                <h4 className="text-xs font-mono text-muted uppercase tracking-wider mb-3">
                  Sted
                </h4>
                <p className="text-ink font-medium">{event.location}</p>
                <p className="text-sm text-muted mt-0.5">{event.address}</p>
              </div>

              {/* Price */}
              <div className="py-6 border-b border-border">
                <h4 className="text-xs font-mono text-muted uppercase tracking-wider mb-3">
                  Pris
                </h4>
                {event.isFree ? (
                  <p className="text-sage font-mono text-sm uppercase tracking-wider">
                    Gratis
                  </p>
                ) : (
                  <p className="text-ink font-medium">{event.price} kr</p>
                )}
              </div>

              {/* Organizer */}
              <div className="py-6 border-b border-border">
                <h4 className="text-xs font-mono text-muted uppercase tracking-wider mb-3">
                  Arrangør
                </h4>
                <p className="text-ink font-medium">{event.organizerName}</p>
                {event.organizerEmail && (
                  <p className="text-sm text-muted mt-1">
                    {event.organizerEmail}
                  </p>
                )}
                {event.organizerPhone && (
                  <p className="text-sm text-muted">{event.organizerPhone}</p>
                )}
                {event.website && (
                  <a
                    href={event.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-xs font-mono uppercase tracking-wider text-accent hover:text-accent/80 transition-colors"
                  >
                    Besøk nettside →
                  </a>
                )}
              </div>

              {/* Share */}
              <div className="py-6 border-b border-border">
                <h4 className="text-xs font-mono text-muted uppercase tracking-wider mb-3">
                  Del
                </h4>
                <div className="flex gap-2">
                  <button
                    aria-label="Kopier lenke"
                    className="w-9 h-9 flex items-center justify-center border border-border text-muted hover:text-ink hover:border-muted transition-all duration-300"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M8 1L8 11M8 1L5 4M8 1L11 4"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M1 9V13C1 14.1 1.9 15 3 15H13C14.1 15 15 14.1 15 13V9"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                  <button
                    aria-label="Del på Facebook"
                    className="w-9 h-9 flex items-center justify-center border border-border text-muted hover:text-[#1877F2] hover:border-[#1877F2]/30 transition-all duration-300"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <path d="M9 5.5V3.5C9 2.7 9.7 2 10.5 2H12V0H9.5C7.6 0 6 1.6 6 3.5V5.5H4V8H6V16H9V8H11.5L12 5.5H9Z" />
                    </svg>
                  </button>
                  <button
                    aria-label="Del på Twitter"
                    className="w-9 h-9 flex items-center justify-center border border-border text-muted hover:text-[#00B2FF] hover:border-[#00B2FF]/30 transition-all duration-300"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <path d="M8 0C3.6 0 0 3.1 0 7C0 9.4 1.2 11.5 3.1 12.9L2 16L5.3 14.3C6.2 14.6 7.1 14.7 8 14.7C12.4 14.7 16 11.6 16 7C16 3.1 12.4 0 8 0ZM8 12.5C6.5 12.5 5.1 12.1 3.9 11.3L2.5 12L3.1 10.7L3.2 10.6C2.4 9.5 1.9 8.3 1.9 7C1.9 4.2 4.6 1.9 8 1.9C11.4 1.9 14.1 4.2 14.1 7C14.1 9.8 11.4 12.5 8 12.5Z" />
                    </svg>
                  </button>
                  <button
                    aria-label="Del på WhatsApp"
                    className="w-9 h-9 flex items-center justify-center border border-border text-muted hover:text-[#25D366] hover:border-[#25D366]/30 transition-all duration-300"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <path d="M8 0C3.6 0 0 3.6 0 8C0 9.8 0.6 11.5 1.7 12.9L1 16L4.6 14.7C6 15.5 7.5 16 9 16C13.4 16 17 12.4 17 8C17 3.6 12.4 0 8 0ZM11.2 10.9C11 11.4 10.3 11.8 9.8 11.9C9.5 12 9.1 12.1 7.5 11.3C5.6 10.3 4.4 8.3 4.2 8C4 7.7 3.5 7 3.5 6.3C3.5 5.6 3.8 5.3 4 5C4.2 4.8 4.4 4.7 4.5 4.7H5C5.1 4.7 5.2 4.7 5.3 4.9C5.5 5.1 5.8 5.9 5.8 5.9C5.9 6 5.9 6.2 5.8 6.3C5.7 6.5 5.6 6.6 5.5 6.7C5.4 6.8 5.3 6.9 5.4 7.1C5.5 7.3 5.9 8 6.5 8.5C7.1 9 7.6 9.2 7.9 9.3C8.1 9.4 8.3 9.3 8.4 9.2C8.6 9 8.8 8.7 9 8.5C9.1 8.3 9.3 8.3 9.5 8.4L11 9.1C11.2 9.2 11.3 9.3 11.4 9.4C11.4 9.6 11.3 10.5 11.2 10.9Z" />
                    </svg>
                  </button>
                  <button
                    aria-label="Del via andre tjenester"
                    className="w-9 h-9 flex items-center justify-center border border-border text-muted hover:text-ink hover:border-muted transition-all duration-300"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <rect
                        x="2"
                        y="2"
                        width="12"
                        height="12"
                        rx="1"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      />
                      <path
                        d="M5 8H11M8 5V11"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-6 space-y-3">
                <button className="w-full px-5 py-3 bg-ink text-warm text-xs font-mono uppercase tracking-widest hover:bg-ink/90 transition-colors duration-300">
                  Legg til i kalender
                </button>
                <div className="w-full px-5 py-3 border border-border bg-white text-ink hover:border-muted transition-colors duration-300 flex items-center justify-center">
                  <SaveButton eventId={event.id} size="md" />
                </div>
                <button className="w-full text-center text-xs font-mono uppercase tracking-wider text-muted hover:text-ink transition-colors duration-300 pt-2">
                  Meld feil
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
