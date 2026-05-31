import { EventData, formatDate } from "@/data/sample";
import { eventImages } from "@/data/images";
import Image from "next/image";
import Link from "next/link";
import SaveButton from "@/components/SaveButton";
import { useTranslations } from "next-intl";

interface Props {
  event: EventData;
}

export default function EventCard({ event }: Props) {
  const t = useTranslations("events");
  const imgSrc = event.image?.startsWith("http")
    ? event.image
    : eventImages[event.id];

  return (
    <div className="group block border border-navy/8 bg-white hover:shadow-md hover:-translate-y-0.5 hover:border-accent/30 transition-all duration-300 relative">
      <Link href={`/arrangementer/${event.id}`} className="block">
        <div className="relative overflow-hidden aspect-[4/3] bg-navy">
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
          <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent" />

          <div className="absolute top-3 left-3 z-10 flex items-center gap-2 flex-wrap">
            <span className="bg-accent text-white text-xs px-2.5 py-1">
              {event.categoryLabel}
            </span>
            {event.isFree && (
              <span className="bg-sage text-warm text-xs px-2.5 py-1">
                {t("free")}
              </span>
            )}
            {event.featured && !event.isFree && (
              <span className="bg-accent text-warm text-xs px-2.5 py-1">
                {t("featured")}
              </span>
            )}
          </div>
        </div>
        <div className="p-5 md:p-6">
          <p className="text-base text-ink/80 mb-2">
            {formatDate(event.date)} · {event.startTime}
          </p>
          <h3 className="font-serif text-xl md:text-2xl text-ink group-hover:text-accent transition-colors duration-300 leading-tight line-clamp-2">
            {event.title}
          </h3>
          <p className="mt-2 text-sm md:text-base text-muted leading-relaxed line-clamp-2">
            {event.shortDescription}
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm text-muted">
            <svg
              width="14"
              height="14"
              viewBox="0 0 12 12"
              fill="none"
              className="text-muted/50 shrink-0"
              aria-hidden="true"
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
      <div className="absolute top-3 right-3 z-20">
        <SaveButton eventId={event.id} size="sm" />
      </div>
    </div>
  );
}
