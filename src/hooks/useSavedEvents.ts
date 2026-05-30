"use client";

import { useState, useCallback, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/context/AuthContext";

interface SavedState {
  [eventId: string]: boolean;
}

let supabase: ReturnType<typeof createClient> | null = null;
let supabaseEnabled = true;
try {
  supabase = createClient();
} catch {
  supabaseEnabled = false;
}

/**
 * Hook for saving/favoriting events.
 * Requires the user to be authenticated.
 */
export function useSavedEvents() {
  const { user, isAuthenticated } = useAuth();
  const [saved, setSaved] = useState<SavedState>({});
  const [loading, setLoading] = useState(true);

  // Fetch saved state for the current user
  const fetchSaved = useCallback(async () => {
    if (!supabaseEnabled || !supabase || !user) {
      setSaved({});
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("saved_events")
        .select("event_id")
        .eq("user_id", user.id);

      if (error) throw error;

      const savedMap: SavedState = {};
      (data || []).forEach((row: { event_id: string }) => {
        savedMap[row.event_id] = true;
      });
      setSaved(savedMap);
    } catch {
      // Table may not exist yet — silently ignore
      setSaved({});
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchSaved();
  }, [fetchSaved]);

  // Toggle save state for an event
  const toggleSave = useCallback(
    async (eventId: string) => {
      if (!isAuthenticated || !supabaseEnabled || !supabase || !user) return;

      const isSaved = saved[eventId];

      // Optimistic update
      setSaved((prev) => ({ ...prev, [eventId]: !isSaved }));

      try {
        if (isSaved) {
          const { error } = await supabase
            .from("saved_events")
            .delete()
            .eq("user_id", user.id)
            .eq("event_id", eventId);

          if (error) throw error;
        } else {
          const { error } = await supabase
            .from("saved_events")
            .insert({ user_id: user.id, event_id: eventId });

          if (error) throw error;
        }
      } catch {
        // Revert on error
        setSaved((prev) => ({ ...prev, [eventId]: isSaved }));
      }
    },
    [isAuthenticated, saved, user],
  );

  return {
    saved,
    loading,
    toggleSave,
    isSaved: (eventId: string) => !!saved[eventId],
    savedCount: Object.keys(saved).length,
  };
}
