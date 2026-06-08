"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Edit2, X, Trash2, Check, Loader2, RefreshCcw } from "lucide-react";
import { renewalsApi, Renewal } from "@/lib/api";
import { FilterSelect } from "@/components/ui/FilterSelect";
import { StatusSelect } from "@/components/ui/StatusSelect";

const SERVICE_TYPES = [
  "Domain",
  "Server",
  "SSL",
  "Domain & Server",
  "Maintenance",
  "Others"
];

const STAGES = [
  "Active",
  "Expiring Soon",
  "Expired",
  "Renewed",
  "Cancelled"
];

const PAYMENT_STATUSES = [
  "Pending",
  "Paid",
  "Overdue"
];

const getStageColor = (stage: string) => {
  switch (stage) {
    case 'Active': return 'text-green-600 bg-green-50 border-green-200';
    case 'Expiring Soon': return 'text-orange-600 bg-orange-50 border-orange-200';
    case 'Expired': return 'text-red-600 bg-red-50 border-red-200';
    case 'Renewed': return 'text-blue-600 bg-blue-50 border-blue-200';
    case 'Cancelled': return 'text-gray-600 bg-gray-50 border-gray-200';
    default: return 'text-gray-600 bg-gray-50 border-gray-200';
  }
};

const getPaymentStatusColor = (status: string) => {
  switch (status) {
    case 'Pending': return 'text-orange-600 bg-orange-50 border-orange-200';
    case 'Paid': return 'text-green-600 bg-green-50 border-green-200';
    case 'Overdue': return 'text-red-600 bg-red-50 border-red-200';
    default: return 'text-gray-600 bg-gray-50 border-gray-200';
  }
};

