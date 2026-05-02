import { Business } from "./types";

const cities = [
  { name: "Casablanca", region: "Casablanca-Settat", lat: 33.5731, lng: -7.5898, codes: ["20000","20100","20200","20300","20400"] },
  { name: "Rabat", region: "Rabat-Salé-Kénitra", lat: 34.0209, lng: -6.8416, codes: ["10000","10100","10020"] },
  { name: "Marrakech", region: "Marrakech-Safi", lat: 31.6295, lng: -7.9811, codes: ["40000","40100","40020"] },
  { name: "Tangier", region: "Tanger-Tétouan-Al Hoceïma", lat: 35.7595, lng: -5.8340, codes: ["90000","90100"] },
  { name: "Agadir", region: "Souss-Massa", lat: 30.4278, lng: -9.5981, codes: ["80000","80100"] },
];

const catMap: Record<string, { names: string[]; services: string[]; descs: string[] }> = {
  plumber: {
    names: ["Atlas Plomberie","AquaFix Pro","Hassan Pipes & Co","Plomberie Moderne","RapidFlow Services"],
    services: ["Pipe repair","Drain cleaning","Water heater install","Leak detection","Bathroom renovation","Emergency plumbing"],
    descs: ["Expert plumbing services for residential and commercial properties.","Fast and reliable plumbing solutions with certified technicians.","Professional drain cleaning and pipe repair since 2005.","Complete plumbing services including emergency repairs 24/7.","Quality plumbing installations and maintenance at fair prices."]
  },
  electrician: {
    names: ["VoltaTech","ElectroPro Maroc","Lumière Électrique","PowerGrid Solutions","Spark Electric"],
    services: ["Wiring","Panel upgrades","Lighting install","Safety inspection","Smart home","Generator install"],
    descs: ["Licensed electricians providing safe and reliable electrical work.","Complete electrical solutions for homes and businesses.","Expert lighting design and electrical installations.","24/7 electrical emergency services with certified professionals.","Modern smart home wiring and electrical upgrades."]
  },
  restaurant: {
    names: ["Le Jardin Bleu","Dar Zellij","La Table du Marché","Riad Cuisine","Saveurs d'Orient"],
    services: ["Dine-in","Takeaway","Delivery","Catering","Private events","Terrace dining"],
    descs: ["Authentic Moroccan cuisine in an elegant setting.","Fine dining with locally sourced ingredients.","Traditional recipes with a modern twist.","Family-friendly restaurant with diverse menu options.","Award-winning culinary experience in the heart of the city."]
  },
  dentist: {
    names: ["DentaCare Clinic","Sourire Plus","Dr. Amrani Dental","Clinique Dentaire Royale","MedDent Center"],
    services: ["Teeth cleaning","Fillings","Root canal","Orthodontics","Teeth whitening","Implants"],
    descs: ["Modern dental care with the latest technology.","Comprehensive dental services for the whole family.","Expert orthodontic treatment and cosmetic dentistry.","Pain-free dental procedures in a comfortable environment.","Advanced dental implants and restorative care."]
  },
  doctor: {
    names: ["MedCenter Plus","Clinique Al Hayat","Dr. Benjelloun Cabinet","SantéPro Medical","Health First Clinic"],
    services: ["General checkup","Vaccinations","Blood tests","Chronic care","Pediatrics","Cardiology"],
    descs: ["Comprehensive healthcare with experienced physicians.","Family medicine and specialist consultations.","Modern medical facility with state-of-the-art equipment.","Personalized healthcare with compassionate professionals.","Walk-in clinic with extended hours for your convenience."]
  },
  hotel: {
    names: ["Riad Al Nour","Hotel Marjana","Le Palace Imperial","Maison d'Hôtes Azur","Atlas Grand Hotel"],
    services: ["Room service","Pool","Spa","Airport transfer","Conference room","Restaurant"],
    descs: ["Luxurious accommodation in a traditional riad setting.","Modern comfort meets Moroccan hospitality.","5-star hotel with panoramic city views.","Boutique hotel with personalized guest experiences.","Elegant hotel with world-class amenities and service."]
  },
  pharmacy: {
    names: ["Pharmacie Centrale","ParaPharma Plus","Pharmacie du Soleil","MediPharm Express","Pharmacie Al Amal"],
    services: ["Prescriptions","OTC medicine","Health products","Blood pressure check","Vitamins","Delivery"],
    descs: ["Full-service pharmacy with expert pharmacist advice.","Convenient prescription and health product services.","Your trusted neighborhood pharmacy since 1998.","Fast prescription filling and health consultations.","Complete pharmaceutical care with home delivery."]
  },
  garage: {
    names: ["AutoFix Garage","Garage Al Mouhandiss","SpeedMech Auto","Atlas Auto Service","ProCar Repair"],
    services: ["Oil change","Brake repair","Engine diagnostic","Tire service","AC repair","Body work"],
    descs: ["Full-service auto repair with certified mechanics.","Expert car maintenance and repair services.","Quick and reliable vehicle diagnostics and repair.","Specialized European and Asian vehicle service.","Affordable auto repair with quality guaranteed."]
  },
  locksmith: {
    names: ["SecureKey Express","Clés Minute Plus"],
    services: ["Lock change","Key duplication","Emergency lockout","Safe install","Smart lock"],
    descs: ["24/7 emergency locksmith services across the city.","Fast and reliable lock solutions for homes and offices."]
  },
  lawyer: {
    names: ["Cabinet Juridique Al Adl","LexPro Avocats"],
    services: ["Corporate law","Family law","Real estate law","Criminal defense","Immigration"],
    descs: ["Experienced legal team specializing in business and civil law.","Dedicated lawyers providing personalized legal counsel."]
  },
  accountant: {
    names: ["ComptaPro Services","FinanceExpert Cabinet"],
    services: ["Tax filing","Bookkeeping","Audit","Payroll","Business consulting"],
    descs: ["Professional accounting services for businesses of all sizes.","Expert tax advisory and financial planning services."]
  },
  "real-estate": {
    names: ["Immobilier Royal","DarCom Properties"],
    services: ["Property sales","Rentals","Property management","Valuation","Commercial leasing"],
    descs: ["Premier real estate agency with extensive property listings.","Trusted property specialists helping you find your dream home."]
  },
  cleaning: {
    names: ["CleanPro Maroc","Brillance Services"],
    services: ["Deep cleaning","Office cleaning","Carpet cleaning","Window washing","Move-out cleaning"],
    descs: ["Professional cleaning services for homes and offices.","Eco-friendly cleaning solutions with guaranteed satisfaction."]
  },
  "beauty-salon": {
    names: ["Salon Étoile","Beauté Royale"],
    services: ["Haircut","Coloring","Manicure","Facial","Waxing","Bridal makeup"],
    descs: ["Premium beauty services in a relaxing atmosphere.","Expert stylists and beauty professionals at your service."]
  },
  veterinarian: {
    names: ["VétéCare Clinic","Clinique Animalia"],
    services: ["Vaccination","Surgery","Dental care","Grooming","Emergency care"],
    descs: ["Compassionate veterinary care for all pets.","Full-service animal clinic with experienced veterinarians."]
  },
  moving: {
    names: ["TransMove Express","Atlas Déménagement"],
    services: ["Local moving","Long distance","Packing","Storage","Furniture assembly"],
    descs: ["Stress-free moving services with careful handling.","Professional relocation services across Morocco."]
  },
  security: {
    names: ["SecuriTech Maroc","GuardPro Systems"],
    services: ["CCTV install","Alarm systems","Access control","24/7 monitoring","Smart security"],
    descs: ["Advanced security solutions for homes and businesses.","State-of-the-art surveillance and alarm systems."]
  },
  "it-support": {
    names: ["TechAssist Pro","InfoSys Solutions"],
    services: ["Computer repair","Network setup","Cloud services","Data recovery","Cybersecurity"],
    descs: ["Reliable IT support for businesses and individuals.","Complete technology solutions and managed services."]
  },
  "travel-agency": {
    names: ["Voyage Découverte","Horizons Travel"],
    services: ["Flight booking","Hotel booking","Tour packages","Visa assistance","Travel insurance"],
    descs: ["Customized travel experiences and holiday packages.","Your gateway to unforgettable travel adventures."]
  },
  "event-planner": {
    names: ["FêtePro Events","Célébration Royale"],
    services: ["Wedding planning","Corporate events","Birthday parties","Decoration","Catering coordination"],
    descs: ["Creating unforgettable events with attention to every detail.","Professional event planning and coordination services."]
  },
};

