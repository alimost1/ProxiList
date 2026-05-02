import React from "react";
import { SearchX } from "lucide-react";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 text-slate-300 dark:text-slate-600">
        {icon || <SearchX className="h-16 w-16" />}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-slate-700 dark:text-slate-300">{title}</h3>
      <p className="mb-6 max-w-sm text-sm text-slate-500 dark:text-slate-400">{description}</p>
      {action}
    </div>
  );
}
