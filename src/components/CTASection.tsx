import Link from "next/link";

export default function CTASection({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="bg-gradient-to-b from-navy to-[#0f1a2e] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-accent/10 to-transparent" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-sage/10 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/3 blur-3xl" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 py-24 md:py-32 text-center">
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-warm leading-tight">
          {title}
        </h2>
        <p className="mt-6 text-white/75 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
          {description}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={primaryHref}
            className="inline-flex items-center justify-center px-10 py-5 bg-accent text-warm text-sm font-semibold uppercase tracking-widest hover:bg-accent/90 transition-all hover:shadow-lg hover:shadow-accent/20 min-w-[220px]"
          >
            {primaryLabel}
          </Link>
          {secondaryLabel && secondaryHref && (
            <Link
              href={secondaryHref}
              className="inline-flex items-center justify-center px-10 py-5 border border-white/25 text-warm text-sm font-semibold uppercase tracking-widest hover:bg-white/10 transition-all min-w-[220px]"
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
