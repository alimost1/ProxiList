import { Business, SearchState, OpenStatus, Category, Review } from "./types";
import { businesses, categories, reviews } from "./seed";

export function getOpenStatus(hours: Business["hours"], now?: Date): OpenStatus {
  const d = now || new Date();
  const day = d.getDay();
  const time = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  const todayHours = hours.find((h) => h.day === day);

  if (!todayHours || todayHours.closed) {
    const nextOpen = hours.find((h) => h.day > day && !h.closed) || hours.find((h) => !h.closed);
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return {
      open: false,
      label: nextOpen ? `Opens ${dayNames[nextOpen.day]} at ${nextOpen.open}` : "Closed",
    };
  }

  if (time >= todayHours.open && time < todayHours.close) {
    return { open: true, label: `Open · Closes at ${todayHours.close}` };
  }

  if (time < todayHours.open) {
    return { open: false, label: `Opens at ${todayHours.open}` };
  }

  const nextDay = hours.find((h) => h.day > day && !h.closed) || hours.find((h) => !h.closed);
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return {
    open: false,
    label: nextDay ? `Opens ${dayNames[nextDay.day]} at ${nextDay.open}` : "Closed",
  };
}

function matchesKeyword(biz: Business, keyword: string): boolean {
  if (!keyword) return true;
  const kw = keyword.toLowerCase();
  const cat = categories.find((c) => c.slug === biz.primaryCategory);
  const synonyms = cat?.synonyms?.join(" ") || "";
  const searchable = [
    biz.name, biz.primaryCategory, biz.description,
    ...biz.secondaryCategories, ...biz.services,
    cat?.label || "", synonyms,
  ].join(" ").toLowerCase();
  return kw.split(/\s+/).every((word) => searchable.includes(word));
}

function matchesLocation(biz: Business, location: string): boolean {
  if (!location) return true;
  const loc = location.toLowerCase();
  return (
    biz.city.toLowerCase().includes(loc) ||
    biz.region.toLowerCase().includes(loc) ||
    biz.postalCode.includes(loc)
  );
}

export function searchBusinesses(state: SearchState): { results: Business[]; total: number } {
  let filtered = businesses.filter((biz) => {
    if (!matchesKeyword(biz, state.keyword)) return false;
    if (!matchesLocation(biz, state.location)) return false;

    const f = state.filters;
    if (f.openNow && !getOpenStatus(biz.hours).open) return false;
    if (f.minRating && biz.rating < f.minRating) return false;
    if (f.categories?.length && !f.categories.includes(biz.primaryCategory)) return false;
    if (f.services?.length && !f.services.some((s) => biz.services.includes(s))) return false;
    if (f.accessibility?.length && !f.accessibility.some((a) => biz.accessibility.includes(a))) return false;
    if (f.paymentMethods?.length && !f.paymentMethods.some((p) => biz.paymentMethods.includes(p))) return false;
    if (f.appointmentAvailable && !biz.appointmentEnabled) return false;
    return true;
  });

  switch (state.sort) {
    case "best-rated":
      filtered.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
      break;
    case "most-reviewed":
      filtered.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
    case "nearest":
      if (state.coordinates) {
        const { lat, lng } = state.coordinates;
        filtered.sort((a, b) => {
          const da = Math.hypot(a.geo.lat - lat, a.geo.lng - lng);
          const db = Math.hypot(b.geo.lat - lat, b.geo.lng - lng);
          return da - db;
        });
      }
      break;
    default:
      filtered.sort((a, b) => {
        const aExact = a.name.toLowerCase().includes(state.keyword.toLowerCase()) ? 1 : 0;
        const bExact = b.name.toLowerCase().includes(state.keyword.toLowerCase()) ? 1 : 0;
        if (bExact !== aExact) return bExact - aExact;
        return b.rating * b.reviewCount - a.rating * a.reviewCount;
      });
  }

  const pageSize = 10;
  const start = (state.page - 1) * pageSize;
  return {
    results: filtered.slice(start, start + pageSize),
    total: filtered.length,
  };
}

export function getBusinessBySlug(slug: string): Business | undefined {
  return businesses.find((b) => b.slug === slug);
}

export function getBusinessesByCategory(categorySlug: string, city?: string): Business[] {
  return businesses.filter(
    (b) => b.primaryCategory === categorySlug && (!city || b.city.toLowerCase() === city.toLowerCase())
  );
}

export function getRelatedBusinesses(business: Business, limit = 4): Business[] {
  return businesses
    .filter((b) => b.id !== business.id && b.primaryCategory === business.primaryCategory)
    .sort((a, b) => {
      const sameCity = (a.city === business.city ? 1 : 0) - (b.city === business.city ? 1 : 0);
      if (sameCity !== 0) return -sameCity;
      return b.rating - a.rating;
    })
    .slice(0, limit);
}

export function getReviewsForBusiness(businessId: string): Review[] {
  return reviews.filter((r) => r.businessId === businessId);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getAllCities(): string[] {
  return Array.from(new Set(businesses.map((b) => b.city)));
}

export function getAllServices(): string[] {
  return Array.from(new Set(businesses.flatMap((b) => b.services)));
}

export function getPopularCategories(): Category[] {
  return categories.filter((c) => c.popular);
}

export function autocompleteBusiness(query: string): Business[] {
  if (!query || query.length < 2) return [];
  const q = query.toLowerCase();
  return businesses.filter((b) => b.name.toLowerCase().includes(q)).slice(0, 5);
}

export function autocompleteCity(query: string): string[] {
  if (!query || query.length < 2) return [];
  const q = query.toLowerCase();
  return getAllCities().filter((c) => c.toLowerCase().includes(q));
}