export default function RenewalsPage() {
  const [filterType, setFilterType] = useState("All Services");
  const [filterStage, setFilterStage] = useState("All Stages");
  const [renewals, setRenewals] = useState<Renewal[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRenewal, setEditingRenewal] = useState<Renewal | null>(null);
  
  const [formData, setFormData] = useState<Renewal>({
    companyName: "",
    clientName: "",
    domainName: "",
    serviceType: "Domain",
    domainProvider: "",
    serverProvider: "",
    planName: "",
    billingCycle: "Yearly",
    startDate: new Date().toISOString().split('T')[0],
    expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
    amount: 0,
    amountPaid: 0,
    reminderStage: "Active",
    paymentStatus: "Pending",
    notes: ""
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
    fetchRenewals();
  }, []);

  const fetchRenewals = async () => {
    try {
      setLoading(true);
      const data = await renewalsApi.getAll();
      setRenewals(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch renewals:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (renewal?: Renewal) => {
    if (renewal) {
      setEditingRenewal(renewal);
      setFormData(renewal);
    } else {
      setEditingRenewal(null);
      setFormData({
        companyName: "",
        clientName: "",
        domainName: "",
        serviceType: "Domain",
        domainProvider: "",
        serverProvider: "",
        planName: "",
        billingCycle: "Yearly",
        startDate: new Date().toISOString().split('T')[0],
        expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
        amount: 0,
        amountPaid: 0,
        reminderStage: "Active",
        paymentStatus: "Pending",
        notes: ""
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingRenewal(null);
    setSubmitError("");
  };

  const handleSaveRenewal = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setIsSaving(true);

    try {
      await renewalsApi.addOrUpdate(formData);
      await fetchRenewals();
      handleCloseModal();
      showToast(editingRenewal ? "Renewal updated successfully!" : "Renewal created successfully!");
    } catch (error: any) {
      console.error("Failed to save renewal:", error);
      setSubmitError(error.message || "Failed to save renewal");
    } finally {
      setIsSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    setIsSaving(true);
    try {
      await renewalsApi.delete(itemToDelete);
      await fetchRenewals();
      setItemToDelete(null);
      showToast("Renewal deleted successfully!");
    } catch (error) {
      console.error("Failed to delete renewal:", error);
      showToast("Failed to delete renewal", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleInlineChange = async (renewal: Renewal, field: string, value: string) => {
    const updatedRenewal = { ...renewal, [field]: value };
    setRenewals(renewals.map(r => r.id === renewal.id ? updatedRenewal : r));
    if (renewal.id) setUpdatingRowId(renewal.id);
    try {
      await renewalsApi.addOrUpdate(updatedRenewal);
      showToast(`Status updated to ${value}`, 'success');
    } catch (error) {
      console.error("Failed to update renewal inline:", error);
      fetchRenewals();
      showToast("Failed to update status", "error");
    } finally {
      setUpdatingRowId(null);
    }
  };

  const filteredRenewals = renewals.filter(r => {
    if (filterType !== "All Services" && r.serviceType !== filterType) return false;
    if (filterStage !== "All Stages" && r.reminderStage !== filterStage) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#17204E] mb-2">Renewals</h1>
          <p className="text-gray-500">Manage domain, hosting, and service renewals.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-[#057AF8] hover:bg-blue-600 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors shadow-lg shadow-blue-500/20"
        >
          <Plus className="w-4 h-4" />
          Add Renewal
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col shadow-sm">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50/50 flex-wrap gap-4">
          <div className="relative w-72">
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search renewals..." 
              className="w-full bg-white border border-gray-200 rounded-lg py-2 pl-9 pr-4 text-sm text-[#17204E] placeholder:text-gray-400 focus:outline-none focus:border-[#057AF8] transition-colors"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <FilterSelect 
              value={filterType}
              onChange={setFilterType}
              options={SERVICE_TYPES}
              placeholder="All Services"
            />
            <FilterSelect 
              value={filterStage}
              onChange={setFilterStage}
              options={STAGES}
              placeholder="All Stages"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="text-xs uppercase bg-gray-50/50 border-b border-gray-200 text-gray-500">
              <tr>
                <th className="px-6 py-4 font-medium">Details</th>
                <th className="px-6 py-4 font-medium">Service Info</th>
                <th className="px-6 py-4 font-medium">Dates</th>
                <th className="px-6 py-4 font-medium">Stage</th>
                <th className="px-6 py-4 font-medium">Payment</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">Loading renewals...</td>
                </tr>
              ) : filteredRenewals.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">No renewals found.</td>
                </tr>
              ) : filteredRenewals.map((r, idx) => (
                <motion.tr 
                  key={r.id || idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:bg-gray-50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-bold text-[#17204E]">{r.companyName || r.clientName}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{r.domainName}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600 inline-block w-fit">
                        {r.serviceType}
                      </span>
                      <span className="text-xs text-gray-500">{r.domainProvider}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs">
                    <div className="flex flex-col gap-1">
                      <div>Start: {r.startDate ? r.startDate.substring(0, 10) : ''}</div>
                      <div className="font-medium text-red-500">Exp: {r.expiryDate ? r.expiryDate.substring(0, 10) : ''}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusSelect
                      value={r.reminderStage || 'Active'}
                      options={STAGES}
                      onChange={(val) => handleInlineChange(r, 'reminderStage', val)}
                      disabled={updatingRowId === r.id}
                      isLoading={updatingRowId === r.id}
                      getColor={getStageColor}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <StatusSelect
                      value={r.paymentStatus || 'Pending'}
                      options={PAYMENT_STATUSES}
                      onChange={(val) => handleInlineChange(r, 'paymentStatus', val)}
                      disabled={updatingRowId === r.id}
                      isLoading={updatingRowId === r.id}
                      getColor={getPaymentStatusColor}
                    />
                    <div className="text-xs text-gray-500 mt-1 font-medium">
                      ${r.amount} / {r.billingCycle}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleOpenModal(r)}
                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => r.id && setItemToDelete(r.id)}
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
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10 shrink-0">
                <h2 className="text-xl font-bold text-[#17204E]">
                  {editingRenewal ? 'Edit Renewal' : 'Add New Renewal'}
                </h2>
                <button 
                  onClick={handleCloseModal}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex-1" style={{ maxHeight: 'calc(90vh - 140px)' }} data-lenis-prevent>
                <form id="renewal-form" onSubmit={handleSaveRenewal} className="space-y-6">
                  {submitError && (
                    <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg">
                      {submitError}
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                      <input 
                        type="text" 
                        required
                        value={formData.companyName || ''}
                        onChange={e => setFormData({...formData, companyName: e.target.value})}
                        className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#057AF8] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                      <input 
                        type="text" 
                        required
                        value={formData.clientName || ''}
                        onChange={e => setFormData({...formData, clientName: e.target.value})}
                        className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#057AF8] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Domain Name</label>
                      <input 
                        type="text" 
                        value={formData.domainName || ''}
                        onChange={e => setFormData({...formData, domainName: e.target.value})}
                        className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#057AF8] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#17204E] mb-2">Service Type</label>
                      <FilterSelect 
                        value={formData.serviceType || "Domain"}
                        onChange={(val) => setFormData({ ...formData, serviceType: val })}
                        options={SERVICE_TYPES}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Domain Provider</label>
                      <input 
                        type="text" 
                        value={formData.domainProvider || ''}
                        onChange={e => setFormData({...formData, domainProvider: e.target.value})}
                        className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#057AF8] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Server Provider</label>
                      <input 
                        type="text" 
                        value={formData.serverProvider || ''}
                        onChange={e => setFormData({...formData, serverProvider: e.target.value})}
                        className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#057AF8] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Plan Name</label>
                      <input 
                        type="text" 
                        value={formData.planName || ''}
                        onChange={e => setFormData({...formData, planName: e.target.value})}
                        className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#057AF8] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#17204E] mb-2">Billing Cycle</label>
                      <FilterSelect 
                        value={formData.billingCycle || "Yearly"}
                        onChange={(val) => setFormData({ ...formData, billingCycle: val })}
                        options={["Monthly", "Quarterly", "Semi-Annually", "Yearly", "Bi-Yearly"]}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
                      <input 
                        type="number" 
                        required
                        value={formData.amount || 0}
                        onChange={e => setFormData({...formData, amount: Number(e.target.value)})}
                        className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#057AF8] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                      <input 
                        type="date" 
                        required
                        value={formData.startDate ? formData.startDate.substring(0, 10) : ''}
                        onChange={e => setFormData({...formData, startDate: e.target.value})}
                        className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#057AF8] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                      <input 
                        type="date" 
                        required
                        value={formData.expiryDate ? formData.expiryDate.substring(0, 10) : ''}
                        onChange={e => setFormData({...formData, expiryDate: e.target.value})}
                        className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#057AF8] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#17204E] mb-2">Reminder Stage</label>
                      <FilterSelect 
                        value={formData.reminderStage || "Active"}
                        onChange={(val) => setFormData({ ...formData, reminderStage: val })}
                        options={STAGES}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#17204E] mb-2">Payment Status</label>
                      <FilterSelect 
                        value={formData.paymentStatus || "Pending"}
                        onChange={(val) => setFormData({ ...formData, paymentStatus: val })}
                        options={PAYMENT_STATUSES}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <textarea 
                      value={formData.notes || ''}
                      onChange={e => setFormData({...formData, notes: e.target.value})}
                      className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#057AF8] focus:border-transparent"
                      rows={2}
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
                  form="renewal-form"
                  type="submit"
                  disabled={isSaving}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#057AF8] hover:bg-blue-600 rounded-lg transition-colors shadow-sm disabled:opacity-70"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  Save Renewal
                </button>
              </div>
            </motion.div>
          </div>
        )}

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
              <h2 className="text-xl font-bold text-[#17204E] mb-2">Delete Renewal?</h2>
              <p className="text-gray-500 text-sm mb-6">
                Are you sure you want to delete this renewal? This action cannot be undone.
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
