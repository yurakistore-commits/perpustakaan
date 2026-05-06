"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BookOpen, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    await new Promise((r) => setTimeout(r, 1000));
    router.push("/dashboard");
  };

  const demoLogin = (role: string) => {
    const emails: Record<string, string> = {
      super_admin: "admin@perpustakaan.id",
      admin: "pengurus@perpustakaan.id",
      teacher: "guru@perpustakaan.id",
      member: "siswa@perpustakaan.id",
    };
    setEmail(emails[role] || "");
    setPassword("password123");
  };

  return (
    <div className="min-h-screen bg-[#0B0A10] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#7C3AED]/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-[#38BDF8]/5 rounded-full blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md relative"
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#38BDF8] flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="text-[22px] font-bold text-white font-display">PerpusDigital</span>
        </div>

        {/* Login Card */}
        <div className="glass-card p-8">
          <div className="text-center mb-6">
            <h1 className="text-[20px] font-bold text-white">Welcome Back</h1>
            <p className="text-[13px] text-[#6B6780] mt-1">Sign in to your library account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[12px] text-[#6B6780] uppercase tracking-wider mb-1.5 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6780]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-10"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-[12px] text-[#6B6780] uppercase tracking-wider mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6780]" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-10 pr-10"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6780] hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-white/[0.1] bg-[#13111C] accent-[#7C3AED]" />
                <span className="text-[12px] text-[#9B97A8]">Remember me</span>
              </label>
              <button type="button" className="text-[12px] text-[#A78BFA] hover:text-white transition-colors">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center gap-2 mt-6"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Demo Login Buttons */}
          <div className="mt-6 pt-6 border-t border-white/[0.06]">
            <p className="text-[11px] text-[#6B6780] text-center mb-3 uppercase tracking-wider">Quick Demo Login</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { role: "super_admin", label: "Super Admin", color: "#A78BFA" },
                { role: "admin", label: "Admin", color: "#38BDF8" },
                { role: "teacher", label: "Teacher", color: "#34D399" },
                { role: "member", label: "Member", color: "#FBBF24" },
              ].map((demo) => (
                <button
                  key={demo.role}
                  onClick={() => demoLogin(demo.role)}
                  className="py-2 px-3 rounded-lg text-[12px] font-medium transition-all hover:scale-[1.02]"
                  style={{ backgroundColor: demo.color + "10", color: demo.color, border: `1px solid ${demo.color}20` }}
                >
                  {demo.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-[12px] text-[#6B6780] mt-6">
          © 2026 PerpusDigital. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
}
