"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus, UserPlus, Edit, MoreHorizontal, Shield, BookOpen, Mail } from "lucide-react";
import { Badge, Modal } from "@/components/ui/dashboard-components";
import { DEMO_USERS, getRoleName, getRoleColor } from "@/lib/stores";
import { getInitials, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types/database";

const additionalMembers = [
  { id: "5", name: "Dimas Pratama", email: "dimas@school.id", role: "member" as UserRole, class_name: "XI IPA 2", is_active: true, created_at: "2024-08-01T00:00:00Z" },
  { id: "6", name: "Putri Wulandari", email: "putri@school.id", role: "member" as UserRole, class_name: "XII IPS 1", is_active: true, created_at: "2024-07-15T00:00:00Z" },
  { id: "7", name: "Andi Setiawan", email: "andi@school.id", role: "member" as UserRole, class_name: "X IPA 1", is_active: false, created_at: "2024-09-01T00:00:00Z" },
  { id: "8", name: "Dewi Lestari", email: "dewi@school.id", role: "teacher" as UserRole, class_name: null, is_active: true, created_at: "2024-03-15T00:00:00Z" },
];

const allUsers = [...DEMO_USERS, ...additionalMembers.map((m) => ({ ...m, avatar_url: null, qr_code: null, phone: null, last_login: null, updated_at: m.created_at }))];

export default function MembersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = allUsers.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const roleBadge = (role: UserRole) => {
    const variants: Record<UserRole, "primary" | "info" | "success" | "warning"> = {
      super_admin: "primary",
      admin: "info",
      teacher: "success",
      member: "warning",
    };
    return <Badge variant={variants[role]}>{getRoleName(role)}</Badge>;
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-[20px] font-bold text-white font-display">Members</h2>
          <p className="text-[13px] text-[#6B6780] mt-0.5">{allUsers.length} registered users</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn-primary flex items-center gap-2 w-fit">
          <UserPlus className="w-4 h-4" />
          Add Member
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {(["super_admin", "admin", "teacher", "member"] as UserRole[]).map((role) => {
          const count = allUsers.filter((u) => u.role === role).length;
          return (
            <motion.div key={role} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: getRoleColor(role) + "15", color: getRoleColor(role) }}>
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[22px] font-bold text-white">{count}</p>
                <p className="text-[12px] text-[#6B6780]">{getRoleName(role)}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Filter */}
      <div className="glass-card p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6780]" />
            <input type="text" placeholder="Search members..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-field pl-10" />
          </div>
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="input-field w-full sm:w-44">
            <option value="all">All Roles</option>
            <option value="super_admin">Super Admin</option>
            <option value="admin">Admin</option>
            <option value="teacher">Teacher</option>
            <option value="member">Member</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left text-[12px] font-semibold text-[#6B6780] uppercase tracking-wider py-3 px-4">User</th>
                <th className="text-left text-[12px] font-semibold text-[#6B6780] uppercase tracking-wider py-3 px-4 hidden md:table-cell">Email</th>
                <th className="text-left text-[12px] font-semibold text-[#6B6780] uppercase tracking-wider py-3 px-4">Role</th>
                <th className="text-left text-[12px] font-semibold text-[#6B6780] uppercase tracking-wider py-3 px-4 hidden md:table-cell">Class</th>
                <th className="text-left text-[12px] font-semibold text-[#6B6780] uppercase tracking-wider py-3 px-4">Status</th>
                <th className="text-left text-[12px] font-semibold text-[#6B6780] uppercase tracking-wider py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr key={user.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
                        style={{ backgroundColor: getRoleColor(user.role) + "15", color: getRoleColor(user.role) }}
                      >
                        {getInitials(user.name)}
                      </div>
                      <span className="text-[13px] font-medium text-white">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-[13px] text-[#9B97A8] hidden md:table-cell">{user.email}</td>
                  <td className="py-3 px-4">{roleBadge(user.role)}</td>
                  <td className="py-3 px-4 text-[13px] text-[#9B97A8] hidden md:table-cell">{user.class_name || "—"}</td>
                  <td className="py-3 px-4">
                    <Badge variant={user.is_active ? "success" : "danger"}>
                      {user.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-md text-[#6B6780] hover:text-[#38BDF8] hover:bg-[#38BDF8]/10 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-md text-[#6B6780] hover:text-[#9B97A8] hover:bg-white/[0.04] transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Member Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Member">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowAddModal(false); }}>
          <div>
            <label className="text-[12px] text-[#6B6780] uppercase tracking-wider mb-1.5 block">Full Name *</label>
            <input type="text" className="input-field" placeholder="Full name" required />
          </div>
          <div>
            <label className="text-[12px] text-[#6B6780] uppercase tracking-wider mb-1.5 block">Email *</label>
            <input type="email" className="input-field" placeholder="email@school.id" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[12px] text-[#6B6780] uppercase tracking-wider mb-1.5 block">Role</label>
              <select className="input-field">
                <option value="member">Member</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div>
              <label className="text-[12px] text-[#6B6780] uppercase tracking-wider mb-1.5 block">Class</label>
              <input type="text" className="input-field" placeholder="XII IPA 1" />
            </div>
          </div>
          <div>
            <label className="text-[12px] text-[#6B6780] uppercase tracking-wider mb-1.5 block">Password *</label>
            <input type="password" className="input-field" placeholder="Minimum 8 characters" required />
          </div>
          <div className="flex gap-3 pt-3">
            <button type="submit" className="btn-primary flex-1">Create Member</button>
            <button type="button" onClick={() => setShowAddModal(false)} className="btn-secondary">Cancel</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
