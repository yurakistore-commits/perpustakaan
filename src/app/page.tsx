"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight, BarChart3, QrCode, Shield, Smartphone, Zap } from "lucide-react";

const features = [
  { icon: BookOpen, title: "Book Management", description: "Complete CRUD system with categories, search, and cover uploads", color: "#A78BFA" },
  { icon: QrCode, title: "QR Code System", description: "Generate and scan QR codes for instant borrowing and returns", color: "#38BDF8" },
  { icon: BarChart3, title: "Advanced Analytics", description: "Realtime dashboards with borrowing trends and user analytics", color: "#34D399" },
  { icon: Shield, title: "Enterprise Security", description: "Role-based access control with Row Level Security policies", color: "#FB7185" },
  { icon: Smartphone, title: "Mobile First", description: "Native app-like experience optimized for touch devices", color: "#FBBF24" },
  { icon: Zap, title: "Realtime Updates", description: "Live notifications, chat, and dashboard data via Supabase", color: "#22D3EE" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0B0A10] overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#7C3AED]/8 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-[#38BDF8]/5 rounded-full blur-[120px]" />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 lg:px-12 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#38BDF8] flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <span className="text-[18px] font-bold text-white font-display">PerpusDigital</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="btn-secondary text-[13px] py-2 px-4">
            Sign In
          </Link>
          <Link href="/dashboard" className="btn-primary text-[13px] py-2 px-4 hidden sm:flex items-center gap-2">
            Dashboard
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-16 lg:pt-24 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/20 text-[#A78BFA] text-[12px] font-medium mb-6">
            <Zap className="w-3 h-3" />
            Enterprise Digital Library Platform
          </div>
          <h1 className="text-[36px] sm:text-[48px] lg:text-[56px] font-bold text-white leading-tight font-display">
            Modern Library
            <br />
            <span className="gradient-text">Management System</span>
          </h1>
          <p className="text-[16px] lg:text-[18px] text-[#9B97A8] mt-5 max-w-xl mx-auto leading-relaxed">
            Manage your school library with a premium SaaS dashboard. QR code borrowing, realtime analytics, and mobile-first design.
          </p>
          <div className="flex items-center justify-center gap-3 mt-8">
            <Link href="/dashboard" className="btn-primary text-[14px] py-3 px-6 flex items-center gap-2">
              Open Dashboard
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/login" className="btn-secondary text-[14px] py-3 px-6">
              Sign In
            </Link>
          </div>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 glass-card p-2 max-w-5xl mx-auto overflow-hidden"
        >
          <div className="rounded-xl bg-[#0B0A10] border border-white/[0.04] h-[300px] sm:h-[400px] flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7C3AED]/20 to-[#38BDF8]/10 flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-[#A78BFA]" />
              </div>
              <p className="text-[16px] font-medium text-white">Dashboard Preview</p>
              <p className="text-[13px] text-[#6B6780] mt-1">Click "Open Dashboard" to explore</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="text-center mb-12">
          <h2 className="text-[28px] font-bold text-white font-display">Everything You Need</h2>
          <p className="text-[14px] text-[#6B6780] mt-2">Complete library management in one premium platform</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="glass-card glass-card-hover p-6"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: feature.color + "15", color: feature.color }}>
                <feature.icon className="w-5 h-5" />
              </div>
              <h3 className="text-[15px] font-semibold text-white mb-1">{feature.title}</h3>
              <p className="text-[13px] text-[#6B6780] leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.06] py-8 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#7C3AED] to-[#38BDF8] flex items-center justify-center">
              <BookOpen className="w-3 h-3 text-white" />
            </div>
            <span className="text-[13px] font-semibold text-white">PerpusDigital</span>
          </div>
          <p className="text-[12px] text-[#6B6780]">© 2026 PerpusDigital. Built for modern school libraries.</p>
        </div>
      </footer>
    </div>
  );
}
