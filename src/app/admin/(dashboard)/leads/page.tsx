"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Mail, Phone, Calendar, MoreVertical, Edit2, ArrowRightCircle, X, Trash2, Check, Loader2, ChevronDown } from "lucide-react";
import { leadsApi, Lead } from "@/lib/api";
import { FilterSelect } from "@/components/ui/FilterSelect";
import { StatusSelect } from "@/components/ui/StatusSelect";

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
  const [filterService, setFilterService] = useState('All Services');
  const [filterStatus, setFilterStatus] = useState('All Statuses');
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
  const [submitError, setSubmitError] = useState("");
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [updatingRowId, setUpdatingRowId] = useState<number | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

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
    setSubmitError("");
  };

  const handleSaveLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setIsSaving(true);
    try {
      await leadsApi.addOrUpdate(formData);
      await fetchLeads();
      handleCloseModal();
      showToast(editingLead ? "Lead updated successfully!" : "Lead created successfully!");
    } catch (error: any) {
      console.error("Failed to save lead:", error);
      setSubmitError(error.message || "Failed to save lead");
    } finally {
      setIsSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    setIsSaving(true);
    try {
      await leadsApi.delete(itemToDelete);
      await fetchLeads();
      setItemToDelete(null);
      showToast("Lead deleted successfully!");
    } catch (error) {
      console.error("Failed to delete lead:", error);
      showToast("Failed to delete lead", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleInlineChange = async (lead: Lead, field: string, value: string) => {
    const updatedLead = { ...lead, [field]: value };
    setLeads(leads.map(l => l.id === lead.id ? updatedLead : l));
    if (lead.id) setUpdatingRowId(lead.id);
    try {
      await leadsApi.addOrUpdate(updatedLead);
      showToast(`${field.charAt(0).toUpperCase() + field.slice(1)} updated to ${value}`, 'success');
    } catch (error) {
      console.error("Failed to update lead inline:", error);
      fetchLeads();
      showToast(`Failed to update ${field}`, 'error');
    } finally {
      setUpdatingRowId(null);
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
            <FilterSelect 
              value={filterService}
              onChange={setFilterService}
              options={SERVICES}
              placeholder="All Services"
            />
            <FilterSelect 
              value={filterStatus}
              onChange={setFilterStatus}
              options={STATUSES}
              placeholder="All Statuses"
            />
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
                    <StatusSelect
                      value={lead.status || 'New'}
                      options={STATUSES}
                      onChange={(val) => handleInlineChange(lead, 'status', val)}
                      disabled={updatingRowId === lead.id}
                      isLoading={updatingRowId === lead.id}
                      getColor={getStatusColor}
                    />
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
                        onClick={() => lead.id && setItemToDelete(lead.id)}
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
                {submitError && (
                  <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg">
                    {submitError}
                  </div>
                )}
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
                    <label className="block text-sm font-medium text-[#17204E] mb-2">Service Requested</label>
                    <FilterSelect 
                      value={formData.service || "Static Website Development"}
                      onChange={(val) => setFormData({ ...formData, service: val })}
                      options={SERVICES}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#17204E] mb-2">Status</label>
                    <FilterSelect 
                      value={formData.status || "New"}
                      onChange={(val) => setFormData({ ...formData, status: val })}
                      options={STATUSES}
                      className="w-full"
                    />
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
                    disabled={isSaving}
                    className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={isSaving}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#057AF8] hover:bg-blue-600 rounded-lg transition-colors shadow-sm disabled:opacity-70"
                  >
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                    Save Lead
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {itemToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden flex flex-col text-center p-6"
            >
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-red-500" />
              </div>
              <h2 className="text-xl font-bold text-[#17204E] mb-2">Delete Lead?</h2>
              <p className="text-gray-500 text-sm mb-6">
                Are you sure you want to delete this lead? This action cannot be undone.
              </p>
              <div className="flex gap-3 w-full">
                <button 
                  onClick={() => setItemToDelete(null)}
                  disabled={isSaving}
                  className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmDelete}
                  disabled={isSaving}
                  className="flex flex-1 items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-sm disabled:opacity-70"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  Yes, Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Toast Notification */}
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border ${
              toast.type === 'success' 
                ? 'bg-white border-green-100 text-gray-800' 
                : 'bg-white border-red-100 text-gray-800'
            }`}
          >
            {toast.type === 'success' ? (
              <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 text-green-500" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                <X className="w-4 h-4 text-red-500" />
              </div>
            )}
            <p className="font-medium text-sm pr-2">{toast.message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
