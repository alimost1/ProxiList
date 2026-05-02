"use client";
import React from "react";
import Link from "next/link";
import { GitCompareArrows, X, Search } from "lucide-react";
import { useCompare } from "@/hooks/useCompare";
import { businesses } from "@/lib/seed";
import { getOpenStatus, getReviewsForBusiness } from "@/lib/search";
import { RatingStars } from "@/components/RatingStars";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { EmptyState } from "@/components/EmptyState";

export default function ComparePage() {
  const { compareIds, toggleCompare, clearAll } = useCompare();
  const compared = businesses.filter((b) => compareIds.includes(b.id));

  if (compared.length === 0) {
    return (
      <div className="bg-slate-50 min-h-screen dark:bg-slate-950">
        <div className="container-page pb-12">
          <Breadcrumbs items={[{ label: "Compare" }]} />
          <EmptyState
            icon={<GitCompareArrows className="h-16 w-16" />}
            title="Nothing to compare"
            description="Select up to 3 businesses from search results to compare them side by side."
            action={
              <Link href="/search" className="btn-primary">
                <Search className="h-4 w-4" /> Search businesses
              </Link>
            }
          />
        </div>
      </div>
    );
  }

  const rows: { label: string; render: (b: typeof compared[0]) => React.ReactNode }[] = [
    { label: "Rating", render: (b) => <div className="flex items-center gap-2"><RatingStars rating={b.rating} /><span className="font-semibold">{b.rating}</span></div> },
    { label: "Reviews", render: (b) => <span>{b.reviewCount} reviews</span> },
    { label: "Price range", render: (b) => <span className="font-semibold">{b.priceRange}</span> },
    { label: "Category", render: (b) => <span className="capitalize">{b.primaryCategory.replace(/-/g, " ")}</span> },
    { label: "City", render: (b) => <span>{b.city}</span> },
    { label: "Status", render: (b) => { const s = getOpenStatus(b.hours); return <span className={s.open ? "text-emerald-600" : "text-slate-500"}>{s.label}</span>; } },
    { label: "Services", render: (b) => <div className="flex flex-wrap gap-1">{b.services.slice(0, 3).map((s) => <span key={s} className="badge-neutral">{s}</span>)}</div> },
    { label: "Phone", render: (b) => <a href={`tel:${b.phone}`} className="text-primary-600 hover:underline">{b.phone}</a> },
    { label: "Quote", render: (b) => b.quoteEnabled ? <Link href={`/quote?business=${b.slug}`} className="text-primary-600 hover:underline">Request quote</Link> : <span className="text-slate-400">N/A</span> },
    { label: "Verified", render: (b) => b.verified ? <span className="text-emerald-600 font-medium">Yes</span> : <span className="text-slate-400">No</span> },
  ];

  return (
    <div className="bg-slate-50 min-h-screen dark:bg-slate-950">
      <div className="container-page pb-12">
        <Breadcrumbs items={[{ label: "Compare" }]} />
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Compare Businesses</h1>
          <button onClick={clearAll} className="text-sm text-red-500 hover:underline">Clear all</button>
        </div>

        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700">
                <th className="p-4 text-left text-xs font-medium text-slate-500 w-32">Feature</th>
                {compared.map((biz) => (
                  <th key={biz.id} className="p-4 text-left min-w-[200px]">
                    <div className="flex items-center justify-between">
                      <Link href={`/business/${biz.slug}`} className="font-semibold text-slate-900 hover:text-primary-600 dark:text-white dark:hover:text-primary-400">
                        {biz.name}
                      </Link>
                      <button onClick={() => toggleCompare(biz.id)} className="text-slate-400 hover:text-red-500 p-1">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-b border-slate-50 dark:border-slate-800">
                  <td className="p-4 text-xs font-medium text-slate-500 dark:text-slate-400">{row.label}</td>
                  {compared.map((biz) => (
                    <td key={biz.id} className="p-4 text-slate-700 dark:text-slate-300">
                      {row.render(biz)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
