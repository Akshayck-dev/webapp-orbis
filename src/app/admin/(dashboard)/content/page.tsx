"use client";

import { motion } from "framer-motion";
import { Edit3, CheckCircle, FileCode2, Globe, Image as ImageIcon, MessageSquare } from "lucide-react";

const contentModules = [
  {
    id: 1,
    title: "Homepage Hero",
    description: "Update the main headline, subtitle, and background video on the landing page.",
    icon: Globe,
    lastUpdated: "Today, 10:45 AM",
    status: "Published",
    color: "from-blue-500/20 to-blue-500/0",
    iconColor: "text-blue-400"
  },
  {
    id: 2,
    title: "Portfolio Showcase",
    description: "Add new case studies, upload images, and manage project categories.",
    icon: ImageIcon,
    lastUpdated: "Yesterday",
    status: "Draft",
    color: "from-purple-500/20 to-purple-500/0",
    iconColor: "text-purple-400"
  },
  {
    id: 3,
    title: "Services Pages",
    description: "Edit descriptions, pricing, and process timelines for all offered services.",
    icon: FileCode2,
    lastUpdated: "Oct 12, 2026",
    status: "Published",
    color: "from-green-500/20 to-green-500/0",
    iconColor: "text-green-400"
  },
  {
    id: 4,
    title: "Testimonials",
    description: "Manage client reviews, ratings, and company logos displayed on the site.",
    icon: MessageSquare,
    lastUpdated: "Oct 10, 2026",
    status: "Published",
    color: "from-orange-500/20 to-orange-500/0",
    iconColor: "text-orange-400"
  },
];

export default function ContentManagement() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#17204E] mb-2">Content Management</h1>
          <p className="text-gray-500">Edit and publish content across the live website.</p>
        </div>
        <button className="bg-white hover:bg-gray-50 text-[#17204E] px-4 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors border border-gray-200 shadow-sm">
          <Globe className="w-4 h-4" />
          View Live Site
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contentModules.map((module, idx) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white border border-gray-200 rounded-2xl p-6 relative overflow-hidden group hover:border-gray-300 transition-colors shadow-sm"
          >
            <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl ${module.color} rounded-bl-full -mr-8 -mt-8 opacity-10 group-hover:opacity-40 transition-opacity`} />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div className={`p-3 rounded-xl bg-gray-50 border border-gray-100 ${module.iconColor}`}>
                  <module.icon className="w-6 h-6" />
                </div>
                <div className={`px-2.5 py-1 rounded-md text-xs font-medium border flex items-center gap-1.5 ${
                  module.status === 'Published' 
                    ? 'text-green-600 bg-green-50 border-green-200'
                    : 'text-orange-600 bg-orange-50 border-orange-200'
                }`}>
                  {module.status === 'Published' ? <CheckCircle className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
                  {module.status}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-[#17204E] mb-2">{module.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-8">
                  {module.description}
                </p>
              </div>

              <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-400">Last updated: {module.lastUpdated}</span>
                <button className="text-sm text-[#057AF8] font-medium hover:text-blue-400 flex items-center gap-1.5 transition-colors">
                  Edit Content <Edit3 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
