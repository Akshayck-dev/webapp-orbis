"use client";

import { motion } from "framer-motion";
import { Plus, Search, Mail, Phone, Calendar, MoreVertical, Edit2, ArrowRightCircle } from "lucide-react";

const leads = [
  { id: 1, name: "Acme Corp", contact: "John Doe", email: "john@acme.com", phone: "+1 234 567 890", service: "ERP/CRM Development", status: "New", date: "Oct 24, 2026" },
  { id: 2, name: "Global Retail", contact: "Sarah Smith", email: "sarah@global.com", phone: "+1 987 654 321", service: "E-Commerce Website", status: "Contacted", date: "Oct 22, 2026" },
  { id: 3, name: "TechNova", contact: "Mike Johnson", email: "mike@technova.com", phone: "+1 555 123 456", service: "Dynamic Website Development", status: "Quotation Sent", date: "Oct 20, 2026" },
  { id: 4, name: "HealthPlus", contact: "Emma Davis", email: "emma@healthplus.com", phone: "+1 444 789 012", service: "iOS Application", status: "Confirmed", date: "Oct 18, 2026" },
  { id: 5, name: "QuickLogistics", contact: "Tom Wilson", email: "tom@quicklogistics.com", phone: "+1 333 456 789", service: "Android Application", status: "Closed", date: "Oct 15, 2026" },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'New': return 'text-purple-600 bg-purple-50 border-purple-200';
    case 'Contacted': return 'text-blue-600 bg-blue-50 border-blue-200';
    case 'Quotation Sent': return 'text-orange-600 bg-orange-50 border-orange-200';
    case 'Confirmed': return 'text-green-600 bg-green-50 border-green-200';
    case 'Closed': return 'text-gray-600 bg-gray-50 border-gray-200';
    default: return 'text-gray-600 bg-gray-50 border-gray-200';
  }
};

export default function LeadsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#17204E] mb-2">Leads Management</h1>
          <p className="text-gray-500">Track and convert incoming enquiries into deals.</p>
        </div>
        <button className="bg-[#057AF8] hover:bg-blue-600 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors shadow-lg shadow-blue-500/20">
          <Plus className="w-4 h-4" />
          Add Lead
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col shadow-sm">
        {/* Table Header Area */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
          <div className="relative w-72">
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search leads by name or email..." 
              className="w-full bg-white border border-gray-200 rounded-lg py-2 pl-9 pr-4 text-sm text-[#17204E] placeholder:text-gray-400 focus:outline-none focus:border-[#057AF8] transition-colors"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <select className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#057AF8]">
              <option>All Services</option>
              <option>Web Development</option>
              <option>Mobile Apps</option>
              <option>ERP/CRM</option>
            </select>
            <select className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#057AF8]">
              <option>All Statuses</option>
              <option>New</option>
              <option>Contacted</option>
              <option>Quotation Sent</option>
              <option>Confirmed</option>
              <option>Closed</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="text-xs uppercase bg-gray-50/50 border-b border-gray-200 text-gray-500">
              <tr>
                <th className="px-6 py-4 font-medium">Lead Details</th>
                <th className="px-6 py-4 font-medium">Contact Info</th>
                <th className="px-6 py-4 font-medium">Service Requested</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leads.map((lead, idx) => (
                <motion.tr 
                  key={lead.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:bg-gray-50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-bold text-[#17204E]">{lead.name}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{lead.contact}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs">
                        <Mail className="w-3.5 h-3.5 text-gray-400" /> {lead.email}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <Phone className="w-3.5 h-3.5 text-gray-400" /> {lead.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-700">{lead.service}</td>
                  <td className="px-6 py-4">
                    <select 
                      defaultValue={lead.status}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium border appearance-none cursor-pointer pr-6 bg-no-repeat focus:outline-none focus:ring-2 focus:ring-[#057AF8]/50 ${getStatusColor(lead.status)}`}
                      style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23666666%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundSize: '8px 8px', backgroundPosition: 'right 8px center' }}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Quotation Sent">Quotation Sent</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Calendar className="w-3.5 h-3.5" />
                      {lead.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {lead.status === 'Confirmed' && (
                        <button title="Convert to Deal" className="p-1.5 text-green-600 hover:bg-green-100 rounded-md transition-colors">
                          <ArrowRightCircle className="w-4 h-4" />
                        </button>
                      )}
                      <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                        <Edit2 className="w-4 h-4" />
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
          <div>Showing 1 to 5 of 5 leads</div>
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
