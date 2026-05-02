"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { categories } from "@/lib/seed";
import { getAllServices } from "@/lib/search";
import { SlidersHorizontal } from "lucide-react";

export function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.set("page", "1");
    router.push(`/search?${params.toString()}`);
  };

  const toggleParam = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (params.get(key) === "true") params.delete(key);
    else params.set(key, "true");
    params.set("page", "1");
    router.push(`/search?${params.toString()}`);
  };

  const openNow = searchParams.get("openNow") === "true";
  const minRating = searchParams.get("minRating") || "";
  const appointment = searchParams.get("appointment") === "true";
  const selectedCats = searchParams.get("categories")?.split(",").filter(Boolean) || [];

  const toggleCategory = (slug: string) => {
    const next = selectedCats.includes(slug)
      ? selectedCats.filter((c) => c !== slug)
      : [...selectedCats, slug];
    updateParam("categories", next.join(","));
  };

  const clearAll = () => {
    const params = new URLSearchParams();
    const kw = searchParams.get("keyword");
    const loc = searchParams.get("location");
    if (kw) params.set("keyword", kw);
    if (loc) params.set("location", loc);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <aside className="card p-5 space-y-5" aria-label="Search filters">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
          <SlidersHorizontal className="h-4 w-4" /> Filters
        </h2>
        <button onClick={clearAll} className="text-xs text-primary-600 hover:underline dark:text-primary-400">
          Clear all
        </button>
      </div>

      {/* Open now */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={openNow}
          onChange={() => toggleParam("openNow")}
          className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
        />
        <span className="text-sm text-slate-700 dark:text-slate-300">Open now</span>
      </label>

      {/* Min rating */}
      <div>
        <label className="block mb-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">Minimum rating</label>
        <select
          value={minRating}
          onChange={(e) => updateParam("minRating", e.target.value)}
          className="input-field py-2 text-sm"
        >
          <option value="">Any rating</option>
          <option value="4.5">4.5+</option>
          <option value="4">4.0+</option>
          <option value="3.5">3.5+</option>
        </select>
      </div>

      {/* Categories */}
      <div>
        <label className="block mb-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">Categories</label>
        <div className="space-y-1 max-h-48 overflow-y-auto">
          {categories.map((cat) => (
            <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCats.includes(cat.slug)}
                onChange={() => toggleCategory(cat.slug)}
                className="h-3.5 w-3.5 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-slate-600 dark:text-slate-400">{cat.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Appointment */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={appointment}
          onChange={() => toggleParam("appointment")}
          className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
        />
        <span className="text-sm text-slate-700 dark:text-slate-300">Appointment available</span>
      </label>
    </aside>
  );
}
