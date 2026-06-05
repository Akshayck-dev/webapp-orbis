"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  FileText, 
  Settings,
  LogOut,
  Sparkles,
  Inbox
} from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Leads", href: "/admin/leads", icon: Inbox },
  { name: "Deals & Projects", href: "/admin/deals", icon: Briefcase },
  { name: "Employees", href: "/admin/employees", icon: Users },
  { name: "Content Management", href: "/admin/content", icon: FileText },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0 text-[#17204E] z-50 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      <div className="p-6 flex items-center gap-3 border-b border-gray-200">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#057AF8] to-[#035bb8] flex items-center justify-center shadow-md">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-[#17204E]">WebApp Orbis</h1>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 mt-2 px-3">
          Overview
        </div>
        
        {navItems.map((item) => {
          // Check if active or if the pathname starts with the item href (for sub-pages)
          const isExactMatch = pathname === item.href;
          const isSubMatch = item.href !== '/admin' && pathname?.startsWith(item.href);
          const isActive = isExactMatch || isSubMatch;
          
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.name} 
              href={item.href}
              prefetch={true}
              className="relative flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 group"
            >
              {isActive && (
                <motion.div 
                  layoutId="sidebar-active" 
                  className="absolute inset-0 bg-[#057AF8]/10 rounded-xl"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              
              <div className="relative z-10 flex items-center gap-3">
                <Icon className={`w-5 h-5 transition-colors duration-200 ${isActive ? "text-[#057AF8]" : "text-gray-500 group-hover:text-[#17204E]"}`} />
                <span className={`transition-colors duration-200 ${isActive ? "text-[#057AF8] font-bold" : "text-gray-600 group-hover:text-[#17204E]"}`}>
                  {item.name}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 space-y-2">
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:text-[#17204E] hover:bg-gray-100 transition-colors w-full">
          <Settings className="w-5 h-5" />
          Settings
        </button>
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors w-full">
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
