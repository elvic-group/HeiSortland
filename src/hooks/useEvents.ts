"use client";

import { useState, useEffect, useCallback } from "react";
import {
  fetchApprovedEvents,
  fetchOrganizerEvents,
  fetchEventById,
  createEvent,
  uploadEventImage,
  type DbEvent,
} from "@/data/db";

export function useEvents() {
  const [events, setEvents] = useState<DbEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchApprovedEvents();
      setEvents(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Kunne ikke laste arrangementer",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { events, loading, error, reload: load };
}

export function useEvent(id: string) {
  const [event, setEvent] = useState<DbEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchEventById(id)
      .then(setEvent)
      .catch((err) =>
        setError(
          err instanceof Error ? err.message : "Fant ikke arrangementet",
        ),
      )
      .finally(() => setLoading(false));
  }, [id]);

  return { event, loading, error };
}

export function useCreateEvent() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(
    async (
      event: Omit<DbEvent, "id" | "created_at" | "status" | "featured">,
      imageFile?: File | null,
    ) => {
      setSubmitting(true);
      setError(null);
      try {
        let imageUrl = "";
        if (imageFile) {
          imageUrl = await uploadEventImage(imageFile);
        }
        const created = await createEvent({
          ...event,
          image_url: imageUrl || undefined,
        });
        return created;
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Noe gikk galt";
        setError(msg);
        throw err;
      } finally {
        setSubmitting(false);
      }
    },
    [],
  );

  return { submit, submitting, error };
}

export function useOrganizerEvents(email?: string | null) {
  const [events, setEvents] = useState<DbEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!email) {
      setEvents([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await fetchOrganizerEvents(email);
      setEvents(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Kunne ikke laste arrangementer",
      );
    } finally {
      setLoading(false);
    }
  }, [email]);

  useEffect(() => {
    load();
  }, [load]);

  return { events, loading, error, reload: load };
}
