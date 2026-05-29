"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchCategories } from "@/data/db";

export function useCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kunne ikke laste kategorier");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { categories, loading, error, reload: load };
}
