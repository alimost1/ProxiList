import React from "react";
import { MapPin } from "lucide-react";
import { Business } from "@/lib/types";

interface MapPanelProps {
  businesses: Business[];
  className?: string;
}

export function MapPanel({ businesses, className = "" }: MapPanelProps) {
  return (
    <div className={`card overflow-hidden ${className}`}>
      <div className="relative flex h-full min-h-[300px] flex-col items-center justify-center bg-slate-100 dark:bg-slate-800">
        {/* Decorative grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{
            backgroundImage: "linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }} />
        </div>

        <div className="relative flex flex-col items-center gap-3 p-6 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
            <MapPin className="h-7 w-7" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Map View
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {businesses.length} {businesses.length === 1 ? "business" : "businesses"} in this area
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-1.5 mt-2">
            {businesses.slice(0, 5).map((biz) => (
              <span
                key={biz.id}
                className="badge-primary"
              >
                <MapPin className="h-3 w-3" />
                {biz.name.length > 15 ? biz.name.slice(0, 15) + "…" : biz.name}
              </span>
            ))}
            {businesses.length > 5 && (
              <span className="badge-neutral">+{businesses.length - 5} more</span>
            )}
          </div>
          <p className="mt-2 text-[10px] text-slate-400 dark:text-slate-500">
            Interactive map coming soon
          </p>
        </div>
      </div>
    </div>
  );
}
