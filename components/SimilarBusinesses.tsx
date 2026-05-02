import React from "react";
import Link from "next/link";
import { Business } from "@/lib/types";
import { getRelatedBusinesses } from "@/lib/search";
import { RatingStars } from "./RatingStars";
import { MapPin } from "lucide-react";

export function SimilarBusinesses({ business }: { business: Business }) {
  const related = getRelatedBusinesses(business);
  if (!related.length) return null;

  return (
    <div>
      <h2 className="section-heading mb-4">Similar Businesses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {related.map((biz) => (
          <Link key={biz.id} href={`/business/${biz.slug}`} className="card p-4 hover:shadow-card-hover transition-shadow">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">{biz.name}</h3>
            <div className="flex items-center gap-1.5 mb-1">
              <RatingStars rating={biz.rating} />
              <span className="text-xs text-slate-500">{biz.rating}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-400">
              <MapPin className="h-3 w-3" /> {biz.city}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
