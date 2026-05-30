"use client";

import { useState, useRef } from "react";
import { categories } from "@/data/sample";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { createEvent, uploadEventImage } from "@/data/db";
import { useToast } from "@/components/Toast";

interface FormData {
  title: string;
  category: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  address: string;
  price: string;
  isFree: boolean;
  image: string;
  imageFile: File | null;
  organizerName: string;
  organizerEmail: string;
  organizerPhone: string;
  website: string;
  suitableFor: string[];
}

const suitableOptions = [
  { id: "barn", label: "Barn" },
  { id: "ungdom", label: "Ungdom" },
  { id: "voksne", label: "Voksne" },
  { id: "familier", label: "Familier" },
  { id: "seniorer", label: "Seniorer" },
];

const initialState: FormData = {
  title: "",
  category: "",
  description: "",
  date: "",
  startTime: "",
  endTime: "",
  location: "",
  address: "",
  price: "",
  isFree: false,
  image: "",
  imageFile: null,
  organizerName: "",
  organizerEmail: "",
  organizerPhone: "",
  website: "",
  suitableFor: [],
};

const inputClass =
  "w-full h-12 px-4 border border-navy/15 bg-white text-ink placeholder:text-muted/40 focus:outline-none focus:border-navy/40 transition-colors text-sm";
const labelClass = "block text-xs font-medium text-muted mb-2";

