"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-[#FCFCFC] flex items-center justify-center relative overflow-hidden p-6">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#057AF8]/5 rounded-full blur-3xl -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#057AF8]/5 rounded-full blur-3xl -ml-48 -mb-48" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[440px] relative z-10"
      >
        <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10 shadow-xl shadow-gray-200/50 flex flex-col items-center">
          
          <img src="/logo.png" alt="WebApp Orbis Logo" className="h-16 md:h-20 w-auto object-contain mb-8" />
          
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-[#17204E]">Welcome Back</h1>
            <p className="text-gray-500 mt-2 text-sm">Sign in to your admin dashboard.</p>
          </div>

          <form onSubmit={handleLogin} className="w-full space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#17204E] mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="email" 
                  required
                  placeholder="admin@webapporbis.com"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-[#17204E] focus:bg-white focus:border-[#057AF8] focus:ring-4 focus:ring-[#057AF8]/10 transition-all outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#17204E] mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-12 text-[#17204E] focus:bg-white focus:border-[#057AF8] focus:ring-4 focus:ring-[#057AF8]/10 transition-all outline-none"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#057AF8] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between py-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative flex items-center justify-center w-5 h-5">
                  <input type="checkbox" className="peer appearance-none w-5 h-5 border border-gray-300 rounded focus:ring-2 focus:ring-[#057AF8]/20 focus:outline-none transition-colors checked:bg-[#057AF8] checked:border-[#057AF8]" />
                  <svg className="absolute w-3.5 h-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm text-gray-600 group-hover:text-[#17204E] transition-colors">Remember me</span>
              </label>
              <a href="#" className="text-sm font-medium text-[#057AF8] hover:text-[#035bb8] transition-colors">Forgot Password?</a>
            </div>

            <button type="submit" className="w-full bg-[#057AF8] hover:bg-[#035bb8] text-white font-medium py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#057AF8]/20 group mt-2">
              Sign In
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

        </div>
        
        <p className="text-center text-sm text-gray-500 mt-8">
          © {new Date().getFullYear()} WebApp Orbis. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
}
