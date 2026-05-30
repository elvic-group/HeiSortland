import Link from "next/link";

const footerLinks = [
  {
    title: "Utforsk",
    items: [
      { label: "Hva skjer", href: "/arrangementer" },
      { label: "Kategorier", href: "/kategorier" },
      { label: "Steder", href: "/steder" },
      { label: "Kart", href: "/kart" },
    ],
  },
  {
    title: "For deg",
    items: [
      { label: "Ny i Sortland", href: "/ny-i-sortland" },
      { label: "For arrangører", href: "/arrangor" },
      { label: "Min side", href: "/min-side" },
      { label: "Legg inn arrangement", href: "/legg-til" },
    ],
  },
  {
    title: "Om",
    items: [
      { label: "Kontakt oss", href: "#" },
      { label: "Personvern", href: "#" },
      { label: "Bruksvilkår", href: "#" },
      { label: "For kommuner", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-navy border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid md:grid-cols-4 gap-12 md:gap-8">
          <div>
            <Link
              href="/"
              className="font-serif text-2xl font-semibold tracking-tight text-warm"
            >
              Hei<span className="text-accent">.</span> Sortland
            </Link>
            <p className="mt-4 text-white/60 text-sm leading-relaxed max-w-xs">
              Finn det som skjer i Sortland. Arrangementer, aktiviteter,
              møteplasser og lokale tilbud – samlet på ett sted.
            </p>
          </div>

          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="text-sage font-mono text-xs tracking-widest uppercase mb-5">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-white/75 hover:text-warm text-sm transition-colors duration-300"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-xs">
            &copy; {new Date().getFullYear()} Hei Sortland
          </p>
          <p className="text-white/40 text-xs font-mono">
            Med &hearts; fra Vesterålen
          </p>
        </div>
      </div>
    </footer>
  );
}
