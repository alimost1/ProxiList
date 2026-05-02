import { Review } from "./types";
import { businesses } from "./seed-businesses";

const titles = [
  "Excellent service!", "Very professional", "Highly recommended", "Great experience",
  "Good value", "Decent work", "Could be better", "Outstanding quality",
  "Fast and reliable", "Friendly staff", "Very satisfied", "Will come back",
  "Best in the area", "Solid service", "Pleasant surprise", "Top notch",
  "Above expectations", "Fair pricing", "Knowledgeable team", "Quick response",
];

const comments = [
  "They arrived on time and completed the job efficiently. Very impressed with the quality of work.",
  "Professional team with great attention to detail. Would definitely use their services again.",
  "Good overall experience. The staff was friendly and the pricing was fair.",
  "Excellent customer service from start to finish. They explained everything clearly.",
  "Very responsive and reliable. Fixed the issue quickly and at a reasonable price.",
  "The quality of work exceeded my expectations. Clean and thorough job.",
  "Decent service but had to wait a bit longer than expected. Results were satisfactory.",
  "Fantastic experience! The team was knowledgeable and completed the work ahead of schedule.",
  "Fair pricing and good quality work. Communication could be improved slightly.",
  "Highly professional. They went above and beyond to ensure customer satisfaction.",
  "Great value for money. The service was prompt and the results were excellent.",
  "Very knowledgeable and patient. They took the time to explain all the options.",
  "Solid work and fair pricing. Minor delays but overall a positive experience.",
  "Outstanding service! They were punctual, professional, and very thorough.",
  "Reliable and trustworthy. I've used them multiple times and always satisfied.",
];

const firstNames = ["Youssef","Fatima","Ahmed","Khadija","Omar","Nadia","Mehdi","Amina","Karim","Sara","Hassan","Leila","Rachid","Meriem","Amine"];
const lastNames = ["B.","E.","A.","M.","K.","R.","L.","S.","H.","T.","Z.","N.","D.","F.","G."];

export const reviews: Review[] = [];

let revId = 0;
for (let i = 0; i < 150; i++) {
  const biz = businesses[i % businesses.length];
  const ratingBase = biz.rating;
  const variation = [-1, -0.5, 0, 0, 0, 0.5, 0.5, 1][i % 8];
  const rating = Math.min(5, Math.max(1, Math.round((ratingBase + variation) * 2) / 2));

  reviews.push({
    id: `rev-${String(++revId).padStart(3, "0")}`,
    businessId: biz.id,
    authorName: `${firstNames[i % firstNames.length]} ${lastNames[(i * 3) % lastNames.length]}`,
    rating,
    title: titles[i % titles.length],
    comment: comments[i % comments.length],
    date: `2024-${String(1 + (i % 12)).padStart(2, "0")}-${String(1 + (i % 28)).padStart(2, "0")}`,
    verifiedVisit: i % 3 !== 2,
  });
}
