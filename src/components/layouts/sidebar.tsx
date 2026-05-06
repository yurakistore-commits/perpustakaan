"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAuthStore, useSidebarStore, useSearchStore, useNotificationStore, getRoleName, getRoleColor } from "@/lib/stores";
import { getInitials, formatDate } from "@/lib/utils";
import {
  LayoutDashboard, BookOpen, FolderOpen, ArrowLeftRight,
  QrCode, Users, BarChart3, FileText, Bell,
  Activity, Settings, HelpCircle, ChevronLeft,
  Menu, X, LogOut, Search, MessageSquare, CheckCircle2, AlertTriangle,
} from "lucide-react";
import type { UserRole } from "@/types/database";

// ============================================================
// SIDEBAR MENU CONFIG
// ============================================================
interface MenuItem {
  label: string;
  icon: React.ElementType;
  href: string;
  badge?: number;
  roles: UserRole[];
}

const menuItems: MenuItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard", roles: ["super_admin", "admin", "teacher", "member"] },
  { label: "Books", icon: BookOpen, href: "/dashboard/books", roles: ["super_admin", "admin", "teacher", "member"] },
  { label: "Categories", icon: FolderOpen, href: "/dashboard/categories", roles: ["super_admin", "admin"] },
  { label: "Borrowings", icon: ArrowLeftRight, href: "/dashboard/borrowings", roles: ["super_admin", "admin", "teacher", "member"] },
  { label: "QR Scanner", icon: QrCode, href: "/dashboard/qr-scanner", roles: ["super_admin", "admin", "teacher"] },
  { label: "Members", icon: Users, href: "/dashboard/members", roles: ["super_admin", "admin", "teacher"] },
  { label: "Analytics", icon: BarChart3, href: "/dashboard/analytics", roles: ["super_admin", "admin", "teacher"] },
  { label: "Reports", icon: FileText, href: "/dashboard/reports", roles: ["super_admin", "admin"] },
  { label: "Messages", icon: MessageSquare, href: "/dashboard/messages", badge: 3, roles: ["super_admin", "admin", "teacher"] },
  { label: "Activity Logs", icon: Activity, href: "/dashboard/activity", roles: ["super_admin", "admin"] },
  { label: "Settings", icon: Settings, href: "/dashboard/settings", roles: ["super_admin"] },
  { label: "Help", icon: HelpCircle, href: "/dashboard/help", roles: ["super_admin", "admin", "teacher", "member"] },
];

