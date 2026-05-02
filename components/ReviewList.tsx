import React from "react";
import { Review } from "@/lib/types";
import { RatingStars } from "./RatingStars";
import { BadgeCheck } from "lucide-react";

export function ReviewList({ reviews }: { reviews: Review[] }) {
  if (!reviews.length) return null;

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <article key={review.id} className="rounded-xl border border-slate-100 p-4 dark:border-slate-700">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
                {review.authorName.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{review.authorName}</span>
                  {review.verifiedVisit && (
                    <BadgeCheck className="h-3.5 w-3.5 text-emerald-500" />
                  )}
                </div>
                <span className="text-xs text-slate-400">{review.date}</span>
              </div>
            </div>
            <RatingStars rating={review.rating} />
          </div>
          <h4 className="mb-1 text-sm font-semibold text-slate-800 dark:text-slate-200">{review.title}</h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">{review.comment}</p>
        </article>
      ))}
    </div>
  );
}
