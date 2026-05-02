import React from "react";
import { Business } from "@/lib/types";

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function HoursTable({ hours }: { hours: Business["hours"] }) {
  const today = new Date().getDay();

  return (
    <table className="w-full text-sm" aria-label="Business hours">
      <tbody>
        {dayNames.map((name, i) => {
          const h = hours.find((x) => x.day === i);
          const isToday = i === today;
          return (
            <tr
              key={i}
              className={`border-b border-slate-100 last:border-0 dark:border-slate-700 ${
                isToday ? "bg-primary-50/50 dark:bg-primary-900/10" : ""
              }`}
            >
              <td className={`py-2 pr-4 ${isToday ? "font-semibold text-primary-600 dark:text-primary-400" : "text-slate-600 dark:text-slate-400"}`}>
                {name}
                {isToday && <span className="ml-1 text-[10px]">(today)</span>}
              </td>
              <td className={`py-2 text-right ${isToday ? "font-semibold text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-300"}`}>
                {h?.closed ? (
                  <span className="text-red-500">Closed</span>
                ) : h ? (
                  `${h.open} – ${h.close}`
                ) : (
                  <span className="text-slate-400">—</span>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
