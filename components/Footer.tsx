import React from "react";
import Link from "next/link";
import { categories } from "@/lib/seed";
import { getAllCities } from "@/lib/search";

export function Footer() {
  const cities = getAllCities();
  const topCategories = categories.slice(0, 10);

  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="container-page py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white font-bold text-sm">P</div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">ProxiList</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Find trusted local professionals fast. Your go-to directory for businesses and services across Morocco.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">Popular Categories</h3>
            <ul className="space-y-1.5">
              {topCategories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/categories/${cat.slug}/casablanca`}
                    className="text-sm text-slate-500 transition hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">Cities</h3>
            <ul className="space-y-1.5">
              {cities.map((city) => (
                <li key={city}>
                  <Link
                    href={`/search?location=${encodeURIComponent(city)}`}
                    className="text-sm text-slate-500 transition hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400"
                  >
                    {city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">ProxiList</h3>
            <ul className="space-y-1.5">
              <li><Link href="/" className="text-sm text-slate-500 transition hover:text-primary-600 dark:text-slate-400">Home</Link></li>
              <li><Link href="/saved" className="text-sm text-slate-500 transition hover:text-primary-600 dark:text-slate-400">Saved Businesses</Link></li>
              <li><Link href="/compare" className="text-sm text-slate-500 transition hover:text-primary-600 dark:text-slate-400">Compare</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 dark:border-slate-800">
          <p className="text-center text-xs text-slate-400 dark:text-slate-500">
            © {new Date().getFullYear()} ProxiList. All rights reserved. Find trusted local professionals fast.
          </p>
        </div>
      </div>
    </footer>
  );
}
