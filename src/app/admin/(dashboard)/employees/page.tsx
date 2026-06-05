"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, MoreVertical, Edit2, Trash2 } from "lucide-react";
import { FilterSelect } from "@/components/ui/FilterSelect";

const employees = [
  { id: 1, name: "Sarah Jenkins", role: "Lead Designer", department: "Design", status: "Active", email: "sarah.j@unlock360.com" },
  { id: 2, name: "Michael Chen", role: "Senior Developer", department: "Engineering", status: "Active", email: "michael.c@unlock360.com" },
  { id: 3, name: "Emily Rodriguez", role: "Project Manager", department: "Management", status: "On Leave", email: "emily.r@unlock360.com" },
  { id: 4, name: "David Kim", role: "UI/UX Designer", department: "Design", status: "Active", email: "david.k@unlock360.com" },
  { id: 5, name: "Jessica Smith", role: "Marketing Specialist", department: "Marketing", status: "Active", email: "jessica.s@unlock360.com" },
  { id: 6, name: "Robert Taylor", role: "Backend Developer", department: "Engineering", status: "Inactive", email: "robert.t@unlock360.com" },
];

export default function Employees() {
  const [filterDepartment, setFilterDepartment] = useState("All Departments");
  const [filterStatus, setFilterStatus] = useState("All Status");

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#17204E] mb-2">Employee Management</h1>
          <p className="text-gray-500">Manage your team members and their roles.</p>
        </div>
        <button className="bg-[#057AF8] hover:bg-blue-600 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors shadow-lg shadow-blue-500/20">
          <Plus className="w-4 h-4" />
          Add Employee
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col shadow-sm">
        {/* Table Header Area */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
          <div className="relative w-72">
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search employees..." 
              className="w-full bg-white border border-gray-200 rounded-lg py-2 pl-9 pr-4 text-sm text-[#17204E] placeholder:text-gray-400 focus:outline-none focus:border-[#057AF8] transition-colors"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <FilterSelect
              value={filterDepartment}
              onChange={setFilterDepartment}
              options={["Design", "Engineering", "Marketing"]}
              placeholder="All Departments"
            />
            <FilterSelect
              value={filterStatus}
              onChange={setFilterStatus}
              options={["Active", "Inactive", "On Leave"]}
              placeholder="All Status"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="text-xs uppercase bg-gray-50/50 border-b border-gray-200 text-gray-500">
              <tr>
                <th className="px-6 py-4 font-medium">Employee Name</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Department</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {employees.map((employee, idx) => (
                <motion.tr 
                  key={employee.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:bg-gray-50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#057AF8]/20 to-[#8EAAD1]/20 border border-[#057AF8]/20 flex items-center justify-center text-[#057AF8] font-bold text-xs">
                        {employee.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-medium text-[#17204E]">{employee.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{employee.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-700">{employee.role}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600">
                      {employee.department}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        employee.status === 'Active' ? 'bg-green-500' : 
                        employee.status === 'On Leave' ? 'bg-orange-500' : 'bg-gray-500'
                      }`} />
                      {employee.status}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-md transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors">
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
          <div>Showing 1 to 6 of 6 entries</div>
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
