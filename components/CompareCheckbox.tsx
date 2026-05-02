"use client";
import React from "react";
import { GitCompareArrows } from "lucide-react";
import { useCompare } from "@/hooks/useCompare";

export function CompareCheckbox({ businessId }: { businessId: string }) {
  const { isCompared, toggleCompare, canAdd } = useCompare();
  const compared = isCompared(businessId);

  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleCompare(businessId); }}
      disabled={!compared && !canAdd}
      className={`flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium transition ${
        compared
          ? "bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400"
          : "text-slate-400 hover:text-primary-600 disabled:opacity-30 dark:text-slate-500"
      }`}
      aria-label={compared ? "Remove from compare" : "Add to compare"}
    >
      <GitCompareArrows className="h-3.5 w-3.5" />
      {compared ? "Comparing" : "Compare"}
    </button>
  );
}
