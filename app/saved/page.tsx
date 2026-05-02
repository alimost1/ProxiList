"use client";
import React from "react";
import Link from "next/link";
import { Heart, Search } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { businesses } from "@/lib/seed";
import { ResultCard } from "@/components/ResultCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { EmptyState } from "@/components/EmptyState";

export default function SavedPage() {
  const { favorites } = useFavorites();
  const saved = businesses.filter((b) => favorites.includes(b.id));

  return (
    <div className="bg-slate-50 min-h-screen dark:bg-slate-950">
      <div className="container-page pb-12">
        <Breadcrumbs items={[{ label: "Saved" }]} />
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Saved Businesses</h1>

        {saved.length > 0 ? (
          <div className="space-y-4">
            {saved.map((biz) => (
              <ResultCard key={biz.id} business={biz} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<Heart className="h-16 w-16" />}
            title="No saved businesses yet"
            description="Start searching and tap the heart icon to save businesses you're interested in."
            action={
              <Link href="/" className="btn-primary">
                <Search className="h-4 w-4" /> Start searching
              </Link>
            }
          />
        )}
      </div>
    </div>
  );
}
