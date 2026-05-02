"use client";
import React from "react";
import { Heart } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";

export function FavoriteButton({ businessId }: { businessId: string }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(businessId);

  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(businessId); }}
      className={`rounded-xl p-2 transition ${
        fav
          ? "text-red-500 hover:text-red-600"
          : "text-slate-300 hover:text-red-400 dark:text-slate-600 dark:hover:text-red-400"
      }`}
      aria-label={fav ? "Remove from saved" : "Save business"}
    >
      <Heart className={`h-5 w-5 ${fav ? "fill-current" : ""}`} />
    </button>
  );
}
