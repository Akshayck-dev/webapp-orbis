"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Mail, Phone, Calendar, MoreVertical, Edit2, ArrowRightCircle, X, Trash2 } from "lucide-react";
import { leadsApi, Lead } from "@/lib/api";

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

const SERVICES = [
  "Static Website Development",
  "Dynamic Website Development",
  "E-Commerce Website",
  "ERP/CRM Development",
  "Android Application",
  "iOS Application",
  "Website Maintenance"
];

const STATUSES = ["New", "Contacted", "Quotation Sent", "Confirmed", "Closed"];

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [formData, setFormData] = useState<Lead>({
    name: "",
    contact: "",
    email: "",
    phone: "",
    service: "Static Website Development",
    status: "New",
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const data = await leadsApi.getAll();
      setLeads(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch leads:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (lead?: Lead) => {
    if (lead) {
      setEditingLead(lead);
      setFormData(lead);
    } else {
      setEditingLead(null);
      setFormData({
        name: "",
        contact: "",
        email: "",
        phone: "",
        service: "Static Website Development",
        status: "New",
        date: new Date().toISOString().split('T')[0]
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingLead(null);
  };

  const handleSaveLead = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await leadsApi.addOrUpdate(formData);
      await fetchLeads();
      handleCloseModal();
    } catch (error) {
      console.error("Failed to save lead:", error);
    }
  };

  const handleDeleteLead = async (id: number) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    try {
      await leadsApi.delete(id);
      await fetchLeads();
    } catch (error) {
      console.error("Failed to delete lead:", error);
    }
  };

  const handleInlineChange = async (lead: Lead, field: string, value: string) => {
    const updatedLead = { ...lead, [field]: value };
    setLeads(leads.map(l => l.id === lead.id ? updatedLead : l));
    try {
      await leadsApi.addOrUpdate(updatedLead);
    } catch (error) {
      console.error("Failed to update lead inline:", error);
      fetchLeads();
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#17204E] mb-2">Leads Management</h1>
          <p className="text-gray-500">Track and convert incoming enquiries into deals.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-[#057AF8] hover:bg-blue-600 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors shadow-lg shadow-blue-500/20"
        >
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
              {SERVICES.map(service => <option key={service} value={service}>{service}</option>)}
            </select>
            <select className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#057AF8]">
              <option>All Statuses</option>
              {STATUSES.map(status => <option key={status} value={status}>{status}</option>)}
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
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">Loading leads...</td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">No leads found.</td>
                </tr>
              ) : leads.map((lead, idx) => (
                <motion.tr 
                  key={lead.id || idx}
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
                      value={lead.status || 'New'}
                      onChange={(e) => handleInlineChange(lead, 'status', e.target.value)}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium border appearance-none cursor-pointer pr-6 bg-no-repeat focus:outline-none focus:ring-2 focus:ring-[#057AF8]/50 ${getStatusColor(lead.status || '')}`}
                      style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23666666%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundSize: '8px 8px', backgroundPosition: 'right 8px center' }}
                    >
                      {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
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
                      <button 
                        onClick={() => handleOpenModal(lead)}
                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => lead.id && handleDeleteLead(lead.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      >
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
          <div>Showing {leads.length > 0 ? 1 : 0} to {leads.length} of {leads.length} leads</div>
          <div className="flex gap-1">
            <button className="px-3 py-1 rounded border border-gray-200 hover:bg-gray-100 disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 rounded bg-[#057AF8] text-white">1</button>
            <button className="px-3 py-1 rounded border border-gray-200 hover:bg-gray-100 disabled:opacity-50" disabled>Next</button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-[#17204E]">
                  {editingLead ? 'Edit Lead' : 'Add Lead'}
                </h2>
                <button 
                  onClick={handleCloseModal}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveLead} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company/Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name || ''}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#057AF8] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                    <input 
                      type="text" 
                      value={formData.contact || ''}
                      onChange={e => setFormData({...formData, contact: e.target.value})}
                      className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#057AF8] focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                      type="email" 
                      value={formData.email || ''}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#057AF8] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input 
                      type="text" 
                      value={formData.phone || ''}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#057AF8] focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service Requested</label>
                    <select 
                      value={formData.service || ''}
                      onChange={e => setFormData({...formData, service: e.target.value})}
                      className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#057AF8] focus:border-transparent"
                    >
                      {SERVICES.map(service => <option key={service} value={service}>{service}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select 
                      value={formData.status || ''}
                      onChange={e => setFormData({...formData, status: e.target.value})}
                      className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#057AF8] focus:border-transparent"
                    >
                      {STATUSES.map(status => <option key={status} value={status}>{status}</option>)}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input 
                    type="date" 
                    value={formData.date || ''}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                    className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#057AF8] focus:border-transparent"
                  />
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end gap-3 mt-6">
                  <button 
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-[#057AF8] hover:bg-blue-600 rounded-lg transition-colors shadow-sm"
                  >
                    Save Lead
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
