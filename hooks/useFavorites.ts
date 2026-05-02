"use client";
import { useState, useEffect, useCallback } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("proxilist-favorites");
      if (stored) setFavorites(JSON.parse(stored));
    } catch {}
  }, []);

  const persist = useCallback((next: string[]) => {
    setFavorites(next);
    localStorage.setItem("proxilist-favorites", JSON.stringify(next));
  }, []);

  const toggleFavorite = useCallback(
    (id: string) => {
      persist(
        favorites.includes(id) ? favorites.filter((f) => f !== id) : [...favorites, id]
      );
    },
    [favorites, persist]
  );

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  return { favorites, toggleFavorite, isFavorite };
}
