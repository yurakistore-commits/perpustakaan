"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Save, Globe, BookOpen, Shield, Bell, Database, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "general", label: "General", icon: Globe },
  { id: "library", label: "Library", icon: BookOpen },
  { id: "security", label: "Security", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[20px] font-bold text-white font-display">Settings</h2>
          <p className="text-[13px] text-[#6B6780] mt-0.5">System configuration</p>
        </div>
        <button onClick={handleSave} className={cn("btn-primary flex items-center gap-2", saved && "bg-[#34D399] border-[#34D399]/30")}>
          <Save className="w-4 h-4" />
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#13111C] rounded-lg p-1 border border-white/[0.06] overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-md text-[13px] font-medium transition-colors whitespace-nowrap",
              activeTab === tab.id ? "bg-[#7C3AED]/15 text-[#A78BFA]" : "text-[#6B6780] hover:text-white"
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Settings Content */}
      <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 space-y-6">
        {activeTab === "general" && (
          <>
            <div>
              <h3 className="text-[15px] font-semibold text-white mb-4">General Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-[12px] text-[#6B6780] uppercase tracking-wider mb-1.5 block">Library Name</label>
                  <input type="text" className="input-field max-w-lg" defaultValue="Perpustakaan Digital Ahmad" />
                </div>
                <div>
                  <label className="text-[12px] text-[#6B6780] uppercase tracking-wider mb-1.5 block">Library Description</label>
                  <textarea className="input-field max-w-lg min-h-[80px] resize-none" defaultValue="Digital library management system for modern schools." />
                </div>
                <div>
                  <label className="text-[12px] text-[#6B6780] uppercase tracking-wider mb-1.5 block">Contact Email</label>
                  <input type="email" className="input-field max-w-lg" defaultValue="admin@perpustakaan.id" />
                </div>
                <div>
                  <label className="text-[12px] text-[#6B6780] uppercase tracking-wider mb-1.5 block">Timezone</label>
                  <select className="input-field max-w-lg">
                    <option>Asia/Jakarta (WIB)</option>
                    <option>Asia/Makassar (WITA)</option>
                    <option>Asia/Jayapura (WIT)</option>
                  </select>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "library" && (
          <>
            <div>
              <h3 className="text-[15px] font-semibold text-white mb-4">Library Settings</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
                  <div>
                    <label className="text-[12px] text-[#6B6780] uppercase tracking-wider mb-1.5 block">Borrow Duration (Days)</label>
                    <input type="number" className="input-field" defaultValue={14} />
                  </div>
                  <div>
                    <label className="text-[12px] text-[#6B6780] uppercase tracking-wider mb-1.5 block">Max Borrows Per User</label>
                    <input type="number" className="input-field" defaultValue={3} />
                  </div>
                  <div>
                    <label className="text-[12px] text-[#6B6780] uppercase tracking-wider mb-1.5 block">Fine Per Day (IDR)</label>
                    <input type="number" className="input-field" defaultValue={1000} />
                  </div>
                  <div>
                    <label className="text-[12px] text-[#6B6780] uppercase tracking-wider mb-1.5 block">Grace Period (Days)</label>
                    <input type="number" className="input-field" defaultValue={1} />
                  </div>
                </div>
                <div className="flex items-center justify-between max-w-lg py-3 border-t border-white/[0.06]">
                  <div>
                    <p className="text-[13px] text-white font-medium">Allow E-book Download</p>
                    <p className="text-[11px] text-[#6B6780]">Members can download PDF books</p>
                  </div>
                  <button className="w-11 h-6 rounded-full bg-[#7C3AED] p-0.5 transition-colors">
                    <div className="w-5 h-5 rounded-full bg-white transform translate-x-5 transition-transform" />
                  </button>
                </div>
                <div className="flex items-center justify-between max-w-lg py-3 border-t border-white/[0.06]">
                  <div>
                    <p className="text-[13px] text-white font-medium">Auto Fine Calculation</p>
                    <p className="text-[11px] text-[#6B6780]">Automatically calculate fines for overdue books</p>
                  </div>
                  <button className="w-11 h-6 rounded-full bg-[#7C3AED] p-0.5 transition-colors">
                    <div className="w-5 h-5 rounded-full bg-white transform translate-x-5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "security" && (
          <>
            <div>
              <h3 className="text-[15px] font-semibold text-white mb-4">Security Settings</h3>
              <div className="space-y-4 max-w-lg">
                <div className="flex items-center justify-between py-3 border-b border-white/[0.06]">
                  <div>
                    <p className="text-[13px] text-white font-medium">Two-Factor Authentication</p>
                    <p className="text-[11px] text-[#6B6780]">Require 2FA for admin accounts</p>
                  </div>
                  <button className="w-11 h-6 rounded-full bg-[#1A1726] p-0.5 transition-colors border border-white/[0.06]">
                    <div className="w-5 h-5 rounded-full bg-[#6B6780] transition-transform" />
                  </button>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/[0.06]">
                  <div>
                    <p className="text-[13px] text-white font-medium">Session Timeout</p>
                    <p className="text-[11px] text-[#6B6780]">Auto-logout after inactivity</p>
                  </div>
                  <select className="input-field w-32">
                    <option>30 minutes</option>
                    <option>1 hour</option>
                    <option>4 hours</option>
                    <option>Never</option>
                  </select>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/[0.06]">
                  <div>
                    <p className="text-[13px] text-white font-medium">Rate Limiting</p>
                    <p className="text-[11px] text-[#6B6780]">Protect against brute force attacks</p>
                  </div>
                  <button className="w-11 h-6 rounded-full bg-[#7C3AED] p-0.5 transition-colors">
                    <div className="w-5 h-5 rounded-full bg-white transform translate-x-5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "notifications" && (
          <>
            <div>
              <h3 className="text-[15px] font-semibold text-white mb-4">Notification Preferences</h3>
              <div className="space-y-3 max-w-lg">
                {[
                  { label: "Borrow Requests", desc: "Notify when new borrow requests arrive", enabled: true },
                  { label: "Overdue Alerts", desc: "Alert for overdue book returns", enabled: true },
                  { label: "New Members", desc: "Notify when new members register", enabled: true },
                  { label: "System Updates", desc: "Important system notifications", enabled: false },
                  { label: "Fine Payments", desc: "Notify when fines are paid", enabled: true },
                ].map((pref) => (
                  <div key={pref.label} className="flex items-center justify-between py-3 border-b border-white/[0.06] last:border-0">
                    <div>
                      <p className="text-[13px] text-white font-medium">{pref.label}</p>
                      <p className="text-[11px] text-[#6B6780]">{pref.desc}</p>
                    </div>
                    <button className={cn(
                      "w-11 h-6 rounded-full p-0.5 transition-colors",
                      pref.enabled ? "bg-[#7C3AED]" : "bg-[#1A1726] border border-white/[0.06]"
                    )}>
                      <div className={cn(
                        "w-5 h-5 rounded-full transition-transform",
                        pref.enabled ? "bg-white translate-x-5" : "bg-[#6B6780]"
                      )} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
