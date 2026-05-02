import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { businesses } from "@/lib/seed";
import { getBusinessBySlug, getReviewsForBusiness } from "@/lib/search";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BusinessHeader } from "@/components/BusinessHeader";
import { QuickActionBar } from "@/components/QuickActionBar";
import { HoursTable } from "@/components/HoursTable";
import { ReviewList } from "@/components/ReviewList";
import { ReviewsBreakdown } from "@/components/ReviewsBreakdown";
import { SimilarBusinesses } from "@/components/SimilarBusinesses";
import { MapPanel } from "@/components/MapPanel";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Phone, Globe, CreditCard, Accessibility, Languages, Award, DollarSign } from "lucide-react";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return businesses.map((b) => ({ slug: b.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const biz = getBusinessBySlug(params.slug);
  if (!biz) return { title: "Business Not Found" };
  return {
    title: `${biz.name} — ${biz.primaryCategory.replace(/-/g, " ")} in ${biz.city}`,
    description: `${biz.description} Rated ${biz.rating}/5 based on ${biz.reviewCount} reviews. ${biz.address}, ${biz.city}.`,
  };
}

export default function BusinessDetailPage({ params }: Props) {
  const business = getBusinessBySlug(params.slug);
  if (!business) notFound();

  const reviews = getReviewsForBusiness(business.id);

  return (
    <div className="bg-slate-50 min-h-screen dark:bg-slate-950">
      <div className="container-page pb-12">
        <Breadcrumbs
          items={[
            { label: "Businesses", href: "/search" },
            { label: business.name },
          ]}
        />

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left column */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* Header */}
            <div className="card p-6">
              <div className="flex items-start justify-between">
                <BusinessHeader business={business} />
                <FavoriteButton businessId={business.id} />
              </div>
              <div className="mt-4">
                <QuickActionBar business={business} />
              </div>
            </div>

            {/* Overview */}
            <div className="card p-6">
              <h2 className="section-heading mb-3">Overview</h2>
              <p className="text-sm text-slate-600 leading-relaxed dark:text-slate-400">
                {business.description}
              </p>
            </div>

            {/* Services */}
            <div className="card p-6">
              <h2 className="section-heading mb-3">Services</h2>
              <div className="flex flex-wrap gap-2">
                {business.services.map((s) => (
                  <span key={s} className="rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-700 dark:bg-slate-700 dark:text-slate-300">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Photos placeholder */}
            <div className="card p-6">
              <h2 className="section-heading mb-3">Photos</h2>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="aspect-video rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-300 dark:text-slate-500 text-sm">
                    Photo {i}
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="card p-6">
              <h2 className="section-heading mb-4">Customer Reviews</h2>
              <ReviewsBreakdown reviews={reviews} />
              <div className="mt-6">
                <ReviewList reviews={reviews} />
              </div>
            </div>

            {/* Similar */}
            <div className="card p-6">
              <SimilarBusinesses business={business} />
            </div>
          </div>

          {/* Right column */}
          <div className="w-full lg:w-[340px] shrink-0 space-y-4">
            <div className="lg:sticky lg:top-20 space-y-4">
              {/* Hours */}
              <div className="card p-5">
                <h3 className="text-sm font-semibold text-slate-900 mb-3 dark:text-white">Opening Hours</h3>
                <HoursTable hours={business.hours} />
              </div>

              {/* Practical info */}
              <div className="card p-5 space-y-3">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Practical Info</h3>
                <InfoRow icon={<Phone className="h-4 w-4" />} label="Phone" value={business.phone} href={`tel:${business.phone}`} />
                <InfoRow icon={<Globe className="h-4 w-4" />} label="Website" value="Visit website" href={business.website} />
                <InfoRow icon={<DollarSign className="h-4 w-4" />} label="Price range" value={business.priceRange} />
                <InfoRow icon={<CreditCard className="h-4 w-4" />} label="Payment" value={business.paymentMethods.join(", ")} />
                {business.accessibility.length > 0 && (
                  <InfoRow icon={<Accessibility className="h-4 w-4" />} label="Accessibility" value={business.accessibility.join(", ")} />
                )}
                <InfoRow icon={<Languages className="h-4 w-4" />} label="Languages" value={business.languages.join(", ")} />
                {business.certifications.length > 0 && (
                  <InfoRow icon={<Award className="h-4 w-4" />} label="Certifications" value={business.certifications.join(", ")} />
                )}
              </div>

              {/* Mini map */}
              <MapPanel businesses={[business]} className="h-[200px]" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky bottom bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 border-t border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900 z-40">
        <div className="flex gap-2">
          <a href={`tel:${business.phone}`} className="btn-primary flex-1 py-3 rounded-xl">
            <Phone className="h-4 w-4" /> Call
          </a>
          {business.quoteEnabled && (
            <a href={`/quote?business=${business.slug}`} className="btn-secondary flex-1 py-3 rounded-xl">
              Get Quote
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  return (
    <div className="flex items-start gap-3 text-sm">
      <span className="text-slate-400 mt-0.5 shrink-0">{icon}</span>
      <div>
        <span className="text-slate-500 dark:text-slate-400">{label}</span>
        <div className="mt-0.5">
          {href ? (
            <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="font-medium text-primary-600 hover:underline dark:text-primary-400">
              {value}
            </a>
          ) : (
            <span className="font-medium text-slate-700 dark:text-slate-300">{value}</span>
          )}
        </div>
      </div>
    </div>
  );
}
