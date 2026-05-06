"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Activity, LogIn, BookOpen, UserPlus, QrCode, Shield, Settings } from "lucide-react";
import { Badge } from "@/components/ui/dashboard-components";
import { demoAuditLogs } from "@/lib/demo-data";
import { formatDateTime, getInitials } from "@/lib/utils";
import { getRoleColor } from "@/lib/stores";
import { cn } from "@/lib/utils";
import type { AuditLog } from "@/types/database";

const actionIcons: Record<string, { icon: React.ElementType; color: string }> = {
  login: { icon: LogIn, color: "#34D399" },
  "borrow.approve": { icon: BookOpen, color: "#38BDF8" },
  "book.create": { icon: BookOpen, color: "#A78BFA" },
  "borrow.request": { icon: QrCode, color: "#FBBF24" },
  "user.create": { icon: UserPlus, color: "#22D3EE" },
  "settings.update": { icon: Settings, color: "#E879F9" },
};

const extendedLogs: AuditLog[] = [
  ...demoAuditLogs,
  { id: "al-5", user_id: "1", action: "settings.update", table_name: "settings", record_id: null, details: { key: "borrow_duration_days", value: "14" }, ip_address: "192.168.1.100", user_agent: "Chrome/125", created_at: "2026-05-04T18:00:00Z", user: { id: "1", email: "admin@perpustakaan.id", name: "Ahmad Supardi", role: "super_admin", avatar_url: null, qr_code: null, phone: null, class_name: null, is_active: true, last_login: null, created_at: "", updated_at: "" } },
  { id: "al-6", user_id: "3", action: "login", table_name: null, record_id: null, details: { method: "email" }, ip_address: "192.168.1.200", user_agent: "Safari/17", created_at: "2026-05-04T08:30:00Z", user: { id: "3", email: "guru@perpustakaan.id", name: "Budi Santoso", role: "teacher", avatar_url: null, qr_code: null, phone: null, class_name: null, is_active: true, last_login: null, created_at: "", updated_at: "" } },
];

export default function ActivityPage() {
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState("all");

  const filtered = extendedLogs.filter((log) => {
    const matchSearch = log.user?.name?.toLowerCase().includes(search.toLowerCase()) || log.action.toLowerCase().includes(search.toLowerCase());
    const matchAction = actionFilter === "all" || log.action.startsWith(actionFilter);
    return matchSearch && matchAction;
  });

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-[20px] font-bold text-white font-display">Activity Logs</h2>
        <p className="text-[13px] text-[#6B6780] mt-0.5">Track all system activity and user actions</p>
      </div>

      {/* Filters */}
      <div className="glass-card p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6780]" />
            <input type="text" placeholder="Search activity..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-field pl-10" />
          </div>
          <select value={actionFilter} onChange={(e) => setActionFilter(e.target.value)} className="input-field w-full sm:w-44">
            <option value="all">All Actions</option>
            <option value="login">Login</option>
            <option value="borrow">Borrowing</option>
            <option value="book">Books</option>
            <option value="user">Users</option>
            <option value="settings">Settings</option>
          </select>
        </div>
      </div>

      {/* Timeline */}
      <div className="glass-card p-5">
        <div className="space-y-1">
          {filtered.map((log, i) => {
            const actionCfg = actionIcons[log.action] || { icon: Activity, color: "#9B97A8" };
            const Icon = actionCfg.icon;
            return (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className="flex items-start gap-4 py-4 border-b border-white/[0.04] last:border-0"
              >
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: actionCfg.color + "15", color: actionCfg.color }}>
                    <Icon className="w-4 h-4" />
                  </div>
                  {i < filtered.length - 1 && <div className="w-px h-full bg-white/[0.06] mt-2" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold"
                          style={{ backgroundColor: getRoleColor(log.user?.role || "member") + "20", color: getRoleColor(log.user?.role || "member") }}
                        >
                          {getInitials(log.user?.name || "?")}
                        </div>
                        <span className="text-[13px] font-medium text-white">{log.user?.name}</span>
                        <Badge variant="primary">{log.action}</Badge>
                      </div>
                      {log.details && (
                        <p className="text-[12px] text-[#6B6780] mt-1">
                          {Object.entries(log.details).map(([k, v]) => `${k}: ${v}`).join(" · ")}
                        </p>
                      )}
                      {(log.ip_address || log.user_agent) && (
                        <p className="text-[11px] text-[#6B6780]/60 mt-1">
                          {log.ip_address} {log.user_agent && `· ${log.user_agent}`}
                        </p>
                      )}
                    </div>
                    <span className="text-[11px] text-[#6B6780] shrink-0 mt-0.5">{formatDateTime(log.created_at)}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
