"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [hasSession, setHasSession] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const supabase = createClient();
      supabase.auth
        .getSession()
        .then(({ data }) => {
          setHasSession(!!data.session);
        })
        .catch(() => setHasSession(false));
    } catch {
      setHasSession(false);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const supabase = createClient();
      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });

      if (updateError) {
        setError(updateError.message);
      } else {
        setSuccess(true);
        setTimeout(() => router.push("/logg-inn"), 3000);
      }
    } catch {
      setError("Noe gikk galt. Prøv igjen.");
    } finally {
      setSubmitting(false);
    }
  };

  if (hasSession === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warm">
        <p className="text-muted text-sm">Laster…</p>
      </div>
    );
  }

  if (!hasSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warm pt-24 pb-16 px-6">
        <div className="text-center max-w-md">
          <h1 className="font-serif text-3xl md:text-4xl text-ink mb-4">
            Ugyldig lenke
          </h1>
          <p className="text-muted text-sm mb-6">
            Lenken er ugyldig eller har utløpt. Be om en ny
            tilbakestillingslenke.
          </p>
          <Link
            href="/tilbakestill-passord"
            className="text-accent hover:underline text-sm"
          >
            Be om ny lenke →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-warm pt-24 pb-16 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl md:text-4xl text-ink">
            Nytt passord
          </h1>
          <p className="mt-2 text-muted text-sm">Skriv inn ditt nye passord.</p>
        </div>

        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 border border-sage/30 text-center"
          >
            <p className="text-ink text-sm leading-relaxed">
              Passordet er oppdatert! Du blir videresendt til innlogging…
            </p>
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
                Nytt passord
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 bg-white border border-navy/15 text-ink text-sm focus:outline-none focus:border-navy/40 transition-colors"
                placeholder="Minst 8 tegn"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-navy text-warm text-sm font-semibold uppercase tracking-widest hover:bg-navy/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Oppdaterer…" : "Oppdater passord"}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
