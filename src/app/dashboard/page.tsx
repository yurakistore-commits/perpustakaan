"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  BookOpen, Users, ArrowLeftRight, AlertTriangle,
  TrendingUp, Clock, BookMarked, DollarSign,
  ArrowUpRight, ArrowDownRight, Activity,
} from "lucide-react";
import { StatCard, ChartCard, ActivityItem, Badge, DataTable } from "@/components/ui/dashboard-components";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar,
} from "recharts";
import { monthlyBorrowData, categoryDistribution, weeklyActivity, demoBorrowings, demoAuditLogs } from "@/lib/demo-data";
import { formatDate, formatDateTime } from "@/lib/utils";
import type { Borrowing } from "@/types/database";

// ============================================================
// CUSTOM CHART TOOLTIP
// ============================================================
function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string }>; label?: string }) {
  if (!active || !payload) return null;
  return (
    <div className="glass-card p-3 text-[12px]">
      <p className="text-white font-medium mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-[#9B97A8]">
          {entry.name}: <span className="text-white font-medium">{entry.value}</span>
        </p>
      ))}
    </div>
  );
}

const PIE_COLORS = ["#A78BFA", "#38BDF8", "#34D399", "#22D3EE", "#FB7185", "#FBBF24"];

// ============================================================
// STATUS BADGE HELPER
// ============================================================
function statusBadge(status: string) {
  const map: Record<string, { variant: "success" | "warning" | "danger" | "info" | "primary"; label: string }> = {
    active: { variant: "info", label: "Active" },
    pending: { variant: "warning", label: "Pending" },
    returned: { variant: "success", label: "Returned" },
    overdue: { variant: "danger", label: "Overdue" },
    approved: { variant: "primary", label: "Approved" },
    rejected: { variant: "danger", label: "Rejected" },
  };
  const cfg = map[status] || { variant: "primary" as const, label: status };
  return <Badge variant={cfg.variant}>{cfg.label}</Badge>;
}

// ============================================================
// DASHBOARD PAGE
// ============================================================
export default function DashboardPage() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } },
  };

  const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div variants={item}>
          <StatCard
            title="Total Books"
            value="1,248"
            change="+12% from last month"
            changeType="positive"
            icon={BookOpen}
            iconColor="#A78BFA"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatCard
            title="Total Members"
            value="486"
            change="+8% from last month"
            changeType="positive"
            icon={Users}
            iconColor="#38BDF8"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatCard
            title="Active Borrows"
            value="67"
            change="14 pending approval"
            changeType="neutral"
            icon={ArrowLeftRight}
            iconColor="#34D399"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatCard
            title="Overdue"
            value="5"
            change="-2 from last week"
            changeType="positive"
            icon={AlertTriangle}
            iconColor="#FB7185"
          />
        </motion.div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Area Chart - Borrowing Overview */}
        <motion.div variants={item} className="lg:col-span-2">
          <ChartCard
            title="Borrowing Overview"
            subtitle="Monthly borrowings & returns"
            action={
              <div className="flex items-center gap-4 text-[12px]">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#7C3AED]" />
                  <span className="text-[#9B97A8]">Borrows</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#38BDF8]" />
                  <span className="text-[#9B97A8]">Returns</span>
                </div>
              </div>
            }
          >
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={monthlyBorrowData}>
                <defs>
                  <linearGradient id="gradBorrow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#7C3AED" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradReturn" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#38BDF8" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#38BDF8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="name" tick={{ fill: "#6B6780", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#6B6780", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="value" name="Borrows" stroke="#7C3AED" fill="url(#gradBorrow)" strokeWidth={2} />
                <Area type="monotone" dataKey="secondaryValue" name="Returns" stroke="#38BDF8" fill="url(#gradReturn)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </motion.div>

        {/* Pie Chart - Categories */}
        <motion.div variants={item}>
          <ChartCard title="Book Categories" subtitle="Distribution by genre">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  dataKey="value"
                  paddingAngle={4}
                  strokeWidth={0}
                >
                  {categoryDistribution.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-2">
              {categoryDistribution.map((cat, i) => (
                <div key={cat.name} className="flex items-center gap-2 text-[12px]">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: PIE_COLORS[i] }} />
                  <span className="text-[#9B97A8] truncate">{cat.name}</span>
                  <span className="text-white font-medium ml-auto">{cat.value}%</span>
                </div>
              ))}
            </div>
          </ChartCard>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Borrowings Table */}
        <motion.div variants={item} className="lg:col-span-2">
          <ChartCard title="Recent Borrowings" action={
            <button className="text-[12px] text-[#A78BFA] hover:text-white transition-colors font-medium">View All</button>
          }>
            <DataTable<Borrowing>
              columns={[
                {
                  header: "Member",
                  accessor: (row) => (
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-[#38BDF8]/10 text-[#38BDF8] flex items-center justify-center text-[11px] font-bold">
                        {row.user?.name?.charAt(0) || "?"}
                      </div>
                      <span className="text-white text-[13px]">{row.user?.name || "—"}</span>
                    </div>
                  ),
                },
                {
                  header: "Book",
                  accessor: (row) => <span className="text-[#9B97A8] text-[13px]">{row.book?.title || "—"}</span>,
                },
                {
                  header: "Due Date",
                  accessor: (row) => <span className="text-[#9B97A8] text-[13px]">{formatDate(row.due_date)}</span>,
                },
                {
                  header: "Status",
                  accessor: (row) => statusBadge(row.status),
                },
              ]}
              data={demoBorrowings}
            />
          </ChartCard>
        </motion.div>

        {/* Activity Feed + Weekly Chart */}
        <motion.div variants={item} className="space-y-4">
          {/* Weekly Activity */}
          <ChartCard title="Weekly Activity">
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={weeklyActivity}>
                <Bar dataKey="value" fill="#7C3AED" radius={[4, 4, 0, 0]} />
                <XAxis dataKey="name" tick={{ fill: "#6B6780", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Recent Activity Feed */}
          <ChartCard title="Recent Activity">
            <div className="space-y-1 divide-y divide-white/[0.04]">
              <ActivityItem icon={ArrowLeftRight} iconColor="#34D399" title="Borrow Approved" description="Laskar Pelangi → Rina Kartika" time="2h ago" />
              <ActivityItem icon={BookOpen} iconColor="#38BDF8" title="Book Added" description="Sapiens by Y.N. Harari" time="5h ago" />
              <ActivityItem icon={AlertTriangle} iconColor="#FB7185" title="Overdue Alert" description="Bumi Manusia - 21 days late" time="8h ago" />
              <ActivityItem icon={Users} iconColor="#A78BFA" title="New Member" description="Rina Kartika registered" time="1d ago" />
            </div>
          </ChartCard>
        </motion.div>
      </div>
    </motion.div>
  );
}
