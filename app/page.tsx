"use client";
import React from "react";
import Link from "next/link";
import { TrendingUp, Users, RefreshCw, Building2 } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import { CategoryChips } from "@/components/CategoryChips";
import { getPopularCategories } from "@/lib/search";
import { businesses } from "@/lib/seed";

const trendingSearches = [
  { keyword: "Plumber", location: "Casablanca" },
  { keyword: "Dentist", location: "Rabat" },
  { keyword: "Restaurant", location: "Marrakech" },
  { keyword: "Electrician", location: "Casablanca" },
  { keyword: "Hotel", location: "Agadir" },
  { keyword: "Locksmith", location: "Tangier" },
  { keyword: "Doctor", location: "Casablanca" },
  { keyword: "Beauty Salon", location: "Rabat" },
];

const featuredCategories = [
  { slug: "plumber", city: "casablanca", label: "Plumbers in Casablanca", image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&h=400&fit=crop&q=80" },
  { slug: "restaurant", city: "marrakech", label: "Restaurants in Marrakech", image: "https://images.unsplash.com/photo-1504674900967-a8ff65e26a30?w=600&h=400&fit=crop&q=80" },
  { slug: "doctor", city: "rabat", label: "Doctors in Rabat", image: "https://images.unsplash.com/photo-1631217b76e7-59b4e0b92e2b?w=600&h=400&fit=crop&q=80" },
  { slug: "hotel", city: "agadir", label: "Hotels in Agadir", image: "https://images.unsplash.com/photo-1631049307038-da0ec36d9ec1?w=600&h=400&fit=crop&q=80" },
];

export default function HomePage() {
  const popularCats = getPopularCategories();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(250,204,21,0.1)_0%,_transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400 rounded-full mix-blend-overlay opacity-5 blur-3xl" />
        {/* Background pattern images */}
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80"
            alt="Hero background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container-page relative py-20 sm:py-32 text-center">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-4" style={{fontFamily: "'Merriweather', serif"}}>
            Find trusted <span className="text-yellow-400">local professionals</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300 dark:text-slate-400 font-light">
            Search thousands of verified businesses across Morocco. Compare ratings, read reviews, and connect instantly.
          </p>
          <div className="mx-auto mt-10 max-w-3xl">
            <SearchBar large />
          </div>
        </div>
      </section>

      {/* Category Chips */}
      <section className="border-b border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="container-page py-8">
          <h2 className="mb-4 text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-widest">Popular Categories</h2>
          <CategoryChips items={popularCats} />
        </div>
      </section>

      {/* Trending Searches */}
      <section className="bg-slate-50 dark:bg-slate-900">
        <div className="container-page py-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-slate-900 dark:text-white" style={{fontFamily: "'Merriweather', serif"}}>
            <TrendingUp className="h-6 w-6 text-yellow-400" /> Trending Searches
          </h2>
          <div className="flex flex-wrap gap-2">
            {trendingSearches.map((s) => (
              <Link
                key={s.keyword + s.location}
                href={`/search?keyword=${encodeURIComponent(s.keyword)}&location=${encodeURIComponent(s.location)}`}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-yellow-400 hover:bg-yellow-50 hover:text-slate-900 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-yellow-400 dark:hover:bg-yellow-400/10 dark:hover:text-yellow-400"
              >
                {s.keyword} in {s.location}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Metrics */}
      <section className="bg-white dark:bg-slate-950">
        <div className="container-page py-14">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="card p-8 text-center hover:border-yellow-400 group">
              <div className="mx-auto h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-400/10 flex items-center justify-center mb-4 group-hover:bg-yellow-200 dark:group-hover:bg-yellow-400/20 transition">
                <Users className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">50K+</div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Local profiles</p>
            </div>
            <div className="card p-8 text-center hover:border-yellow-400 group">
              <div className="mx-auto h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-400/10 flex items-center justify-center mb-4 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-400/20 transition">
                <RefreshCw className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="text-xl font-bold text-slate-900 dark:text-white">Updated daily</div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Always accurate</p>
            </div>
            <div className="card p-8 text-center hover:border-yellow-400 group">
              <div className="mx-auto h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-400/10 flex items-center justify-center mb-4 group-hover:bg-amber-200 dark:group-hover:bg-amber-400/20 transition">
                <Building2 className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white">{businesses.length}</div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Businesses listed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="bg-slate-50 dark:bg-slate-900">
        <div className="container-page py-14">
          <h2 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white" style={{fontFamily: "'Merriweather', serif"}}>Featured Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCategories.map((fc) => (
              <Link
                key={fc.slug + fc.city}
                href={`/categories/${fc.slug}/${fc.city}`}
                className="group overflow-hidden rounded-lg transition hover:shadow-xl"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={fc.image}
                    alt={fc.label}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-yellow-400 transition">
                      {fc.label}
                    </h3>
                    <p className="text-sm text-slate-200">
                      Browse top-rated professionals →
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
