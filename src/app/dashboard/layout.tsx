"use client";

import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Sidebar, TopNavbar, MobileBottomNav } from "@/components/layouts/sidebar";
import { useAuthStore, DEMO_USERS } from "@/lib/stores";
import { useSidebarStore } from "@/lib/stores";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { setUser } = useAuthStore();
  const { isCollapsed } = useSidebarStore();

  // Initialize with demo super_admin user
  useEffect(() => {
    setUser(DEMO_USERS[0]);
  }, [setUser]);

  return (
    <div className="min-h-screen bg-[#0B0A10]">
      <Sidebar />
      <div className={cn(
        "transition-all duration-300",
        isCollapsed ? "lg:ml-[72px]" : "lg:ml-[260px]"
      )}>
        <TopNavbar />
        <main className="p-4 lg:p-6 pb-24 lg:pb-6">
          {children}
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}
