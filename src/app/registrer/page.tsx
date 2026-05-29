"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

function RegisterForm() {
  const { register } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passordene må være like.");
      return;
    }

    setSubmitting(true);
    const result = await register({ name, email, password });
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
          <h1 className="font-serif text-3xl md:text-4xl text-ink">
            Opprett konto
          </h1>
          <p className="mt-2 text-muted text-sm">
            Eller{" "}
            <Link href="/logg-inn" className="text-accent hover:underline">
              logg inn
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
              Fullt navn
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3.5 bg-white border border-border text-ink text-sm focus:outline-none focus:border-ink transition-colors"
              placeholder="Ola Nordmann"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-muted mb-2">
              E-post
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3.5 bg-white border border-border text-ink text-sm focus:outline-none focus:border-ink transition-colors"
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
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3.5 bg-white border border-border text-ink text-sm focus:outline-none focus:border-ink transition-colors"
              placeholder="Minst 6 tegn"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-muted mb-2">
              Bekreft passord
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3.5 bg-white border border-border text-ink text-sm focus:outline-none focus:border-ink transition-colors"
              placeholder="Samme passord"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-accent text-warm text-sm font-semibold uppercase tracking-widest hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Oppretter konto…" : "Opprett konto"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-warm" />}>
      <RegisterForm />
    </Suspense>
  );
}
