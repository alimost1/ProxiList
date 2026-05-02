"use client";
import { useState, useEffect, useCallback } from "react";

const MAX_COMPARE = 3;

export function useCompare() {
  const [compareIds, setCompareIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("proxilist-compare");
      if (stored) setCompareIds(JSON.parse(stored));
    } catch {}
  }, []);

  const persist = useCallback((next: string[]) => {
    setCompareIds(next);
    localStorage.setItem("proxilist-compare", JSON.stringify(next));
  }, []);

  const toggleCompare = useCallback(
    (id: string) => {
      if (compareIds.includes(id)) {
        persist(compareIds.filter((c) => c !== id));
      } else if (compareIds.length < MAX_COMPARE) {
        persist([...compareIds, id]);
      }
    },
    [compareIds, persist]
  );

  const isCompared = useCallback((id: string) => compareIds.includes(id), [compareIds]);
  const canAdd = compareIds.length < MAX_COMPARE;
  const clearAll = useCallback(() => persist([]), [persist]);

  return { compareIds, toggleCompare, isCompared, canAdd, clearAll };
}
