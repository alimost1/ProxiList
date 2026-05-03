"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { Search, Bell, Menu, Moon, Sun } from "lucide-react";
import { useDarkMode } from "@/hooks/useDarkMode";

export function AdminTopbar() {
  const pathname = usePathname();
  const { isDark, toggleDarkMode } = useDarkMode();

  // Generate simple breadcrumb from pathname
  const pathParts = pathname.split('/').filter(Boolean);
  const currentPage = pathParts.length > 1 
    ? pathParts[pathParts.length - 1].charAt(0).toUpperCase() + pathParts[pathParts.length - 1].slice(1)
    : "Dashboard";

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 sm:px-6 shrink-0 transition-colors z-10 sticky top-0">
      
      {/* Left side: Mobile menu & Breadcrumbs */}
      <div className="flex items-center gap-4">
        <button className="md:hidden p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
          <Menu className="h-5 w-5" />
        </button>
        
        <div className="hidden sm:flex items-center text-sm">
          <span className="text-slate-500 dark:text-slate-400">Admin</span>
          <span className="mx-2 text-slate-300 dark:text-slate-600">/</span>
          <span className="font-medium text-slate-900 dark:text-white">{currentPage}</span>
        </div>
      </div>

      {/* Center: Global Search (hidden on mobile) */}
      <div className="hidden lg:flex flex-1 max-w-md mx-6">
        <div className="relative w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          <input
            type="text"
            placeholder="Search businesses, users, categories..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all dark:text-slate-200 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Right side: Actions & Profile */}
      <div className="flex items-center gap-2 sm:gap-4">
        <button 
          onClick={toggleDarkMode}
          className="p-2 text-slate-500 hover:text-blue-600 dark:hover:text-yellow-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        
        <button className="relative p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 border-2 border-white dark:border-slate-900"></span>
        </button>

        <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-1 hidden sm:block"></div>

        <button className="flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800 p-1 pr-2 rounded-lg transition-colors">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
            alt="Admin Profile"
            className="h-8 w-8 rounded-full border border-slate-200 dark:border-slate-700 object-cover"
          />
          <div className="hidden md:flex flex-col items-start text-xs">
            <span className="font-medium text-slate-900 dark:text-white">Ali M.</span>
            <span className="text-slate-500 dark:text-slate-400">Superadmin</span>
          </div>
        </button>
      </div>
    </header>
  );
}
