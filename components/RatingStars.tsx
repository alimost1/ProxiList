import React from "react";
import { Star, StarHalf } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  size?: "sm" | "md";
}

export function RatingStars({ rating, size = "sm" }: RatingStarsProps) {
  const sz = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<Star key={i} className={`${sz} fill-amber-400 text-amber-400`} />);
    } else if (i - 0.5 <= rating) {
      stars.push(<StarHalf key={i} className={`${sz} fill-amber-400 text-amber-400`} />);
    } else {
      stars.push(<Star key={i} className={`${sz} text-slate-200 dark:text-slate-600`} />);
    }
  }

  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`} role="img">
      {stars}
    </div>
  );
}
