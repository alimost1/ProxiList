import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Results",
  description: "Search for local businesses and services near you on ProxiList.",
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
