"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Calendar, MoreVertical, Edit2, CheckCircle2, DollarSign, X, Trash2, Check, Loader2, ChevronDown } from "lucide-react";
import { dealsApi, Deal } from "@/lib/api";
import { FilterSelect } from "@/components/ui/FilterSelect";
import { StatusSelect } from "@/components/ui/StatusSelect";

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
    case 'In Progress': return 'text-blue-600 bg-blue-50 border-blue-200';
    case 'On Hold': return 'text-orange-600 bg-orange-50 border-orange-200';
    case 'Completed': return 'text-green-600 bg-green-50 border-green-200';
    case 'Cancelled': return 'text-red-600 bg-red-50 border-red-200';
    default: return 'text-gray-600 bg-gray-50 border-gray-200';
  }
};

const PROJECT_TYPES = [
  "Static Website Development",
  "Dynamic Website Development",
  "E-Commerce Website",
  "ERP/CRM Development",
  "Android Application",
  "iOS Application",
  "Website Maintenance",
  "Others"
];

const STATUSES = ["In Progress", "On Hold", "Completed", "Cancelled"];

const STAGES = [
  "New Deal",
  "Requirements Gathering",
  "In Progress",
  "Client Review",
  "Revision",
  "Completed",
  "Invoiced",
  "Closed"
];



