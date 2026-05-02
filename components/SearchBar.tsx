"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin } from "lucide-react";

interface SearchBarProps {
  large?: boolean;
  defaultKeyword?: string;
  defaultLocation?: string;
}

export function SearchBar({ large, defaultKeyword = "", defaultLocation = "" }: SearchBarProps) {
  const router = useRouter();
  const [keyword, setKeyword] = useState(defaultKeyword);
  const [location, setLocation] = useState(defaultLocation);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword) params.set("keyword", keyword);
    if (location) params.set("location", location);
    router.push(`/search?${params.toString()}`);
  };

  if (large) {
    return (
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col sm:flex-row gap-3 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="What are you looking for?"
              className="w-full rounded-lg border border-slate-300 bg-white py-3.5 pl-12 pr-4 text-base text-slate-900 placeholder-slate-400 shadow-sm transition focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
              aria-label="Search activity, business name, or service"
            />
          </div>
          <div className="relative flex-1">
            <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Where? (city or postal code)"
              className="w-full rounded-lg border border-slate-300 bg-white py-3.5 pl-12 pr-4 text-base text-slate-900 placeholder-slate-400 shadow-sm transition focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
              aria-label="Search location"
            />
          </div>
          <button type="submit" className="btn-primary rounded-lg px-8 py-3.5 text-base font-bold">
            <Search className="h-5 w-5" />
            Search
          </button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search…"
          className="input-field py-2 pl-9 rounded-lg"
          aria-label="Search"
        />
      </div>
      <div className="relative hidden sm:block flex-1">
        <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="City…"
          className="input-field py-2 pl-9 rounded-lg"
          aria-label="Location"
        />
      </div>
      <button type="submit" className="btn-primary py-2 px-4 rounded-lg">
        <Search className="h-4 w-4" />
      </button>
    </form>
  );
}
