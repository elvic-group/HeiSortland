"use client";

import { useCategories } from "@/hooks/useCategories";
import { SkeletonGrid } from "@/components/Skeleton";
import CategoryCard from "@/components/CategoryCard";
import { motion } from "framer-motion";
import Link from "next/link";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
} as const;

export default function KategorierPage() {
  const { categories, loading, error, reload } = useCategories();

  return (
    <div className="bg-warm min-h-screen">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 pt-28 pb-14 sm:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-2xl"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted hover:text-accent transition-colors mb-8"
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
            <h1 className="font-serif text-display-md sm:text-display-lg text-ink leading-tight">
              Utforsk kategorier
            </h1>
            <p className="mt-4 text-lg text-muted leading-relaxed max-w-lg">
              Finn arrangementer, aktiviteter og tilbud i Sortland – sortert
              etter hva du er interessert i.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16 sm:py-20">
        {loading && <SkeletonGrid count={8} variant="category" />}

        {error && !loading && (
          <div className="text-center py-20">
            <p className="text-muted font-serif text-xl mb-6">{error}</p>
            <button
              onClick={reload}
              className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-warm text-sm font-mono uppercase tracking-widest hover:bg-ink/90 transition-colors"
            >
              Prøv igjen
            </button>
          </div>
        )}

        {!loading && !error && (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {categories.map((category) => (
              <motion.div key={category.id} variants={item}>
                <CategoryCard category={category} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
}