export default function DealsPage() {
  const [filterType, setFilterType] = useState("All Types");
  const [filterStatus, setFilterStatus] = useState("All Statuses");
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);
  
  // Custom form state to separate client/name from remarks
  const [formName, setFormName] = useState("");
  const [formClient, setFormClient] = useState("");
  const [formData, setFormData] = useState<Deal>({
    projectType: "Static Website Development",
    totalAmount: 0,
    advanceAmount: 0,
    dueDate: new Date().toISOString().split('T')[0],
    status: "In Progress",
    remarks: ""
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
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    try {
      setLoading(true);
      const data = await dealsApi.getAll();
      setDeals(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch deals:", error);
    } finally {
      setLoading(false);
    }
  };

  // Helper to parse Name and Client from remarks
  const parseRemarks = (remarks: string = "") => {
    const parts = remarks.split("|");
    if (parts.length >= 2) {
      return {
        name: parts[0].replace("Name: ", "").trim(),
        client: parts[1].replace("Client: ", "").trim(),
        actualRemarks: parts.slice(2).join("|").trim()
      };
    }
    return { name: "Unknown", client: "Unknown", actualRemarks: remarks };
  };

  const handleOpenModal = (deal?: Deal) => {
    if (deal) {
      setEditingDeal(deal);
      const parsed = parseRemarks(deal.remarks);
      setFormName(parsed.name);
      setFormClient(parsed.client);
      setFormData({
        ...deal,
        remarks: parsed.actualRemarks
      });
    } else {
      setEditingDeal(null);
      setFormName("");
      setFormClient("");
      setFormData({
        projectType: "Static Website Development",
        totalAmount: 0,
        advanceAmount: 0,
        dueDate: new Date().toISOString().split('T')[0],
        status: "In Progress",
        remarks: ""
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingDeal(null);
    setSubmitError("");
  };

  const handleSaveDeal = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setIsSaving(true);
    
    // Bundle name and client into remarks
    const bundledRemarks = `Name: ${formName} | Client: ${formClient} ${formData.remarks ? `| ${formData.remarks}` : ''}`;
    
    const dealToSave = {
      ...formData,
      remarks: bundledRemarks
    };

    try {
      await dealsApi.addOrUpdate(dealToSave);
      await fetchDeals();
      handleCloseModal();
      showToast(editingDeal ? "Deal updated successfully!" : "Deal created successfully!");
    } catch (error: any) {
      console.error("Failed to save deal:", error);
      setSubmitError(error.message || "Failed to save deal");
    } finally {
      setIsSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    setIsSaving(true);
    try {
      await dealsApi.delete(itemToDelete);
      await fetchDeals();
      setItemToDelete(null);
      showToast("Deal deleted successfully!");
    } catch (error) {
      console.error("Failed to delete deal:", error);
      showToast("Failed to delete deal", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleInlineChange = async (deal: Deal, field: string, value: string) => {
    const updatedDeal = { ...deal, [field]: value };
    setDeals(deals.map(d => d.id === deal.id ? updatedDeal : d));
    if (deal.id) setUpdatingRowId(deal.id);
    try {
      await dealsApi.addOrUpdate(updatedDeal);
      showToast(`Status updated to ${value}`, 'success');
    } catch (error) {
      console.error("Failed to update deal inline:", error);
      fetchDeals();
      showToast("Failed to update status", "error");
    } finally {
      setUpdatingRowId(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#17204E] mb-2">Deals & Projects</h1>
          <p className="text-gray-500">Track project execution stages from confirmed deals.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-[#057AF8] hover:bg-blue-600 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors shadow-lg shadow-blue-500/20"
        >
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
            <FilterSelect 
              value={filterType}
              onChange={setFilterType}
              options={PROJECT_TYPES}
              placeholder="All Types"
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
                <th className="px-6 py-4 font-medium">Deal Details</th>
                <th className="px-6 py-4 font-medium">Project Type</th>
                <th className="px-6 py-4 font-medium">Execution Stage</th>
                <th className="px-6 py-4 font-medium">Overall Status</th>
                <th className="px-6 py-4 font-medium">Assigned Team</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">Loading deals...</td>
                </tr>
              ) : deals.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">No deals found.</td>
                </tr>
              ) : deals.map((deal, idx) => (
                <motion.tr 
                  key={deal.id || idx}
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
                    <StatusSelect
                      value={deal.stage || 'New Deal'}
                      options={STAGES}
                      onChange={(val) => handleInlineChange(deal, 'stage', val)}
                      disabled={updatingRowId === deal.id}
                      isLoading={updatingRowId === deal.id}
                      getColor={getStageColor}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <StatusSelect
                      value={deal.status || 'In Progress'}
                      options={STATUSES}
                      onChange={(val) => handleInlineChange(deal, 'status', val)}
                      disabled={updatingRowId === deal.id}
                      isLoading={updatingRowId === deal.id}
                      getColor={getStatusColor}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex -space-x-2">
                      {deal.team && deal.team.length > 0 ? (
                        deal.team.map((member, i) => (
                          <div key={i} className="w-8 h-8 rounded-full bg-[#057AF8]/10 border-2 border-white flex items-center justify-center text-xs font-bold text-[#057AF8] z-10 relative">
                            {member}
                          </div>
                        ))
                      ) : (
                        <div className="text-xs text-gray-400 italic">Unassigned</div>
                      )}
                      
                      {deal.team && deal.team.length > 0 && (
                        <button className="w-8 h-8 rounded-full bg-gray-50 border-2 border-white flex items-center justify-center text-xs text-gray-500 hover:bg-gray-200 transition-colors z-0 relative">
                          <Plus className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleOpenModal(deal)}
                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => deal.id && setItemToDelete(deal.id)}
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
          <div>Showing {deals.length > 0 ? 1 : 0} to {deals.length} of {deals.length} deals</div>
          <div className="flex gap-1">
            <button className="px-3 py-1 rounded border border-gray-200 hover:bg-gray-100 disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 rounded bg-[#057AF8] text-white">1</button>
            <button className="px-3 py-1 rounded border border-gray-200 hover:bg-gray-100 disabled:opacity-50" disabled>Next</button>
          </div>
        </div>
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
                <h2 className="text-xl font-bold text-[#17204E]">
                  {editingDeal ? 'Edit Deal' : 'Add New Deal'}
                </h2>
                <button 
                  onClick={handleCloseModal}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto">
                <form id="deal-form" onSubmit={handleSaveDeal} className="space-y-6">
                  {submitError && (
                    <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg">
                      {submitError}
                    </div>
                  )}
                  {/* Basic Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                      <input 
                        type="text" 
                        required
                        value={formName}
                        onChange={e => setFormName(e.target.value)}
                        className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#057AF8] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                      <input 
                        type="text" 
                        required
                        value={formClient}
                        onChange={e => setFormClient(e.target.value)}
                        className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#057AF8] focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Financials */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount ($)</label>
                      <input 
                        type="number" 
                        required
                        value={formData.totalAmount || 0}
                        onChange={e => setFormData({...formData, totalAmount: Number(e.target.value)})}
                        className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#057AF8] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Advance Amount ($)</label>
                      <input 
                        type="number" 
                        required
                        value={formData.advanceAmount || 0}
                        onChange={e => setFormData({...formData, advanceAmount: Number(e.target.value)})}
                        className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#057AF8] focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Classification */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#17204E] mb-2">Project Type</label>
                      <FilterSelect 
                        value={formData.projectType || "Static Website Development"}
                        onChange={(val) => setFormData({ ...formData, projectType: val })}
                        options={PROJECT_TYPES}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#17204E] mb-2">Status</label>
                      <FilterSelect 
                        value={formData.status || "In Progress"}
                        onChange={(val) => setFormData({ ...formData, status: val })}
                        options={STATUSES}
                        className="w-full"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                      <input 
                        type="date" 
                        required
                        value={formData.dueDate || ''}
                        onChange={e => setFormData({...formData, dueDate: e.target.value})}
                        className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#057AF8] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Remarks (Optional)</label>
                    <textarea 
                      value={formData.remarks || ''}
                      onChange={e => setFormData({...formData, remarks: e.target.value})}
                      className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#057AF8] focus:border-transparent"
                      rows={3}
                    />
                  </div>
                </form>
              </div>

              <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 shrink-0">
                <button 
                  type="button"
                  onClick={handleCloseModal}
                  disabled={isSaving}
                  className="px-4 py-2 text-sm font-medium text-gray-600 bg-white hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  form="deal-form"
                  type="submit"
                  disabled={isSaving}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#057AF8] hover:bg-blue-600 rounded-lg transition-colors shadow-sm disabled:opacity-70"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  Save Deal
                </button>
              </div>
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
              <h2 className="text-xl font-bold text-[#17204E] mb-2">Delete Deal?</h2>
              <p className="text-gray-500 text-sm mb-6">
                Are you sure you want to delete this deal? This action cannot be undone.
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
