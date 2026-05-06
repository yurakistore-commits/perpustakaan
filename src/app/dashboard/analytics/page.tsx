"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, BookOpen, Users, ArrowLeftRight, Calendar } from "lucide-react";
import { StatCard, ChartCard } from "@/components/ui/dashboard-components";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell,
  LineChart, Line,
} from "recharts";
import { monthlyBorrowData, categoryDistribution, weeklyActivity } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

const PIE_COLORS = ["#A78BFA", "#38BDF8", "#34D399", "#22D3EE", "#FB7185", "#FBBF24"];

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string }>; label?: string }) {
  if (!active || !payload) return null;
  return (
    <div className="glass-card p-3 text-[12px]">
      <p className="text-white font-medium mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-[#9B97A8]">{entry.name}: <span className="text-white font-medium">{entry.value}</span></p>
      ))}
    </div>
  );
}

const userGrowth = [
  { name: "Jan", value: 320 }, { name: "Feb", value: 345 }, { name: "Mar", value: 378 },
  { name: "Apr", value: 402 }, { name: "May", value: 428 }, { name: "Jun", value: 440 },
  { name: "Jul", value: 445 }, { name: "Aug", value: 460 }, { name: "Sep", value: 472 },
  { name: "Oct", value: 486 }, { name: "Nov", value: 492 }, { name: "Dec", value: 510 },
];

const topBooks = [
  { name: "Laskar Pelangi", borrows: 48 },
  { name: "Bumi Manusia", borrows: 35 },
  { name: "Sapiens", borrows: 31 },
  { name: "Clean Code", borrows: 28 },
  { name: "Fisika Dasar", borrows: 22 },
];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("year");

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } },
  };

  const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-[20px] font-bold text-white font-display">Analytics</h2>
          <p className="text-[13px] text-[#6B6780] mt-0.5">Library performance overview</p>
        </div>
        <div className="flex gap-1 bg-[#13111C] rounded-lg p-1 border border-white/[0.06]">
          {["week", "month", "year"].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={cn(
                "px-3 py-1.5 rounded-md text-[12px] font-medium transition-colors capitalize",
                period === p ? "bg-[#7C3AED]/15 text-[#A78BFA]" : "text-[#6B6780] hover:text-white"
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div variants={item}>
          <StatCard title="Total Borrows" value="724" change="+18% this month" changeType="positive" icon={ArrowLeftRight} iconColor="#A78BFA" />
        </motion.div>
        <motion.div variants={item}>
          <StatCard title="Active Members" value="342" change="+5% growth" changeType="positive" icon={Users} iconColor="#38BDF8" />
        </motion.div>
        <motion.div variants={item}>
          <StatCard title="Books Added" value="86" change="This year" changeType="neutral" icon={BookOpen} iconColor="#34D399" />
        </motion.div>
        <motion.div variants={item}>
          <StatCard title="Avg. Duration" value="10.5d" change="Average borrow days" changeType="neutral" icon={Calendar} iconColor="#FBBF24" />
        </motion.div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div variants={item}>
          <ChartCard title="Borrowing Trends" subtitle="Monthly borrowings over the year">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={monthlyBorrowData}>
                <defs>
                  <linearGradient id="gradAnalytics" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#7C3AED" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="name" tick={{ fill: "#6B6780", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#6B6780", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="value" name="Borrows" stroke="#7C3AED" fill="url(#gradAnalytics)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </motion.div>

        <motion.div variants={item}>
          <ChartCard title="User Growth" subtitle="Member registrations over time">
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={userGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="name" tick={{ fill: "#6B6780", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#6B6780", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="value" name="Members" stroke="#38BDF8" strokeWidth={2} dot={{ r: 3, fill: "#38BDF8" }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div variants={item}>
          <ChartCard title="Weekly Activity">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weeklyActivity}>
                <Bar dataKey="value" fill="#7C3AED" radius={[4, 4, 0, 0]} />
                <XAxis dataKey="name" tick={{ fill: "#6B6780", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </motion.div>

        <motion.div variants={item}>
          <ChartCard title="Category Distribution">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={categoryDistribution} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={4} strokeWidth={0}>
                  {categoryDistribution.map((_, i) => (<Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </motion.div>

        <motion.div variants={item}>
          <ChartCard title="Most Borrowed Books">
            <div className="space-y-3">
              {topBooks.map((book, i) => (
                <div key={book.name} className="flex items-center gap-3">
                  <span className="text-[12px] text-[#6B6780] w-5 text-center font-medium">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] text-white truncate">{book.name}</p>
                    <div className="mt-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${(book.borrows / 48) * 100}%`, backgroundColor: PIE_COLORS[i] }} />
                    </div>
                  </div>
                  <span className="text-[12px] text-[#9B97A8] font-medium">{book.borrows}</span>
                </div>
              ))}
            </div>
          </ChartCard>
        </motion.div>
      </div>
    </motion.div>
  );
}
