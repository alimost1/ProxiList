import { Category } from "./types";

export const categories: Category[] = [
  { id: "cat-01", slug: "plumber", label: "Plumbers", icon: "Wrench", popular: true, synonyms: ["plumbing", "pipes", "water heater", "drain"] },
  { id: "cat-02", slug: "electrician", label: "Electricians", icon: "Zap", popular: true, synonyms: ["electrical", "wiring", "power", "circuit"] },
  { id: "cat-03", slug: "restaurant", label: "Restaurants", icon: "UtensilsCrossed", popular: true, synonyms: ["dining", "food", "eat", "cuisine"] },
  { id: "cat-04", slug: "dentist", label: "Dentists", icon: "Smile", popular: true, synonyms: ["dental", "teeth", "orthodontist", "oral"] },
  { id: "cat-05", slug: "doctor", label: "Doctors", icon: "Stethoscope", popular: true, synonyms: ["physician", "medical", "clinic", "healthcare"] },
  { id: "cat-06", slug: "hotel", label: "Hotels", icon: "BedDouble", popular: true, synonyms: ["accommodation", "lodging", "stay", "resort"] },
  { id: "cat-07", slug: "pharmacy", label: "Pharmacies", icon: "Pill", popular: true, synonyms: ["drugstore", "medication", "prescriptions"] },
  { id: "cat-08", slug: "garage", label: "Garages", icon: "Car", popular: true, synonyms: ["auto repair", "mechanic", "car service", "vehicle"] },
  { id: "cat-09", slug: "locksmith", label: "Locksmiths", icon: "KeyRound", popular: false, synonyms: ["locks", "keys", "security", "door"] },
  { id: "cat-10", slug: "lawyer", label: "Lawyers", icon: "Scale", popular: false, synonyms: ["attorney", "legal", "law firm", "counsel"] },
  { id: "cat-11", slug: "accountant", label: "Accountants", icon: "Calculator", popular: false, synonyms: ["accounting", "tax", "bookkeeping", "CPA"] },
  { id: "cat-12", slug: "real-estate", label: "Real Estate Agencies", icon: "Home", popular: false, synonyms: ["property", "housing", "realtor", "apartment"] },
  { id: "cat-13", slug: "cleaning", label: "Cleaning Services", icon: "SprayCan", popular: false, synonyms: ["maid", "housekeeping", "janitorial", "sanitation"] },
  { id: "cat-14", slug: "beauty-salon", label: "Beauty Salons", icon: "Scissors", popular: false, synonyms: ["hair", "spa", "nails", "cosmetics"] },
  { id: "cat-15", slug: "veterinarian", label: "Veterinarians", icon: "PawPrint", popular: false, synonyms: ["vet", "animal", "pet care", "pet clinic"] },
  { id: "cat-16", slug: "moving", label: "Moving Services", icon: "Truck", popular: false, synonyms: ["movers", "relocation", "transport", "hauling"] },
  { id: "cat-17", slug: "security", label: "Security Systems", icon: "Shield", popular: false, synonyms: ["alarm", "surveillance", "CCTV", "monitoring"] },
  { id: "cat-18", slug: "it-support", label: "IT Support", icon: "Monitor", popular: false, synonyms: ["tech support", "computer", "network", "software"] },
  { id: "cat-19", slug: "travel-agency", label: "Travel Agencies", icon: "Plane", popular: false, synonyms: ["travel", "vacation", "tours", "booking"] },
  { id: "cat-20", slug: "event-planner", label: "Event Planners", icon: "PartyPopper", popular: false, synonyms: ["events", "wedding", "party", "conference"] },
];
