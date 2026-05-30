"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { DbEvent, fetchEventById } from "@/data/db";
import { mapDbEventToEventData } from "@/lib/map-db";
import type { EventData } from "@/data/sample";

let supabase: ReturnType<typeof createClient> | null = null;
let supabaseEnabled = true;
try {
  supabase = createClient();
} catch {
  supabaseEnabled = false;
}

/**
 * Hook for fetching the user's saved events with full event data.
 */
export function useSavedEventsData() {
  const { user, isAuthenticated } = useAuth();
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!isAuthenticated || !supabaseEnabled || !supabase || !user) {
      setEvents([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      // Get saved event IDs
      const { data: savedRows, error } = await supabase
        .from("saved_events")
        .select("event_id")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      const eventIds = (savedRows || []).map(
        (row: { event_id: string }) => row.event_id,
      );

      if (eventIds.length === 0) {
        setEvents([]);
        setLoading(false);
        return;
      }

      // Fetch each event
      const eventPromises = eventIds.map((id: string) =>
        fetchEventById(id).catch(() => null),
      );
      const results = (await Promise.all(eventPromises)).filter(
        Boolean,
      ) as DbEvent[];

      setEvents(results.map(mapDbEventToEventData));
    } catch {
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    load();
  }, [load]);

  return { events, loading, reload: load };
}
