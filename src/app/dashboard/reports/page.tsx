"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Download, Calendar, Filter, BarChart3, BookOpen, Users, DollarSign } from "lucide-react";
import { ChartCard, Badge } from "@/components/ui/dashboard-components";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";
import { monthlyBorrowData } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

const reportTypes = [
  { id: "borrow", name: "Borrowing Report", icon: BookOpen, color: "#A78BFA", description: "Monthly borrowing & return statistics" },
  { id: "members", name: "Member Report", icon: Users, color: "#38BDF8", description: "User registration & activity analysis" },
  { id: "fines", name: "Fine Report", icon: DollarSign, color: "#FB7185", description: "Overdue fines and payment tracking" },
  { id: "books", name: "Book Inventory", icon: BookOpen, color: "#34D399", description: "Stock levels and availability report" },
  { id: "analytics", name: "Analytics Report", icon: BarChart3, color: "#FBBF24", description: "Comprehensive library analytics" },
];

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (!active || !payload) return null;
  return (
    <div className="glass-card p-3 text-[12px]">
      <p className="text-white font-medium">{label}: {payload[0]?.value}</p>
    </div>
  );
}

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState("borrow");
  const [dateRange, setDateRange] = useState("this-month");

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-[20px] font-bold text-white font-display">Reports</h2>
          <p className="text-[13px] text-[#6B6780] mt-0.5">Generate and export library reports</p>
        </div>
        <div className="flex gap-2">
          <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} className="input-field w-40">
            <option value="this-week">This Week</option>
            <option value="this-month">This Month</option>
            <option value="this-year">This Year</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
      </div>

      {/* Report Type Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
        {reportTypes.map((report) => (
          <motion.button
            key={report.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setSelectedReport(report.id)}
            className={cn(
              "glass-card p-4 text-left transition-all",
              selectedReport === report.id && "border-[#7C3AED]/30 shadow-lg shadow-[#7C3AED]/5"
            )}
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: report.color + "15", color: report.color }}>
              <report.icon className="w-4 h-4" />
            </div>
            <p className="text-[13px] font-semibold text-white mb-0.5">{report.name}</p>
            <p className="text-[11px] text-[#6B6780] line-clamp-2">{report.description}</p>
          </motion.button>
        ))}
      </div>

      {/* Report Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <ChartCard title="Report Preview" subtitle="Borrowing statistics for selected period">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monthlyBorrowData}>
                <XAxis dataKey="name" tick={{ fill: "#6B6780", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#6B6780", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" fill="#7C3AED" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <div className="space-y-4">
          <div className="glass-card p-5 space-y-4">
            <h3 className="text-[15px] font-semibold text-white">Summary</h3>
            <div className="space-y-3">
              {[
                { label: "Total Borrows", value: "724", color: "#A78BFA" },
                { label: "Total Returns", value: "668", color: "#34D399" },
                { label: "Overdue", value: "12", color: "#FB7185" },
                { label: "Fines Collected", value: "Rp 156.000", color: "#FBBF24" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                  <span className="text-[13px] text-[#9B97A8]">{stat.label}</span>
                  <span className="text-[14px] font-semibold" style={{ color: stat.color }}>{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-5 space-y-3">
            <h3 className="text-[15px] font-semibold text-white">Export</h3>
            <button className="btn-primary w-full flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              Export as PDF
            </button>
            <button className="btn-secondary w-full flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              Export as Excel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
