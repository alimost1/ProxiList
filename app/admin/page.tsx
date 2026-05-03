"use client";
import React from "react";
import { 
  Users, 
  Store, 
  Star, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";
import { businesses } from "@/lib/seed";
import { reviews } from "@/lib/seed-reviews";

const stats = [
  {
    name: "Total Businesses",
    value: businesses.length.toString(),
    change: "+12.5%",
    trend: "up",
    icon: Store,
    color: "blue",
  },
  {
    name: "Total Reviews",
    value: reviews.length.toString(),
    change: "+18.2%",
    trend: "up",
    icon: Star,
    color: "yellow",
  },
  {
    name: "Active Users",
    value: "2,451",
    change: "+5.4%",
    trend: "up",
    icon: Users,
    color: "emerald",
  },
  {
    name: "Pending Approvals",
    value: "14",
    change: "-2.1%",
    trend: "down",
    icon: Clock,
    color: "rose",
  },
];

const recentActivity = [
  { id: 1, type: "review", message: "New 5-star review for 'Atlas Plomberie'", time: "10 mins ago", icon: Star, color: "text-yellow-500 bg-yellow-500/10" },
  { id: 2, type: "business", message: "New business 'TechAssist Pro' claimed profile", time: "2 hours ago", icon: Store, color: "text-blue-500 bg-blue-500/10" },
  { id: 3, type: "user", message: "User @karim99 updated profile photo", time: "4 hours ago", icon: Users, color: "text-emerald-500 bg-emerald-500/10" },
  { id: 4, type: "approval", message: "Business 'Le Jardin Bleu' verified", time: "5 hours ago", icon: CheckCircle2, color: "text-blue-500 bg-blue-500/10" },
  { id: 5, type: "report", message: "Review reported on 'AutoFix Garage'", time: "1 day ago", icon: AlertCircle, color: "text-rose-500 bg-rose-500/10" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white" style={{fontFamily: "'Merriweather', serif"}}>Dashboard Overview</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Welcome back, Ali. Here&apos;s what&apos;s happening today.</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm shadow-blue-500/20 w-full sm:w-auto">
          Generate Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const isUp = stat.trend === "up";
          return (
            <div key={stat.name} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              {/* Subtle background glow */}
              <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity bg-${stat.color}-500`}></div>
              
              <div className="flex items-center justify-between relative z-10">
                <div className={`p-2.5 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-500/10 text-${stat.color}-600 dark:text-${stat.color}-400`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className={`flex items-center gap-1 text-xs font-semibold ${isUp ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                  <TrendingUp className={`h-3 w-3 ${!isUp && 'rotate-180'}`} />
                  {stat.change}
                </div>
              </div>
              <div className="mt-4 relative z-10">
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">{stat.name}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Area */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 flex flex-col h-[400px]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Traffic Overview</h2>
            <select className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm rounded-lg px-3 py-1.5 text-slate-600 dark:text-slate-300 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="flex-1 flex items-end gap-2 sm:gap-4 justify-between mt-auto relative">
            {/* Fake grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between border-y border-slate-100 dark:border-slate-800/50 pointer-events-none">
              <div className="border-t border-slate-100 dark:border-slate-800/50 w-full h-1/4"></div>
              <div className="border-t border-slate-100 dark:border-slate-800/50 w-full h-1/4"></div>
              <div className="border-t border-slate-100 dark:border-slate-800/50 w-full h-1/4"></div>
            </div>
            
            {/* Fake bars */}
            {[40, 70, 45, 90, 65, 85, 100].map((h, i) => (
              <div key={i} className="relative w-full flex flex-col items-center justify-end h-full z-10 group cursor-pointer">
                <div className="absolute -top-8 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {h * 12} views
                </div>
                <div 
                  className="w-full bg-blue-100 dark:bg-blue-900/30 rounded-t-sm overflow-hidden relative group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40 transition-colors"
                  style={{ height: `${h}%` }}
                >
                  <div className="absolute bottom-0 w-full bg-blue-500 rounded-t-sm group-hover:bg-blue-400 transition-colors" style={{ height: '100%' }}></div>
                </div>
                <span className="text-xs text-slate-400 mt-2 block">Day {i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Recent Activity</h2>
          <div className="space-y-6">
            {recentActivity.map((activity, i) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex gap-4 relative">
                  {i !== recentActivity.length - 1 && (
                    <div className="absolute left-4 top-10 bottom-[-24px] w-px bg-slate-200 dark:bg-slate-800"></div>
                  )}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${activity.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-tight">
                      {activity.message}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <button className="w-full mt-6 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
}
