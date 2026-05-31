"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations();
  const n = useTranslations("nav");
  const f = useTranslations("footer");

  const footerLinks = [
    {
      title: f("explore"),
      items: [
        { label: n("events"), href: "/arrangementer" },
        { label: n("categories"), href: "/kategorier" },
        { label: n("places"), href: "/steder" },
        { label: n("map"), href: "/kart" },
      ],
    },
    {
      title: f("forYou"),
      items: [
        { label: n("newInSortland"), href: "/ny-i-sortland" },
        { label: n("forOrganizers"), href: "/arrangor" },
        { label: n("myPage"), href: "/min-side" },
        { label: n("addEventFull"), href: "/legg-til" },
      ],
    },
    {
      title: f("about"),
      items: [
        { label: f("contact"), href: "#" },
        { label: f("privacy"), href: "#" },
        { label: f("terms"), href: "#" },
        { label: f("forMunicipalities"), href: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-navy border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid md:grid-cols-4 gap-12 md:gap-12">
          <div>
            <Link
              href="/"
              className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-warm"
            >
              Hei<span className="text-accent">.</span> Sortland
            </Link>
            <p className="mt-4 text-white/70 text-sm leading-relaxed max-w-xs">
              {f("tagline")}
            </p>
          </div>

          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="text-sage/80 font-mono text-xs tracking-widest uppercase mb-6">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-white/60 hover:text-warm text-sm transition-colors duration-300"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            &copy; {new Date().getFullYear()} {f("copyright")}
          </p>
          <p className="text-white/40 text-xs font-mono">{f("madeWithLove")}</p>
        </div>
      </div>
    </footer>
  );
}
