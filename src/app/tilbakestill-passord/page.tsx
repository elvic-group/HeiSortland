"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const supabase = createClient();
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo: `${window.location.origin}/oppdater-passord`,
        },
      );

      if (resetError) {
        setError(resetError.message);
      } else {
        setSent(true);
      }
    } catch {
      setError("Noe gikk galt. Prøv igjen.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-warm pt-24 pb-16 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl md:text-4xl text-ink">
            Glemt passord
          </h1>
          <p className="mt-2 text-muted text-sm">
            Skriv inn e-posten din, så sender vi en lenke for å lage nytt
            passord.
          </p>
        </div>

        {sent ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 border border-sage/30 text-center"
          >
            <p className="text-ink text-sm leading-relaxed">
              Hvis det finnes en konto med denne e-postadressen, har vi sendt
              en lenke for å lage nytt passord. Sjekk innboksen din
              (og søppelpostmappen).
            </p>
            <Link
              href="/logg-inn"
              className="inline-block mt-6 text-xs text-accent hover:underline underline-offset-4"
            >
              ← Tilbake til innlogging
            </Link>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-4 bg-error/10 border border-error/30 text-sm text-error">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-muted mb-2">
                E-post
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3.5 bg-white border border-navy/15 text-ink text-sm focus:outline-none focus:border-navy/40 transition-colors"
                placeholder="din@epost.no"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-navy text-warm text-sm font-semibold uppercase tracking-widest hover:bg-navy/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Sender…" : "Send tilbakestillingslenke"}
            </button>

            <div className="text-center">
              <Link
                href="/logg-inn"
                className="text-xs text-muted hover:text-ink underline underline-offset-4 transition-colors"
              >
                ← Tilbake til innlogging
              </Link>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}
