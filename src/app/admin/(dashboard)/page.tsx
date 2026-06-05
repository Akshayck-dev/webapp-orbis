"use client";

import { motion } from "framer-motion";
import { Users, Briefcase, FileText, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";

const stats = [
  {
    title: "Total Employees",
    value: "124",
    change: "+12%",
    isPositive: true,
    icon: Users,
    color: "from-blue-500/20 to-blue-500/0",
    iconColor: "text-blue-500",
  },
  {
    title: "Active Projects",
    value: "45",
    change: "+5%",
    isPositive: true,
    icon: Briefcase,
    color: "from-green-500/20 to-green-500/0",
    iconColor: "text-green-500",
  },
  {
    title: "Website Traffic",
    value: "45.2k",
    change: "-2%",
    isPositive: false,
    icon: Activity,
    color: "from-purple-500/20 to-purple-500/0",
    iconColor: "text-purple-500",
  },
  {
    title: "Content Updates",
    value: "892",
    change: "+18%",
    isPositive: true,
    icon: FileText,
    color: "from-orange-500/20 to-orange-500/0",
    iconColor: "text-orange-500",
  },
];

const recentActivity = [
  { id: 1, action: "New project 'Aura Fintech' created", time: "2 hours ago", type: "project" },
  { id: 2, action: "Sarah Jenkins updated Homepage Hero", time: "4 hours ago", type: "content" },
  { id: 3, action: "John Doe was added as Lead Designer", time: "5 hours ago", type: "employee" },
  { id: 4, action: "Project 'Luxe Health' marked as completed", time: "1 day ago", type: "project" },
  { id: 5, action: "New service 'SEO Optimization' published", time: "1 day ago", type: "content" },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#17204E] mb-2">Dashboard Overview</h1>
        <p className="text-gray-500">Welcome back, here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white border border-gray-200 rounded-2xl p-6 relative overflow-hidden group shadow-sm"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${stat.color} rounded-bl-full -mr-8 -mt-8 opacity-20 group-hover:opacity-60 transition-opacity`} />
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className={`p-3 rounded-xl bg-gray-50 border border-gray-100 ${stat.iconColor}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${stat.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                {stat.isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {stat.change}
              </div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-4xl font-bold text-[#17204E] mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-500">{stat.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Placeholder Chart Area */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 flex flex-col shadow-sm">
          <h2 className="text-xl font-bold text-[#17204E] mb-6">Traffic Overview</h2>
          <div className="flex-1 flex items-center justify-center border border-dashed border-gray-300 rounded-xl bg-gray-50 min-h-[300px]">
            <p className="text-gray-500 flex items-center gap-2">
              <Activity className="w-5 h-5" /> Chart Integration Pending
            </p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#17204E]">Recent Activity</h2>
            <button className="text-sm text-[#057AF8] hover:text-blue-400 transition-colors">View All</button>
          </div>
          
          <div className="flex-1 space-y-6">
            {recentActivity.map((activity, idx) => (
              <motion.div 
                key={activity.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + (idx * 0.1) }}
                className="flex items-start gap-4"
              >
                <div className="relative mt-1">
                  <div className="w-2 h-2 rounded-full bg-[#057AF8]" />
                  {idx !== recentActivity.length - 1 && (
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[1px] h-10 bg-gray-200" />
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-700 font-medium">{activity.action}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
