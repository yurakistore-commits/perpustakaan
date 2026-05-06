"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Check, X, Clock, ArrowLeftRight, BookOpen } from "lucide-react";
import { Badge, ChartCard } from "@/components/ui/dashboard-components";
import { demoBorrowings } from "@/lib/demo-data";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

const statusFilters = ["all", "pending", "active", "overdue", "returned"] as const;

function statusConfig(status: string) {
  const map: Record<string, { variant: "success" | "warning" | "danger" | "info" | "primary"; label: string }> = {
    active: { variant: "info", label: "Active" },
    pending: { variant: "warning", label: "Pending" },
    returned: { variant: "success", label: "Returned" },
    overdue: { variant: "danger", label: "Overdue" },
    approved: { variant: "primary", label: "Approved" },
    rejected: { variant: "danger", label: "Rejected" },
  };
  return map[status] || { variant: "primary" as const, label: status };
}

export default function BorrowingsPage() {
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filtered = demoBorrowings.filter((b) => {
    const matchFilter = filter === "all" || b.status === filter;
    const matchSearch =
      b.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      b.book?.title?.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const counts = {
    all: demoBorrowings.length,
    pending: demoBorrowings.filter((b) => b.status === "pending").length,
    active: demoBorrowings.filter((b) => b.status === "active").length,
    overdue: demoBorrowings.filter((b) => b.status === "overdue").length,
    returned: demoBorrowings.filter((b) => b.status === "returned").length,
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-[20px] font-bold text-white font-display">Borrowings</h2>
        <p className="text-[13px] text-[#6B6780] mt-0.5">Manage book borrowing and returns</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Pending", value: counts.pending, color: "#FBBF24", icon: Clock },
          { label: "Active", value: counts.active, color: "#38BDF8", icon: ArrowLeftRight },
          { label: "Overdue", value: counts.overdue, color: "#FB7185", icon: X },
          { label: "Returned", value: counts.returned, color: "#34D399", icon: Check },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-4 flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: stat.color + "15", color: stat.color }}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[22px] font-bold text-white">{stat.value}</p>
              <p className="text-[12px] text-[#6B6780]">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filter & Search */}
      <div className="glass-card p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6780]" />
            <input
              type="text"
              placeholder="Search by member or book..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <div className="flex gap-1 bg-[#0B0A10] rounded-lg p-1 border border-white/[0.06] overflow-x-auto">
            {statusFilters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-3 py-1.5 rounded-md text-[12px] font-medium transition-colors whitespace-nowrap capitalize",
                  filter === f ? "bg-[#7C3AED]/15 text-[#A78BFA]" : "text-[#6B6780] hover:text-white"
                )}
              >
                {f} ({counts[f as keyof typeof counts] || 0})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left text-[12px] font-semibold text-[#6B6780] uppercase tracking-wider py-3 px-4">Member</th>
                <th className="text-left text-[12px] font-semibold text-[#6B6780] uppercase tracking-wider py-3 px-4">Book</th>
                <th className="text-left text-[12px] font-semibold text-[#6B6780] uppercase tracking-wider py-3 px-4 hidden md:table-cell">Borrow Date</th>
                <th className="text-left text-[12px] font-semibold text-[#6B6780] uppercase tracking-wider py-3 px-4">Due Date</th>
                <th className="text-left text-[12px] font-semibold text-[#6B6780] uppercase tracking-wider py-3 px-4">Status</th>
                <th className="text-left text-[12px] font-semibold text-[#6B6780] uppercase tracking-wider py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((borrow) => {
                const cfg = statusConfig(borrow.status);
                return (
                  <tr key={borrow.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-[#38BDF8]/10 text-[#38BDF8] flex items-center justify-center text-[11px] font-bold shrink-0">
                          {borrow.user?.name?.charAt(0)}
                        </div>
                        <div>
                          <p className="text-[13px] font-medium text-white">{borrow.user?.name}</p>
                          <p className="text-[11px] text-[#6B6780]">{borrow.user?.class_name || borrow.user?.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-[13px] text-[#9B97A8]">{borrow.book?.title}</td>
                    <td className="py-3 px-4 text-[13px] text-[#9B97A8] hidden md:table-cell">{formatDate(borrow.borrow_date)}</td>
                    <td className="py-3 px-4 text-[13px] text-[#9B97A8]">{formatDate(borrow.due_date)}</td>
                    <td className="py-3 px-4"><Badge variant={cfg.variant}>{cfg.label}</Badge></td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        {borrow.status === "pending" && (
                          <>
                            <button className="p-1.5 rounded-md text-[#34D399] hover:bg-[#34D399]/10 transition-colors" title="Approve">
                              <Check className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 rounded-md text-[#FB7185] hover:bg-[#FB7185]/10 transition-colors" title="Reject">
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        {(borrow.status === "active" || borrow.status === "overdue") && (
                          <button className="px-3 py-1 rounded-md text-[12px] font-medium bg-[#34D399]/10 text-[#34D399] hover:bg-[#34D399]/20 transition-colors">
                            Return
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
