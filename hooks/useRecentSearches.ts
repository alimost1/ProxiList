"use client";
import { useState, useEffect, useCallback } from "react";

type RecentSearch = { keyword: string; location: string };

const MAX_RECENT = 5;

export function useRecentSearches() {
  const [searches, setSearches] = useState<RecentSearch[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("proxilist-recent-searches");
      if (stored) setSearches(JSON.parse(stored));
    } catch {}
  }, []);

  const addSearch = useCallback(
    (keyword: string, location: string) => {
      if (!keyword && !location) return;
      const entry = { keyword, location };
      const next = [entry, ...searches.filter(
        (s) => s.keyword !== keyword || s.location !== location
      )].slice(0, MAX_RECENT);
      setSearches(next);
      localStorage.setItem("proxilist-recent-searches", JSON.stringify(next));
    },
    [searches]
  );

  const clearSearches = useCallback(() => {
    setSearches([]);
    localStorage.removeItem("proxilist-recent-searches");
  }, []);

  return { searches, addSearch, clearSearches };
}
