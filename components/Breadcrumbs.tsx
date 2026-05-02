import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="py-3">
      <ol className="flex flex-wrap items-center gap-1 text-sm">
        <li className="flex items-center">
          <Link href="/" className="text-slate-400 transition hover:text-primary-600 dark:text-slate-500">
            <Home className="h-3.5 w-3.5" />
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            <ChevronRight className="h-3 w-3 text-slate-300 dark:text-slate-600" />
            {item.href ? (
              <Link href={item.href} className="text-slate-400 transition hover:text-primary-600 dark:text-slate-500">
                {item.label}
              </Link>
            ) : (
              <span className="text-slate-600 dark:text-slate-300">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
