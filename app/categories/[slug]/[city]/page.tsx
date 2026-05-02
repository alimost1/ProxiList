import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { categories, businesses } from "@/lib/seed";
import { getCategoryBySlug, getBusinessesByCategory, getAllCities } from "@/lib/search";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ResultCard } from "@/components/ResultCard";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Props = { params: { slug: string; city: string } };

export function generateStaticParams() {
  const cities = getAllCities();
  const params: { slug: string; city: string }[] = [];
  categories.forEach((cat) => {
    cities.forEach((city) => {
      params.push({ slug: cat.slug, city: city.toLowerCase() });
    });
  });
  return params;
}

export function generateMetadata({ params }: Props): Metadata {
  const cat = getCategoryBySlug(params.slug);
  const city = params.city.charAt(0).toUpperCase() + params.city.slice(1);
  if (!cat) return { title: "Category Not Found" };
  return {
    title: `${cat.label} in ${city} — Find the Best ${cat.label}`,
    description: `Find the best ${cat.label.toLowerCase()} in ${city}. Compare ratings, read reviews, and connect with top-rated professionals. Updated daily on ProxiList.`,
  };
}

export default function CategoryLandingPage({ params }: Props) {
  const category = getCategoryBySlug(params.slug);
  const cityDisplay = params.city.charAt(0).toUpperCase() + params.city.slice(1);

  if (!category) notFound();

  const bizList = getBusinessesByCategory(params.slug, cityDisplay).sort((a, b) => b.rating - a.rating);
  const featured = bizList.slice(0, 6);
  const cities = getAllCities().filter((c) => c.toLowerCase() !== params.city);
  const relatedCats = categories.filter((c) => c.slug !== params.slug).slice(0, 6);

  // Collect sub-services from businesses in this category
  const subServices = Array.from(new Set(bizList.flatMap((b) => b.services))).slice(0, 10);

  const faqs = [
    { q: `How do I choose the best ${category.label.toLowerCase()} in ${cityDisplay}?`, a: `Compare ratings, read customer reviews, and check verified badges on ProxiList. Look for professionals with high ratings and a good number of reviews to ensure quality service.` },
    { q: `How much do ${category.label.toLowerCase()} typically cost in ${cityDisplay}?`, a: `Prices vary depending on the specific service needed. Check the price range indicator on each business listing for a general idea, and request a free quote for accurate pricing.` },
    { q: `Are the ${category.label.toLowerCase()} on ProxiList verified?`, a: `Many businesses on ProxiList carry a Verified badge, meaning their information has been confirmed. Look for the blue checkmark on listings.` },
    { q: `Can I book an appointment directly through ProxiList?`, a: `Yes! Many businesses offer online appointment booking. Look for the "Book" button on listings that have this feature enabled.` },
    { q: `What should I do in an emergency requiring a ${category.label.toLowerCase().slice(0, -1)}?`, a: `Filter your search for businesses with "Emergency Service" badges. These professionals offer 24/7 or extended-hour emergency responses.` },
  ];

  return (
    <div className="bg-slate-50 min-h-screen dark:bg-slate-950">
      <div className="container-page pb-12">
        <Breadcrumbs
          items={[
            { label: "Categories", href: "/search" },
            { label: `${category.label} in ${cityDisplay}` },
          ]}
        />

        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white mb-2">
          {category.label} in {cityDisplay}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-2xl">
          Find the best {category.label.toLowerCase()} in {cityDisplay}. Browse {bizList.length} listings,
          compare ratings from verified customers, and connect with trusted professionals near you.
        </p>

        {/* Sub-services chips */}
        {subServices.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {subServices.map((s) => (
              <Link
                key={s}
                href={`/search?keyword=${encodeURIComponent(s)}&location=${encodeURIComponent(cityDisplay)}`}
                className="badge-neutral hover:bg-slate-200 transition dark:hover:bg-slate-600"
              >
                {s}
              </Link>
            ))}
          </div>
        )}

        {/* Featured businesses */}
        <section className="mb-10">
          <h2 className="section-heading mb-4">Top {category.label} in {cityDisplay}</h2>
          {featured.length > 0 ? (
            <div className="space-y-4">
              {featured.map((biz) => (
                <ResultCard key={biz.id} business={biz} />
              ))}
            </div>
          ) : (
            <div className="card p-8 text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                No {category.label.toLowerCase()} found in {cityDisplay} yet.
              </p>
              <Link href={`/search?keyword=${encodeURIComponent(category.label)}`} className="btn-primary mt-4 inline-flex">
                Search all cities
              </Link>
            </div>
          )}
          {bizList.length > 6 && (
            <div className="mt-4 text-center">
              <Link
                href={`/search?keyword=${encodeURIComponent(category.label)}&location=${encodeURIComponent(cityDisplay)}`}
                className="btn-secondary"
              >
                View all {bizList.length} results <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </section>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="section-heading mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details key={i} className="card group">
                <summary className="flex cursor-pointer items-center justify-between p-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                  {faq.q}
                  <ChevronRight className="h-4 w-4 text-slate-400 transition group-open:rotate-90" />
                </summary>
                <div className="px-4 pb-4 text-sm text-slate-500 dark:text-slate-400">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Internal links */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">{category.label} in other cities</h3>
            <div className="flex flex-wrap gap-2">
              {cities.map((c) => (
                <Link key={c} href={`/categories/${params.slug}/${c.toLowerCase()}`} className="text-sm text-primary-600 hover:underline dark:text-primary-400">
                  {c}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">Related categories</h3>
            <div className="flex flex-wrap gap-2">
              {relatedCats.map((c) => (
                <Link key={c.id} href={`/categories/${c.slug}/${params.city}`} className="text-sm text-primary-600 hover:underline dark:text-primary-400">
                  {c.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