const paymentOptions = [["Cash","Credit Card","Bank Transfer"],["Cash","Credit Card"],["Cash","Credit Card","Check","Bank Transfer"],["Cash","Mobile Payment"],["Cash","Credit Card","Mobile Payment"]];
const accessOptions = [["Wheelchair ramp","Elevator"],["Ground floor","Wide entrance"],["Wheelchair ramp"],["Elevator","Accessible restroom"],[]];
const badgeOptions = [["Top Rated","Fast Response"],["Trusted Pro"],["New on ProxiList"],["Top Rated"],[]];
const langOptions = [["French","Arabic","English"],["French","Arabic"],["Arabic","French","Spanish"],["French","Arabic","English","Amazigh"],["Arabic","French"]];
const certOptions = [["ISO 9001","Licensed Professional"],["Licensed Professional"],["Chamber of Commerce"],["Professional Association"],[]];
const priceRanges: ("$"|"$$"|"$$$"|"$$$$")[] = ["$","$$","$$$","$$","$"];
const photoPlaceholders = [
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80"
];

function makeHours(weekend: boolean) {
  const h: Business["hours"] = [];
  for (let d = 0; d < 7; d++) {
    if (d === 0) h.push({ day: d, open: "09:00", close: "13:00", closed: !weekend });
    else if (d === 6) h.push({ day: d, open: weekend ? "09:00" : "08:30", close: weekend ? "17:00" : "13:00" });
    else h.push({ day: d, open: "08:30", close: "18:30" });
  }
  return h;
}

