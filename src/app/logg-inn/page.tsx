"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const result = await login(email, password);
    setSubmitting(false);

    if (result.success) {
      router.push(redirectTo);
    } else {
      setError(result.error || "Noe gikk galt.");
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
          <h1 className="font-serif text-3xl md:text-4xl text-ink">Logg inn</h1>
          <p className="mt-2 text-muted text-sm">
            Eller{" "}
            <Link href="/registrer" className="text-accent hover:underline">
              opprett ny konto
            </Link>
          </p>
        </div>

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

          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-muted mb-2">
              Passord
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3.5 bg-white border border-navy/15 text-ink text-sm focus:outline-none focus:border-navy/40 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-navy text-warm text-sm font-semibold uppercase tracking-widest hover:bg-navy/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Logger inn…" : "Logg inn"}
          </button>

          <div className="text-center">
            <Link
              href="/tilbakestill-passord"
              className="text-xs text-muted hover:text-ink underline underline-offset-4 transition-colors"
            >
              Glemt passord?
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-warm" />}>
      <LoginForm />
    </Suspense>
  );
}
