import React from "react";
import { Review } from "@/lib/types";
import { Star } from "lucide-react";

export function ReviewsBreakdown({ reviews }: { reviews: Review[] }) {
  const total = reviews.length;
  if (!total) return null;

  const counts = [0, 0, 0, 0, 0];
  let sum = 0;
  reviews.forEach((r) => {
    const bucket = Math.min(4, Math.max(0, Math.round(r.rating) - 1));
    counts[bucket]++;
    sum += r.rating;
  });
  const avg = sum / total;

  return (
    <div className="flex flex-col sm:flex-row gap-6 items-start">
      <div className="text-center shrink-0">
        <div className="text-4xl font-bold text-slate-900 dark:text-white">{avg.toFixed(1)}</div>
        <div className="flex justify-center mt-1 mb-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i <= Math.round(avg) ? "fill-amber-400 text-amber-400" : "text-slate-200 dark:text-slate-600"}`}
            />
          ))}
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">{total} reviews</p>
      </div>
      <div className="flex-1 w-full space-y-1.5">
        {[5, 4, 3, 2, 1].map((star) => {
          const count = counts[star - 1];
          const pct = total ? (count / total) * 100 : 0;
          return (
            <div key={star} className="flex items-center gap-2">
              <span className="w-4 text-xs text-right text-slate-500 dark:text-slate-400">{star}</span>
              <Star className="h-3 w-3 text-amber-400 fill-amber-400 shrink-0" />
              <div className="flex-1 h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                <div
                  className="h-full rounded-full bg-amber-400 transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="w-6 text-xs text-slate-400 dark:text-slate-500">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
