import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nb">
      <body className="min-h-screen">
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
