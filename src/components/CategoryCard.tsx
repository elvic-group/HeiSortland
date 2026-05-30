import Link from "next/link";
import { CategoryData } from "@/data/sample";
import { categoryImages } from "@/data/images";
import Image from "next/image";

interface Props {
  category: CategoryData;
}

export default function CategoryCard({ category }: Props) {
  const imgSrc = categoryImages[category.id];

  return (
    <Link
      href={`/arrangementer?category=${category.id}`}
      className="group block border border-border bg-white hover:border-accent/30 transition-all duration-300"
    >
      <div className="relative h-32 overflow-hidden bg-navy">
        {imgSrc ? (
          <>
            <Image
              src={imgSrc}
              alt={category.label}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/55 via-navy/15 to-transparent" />
          </>
        ) : (
          <div
            className={`absolute inset-0 bg-gradient-to-br ${category.gradient}`}
          />
        )}
        <div className="absolute left-4 bottom-4 h-px w-10 bg-warm/70 transition-all duration-300 group-hover:w-16 group-hover:bg-accent" />
      </div>
      <div className="p-5">
        <h3 className="font-serif text-xl text-ink group-hover:text-accent transition-colors">
          {category.label}
        </h3>
        <p className="mt-1.5 text-sm text-muted leading-relaxed line-clamp-2">
          {category.description}
        </p>
        <p className="mt-3 text-xs font-mono text-sage uppercase tracking-wider">
          {category.count} opplevelser
        </p>
      </div>
    </Link>
  );
}
