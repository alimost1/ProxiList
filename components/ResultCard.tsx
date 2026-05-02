"use client";
import React from "react";
import Link from "next/link";
import { Phone, FileText, MapPin, BadgeCheck, Clock, AlertTriangle } from "lucide-react";
import { Business } from "@/lib/types";
import { RatingStars } from "./RatingStars";
import { FavoriteButton } from "./FavoriteButton";
import { CompareCheckbox } from "./CompareCheckbox";
import { getOpenStatus } from "@/lib/search";

export function ResultCard({ business }: { business: Business }) {
  const status = getOpenStatus(business.hours);
  const getCategoryImage = (category: string) => {
    const categoryMap: Record<string, string> = {
      'plumber': 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=300&fit=crop&q=80',
      'restaurant': 'https://images.unsplash.com/photo-1504674900967-a8ff65e26a30?w=400&h=300&fit=crop&q=80',
      'doctor': 'https://images.unsplash.com/photo-1631217b76e7-59b4e0b92e2b?w=400&h=300&fit=crop&q=80',
      'hotel': 'https://images.unsplash.com/photo-1631049307038-da0ec36d9ec1?w=400&h=300&fit=crop&q=80',
      'electrician': 'https://images.unsplash.com/photo-1581092161562-40038e57f0a1?w=400&h=300&fit=crop&q=80',
      'beauty-salon': 'https://images.unsplash.com/photo-1560066169-b36a08ee310d?w=400&h=300&fit=crop&q=80',
      'dentist': 'https://images.unsplash.com/photo-1606925315913-d582b1d63d7c?w=400&h=300&fit=crop&q=80',
      'locksmith': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&q=80',
      'default': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop&q=80'
    };
    return categoryMap[category] || categoryMap['default'];
  };
  const imageUrl = business.photos?.[0] || getCategoryImage(business.primaryCategory);

  return (
    <article className="relative card overflow-hidden transition-all hover:shadow-md">
      <div className="flex flex-col sm:flex-row gap-4 p-4">
        {/* Image */}
        <div className="relative sm:w-32 sm:h-32 w-full h-48 sm:h-auto shrink-0">
          <img
            src={imageUrl}
            alt={business.name}
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute top-2 right-2 flex gap-1.5">
            <FavoriteButton businessId={business.id} />
            <CompareCheckbox businessId={business.id} />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <Link
                  href={`/business/${business.slug}`}
                  className="text-base font-bold text-slate-900 transition hover:text-yellow-600 dark:text-white dark:hover:text-yellow-400"
                  style={{fontFamily: "'Merriweather', serif"}}
                >
                  {business.name}
                </Link>
                {business.verified && (
                  <BadgeCheck className="h-4 w-4 shrink-0 text-yellow-500" />
                )}
              </div>

              <p className="text-xs font-medium text-slate-500 capitalize dark:text-slate-400">
                {business.primaryCategory.replace(/-/g, " ")}
              </p>
            </div>
          </div>

          <div className="mb-2 flex items-center gap-2">
            <RatingStars rating={business.rating} />
            <span className="text-sm font-bold text-slate-900 dark:text-white">{business.rating}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">({business.reviewCount} reviews)</span>
          </div>

          <div className="mb-2 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{business.address}, {business.city}</span>
          </div>

          <div className="mb-3 flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 shrink-0" />
            <span className={`text-xs font-medium ${status.open ? "text-emerald-600 dark:text-emerald-400" : "text-slate-500 dark:text-slate-400"}`}>
              {status.label}
            </span>
          </div>

          <p className="mb-3 text-sm text-slate-600 line-clamp-2 dark:text-slate-400">
            {business.description}
          </p>

          <div className="mb-3 flex flex-wrap gap-1.5">
            {business.services.slice(0, 3).map((s) => (
              <span key={s} className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300">{s}</span>
            ))}
            {business.services.length > 3 && (
              <span className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400">+{business.services.length - 3}</span>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5 mb-3">
            {business.emergencyService && (
              <span className="badge-warning">
                <AlertTriangle className="h-3 w-3" /> 24/7
              </span>
            )}
            {business.badges.map((b) => (
              <span key={b} className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">{b}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-2 border-t border-slate-200 pt-4 dark:border-slate-700">
        <a
          href={`tel:${business.phone}`}
          className="btn-primary py-2 px-4 text-xs rounded-lg font-semibold"
        >
          <Phone className="h-3.5 w-3.5" /> Call
        </a>
        {business.quoteEnabled && (
          <Link
            href={`/quote?business=${business.slug}`}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300"
          >
            <FileText className="h-3.5 w-3.5" /> Quote
          </Link>
        )}
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address + ", " + business.city)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 text-slate-600 px-3 py-2 text-xs font-medium transition hover:border-yellow-400 hover:text-yellow-600 dark:border-slate-600 dark:text-slate-400 dark:hover:border-yellow-400 dark:hover:text-yellow-400"
        >
          <MapPin className="h-3.5 w-3.5" /> Map
        </a>
      </div>
    </article>
  );
}
