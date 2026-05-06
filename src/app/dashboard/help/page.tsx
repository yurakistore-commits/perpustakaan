"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, HelpCircle, Mail, MessageSquare, FileText, ExternalLink } from "lucide-react";

const helpTopics = [
  { title: "Getting Started", description: "Learn the basics of the library management system", icon: BookOpen, color: "#A78BFA" },
  { title: "Managing Books", description: "How to add, edit, and organize your book collection", icon: FileText, color: "#38BDF8" },
  { title: "Borrowing System", description: "Understanding the borrow and return workflow", icon: HelpCircle, color: "#34D399" },
  { title: "QR Code System", description: "Generate and scan QR codes for books and members", icon: HelpCircle, color: "#FBBF24" },
  { title: "Reports & Analytics", description: "Export data and understand library analytics", icon: FileText, color: "#FB7185" },
  { title: "User Management", description: "Manage members, roles, and permissions", icon: HelpCircle, color: "#22D3EE" },
];

const faqs = [
  { q: "How do I add a new book?", a: "Navigate to Books → click 'Add Book' → fill in the required fields and upload a cover image." },
  { q: "How does the borrowing workflow work?", a: "A member scans a book QR code → a borrow request is created → an admin approves it → the borrow becomes active → when returned, scan QR again to complete." },
  { q: "How are fines calculated?", a: "Fines are automatically calculated based on the 'Fine Per Day' setting multiplied by the number of overdue days." },
  { q: "Can I export reports?", a: "Yes. Go to Reports → select your report type and date range → click Export as PDF or Excel." },
];

export default function HelpPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[20px] font-bold text-white font-display">Help Center</h2>
        <p className="text-[13px] text-[#6B6780] mt-0.5">Guides, FAQ, and support resources</p>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {helpTopics.map((topic, i) => (
          <motion.div
            key={topic.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card glass-card-hover p-5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: topic.color + "15", color: topic.color }}>
              <topic.icon className="w-5 h-5" />
            </div>
            <h3 className="text-[14px] font-semibold text-white mb-1 group-hover:text-[#A78BFA] transition-colors">{topic.title}</h3>
            <p className="text-[12px] text-[#6B6780]">{topic.description}</p>
          </motion.div>
        ))}
      </div>

      {/* FAQ */}
      <div className="glass-card p-6">
        <h3 className="text-[16px] font-semibold text-white mb-5">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="group border-b border-white/[0.06] pb-4 last:border-0">
              <summary className="flex items-center justify-between cursor-pointer text-[14px] font-medium text-white hover:text-[#A78BFA] transition-colors list-none">
                {faq.q}
                <span className="text-[#6B6780] group-open:rotate-45 transition-transform text-lg">+</span>
              </summary>
              <p className="text-[13px] text-[#9B97A8] mt-3 leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div className="glass-card p-6">
        <h3 className="text-[16px] font-semibold text-white mb-2">Need More Help?</h3>
        <p className="text-[13px] text-[#6B6780] mb-4">Contact our support team for further assistance.</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="btn-primary flex items-center justify-center gap-2">
            <Mail className="w-4 h-4" />
            Email Support
          </button>
          <button className="btn-secondary flex items-center justify-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Live Chat
          </button>
          <button className="btn-secondary flex items-center justify-center gap-2">
            <FileText className="w-4 h-4" />
            Documentation
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
