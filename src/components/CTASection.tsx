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
    <section className="bg-navy relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-accent/5 to-transparent" />
      <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-sage/5 blur-3xl" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 py-20 md:py-28 text-center">
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-warm leading-tight">
          {title}
        </h2>
        <p className="mt-4 text-white/50 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
          {description}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={primaryHref}
            className="inline-flex items-center justify-center px-8 py-4 bg-accent text-warm text-sm font-semibold uppercase tracking-widest hover:bg-accent/90 transition-colors min-w-[200px]"
          >
            {primaryLabel}
          </Link>
          {secondaryLabel && secondaryHref && (
            <Link
              href={secondaryHref}
              className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-warm text-sm font-semibold uppercase tracking-widest hover:bg-white/5 transition-colors min-w-[200px]"
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
