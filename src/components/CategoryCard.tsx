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
      className="group block border border-navy/8 bg-white hover:shadow-md hover:-translate-y-0.5 hover:border-accent/30 transition-all duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-navy">
        {imgSrc ? (
          <>
            <Image
              src={imgSrc}
              alt={category.label}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/20 to-transparent" />
          </>
        ) : (
          <div
            className={`absolute inset-0 bg-gradient-to-br ${category.gradient}`}
          />
        )}
        <h3 className="absolute bottom-4 left-4 right-4 z-10 font-serif text-xl md:text-2xl font-bold text-white leading-tight">
          {category.label}
        </h3>
      </div>
      <div className="p-4 md:p-5">
        <p className="text-sm md:text-base text-muted leading-relaxed line-clamp-2">
          {category.description}
        </p>
        <p className="mt-3 text-sm text-sage">{category.count} tilgjengelig</p>
      </div>
    </Link>
  );
}
