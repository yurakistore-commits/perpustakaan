"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

// ============================================================
// STAT CARD
// ============================================================
interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
}

export function StatCard({ title, value, change, changeType = "neutral", icon: Icon, iconColor = "#A78BFA", iconBg }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card glass-card-hover p-5"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-[13px] text-[#9B97A8] font-medium">{title}</p>
          <p className="text-[28px] font-bold text-white leading-none">{value}</p>
          {change && (
            <p className={cn(
              "text-[12px] font-medium",
              changeType === "positive" && "text-[#34D399]",
              changeType === "negative" && "text-[#FB7185]",
              changeType === "neutral" && "text-[#9B97A8]"
            )}>
              {change}
            </p>
          )}
        </div>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: (iconBg || iconColor) + "15", color: iconColor }}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================
// CHART CARD WRAPPER
// ============================================================
interface ChartCardProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function ChartCard({ title, subtitle, action, children, className }: ChartCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("glass-card p-5", className)}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-[15px] font-semibold text-white">{title}</h3>
          {subtitle && <p className="text-[12px] text-[#6B6780] mt-0.5">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </motion.div>
  );
}

// ============================================================
// DATA TABLE
// ============================================================
interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
}

export function DataTable<T extends { id?: string }>({ columns, data, emptyMessage = "No data found" }: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/[0.06]">
            {columns.map((col, i) => (
              <th key={i} className={cn("text-left text-[12px] font-semibold text-[#6B6780] uppercase tracking-wider py-3 px-4", col.className)}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-12 text-[#6B6780] text-[14px]">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIdx) => (
              <tr key={row.id || rowIdx} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                {columns.map((col, colIdx) => (
                  <td key={colIdx} className={cn("py-3 px-4 text-[14px]", col.className)}>
                    {typeof col.accessor === "function"
                      ? col.accessor(row)
                      : (row[col.accessor] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

// ============================================================
// ACTIVITY ITEM
// ============================================================
interface ActivityItemProps {
  icon: LucideIcon;
  iconColor: string;
  title: string;
  description: string;
  time: string;
}

export function ActivityItem({ icon: Icon, iconColor, title, description, time }: ActivityItemProps) {
  return (
    <div className="flex items-start gap-3 py-3">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
        style={{ backgroundColor: iconColor + "15", color: iconColor }}
      >
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium text-white">{title}</p>
        <p className="text-[12px] text-[#6B6780] truncate">{description}</p>
      </div>
      <span className="text-[11px] text-[#6B6780] shrink-0">{time}</span>
    </div>
  );
}

// ============================================================
// EMPTY STATE
// ============================================================
interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[#7C3AED]/10 flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-[#7C3AED]" />
      </div>
      <h3 className="text-[16px] font-semibold text-white mb-1">{title}</h3>
      <p className="text-[13px] text-[#6B6780] max-w-sm mb-4">{description}</p>
      {action}
    </div>
  );
}

// ============================================================
// SKELETON LOADERS
// ============================================================
export function StatCardSkeleton() {
  return (
    <div className="glass-card p-5">
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <div className="skeleton w-24 h-4" />
          <div className="skeleton w-16 h-8" />
          <div className="skeleton w-20 h-3" />
        </div>
        <div className="skeleton w-10 h-10 rounded-xl" />
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="skeleton w-32 h-5" />
        <div className="skeleton w-20 h-4" />
      </div>
      <div className="skeleton w-full h-[200px] rounded-lg" />
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="glass-card overflow-hidden">
      <div className="p-5 border-b border-white/[0.06]">
        <div className="skeleton w-40 h-5" />
      </div>
      <div className="p-4 space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="skeleton w-8 h-8 rounded-full" />
            <div className="skeleton flex-1 h-4" />
            <div className="skeleton w-20 h-4" />
            <div className="skeleton w-16 h-6 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// BADGE
// ============================================================
type BadgeVariant = "success" | "warning" | "danger" | "info" | "primary" | "default";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = "default", children, className }: BadgeProps) {
  return (
    <span className={cn(
      "badge",
      variant === "success" && "badge-success",
      variant === "warning" && "badge-warning",
      variant === "danger" && "badge-danger",
      variant === "info" && "badge-info",
      variant === "primary" && "badge-primary",
      variant === "default" && "bg-white/[0.06] text-[#9B97A8]",
      className
    )}>
      {children}
    </span>
  );
}

// ============================================================
// MODAL
// ============================================================
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

export function Modal({ isOpen, onClose, title, children, size = "md" }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.15 }}
        className={cn(
          "relative glass-card p-6 w-full max-h-[85vh] overflow-y-auto",
          size === "sm" && "max-w-sm",
          size === "md" && "max-w-lg",
          size === "lg" && "max-w-2xl"
        )}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[17px] font-semibold text-white">{title}</h2>
          <button onClick={onClose} className="text-[#6B6780] hover:text-white transition-colors text-lg leading-none p-1">
            ✕
          </button>
        </div>
        {children}
      </motion.div>
    </div>
  );
}
