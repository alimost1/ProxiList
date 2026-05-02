import React from "react";
import Link from "next/link";
import { Phone, FileText, Calendar, Globe, MapPin, MessageCircle } from "lucide-react";
import { Business } from "@/lib/types";

export function QuickActionBar({ business }: { business: Business }) {
  return (
    <div className="flex flex-wrap gap-2">
      <a href={`tel:${business.phone}`} className="btn-primary flex-1 sm:flex-none py-3 px-5 text-sm rounded-xl">
        <Phone className="h-4 w-4" /> Call
      </a>
      {business.quoteEnabled && (
        <Link href={`/quote?business=${business.slug}`} className="btn-secondary flex-1 sm:flex-none py-3 px-5 text-sm rounded-xl">
          <FileText className="h-4 w-4" /> Get Quote
        </Link>
      )}
      {business.appointmentEnabled && (
        <button className="btn-secondary flex-1 sm:flex-none py-3 px-5 text-sm rounded-xl">
          <Calendar className="h-4 w-4" /> Book
        </button>
      )}
      {business.website && (
        <a href={business.website} target="_blank" rel="noopener noreferrer" className="btn-outline flex-1 sm:flex-none py-3 px-4 text-sm">
          <Globe className="h-4 w-4" /> Website
        </a>
      )}
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address + ", " + business.city)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-outline flex-1 sm:flex-none py-3 px-4 text-sm"
      >
        <MapPin className="h-4 w-4" /> Directions
      </a>
      {business.messagingEnabled && (
        <button className="btn-outline flex-1 sm:flex-none py-3 px-4 text-sm">
          <MessageCircle className="h-4 w-4" /> Message
        </button>
      )}
    </div>
  );
}
