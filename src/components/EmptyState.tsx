import Link from "next/link";

export default function EmptyState({
  title = "Ingenting her ennå",
  description = "Prøv å endre filteret eller søket ditt.",
  actionLabel,
  actionHref,
}: {
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <div className="py-10 md:py-12 text-center">
      <div className="w-12 h-12 mx-auto mb-5 rounded-full bg-border/40 flex items-center justify-center">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="text-muted"
          aria-hidden="true"
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
      <h3 className="font-serif text-xl md:text-2xl text-ink mb-2">{title}</h3>
      <p className="text-muted text-sm max-w-sm mx-auto">{description}</p>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="inline-block mt-5 px-5 py-2.5 bg-ink text-warm text-xs font-mono uppercase tracking-widest hover:bg-ink/90 transition-colors"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
