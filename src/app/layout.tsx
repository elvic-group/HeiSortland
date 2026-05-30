import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { cookies } from "next/headers";
import { Analytics } from "@vercel/analytics/react";
import { routing } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/components/Toast";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | HeiSortland",
    default: "HeiSortland – Finn det som skjer i Sortland",
  },
  description:
    "Arrangementer, aktiviteter, møteplasser, tjenester og lokale tilbud – samlet på ett sted. Oppdag hva som skjer i Sortland akkurat nå.",
  openGraph: {
    title: "HeiSortland – Finn det som skjer i Sortland",
    description:
      "Arrangementer, aktiviteter, møteplasser, tjenester og lokale tilbud – samlet på ett sted.",
    siteName: "HeiSortland",
    locale: "nb_NO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HeiSortland – Finn det som skjer i Sortland",
    description:
      "Arrangementer, aktiviteter, møteplasser, tjenester og lokale tilbud – samlet på ett sted.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Read locale from cookie (set by LanguageSwitcher), default to "no"
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;
  const locale =
    cookieLocale && routing.locales.includes(cookieLocale as "no" | "en")
      ? cookieLocale
      : routing.defaultLocale;

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch {
    messages = (await import("../../messages/no.json")).default;
  }

  return (
    <html lang={locale === "en" ? "en" : "nb"}>
      <body className="min-h-screen">
        <NextIntlClientProvider
          messages={messages}
          locale={locale}
          timeZone="Europe/Oslo"
        >
          <AuthProvider>
            <ToastProvider>
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-3 focus:bg-accent focus:text-warm focus:text-sm focus:font-semibold focus:outline-none"
              >
                Hopp til hovedinnhold
              </a>
              <Header />
              <main id="main-content">{children}</main>
              <Footer />
              <Analytics />
            </ToastProvider>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