export default function LeggTilPage() {
  const { user } = useAuth();
  const [form, setForm] = useState<FormData>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (name === "isFree") {
      setForm((prev) => ({ ...prev, isFree: checked }));
    }
  };

  const handleSuitableFor = (id: string) => {
    setForm((prev) => ({
      ...prev,
      suitableFor: prev.suitableFor.includes(id)
        ? prev.suitableFor.filter((s) => s !== id)
        : [...prev.suitableFor, id],
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm((prev) => ({ ...prev, image: file.name, imageFile: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const selectedCategory = categories.find((c) => c.id === form.category);

      let imageUrl = "";
      if (form.imageFile) {
        imageUrl = await uploadEventImage(form.imageFile);
      }

      await createEvent({
        title: form.title,
        category: form.category,
        category_label: selectedCategory?.label || form.category,
        description: form.description,
        short_description: form.description.slice(0, 160),
        date: form.date,
        start_time: form.startTime,
        end_time: form.endTime,
        location: form.location,
        address: form.address,
        price: form.price || "0",
        is_free: form.isFree,
        image_url: imageUrl || undefined,
        organizer_name: form.organizerName || user?.name || "",
        organizer_email: form.organizerEmail || user?.email || "",
        organizer_phone: form.organizerPhone,
        website: form.website || undefined,
        suitable_for: form.suitableFor,
      });

      toast("Arrangementet er sendt inn!", "success");
      setForm(initialState);
      setError(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Noe gikk galt. Prøv igjen.";
      setError(message);
      toast(message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-warm">
      <div className="max-w-3xl mx-auto px-6 pt-28 pb-20">
        {/* Breadcrumb + Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted hover:text-accent transition-colors mb-6"
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
          <h1 className="font-serif text-3xl md:text-4xl text-ink leading-tight">
            Legg til arrangement
          </h1>
          <p className="mt-3 text-muted leading-relaxed max-w-lg">
            Fyll ut skjemaet under for å legge inn et nytt arrangement. Det blir
            publisert etter godkjenning.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
          onSubmit={handleSubmit}
          className="mt-12 space-y-10"
        >
          {/* Event details */}
          <div>
            <h2 className="font-serif text-2xl text-ink mb-6">
              Informasjon om arrangementet
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label htmlFor="title" className={labelClass}>
                  Tittel på arrangementet
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  value={form.title}
                  onChange={handleChange}
                  placeholder="F.eks. Sommerkonsert i parken"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="category" className={labelClass}>
                  Kategori
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={form.category}
                  onChange={handleChange}
                  className={`${inputClass} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%228%22%20viewBox%3D%220%200%2012%208%22%3E%3Cpath%20d%3D%22M1%201l5%205%205-5%22%20stroke%3D%22%236F6F78%22%20stroke-width%3D%221.5%22%20fill%3D%22none%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center] pr-10`}
                >
                  <option value="">Velg kategori</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="price" className={labelClass}>
                  Pris (i kr)
                </label>
                <input
                  id="price"
                  name="price"
                  type="text"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="F.eks. 150 eller 0"
                  className={inputClass}
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="description" className={labelClass}>
                  Beskrivelse
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={5}
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Beskriv arrangementet – hva, hvor, for hvem og eventuelle praktiske detaljer..."
                  className="w-full px-4 py-3.5 border border-navy/15 bg-white text-ink placeholder:text-muted/40 focus:outline-none focus:border-navy/40 transition-colors text-sm resize-y"
                />
              </div>
              <div>
                <label htmlFor="date" className={labelClass}>
                  Dato
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  required
                  value={form.date}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label htmlFor="startTime" className={labelClass}>
                    Starttid
                  </label>
                  <input
                    id="startTime"
                    name="startTime"
                    type="time"
                    required
                    value={form.startTime}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="endTime" className={labelClass}>
                    Sluttid
                  </label>
                  <input
                    id="endTime"
                    name="endTime"
                    type="time"
                    required
                    value={form.endTime}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="location" className={labelClass}>
                  Sted / lokale
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  required
                  value={form.location}
                  onChange={handleChange}
                  placeholder="F.eks. Sortland park"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="address" className={labelClass}>
                  Adresse
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="F.eks. Parkgata, 8400 Sortland"
                  className={inputClass}
                />
              </div>
              <div className="flex items-center gap-3 pt-2">
                <input
                  id="isFree"
                  name="isFree"
                  type="checkbox"
                  checked={form.isFree}
                  onChange={handleCheckbox}
                  className="w-4 h-4 border border-navy/15 accent-accent"
                />
                <label htmlFor="isFree" className="text-sm text-muted">
                  Dette arrangementet er gratis
                </label>
              </div>
              <div>
                <label htmlFor="image" className={labelClass}>
                  Bilde (valgfritt)
                </label>
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="w-full text-sm text-muted file:mr-4 file:py-2.5 file:px-4 file:border file:border-navy/15 file:text-xs file:font-mono file:uppercase file:tracking-widest file:text-muted file:bg-white hover:file:bg-warm transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Organizer info */}
          <div className="border-t border-navy/8 pt-10">
            <h2 className="font-serif text-2xl text-ink mb-6">
              Arrangørinformasjon
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="organizerName" className={labelClass}>
                  Navn på arrangør
                </label>
                <input
                  id="organizerName"
                  name="organizerName"
                  type="text"
                  required
                  value={form.organizerName}
                  onChange={handleChange}
                  placeholder="F.eks. Sortland Musikkforening"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="organizerEmail" className={labelClass}>
                  E-post
                </label>
                <input
                  id="organizerEmail"
                  name="organizerEmail"
                  type="email"
                  required
                  value={form.organizerEmail}
                  onChange={handleChange}
                  placeholder="post@arrangor.no"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="organizerPhone" className={labelClass}>
                  Telefon
                </label>
                <input
                  id="organizerPhone"
                  name="organizerPhone"
                  type="tel"
                  value={form.organizerPhone}
                  onChange={handleChange}
                  placeholder="F.eks. 911 22 333"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="website" className={labelClass}>
                  Nettside (valgfritt)
                </label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  value={form.website}
                  onChange={handleChange}
                  placeholder="https://arrangor.no"
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Suitable for */}
          <div className="border-t border-navy/8 pt-10">
            <h2 className="font-serif text-2xl text-ink mb-6">Passer for</h2>
            <p className="text-sm text-muted mb-4">
              Velg hvem arrangementet passer for (flere valg mulig).
            </p>
            <div className="flex flex-wrap gap-3">
              {suitableOptions.map((option) => (
                <label
                  key={option.id}
                  className={`flex items-center gap-2 px-4 py-2.5 border text-sm cursor-pointer transition-colors ${
                    form.suitableFor.includes(option.id)
                      ? "border-navy bg-navy text-warm"
                      : "border-navy/15 bg-white text-muted hover:border-navy/30"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={form.suitableFor.includes(option.id)}
                    onChange={() => handleSuitableFor(option.id)}
                    className="sr-only"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="border-t border-navy/8 pt-10">
            {error && (
              <div className="mb-4 p-4 border border-error/30 bg-error/5 text-error text-sm">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto px-8 py-4 bg-accent text-white text-sm font-mono uppercase tracking-widest hover:bg-accent/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Sender..." : "Send inn arrangement"}
            </button>
            <p className="mt-3 text-xs text-muted">
              Arrangementet vil bli gjennomgått og publisert innen kort tid.
            </p>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