// ============================================================
// SIDEBAR COMPONENT
// ============================================================
export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const { isOpen, isCollapsed, setOpen, setCollapsed } = useSidebarStore();
  const userRole = user?.role || "member";

  const filteredMenu = menuItems.filter((item) => item.roles.includes(userRole));

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={cn(
          "fixed left-0 top-0 h-full z-50 flex flex-col",
          "bg-[#0F0D17] border-r border-white/[0.06]",
          "transition-all duration-300 ease-in-out",
          isCollapsed ? "w-[72px]" : "w-[260px]",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Header */}
        <div className={cn(
          "flex items-center h-[64px] px-4 border-b border-white/[0.06]",
          isCollapsed ? "justify-center" : "justify-between"
        )}>
          {!isCollapsed && (
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#38BDF8] flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-[15px] text-white">PerpusDigital</span>
            </Link>
          )}
          {isCollapsed && (
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#38BDF8] flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
          )}
          <button
            onClick={() => setCollapsed(!isCollapsed)}
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-md hover:bg-white/[0.06] text-[#6B6780] hover:text-white transition-colors"
          >
            <ChevronLeft className={cn("w-4 h-4 transition-transform", isCollapsed && "rotate-180")} />
          </button>
          <button onClick={() => setOpen(false)} className="lg:hidden text-[#6B6780] hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {filteredMenu.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn("sidebar-item group", isActive && "active", isCollapsed && "justify-center px-0")}
                title={isCollapsed ? item.label : undefined}
              >
                <item.icon className={cn("w-[18px] h-[18px] shrink-0", isActive && "text-[#A78BFA]")} />
                {!isCollapsed && (
                  <>
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-[#7C3AED]/20 text-[#A78BFA] text-[11px] font-semibold flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className={cn("border-t border-white/[0.06] p-3", isCollapsed && "flex justify-center")}>
          <div className={cn("flex items-center gap-3", isCollapsed && "flex-col")}>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-bold shrink-0"
              style={{ backgroundColor: getRoleColor(userRole) + "20", color: getRoleColor(userRole) }}
            >
              {getInitials(user?.name || "User")}
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-white truncate">{user?.name || "User"}</p>
                <p className="text-[11px] text-[#6B6780]">{getRoleName(userRole)}</p>
              </div>
            )}
            {!isCollapsed && (
              <button className="text-[#6B6780] hover:text-[#FB7185] transition-colors p-1.5 rounded-md hover:bg-white/[0.04]">
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </motion.aside>
    </>
  );
}

// ============================================================
// TOP NAVBAR
// ============================================================
export function TopNavbar() {
  const { user } = useAuthStore();
  const { setOpen } = useSidebarStore();
  const pathname = usePathname();

  const searchOpen = useSearchStore((s) => s.isOpen);
  const setSearchOpen = useSearchStore((s) => s.setOpen);
  const searchQuery = useSearchStore((s) => s.query);
  const setSearchQuery = useSearchStore((s) => s.setQuery);

  const notifOpen = useNotificationStore((s) => s.isOpen);
  const setNotifOpen = useNotificationStore((s) => s.setOpen);
  const unreadCount = useNotificationStore((s) => s.unreadCount);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen(!searchOpen);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [searchOpen, setSearchOpen]);

  const pageTitle = menuItems.find(
    (item) => pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))
  )?.label || "Dashboard";

  return (
    <>
      <header className={cn(
        "h-[64px] border-b border-white/[0.06] bg-[#0B0A10]/80 backdrop-blur-xl",
        "flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30"
      )}>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden text-[#9B97A8] hover:text-white transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-[18px] font-semibold text-white font-display">{pageTitle}</h1>
        </div>

        <div className="flex items-center gap-2">
          {/* Search shortcut */}
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[#6B6780] hover:text-[#9B97A8] hover:border-white/[0.1] transition-all text-[13px]"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search...</span>
            <kbd className="ml-4 px-1.5 py-0.5 rounded bg-white/[0.06] text-[11px] font-mono">⌘K</kbd>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative p-2 rounded-lg text-[#9B97A8] hover:text-white hover:bg-white/[0.04] transition-all"
            >
              <Bell className="w-[18px] h-[18px]" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-[#FB7185] border-2 border-[#0B0A10]" />
              )}
            </button>
            <NotificationDropdown />
          </div>

          {/* User avatar */}
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold ml-1 cursor-pointer"
            style={{ backgroundColor: getRoleColor(user?.role || "member") + "20", color: getRoleColor(user?.role || "member") }}
          >
            {getInitials(user?.name || "User")}
          </div>
        </div>
      </header>

      {/* Spotlight Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[10vh] p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSearchOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="relative w-full max-w-lg glass-card overflow-hidden"
            >
              <div className="flex items-center px-4 py-3 border-b border-white/[0.06]">
                <Search className="w-5 h-5 text-[#6B6780] mr-3" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search books, members, or actions..."
                  className="flex-1 bg-transparent border-none outline-none text-[15px] text-white placeholder:text-[#6B6780]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-white/[0.06] text-[#6B6780] text-[10px] font-mono">ESC</kbd>
              </div>
              <div className="p-2 max-h-[60vh] overflow-y-auto">
                {searchQuery.length === 0 ? (
                  <div className="py-8 text-center text-[#6B6780] text-[13px]">
                    Type to start searching...
                  </div>
                ) : (
                  <div className="py-8 text-center text-[#6B6780] text-[13px]">
                    No results found for "{searchQuery}"
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

// ============================================================
// NOTIFICATION DROPDOWN
// ============================================================
function NotificationDropdown() {
  const { notifications, unreadCount, isOpen, setOpen, markAsRead, markAllAsRead } = useNotificationStore();

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
      <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.95 }}
        transition={{ duration: 0.15 }}
        className="absolute right-0 top-full mt-2 w-80 sm:w-96 glass-card shadow-2xl z-50 overflow-hidden"
      >
        <div className="flex items-center justify-between p-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <h3 className="text-[15px] font-semibold text-white">Notifications</h3>
            {unreadCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-md bg-[#7C3AED]/20 text-[#A78BFA] text-[10px] font-bold">
                {unreadCount} New
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-[12px] text-[#A78BFA] hover:text-white transition-colors"
            >
              Mark all as read
            </button>
          )}
        </div>
        <div className="max-h-[360px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-[#6B6780] text-[13px]">
              <Bell className="w-8 h-8 mx-auto mb-3 text-white/[0.1]" />
              No notifications yet
            </div>
          ) : (
            <div className="divide-y divide-white/[0.04]">
              {notifications.map((notif) => {
                const Icon = notif.type === "borrow" ? BookOpen : notif.type === "return" ? ArrowLeftRight : notif.type === "alert" ? AlertTriangle : Bell;
                const iconColor = notif.type === "borrow" ? "#38BDF8" : notif.type === "return" ? "#34D399" : notif.type === "alert" ? "#FB7185" : "#A78BFA";
                
                return (
                  <div
                    key={notif.id}
                    className={cn(
                      "p-4 flex gap-3 hover:bg-white/[0.02] transition-colors cursor-pointer",
                      !notif.is_read && "bg-[#7C3AED]/5"
                    )}
                    onClick={() => {
                      if (!notif.is_read) markAsRead(notif.id);
                    }}
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: iconColor + "15", color: iconColor }}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={cn("text-[13px] mb-0.5", !notif.is_read ? "font-semibold text-white" : "font-medium text-[#E5E3EC]")}>
                        {notif.title}
                      </p>
                      <p className="text-[12px] text-[#9B97A8] line-clamp-2 mb-1">{notif.message}</p>
                      <p className="text-[10px] text-[#6B6780]">{formatDate(notif.created_at)}</p>
                    </div>
                    {!notif.is_read && (
                      <div className="w-2 h-2 rounded-full bg-[#7C3AED] shrink-0 mt-1" />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="p-2 border-t border-white/[0.06]">
          <button className="w-full py-2 text-center text-[12px] text-[#6B6780] hover:text-white transition-colors">
            View all notifications
          </button>
        </div>
      </motion.div>
    </>
  );
}

// ============================================================
// MOBILE BOTTOM NAVIGATION
// ============================================================
const mobileNavItems = [
  { label: "Home", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Books", icon: BookOpen, href: "/dashboard/books" },
  { label: "Scan", icon: QrCode, href: "/dashboard/qr-scanner" },
  { label: "Borrows", icon: ArrowLeftRight, href: "/dashboard/borrowings" },
  { label: "Profile", icon: Users, href: "/dashboard/settings" },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#0F0D17]/95 backdrop-blur-xl border-t border-white/[0.06]">
      <div className="flex items-center justify-around h-[60px] px-2">
        {mobileNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all",
                isActive ? "text-[#A78BFA]" : "text-[#6B6780]"
              )}
            >
              {item.label === "Scan" ? (
                <div className={cn(
                  "w-10 h-10 -mt-5 rounded-xl flex items-center justify-center",
                  "bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] text-white shadow-lg shadow-[#7C3AED]/25"
                )}>
                  <item.icon className="w-5 h-5" />
                </div>
              ) : (
                <item.icon className="w-5 h-5" />
              )}
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