function slug(name: string, city: string) {
  return (name + "-" + city).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

let bizId = 0;
export const businesses: Business[] = [];

const catSlugs = Object.keys(catMap);
for (let i = 0; i < 50; i++) {
  const ci = i % 5;
  const city = cities[ci];
  const catSlug = catSlugs[i % catSlugs.length];
  const cat = catMap[catSlug];
  const ni = i % cat.names.length;
  const nameStr = cat.names[ni];
  const id = `biz-${String(++bizId).padStart(3, "0")}`;

  const otherCats = catSlugs.filter(c => c !== catSlug);
  const secondaryCats = [otherCats[i % otherCats.length]];

  businesses.push({
    id,
    slug: slug(nameStr, city.name),
    name: nameStr,
    primaryCategory: catSlug,
    secondaryCategories: secondaryCats,
    description: cat.descs[ni],
    phone: `+212${5 + ci}${String(10000000 + i * 131071).slice(0, 8)}`,
    email: `contact@${nameStr.toLowerCase().replace(/[^a-z0-9]/g, "")}.ma`,
    website: `https://www.${nameStr.toLowerCase().replace(/[^a-z0-9]/g, "")}.ma`,
    address: `${10 + i * 3} ${["Bd Mohammed V","Rue Ibn Batouta","Ave Hassan II","Rue de la Liberté","Bd Zerktouni"][ci]}`,
    city: city.name,
    region: city.region,
    postalCode: city.codes[i % city.codes.length],
    geo: { lat: city.lat + (Math.sin(i) * 0.02), lng: city.lng + (Math.cos(i) * 0.02) },
    rating: Math.round((35 + (i * 7 % 16)) / 10 * 10) / 10,
    reviewCount: 8 + ((i * 17) % 143),
    hours: makeHours(i % 3 === 0),
    services: cat.services.slice(0, 3 + (i % 4)),
    badges: badgeOptions[i % 5],
    photos: photoPlaceholders,
    paymentMethods: paymentOptions[i % 5],
    accessibility: accessOptions[i % 5],
    priceRange: priceRanges[i % 5],
    languages: langOptions[i % 5],
    certifications: certOptions[i % 5],
    verified: i % 3 !== 2,
    appointmentEnabled: i % 2 === 0,
    quoteEnabled: i % 3 !== 1,
    messagingEnabled: i % 4 !== 3,
    emergencyService: ["plumber", "electrician", "locksmith", "garage", "doctor"].includes(catSlug) && i % 2 === 0,
    createdAt: `2024-${String(1 + (i % 12)).padStart(2, "0")}-${String(1 + (i % 28)).padStart(2, "0")}T10:00:00Z`,
    updatedAt: `2025-${String(1 + (i % 12)).padStart(2, "0")}-${String(1 + (i % 28)).padStart(2, "0")}T10:00:00Z`,
  });
}
