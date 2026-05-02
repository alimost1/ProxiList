import React from "react";
import { Business } from "@/lib/types";
import { RatingStars } from "./RatingStars";
import { BadgeCheck, AlertTriangle } from "lucide-react";

export function BusinessHeader({ business }: { business: Business }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 flex-wrap mb-2">
        <p className="text-sm font-medium text-primary-600 capitalize dark:text-primary-400">
          {business.primaryCategory.replace(/-/g, " ")}
        </p>
        {business.verified && (
          <span className="badge-primary">
            <BadgeCheck className="h-3 w-3" /> Verified
          </span>
        )}
        {business.emergencyService && (
          <span className="badge-warning">
            <AlertTriangle className="h-3 w-3" /> Emergency Service
          </span>
        )}
      </div>
      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
        {business.name}
      </h1>
      <div className="mt-3 flex items-center gap-3">
        <RatingStars rating={business.rating} size="md" />
        <span className="text-lg font-bold text-slate-800 dark:text-slate-200">{business.rating}</span>
        <span className="text-sm text-slate-500 dark:text-slate-400">
          ({business.reviewCount} reviews)
        </span>
        <span className="text-sm text-slate-400 dark:text-slate-500">·</span>
        <span className="text-sm text-slate-500 dark:text-slate-400">{business.priceRange}</span>
      </div>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        {business.address}, {business.city}, {business.postalCode}
      </p>
    </div>
  );
}
