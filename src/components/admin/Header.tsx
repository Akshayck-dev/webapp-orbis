"use client";

import { Bell, Search, User } from "lucide-react";

export default function Header() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 text-[#17204E]">
      <div className="flex items-center w-96 relative">
        <Search className="w-4 h-4 text-gray-400 absolute left-3" />
        <input 
          type="text" 
          placeholder="Search..." 
          className="w-full bg-gray-50 border border-gray-200 rounded-full py-1.5 pl-10 pr-4 text-sm text-[#17204E] placeholder:text-gray-400 focus:outline-none focus:border-[#057AF8] focus:bg-white transition-colors"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-[#17204E]">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#057AF8] rounded-full border border-white"></span>
        </button>
        
        <div className="w-px h-6 bg-gray-200 mx-2"></div>
        
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium text-[#17204E] group-hover:text-[#057AF8]">Admin User</p>
            <p className="text-xs text-gray-500">Super Admin</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#057AF8] to-[#8EAAD1] flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </header>
  );
}
