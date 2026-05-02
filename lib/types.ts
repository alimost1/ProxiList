export type Business = {
  id: string;
  slug: string;
  name: string;
  primaryCategory: string;
  secondaryCategories: string[];
  description: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  city: string;
  region: string;
  postalCode: string;
  geo: { lat: number; lng: number };
  rating: number;
  reviewCount: number;
  hours: Array<{ day: number; open: string; close: string; closed?: boolean }>;
  services: string[];
  badges: string[];
  photos: string[];
  paymentMethods: string[];
  accessibility: string[];
  priceRange: "$" | "$$" | "$$$" | "$$$$";
  languages: string[];
  certifications: string[];
  verified: boolean;
  appointmentEnabled: boolean;
  quoteEnabled: boolean;
  messagingEnabled: boolean;
  emergencyService: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Review = {
  id: string;
  businessId: string;
  authorName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verifiedVisit: boolean;
};

export type Category = {
  id: string;
  slug: string;
  label: string;
  icon: string;
  popular: boolean;
  synonyms: string[];
};

export type SearchState = {
  keyword: string;
  location: string;
  coordinates?: { lat: number; lng: number };
  filters: {
    openNow?: boolean;
    minRating?: number;
    maxDistanceKm?: number;
    categories?: string[];
    services?: string[];
    accessibility?: string[];
    paymentMethods?: string[];
    appointmentAvailable?: boolean;
  };
  sort: "relevance" | "best-rated" | "nearest" | "most-reviewed";
  page: number;
};

export type OpenStatus = {
  open: boolean;
  label: string;
};
