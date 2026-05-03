"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Store, 
  Tags, 
  Star, 
  Users, 
  Settings, 
  LogOut,
  MapPin
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Businesses", href: "/admin/businesses", icon: Store },
  { name: "Categories", href: "/admin/categories", icon: Tags },
  { name: "Reviews", href: "/admin/reviews", icon: Star },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 flex flex-col h-full border-r border-slate-800 shrink-0 shadow-2xl z-20 hidden md:flex">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 text-slate-900 p-1.5 rounded-lg group-hover:shadow-lg group-hover:shadow-yellow-500/30 transition-all duration-300">
            <MapPin className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-yellow-400 transition-colors" style={{fontFamily: "'Merriweather', serif"}}>
            ProxiList <span className="text-sm font-normal text-slate-400 ml-1 font-sans tracking-normal">Admin</span>
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-1 custom-scrollbar">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/admin");
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 font-medium ${
                isActive 
                  ? "bg-blue-600/10 text-blue-500 border border-blue-500/20 shadow-sm" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 hover:border hover:border-slate-700/50 border border-transparent"
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? "text-blue-500" : "text-slate-500 group-hover:text-slate-300"}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800">
        <button className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors duration-200 font-medium">
          <LogOut className="h-5 w-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
