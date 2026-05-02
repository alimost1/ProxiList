"use client";
import React, { useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FilterSidebar } from "@/components/FilterSidebar";
import { ResultCard } from "@/components/ResultCard";
import { MapPanel } from "@/components/MapPanel";
import { EmptyState } from "@/components/EmptyState";
import { SearchBar } from "@/components/SearchBar";
import { searchBusinesses } from "@/lib/search";
import { SearchState } from "@/lib/types";
import { ArrowUpDown } from "lucide-react";

function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const keyword = searchParams.get("keyword") || "";
  const location = searchParams.get("location") || "";
  const sort = (searchParams.get("sort") as SearchState["sort"]) || "relevance";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const state: SearchState = useMemo(
    () => ({
      keyword,
      location,
      filters: {
        openNow: searchParams.get("openNow") === "true",
        minRating: searchParams.get("minRating") ? parseFloat(searchParams.get("minRating")!) : undefined,
        categories: searchParams.get("categories")?.split(",").filter(Boolean) || undefined,
        appointmentAvailable: searchParams.get("appointment") === "true" || undefined,
      },
      sort,
      page,
    }),
    [keyword, location, sort, page, searchParams]
  );

  const { results, total } = useMemo(() => searchBusinesses(state), [state]);

  const updateSort = (newSort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", newSort);
    params.set("page", "1");
    router.push(`/search?${params.toString()}`);
  };

  const goToPage = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(p));
    router.push(`/search?${params.toString()}`);
  };

  const totalPages = Math.ceil(total / 10);
  const breadcrumbLabel = keyword ? `${keyword}${location ? ` in ${location}` : ""}` : "All businesses";

  return (
    <div className="bg-slate-50 min-h-screen dark:bg-slate-950">
      <div className="container-page">
        <Breadcrumbs
          items={[
            { label: "Search", href: "/search" },
            { label: breadcrumbLabel },
          ]}
        />

        {/* Mobile search bar */}
        <div className="mb-4 lg:hidden">
          <SearchBar defaultKeyword={keyword} defaultLocation={location} />
        </div>

        <div className="flex gap-6 pb-10">
          {/* Filter sidebar - desktop */}
          <div className="hidden lg:block w-[280px] shrink-0">
            <div className="sticky top-20">
              <FilterSidebar />
            </div>
          </div>

          {/* Results */}
          <div className="flex-1 min-w-0">
            {/* Sort bar */}
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-slate-700 dark:text-slate-300">{total}</span> results found
              </p>
              <div className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4 text-slate-400" />
                <select
                  value={sort}
                  onChange={(e) => updateSort(e.target.value)}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                >
                  <option value="relevance">Relevance</option>
                  <option value="best-rated">Best rated</option>
                  <option value="nearest">Nearest</option>
                  <option value="most-reviewed">Most reviewed</option>
                </select>
              </div>
            </div>

            {results.length > 0 ? (
              <div className="space-y-4">
                {results.map((biz) => (
                  <ResultCard key={biz.id} business={biz} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No results found"
                description="Try broadening your search or removing some filters to see more businesses."
                action={
                  <button onClick={() => router.push("/search")} className="btn-primary">
                    Clear all filters
                  </button>
                }
              />
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => goToPage(p)}
                    className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-medium transition ${
                      p === page
                        ? "bg-primary-600 text-white"
                        : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Map panel - desktop */}
          <div className="hidden xl:block w-[360px] shrink-0">
            <div className="sticky top-20">
              <MapPanel businesses={results} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8 flex justify-center text-slate-500">Loading search results...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
