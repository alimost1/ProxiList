"use client";
import React from "react";
import Link from "next/link";
import { Category } from "@/lib/types";
import * as Icons from "lucide-react";

export function CategoryChips({ items }: { items: Category[] }) {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
      {items.map((cat) => {
        const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[cat.icon] || Icons.Grid3X3;
        return (
          <Link
            key={cat.id}
            href={`/categories/${cat.slug}/casablanca`}
            className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-yellow-400 hover:bg-yellow-50 hover:text-slate-900 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-yellow-400 dark:hover:bg-yellow-400/10 dark:hover:text-yellow-400"
          >
            <IconComponent className="h-4 w-4" />
            {cat.label}
          </Link>
        );
      })}
    </div>
  );
}
