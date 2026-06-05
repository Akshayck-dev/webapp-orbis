"use client";

import { motion } from "framer-motion";
import { Plus, Search, MoreVertical, Edit2, Trash2, Users } from "lucide-react";

const deals = [
  { 
    id: 1, 
    name: "Aura Fintech App", 
    client: "Aura Financial",
    type: "iOS Application",
    stage: "In Progress",
    status: "Active",
    team: ["SJ", "MC"]
  },
  { 
    id: 2, 
    name: "Luxe Health Website", 
    client: "Luxe Medical Group",
    type: "Dynamic Website Development",
    stage: "Completed",
    status: "Closed",
    team: ["ER"]
  },
  { 
    id: 3, 
    name: "Nova SaaS Dashboard", 
    client: "Nova Tech",
    type: "ERP/CRM Development",
    stage: "Requirements Gathering",
    status: "Active",
    team: ["SJ", "RT"]
  },
  { 
    id: 4, 
    name: "EcoStore Redesign", 
    client: "Eco Living",
    type: "E-Commerce Website",
    stage: "Client Review",
    status: "Active",
    team: ["DK", "JS"]
  },
  { 
    id: 5, 
    name: "Global Logistics App", 
    client: "Global Cargo",
    type: "Android Application",
    stage: "New Deal",
    status: "On Hold",
    team: []
  },
];

const getStageColor = (stage: string) => {
  switch (stage) {
    case 'New Deal': return 'text-purple-600 bg-purple-50 border-purple-200';
    case 'Requirements Gathering': return 'text-pink-600 bg-pink-50 border-pink-200';
    case 'In Progress': return 'text-blue-600 bg-blue-50 border-blue-200';
    case 'Client Review': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    case 'Revision': return 'text-orange-600 bg-orange-50 border-orange-200';
    case 'Completed': return 'text-green-600 bg-green-50 border-green-200';
    case 'Invoiced': return 'text-teal-600 bg-teal-50 border-teal-200';
    case 'Closed': return 'text-gray-600 bg-gray-50 border-gray-200';
    default: return 'text-gray-600 bg-gray-50 border-gray-200';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active': return 'text-green-600 bg-green-50 border-green-200';
    case 'On Hold': return 'text-orange-600 bg-orange-50 border-orange-200';
    case 'Cancelled': return 'text-red-600 bg-red-50 border-red-200';
    case 'Closed': return 'text-gray-600 bg-gray-50 border-gray-200';
    default: return 'text-gray-600 bg-gray-50 border-gray-200';
  }
};

export default function DealsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#17204E] mb-2">Deals & Projects</h1>
          <p className="text-gray-500">Track project execution stages from confirmed deals.</p>
        </div>
        <button className="bg-[#057AF8] hover:bg-blue-600 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors shadow-lg shadow-blue-500/20">
          <Plus className="w-4 h-4" />
          Create Deal
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col shadow-sm">
        {/* Table Header Area */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50/50 flex-wrap gap-4">
          <div className="relative w-72">
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search deals..." 
              className="w-full bg-white border border-gray-200 rounded-lg py-2 pl-9 pr-4 text-sm text-[#17204E] placeholder:text-gray-400 focus:outline-none focus:border-[#057AF8] transition-colors"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <select className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#057AF8]">
              <option>All Types</option>
              <option>Static Website Development</option>
              <option>Dynamic Website Development</option>
              <option>E-Commerce Website</option>
              <option>ERP/CRM Development</option>
              <option>Android Application</option>
              <option>iOS Application</option>
              <option>Website Maintenance</option>
            </select>
            <select className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#057AF8]">
              <option>All Stages</option>
              <option>New Deal</option>
              <option>Requirements Gathering</option>
              <option>In Progress</option>
              <option>Client Review</option>
              <option>Revision</option>
              <option>Completed</option>
              <option>Invoiced</option>
              <option>Closed</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="text-xs uppercase bg-gray-50/50 border-b border-gray-200 text-gray-500">
              <tr>
                <th className="px-6 py-4 font-medium">Deal Details</th>
                <th className="px-6 py-4 font-medium">Project Type</th>
                <th className="px-6 py-4 font-medium">Execution Stage</th>
                <th className="px-6 py-4 font-medium">Overall Status</th>
                <th className="px-6 py-4 font-medium">Assigned Team</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {deals.map((deal, idx) => (
                <motion.tr 
                  key={deal.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:bg-gray-50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-bold text-[#17204E]">{deal.name}</div>
                      <div className="text-xs text-gray-500 mt-0.5">Client: {deal.client}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600">
                      {deal.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select 
                      defaultValue={deal.stage}
                      className={`px-2.5 py-1.5 rounded-md text-xs font-semibold border appearance-none cursor-pointer pr-6 bg-no-repeat focus:outline-none focus:ring-2 focus:ring-[#057AF8]/50 ${getStageColor(deal.stage)}`}
                      style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23666666%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundSize: '8px 8px', backgroundPosition: 'right 8px center' }}
                    >
                      <option value="New Deal">New Deal</option>
                      <option value="Requirements Gathering">Requirements Gathering</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Client Review">Client Review</option>
                      <option value="Revision">Revision</option>
                      <option value="Completed">Completed</option>
                      <option value="Invoiced">Invoiced</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <select 
                      defaultValue={deal.status}
                      className={`px-2.5 py-1.5 rounded-md text-xs font-semibold border appearance-none cursor-pointer pr-6 bg-no-repeat focus:outline-none focus:ring-2 focus:ring-[#057AF8]/50 ${getStatusColor(deal.status)}`}
                      style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23666666%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundSize: '8px 8px', backgroundPosition: 'right 8px center' }}
                    >
                      <option value="Active">Active</option>
                      <option value="On Hold">On Hold</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex -space-x-2">
                      {deal.team.length > 0 ? (
                        deal.team.map((member, i) => (
                          <div key={i} className="w-8 h-8 rounded-full bg-[#057AF8]/10 border-2 border-white flex items-center justify-center text-xs font-bold text-[#057AF8] z-10 relative">
                            {member}
                          </div>
                        ))
                      ) : (
                        <div className="text-xs text-gray-400 italic">Unassigned</div>
                      )}
                      
                      {deal.team.length > 0 && (
                        <button className="w-8 h-8 rounded-full bg-gray-50 border-2 border-white flex items-center justify-center text-xs text-gray-500 hover:bg-gray-200 transition-colors z-0 relative">
                          <Plus className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500 bg-gray-50/50">
          <div>Showing 1 to 5 of 5 deals</div>
          <div className="flex gap-1">
            <button className="px-3 py-1 rounded border border-gray-200 hover:bg-gray-100 disabled:opacity-50">Prev</button>
            <button className="px-3 py-1 rounded bg-[#057AF8] text-white">1</button>
            <button className="px-3 py-1 rounded border border-gray-200 hover:bg-gray-100 disabled:opacity-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
