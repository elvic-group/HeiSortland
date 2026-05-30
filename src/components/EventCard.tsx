import { EventData, formatDate } from "@/data/sample";
import { eventImages } from "@/data/images";
import Image from "next/image";
import Link from "next/link";
import SaveButton from "@/components/SaveButton";

interface Props {
  event: EventData;
}

export default function EventCard({ event }: Props) {
  const imgSrc = event.image?.startsWith("http")
    ? event.image
    : eventImages[event.id];

  return (
    <Link
      href={`/arrangementer/${event.id}`}
      className="group block border border-border bg-white hover:border-muted/30 transition-colors duration-300"
    >
      <div className="relative overflow-hidden aspect-[16/10] bg-navy">
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div
            className={`absolute inset-0 bg-gradient-to-br ${event.gradient}`}
          />
        )}
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />

        {event.isFree && (
          <span className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-sage text-warm text-[10px] font-mono uppercase tracking-widest">
            Gratis
          </span>
        )}
        {event.featured && !event.isFree && (
          <span className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-accent text-warm text-[10px] font-mono uppercase tracking-widest">
            Anbefalt
          </span>
        )}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-3">
          <span className="text-white/50 text-[10px] font-mono">
            {event.categoryLabel}
          </span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <p className="text-xs font-mono text-accent uppercase tracking-wider mb-1.5">
            {formatDate(event.date)} · {event.startTime}
          </p>
          <SaveButton eventId={event.id} size="sm" />
        </div>
        <h3 className="font-serif text-xl text-ink group-hover:text-accent transition-colors duration-300 line-clamp-2">
          {event.title}
        </h3>
        <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-2">
          {event.shortDescription}
        </p>
        <div className="mt-3 flex items-center gap-2 text-xs text-muted">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="text-muted/50 shrink-0"
          >
            <path
              d="M6 1C3.8 1 2 2.8 2 5C2 8 6 11 6 11C6 11 10 8 10 5C10 2.8 8.2 1 6 1Z"
              fill="currentColor"
              opacity="0.4"
            />
            <circle cx="6" cy="5" r="1.5" fill="currentColor" />
          </svg>
          {event.location}
        </div>
      </div>
    </Link>
  );
}
