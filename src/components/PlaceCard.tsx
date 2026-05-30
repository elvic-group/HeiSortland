import { PlaceData } from "@/data/sample";
import { placeImages } from "@/data/images";
import Image from "next/image";
import Link from "next/link";

interface Props {
  place: PlaceData;
}

export default function PlaceCard({ place }: Props) {
  const imgSrc = place.image?.startsWith("http")
    ? place.image
    : placeImages[place.id];

  return (
    <div className="border border-navy/8 bg-white group hover:shadow-md hover:-translate-y-0.5 hover:border-accent/30 transition-all duration-300">
      <div className="relative aspect-[4/3] overflow-hidden bg-navy">
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={place.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-navy/80 to-navy/80" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-accent/90 text-white text-xs px-2.5 py-1">
            {place.typeLabel}
          </span>
        </div>
      </div>
      <div className="p-4 md:p-5">
        <h3 className="font-serif text-xl text-ink group-hover:text-accent transition-colors duration-300 leading-tight">
          {place.name}
        </h3>
        <p className="mt-1.5 text-sm md:text-base text-muted leading-relaxed line-clamp-2">
          {place.shortDescription}
        </p>
        <div className="mt-3 space-y-1.5 text-sm text-muted">
          <div className="flex items-center gap-2">
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
            {place.address}
          </div>
          {place.phone && (
            <div className="flex items-center gap-2">
              <svg
                width="14"
                height="14"
                viewBox="0 0 12 12"
                fill="none"
                className="text-muted/50 shrink-0"
                aria-hidden="true"
              >
                <path
                  d="M2.5 1.5L4.5 1L5.5 3.5L4 4.5C4.5 5.5 5.5 6.5 6.5 7L7.5 5.5L10 6.5L9.5 8.5C9.5 8.5 8 10 6.5 10C4.5 10 2 7.5 2 5.5C2 4 3.5 2.5 3.5 2.5L2.5 1.5Z"
                  fill="currentColor"
                  opacity="0.4"
                />
              </svg>
              {place.phone}
            </div>
          )}
        </div>
        <div className="mt-4 pt-3 border-t border-navy/8 flex items-center gap-3">
          <Link
            href={`/steder#${place.id}`}
            className="text-sm text-accent hover:text-ink transition-colors inline-flex items-center gap-1"
          >
            Se detaljer
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 2L8 6L4 10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <Link
            href={`/kart?sted=${place.id}`}
            className="text-sm text-muted hover:text-ink transition-colors"
          >
            Kart
          </Link>
        </div>
      </div>
    </div>
  );
}
