"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchPlaces } from "@/data/db";
import { mapDbPlaceToPlaceData } from "@/lib/map-db";
import type { PlaceData } from "@/data/sample";

export function usePlaces() {
  const [places, setPlaces] = useState<PlaceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPlaces();
      setPlaces(data.map(mapDbPlaceToPlaceData));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kunne ikke laste steder");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { places, loading, error, reload: load };
}
