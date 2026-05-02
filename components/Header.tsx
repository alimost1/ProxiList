"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Search, Heart, BarChart3, User, Moon, Sun, Menu, X } from "lucide-react";
import { useDarkModeContext } from "./DarkModeProvider";
import { SearchBar } from "./SearchBar";

export function Header() {
  const { isDark, toggleDarkMode } = useDarkModeContext();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-yellow-400 bg-slate-900 shadow-lg dark:bg-slate-900">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-yellow-400 text-slate-900 font-bold text-lg">P</div>
          <span className="text-xl font-bold text-white" style={{fontFamily: "'Merriweather', serif"}}>ProxiList</span>
        </Link>

        {/* Desktop search shortcut */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          {showSearch ? (
            <SearchBar />
          ) : (
            <button
              onClick={() => setShowSearch(true)}
              className="flex w-full items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-300 transition hover:border-yellow-400 hover:bg-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-400"
              aria-label="Open search"
            >
              <Search className="h-4 w-4" />
              Search businesses…
            </button>
          )}
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-2">
          <Link href="/saved" className="inline-flex items-center gap-1.5 rounded-lg border border-yellow-400/40 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-yellow-400/10 hover:border-yellow-400">
            <Heart className="h-4 w-4" /> Saved
          </Link>
          <Link href="/compare" className="inline-flex items-center gap-1.5 rounded-lg border border-yellow-400/40 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-yellow-400/10 hover:border-yellow-400">
            <BarChart3 className="h-4 w-4" /> Compare
          </Link>
          <button
            onClick={toggleDarkMode}
            className="ml-2 rounded-lg p-2 text-yellow-400 transition hover:bg-slate-800"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </nav>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-1">
          <button
            onClick={toggleDarkMode}
            className="rounded-lg p-2 text-yellow-400"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-yellow-400"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t-2 border-yellow-400 bg-slate-800 px-4 py-3 dark:bg-slate-800">
          <div className="mb-3">
            <SearchBar />
          </div>
          <nav className="flex flex-col gap-2">
            <Link href="/saved" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white hover:bg-slate-700" onClick={() => setMobileOpen(false)}>
              <Heart className="h-4 w-4" /> Saved
            </Link>
            <Link href="/compare" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white hover:bg-slate-700" onClick={() => setMobileOpen(false)}>
              <BarChart3 className="h-4 w-4" /> Compare
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
