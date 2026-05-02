"use client";
import React, { createContext, useContext } from "react";
import { useDarkMode } from "@/hooks/useDarkMode";

type DarkModeCtx = { isDark: boolean; toggleDarkMode: () => void };
const Ctx = createContext<DarkModeCtx>({ isDark: false, toggleDarkMode: () => {} });

export function useDarkModeContext() {
  return useContext(Ctx);
}

export function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const value = useDarkMode();
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
