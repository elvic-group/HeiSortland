"use client";

import { events, formatDate, places } from "@/data/sample";
import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
} as const;

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

export default function NyISortlandPage() {
  const upcomingEvents = events
    .filter((e) => e.status === "approved")
    .slice(0, 3);

  const meetingPlaces = places.filter((p) =>
    ["kafe", "bibliotek", "kulturhus", "frivillig"].includes(p.type),
  );

  return (
    <div className="bg-navy min-h-screen">
      {/* 1. Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-accent blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-14 sm:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-3xl"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-warm/40 hover:text-accent transition-colors mb-8"
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
            <h1 className="font-serif text-display-md sm:text-display-lg text-warm leading-tight">
              Velkommen til Sortland
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-warm/70 leading-relaxed max-w-xl">
              Her finner du alt du trenger for å komme i gang – fra ukens
              arrangementer til gode møteplasser og nyttige tips.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="#hva-skjer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-warm text-sm font-mono uppercase tracking-widest hover:bg-accent/90 transition-colors"
              >
                Hva skjer denne uka?
              </Link>
              <Link
                href="#tips"
                className="inline-flex items-center gap-2 px-6 py-3 border border-warm/20 text-warm/80 text-sm font-mono uppercase tracking-widest hover:bg-white/5 transition-colors"
              >
                Tips for å bli kjent
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 2. Hva skjer denne uka? */}
      <section id="hva-skjer" className="border-b border-border bg-white">
        <div className="max-w-7xl mx-auto px-6 py-14 sm:py-16">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
          >
            <span className="text-xs font-mono uppercase tracking-widest text-accent mb-4 block">
              Kommende arrangementer
            </span>
            <h2 className="font-serif text-display-md text-ink leading-tight">
              Hva skjer denne uka?
            </h2>
            <p className="mt-3 text-muted text-lg max-w-lg">
              Her er noen av arrangementene som kommer fremover.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="mt-12 space-y-4 max-w-2xl"
          >
            {upcomingEvents.map((event) => (
              <motion.div
                key={event.id}
                variants={fadeUp}
                className="group flex items-center gap-5 p-5 border border-border bg-warm hover:bg-white transition-colors"
              >
                <div className="flex-shrink-0 w-16 text-center">
                  <p className="text-xs font-mono text-accent uppercase tracking-wider">
                    {new Date(event.date + "T12:00:00").getDate()}.
                    {new Date(event.date + "T12:00:00").getMonth() + 1}.
                  </p>
                  <p className="text-[10px] font-mono text-muted uppercase mt-1">
                    {event.startTime}
                  </p>
                </div>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/arrangementer/${event.id}`}
                    className="font-serif text-lg text-ink group-hover:text-accent transition-colors"
                  >
                    {event.title}
                  </Link>
                  <p className="text-sm text-muted mt-0.5">{event.location}</p>
                </div>
                <div>
                  {event.isFree && (
                    <span className="px-2.5 py-1 bg-sage text-warm text-[10px] font-mono uppercase tracking-widest">
                      Gratis
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8"
          >
            <Link
              href="/arrangementer"
              className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-accent hover:text-ink transition-colors"
            >
              Se alle arrangementer
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 4L10 8L6 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 3. Møteplasser */}
      <section className="border-b border-border bg-warm">
        <div className="max-w-7xl mx-auto px-6 py-14 sm:py-16">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
          >
            <span className="text-xs font-mono uppercase tracking-widest text-sage mb-4 block">
              Bli en del av fellesskapet
            </span>
            <h2 className="font-serif text-display-md text-ink leading-tight">
              Hvor kan jeg møte folk?
            </h2>
            <p className="mt-3 text-muted text-lg max-w-xl">
              Sortland har flere fine steder hvor du kan treffe nye mennesker og
              bli kjent.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {meetingPlaces.map((place) => (
              <motion.div
                key={place.id}
                variants={fadeUp}
                className="p-6 border border-border bg-white"
              >
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${place.gradient} flex items-center justify-center mb-4`}
                >
                  <span className="text-white text-sm font-bold">
                    {place.name.charAt(0)}
                  </span>
                </div>
                <h3 className="font-serif text-xl text-ink">{place.name}</h3>
                <p className="text-sm text-muted mt-2 leading-relaxed">
                  {place.shortDescription}
                </p>
                <p className="text-xs text-muted mt-3 font-mono">
                  {place.address}
                </p>
                {place.openingHours && (
                  <p className="text-xs text-muted mt-1">
                    {place.openingHours}
                  </p>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. Aktiviteter for barn og ungdom */}
      <section className="border-b border-border bg-white">
        <div className="max-w-7xl mx-auto px-6 py-14 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Barn */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={stagger}
            >
              <motion.div variants={fadeUp}>
                <span className="text-xs font-mono uppercase tracking-widest text-sage mb-4 block">
                  For de minste
                </span>
                <h2 className="font-serif text-display-md text-ink leading-tight">
                  Aktiviteter for barn
                </h2>
                <ul className="mt-8 space-y-4">
                  {[
                    "Familiedager på Kulturfabrikken med ansiktsmaling og verksteder",
                    "Barnefilm på Sortland kino – billige billetter",
                    "Sportsdager i idrettsparken for barn 6–12 år",
                    "Leksehjelp på biblioteket hver tirsdag",
                    "Åpen hall for barn i helgene",
                  ].map((text, i) => (
                    <motion.li
                      key={i}
                      variants={fadeUp}
                      className="flex items-start gap-3"
                    >
                      <span className="mt-1 w-5 h-5 rounded-full bg-sage/20 flex items-center justify-center flex-shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-sage" />
                      </span>
                      <span className="text-muted leading-relaxed">{text}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>

            {/* Ungdom */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={stagger}
            >
              <motion.div variants={fadeUp}>
                <span className="text-xs font-mono uppercase tracking-widest text-accent mb-4 block">
                  For unge
                </span>
                <h2 className="font-serif text-display-md text-ink leading-tight">
                  Aktiviteter for ungdom
                </h2>
                <ul className="mt-8 space-y-4">
                  {[
                    "Åpen hall hver torsdag med basketball, fotball og bordtennis",
                    "Ungdomskafé på Kulturfabrikken fredag kveld",
                    "Strikkekafé og sosiale kvelder på biblioteket",
                    "Fjellturer med Sortland turlag – gratis og åpent for alle",
                    "Bli med i ungdomsrådet og påvirke lokalmiljøet",
                  ].map((text, i) => (
                    <motion.li
                      key={i}
                      variants={fadeUp}
                      className="flex items-start gap-3"
                    >
                      <span className="mt-1 w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      </span>
                      <span className="text-muted leading-relaxed">{text}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Frivillige organisasjoner */}
      <section className="border-b border-border bg-warm">
        <div className="max-w-7xl mx-auto px-6 py-14 sm:py-16">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="max-w-2xl"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-sage mb-4 block">
              Engasjer deg
            </span>
            <h2 className="font-serif text-display-md text-ink leading-tight">
              Frivillige organisasjoner
            </h2>
            <p className="mt-3 text-muted text-lg">
              Sortland har et rikt organisasjonsliv. Her er noen av de
              frivillige organisasjonene du kan bli med i.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {[
              {
                name: "Sortland frivilligsentral",
                desc: "Møtested for frivillige – besøkstjeneste, leksehjelp og aktiviteter",
              },
              {
                name: "Røde Kors Sortland",
                desc: "Hjelpearbeid, besøkstjeneste og beredskap",
              },
              {
                name: "Sortland idrettsråd",
                desc: "Samarbeidsorgan for lokale idrettslag",
              },
              {
                name: "Sortland turlag",
                desc: "Turgrupper, turer og friluftsliv for alle",
              },
              {
                name: "Sortland historielag",
                desc: "Lokalhistorie, vandringer og foredrag",
              },
              {
                name: "Sortland musikkforening",
                desc: "Musikkarrangementer og jam-sessions",
              },
            ].map((org, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="p-5 border border-border bg-white"
              >
                <h3 className="font-serif text-lg text-ink">{org.name}</h3>
                <p className="text-sm text-muted mt-1.5 leading-relaxed">
                  {org.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8"
          >
            <Link
              href="/frivillighet"
              className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-sage hover:text-ink transition-colors"
            >
              Se alle organisasjoner
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 4L10 8L6 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 6. Viktige kontakter */}
      <section className="border-b border-border bg-white">
        <div className="max-w-7xl mx-auto px-6 py-14 sm:py-16">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="max-w-2xl"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-accent mb-4 block">
              Nyttige nummer
            </span>
            <h2 className="font-serif text-display-md text-ink leading-tight">
              Viktige kontakter
            </h2>
            <p className="mt-3 text-muted text-lg">
              Ha disse numrene lett tilgjengelig.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="mt-12 max-w-2xl"
          >
            {[
              {
                name: "Sortland kommune – Servicekontor",
                phone: "922 23 456",
                hours: "Man–fre 09:00–15:00",
              },
              {
                name: "Sortland bibliotek",
                phone: "915 56 789",
                hours: "Man–fre 10:00–18:00",
              },
              {
                name: "Sortland frivilligsentral",
                phone: "917 78 901",
                hours: "Man–fre 10:00–16:00",
              },
              {
                name: "Sortland legevakt",
                phone: "116 117",
                hours: "Døgnåpent",
              },
              {
                name: "Politiet Sortland",
                phone: "028 00",
                hours: "Døgnåpent",
              },
              {
                name: "NAV Sortland",
                phone: "923 45 678",
                hours: "Man–fre 10:00–14:00",
              },
            ].map((contact, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex items-center justify-between py-4 px-5 border-b border-border last:border-b-0"
              >
                <div>
                  <p className="text-sm text-ink font-medium">{contact.name}</p>
                  <p className="text-xs text-muted mt-0.5">{contact.hours}</p>
                </div>
                <a
                  href={`tel:${contact.phone}`}
                  className="text-sm font-mono text-accent hover:text-ink transition-colors whitespace-nowrap"
                >
                  {contact.phone}
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 7. Transport */}
      <section className="border-b border-border bg-warm">
        <div className="max-w-7xl mx-auto px-6 py-14 sm:py-16">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="max-w-2xl"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-sage mb-4 block">
              Kom deg rundt
            </span>
            <h2 className="font-serif text-display-md text-ink leading-tight">
              Transport
            </h2>
            <p className="mt-3 text-muted text-lg">
              Slik kommer du deg til og rundt i Sortland.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              {
                title: "Buss",
                lines: [
                  "Reis Nordland – lokalbusser i Vesterålen",
                  "Rutetider: 177 NRK.no",
                  "Bussholdeplass ved Sortland rådhus",
                ],
              },
              {
                title: "Båt",
                lines: [
                  "Hurtigbåt til Stokmarknes og Skagen",
                  "Torghatten Nord – rutetider på 177.no",
                  "Båtkaia ligger sentralt i Sortland",
                ],
              },
              {
                title: "Fly",
                lines: [
                  "Sortland lufthavn – flyplass ved Skagen",
                  "Widerøe – daglige avganger til Bodø og Tromsø",
                  "20 minutter med bil fra sentrum",
                ],
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="p-6 border border-border bg-white"
              >
                <h3 className="font-serif text-xl text-ink mb-3">
                  {item.title}
                </h3>
                <ul className="space-y-2">
                  {item.lines.map((line, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-sm text-muted"
                    >
                      <span className="w-1 h-1 rounded-full bg-muted/40 mt-2 flex-shrink-0" />
                      {line}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 8. Tips for å bli kjent */}
      <section id="tips" className="bg-navy text-warm">
        <div className="max-w-7xl mx-auto px-6 py-14 sm:py-16">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="max-w-2xl"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-accent mb-4 block">
              Kom i gang
            </span>
            <h2 className="font-serif text-display-md leading-tight">
              Tips for å bli kjent
            </h2>
            <p className="mt-3 text-warm/60 text-lg">
              Å flytte til en ny by kan være utfordrende. Her er noen tips for å
              komme i gang.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="mt-14 max-w-3xl space-y-8"
          >
            {[
              {
                step: "1",
                title: "Gå på en kafé",
                desc: "Sett deg ned på Kafé Sortland eller en annen kafé i sentrum. Du vil fort oppdage at Sortland er en vennlig by hvor folk gjerne slår av en prat.",
              },
              {
                step: "2",
                title: "Meld deg inn i en organisasjon",
                desc: "Sortland har et aktivt organisasjonsliv. Finn en forening eller gruppe som passer dine interesser – det er den raskeste veien inn i fellesskapet.",
              },
              {
                step: "3",
                title: "Bli med på arrangementer",
                desc: "Sjekk arrangementskalenderen jevnlig. Konserter, markeder og idrettsarrangementer er perfekte steder å møte nye mennesker.",
              },
              {
                step: "4",
                title: "Bli frivillig",
                desc: "Frivilligsentralen formidler oppgaver for alle aldre. Det er en fin måte å bidra og bli kjent på samtidig.",
              },
              {
                step: "5",
                title: "Delta i lokale Facebook-grupper",
                desc: "Sortland har flere aktive grupper hvor ting deles og organiseres. Det er en lavterskel måte å holde seg oppdatert på.",
              },
              {
                step: "6",
                title: "Vær tålmodig og nysgjerrig",
                desc: "Det tar tid å bygge et nytt nettverk. Vær åpen, nysgjerrig og gi deg selv tid – Sortland er en by som ønsker deg velkommen.",
              },
            ].map((tip) => (
              <motion.div
                key={tip.step}
                variants={fadeUp}
                className="flex gap-6"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full border border-warm/20 flex items-center justify-center">
                  <span className="font-serif text-xl text-accent">
                    {tip.step}
                  </span>
                </div>
                <div>
                  <h3 className="font-serif text-xl text-warm">{tip.title}</h3>
                  <p className="mt-1 text-warm/60 leading-relaxed">
                    {tip.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12 sm:py-14 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-serif text-2xl text-ink">
              Har du et tips til noe vi bør legge til?
            </p>
            <p className="mt-3 text-muted">
              HeiSortland skal være til nytte for alle som bor i eller flytter
              til Sortland.
            </p>
            <Link
              href="/legg-til"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-accent text-warm text-sm font-mono uppercase tracking-widest hover:bg-accent/90 transition-colors"
            >
              Legg til arrangement
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
