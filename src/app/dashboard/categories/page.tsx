"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, BookOpen } from "lucide-react";
import { Modal } from "@/components/ui/dashboard-components";
import { demoCategories } from "@/lib/demo-data";

export default function CategoriesPage() {
  const [showModal, setShowModal] = useState(false);
  const bookCounts: Record<string, number> = {
    "cat-1": 35, "cat-2": 20, "cat-3": 18, "cat-4": 12,
    "cat-5": 8, "cat-6": 15, "cat-7": 10, "cat-8": 22,
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[20px] font-bold text-white font-display">Categories</h2>
          <p className="text-[13px] text-[#6B6780] mt-0.5">{demoCategories.length} categories</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {demoCategories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card glass-card-hover p-5 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: (cat.color || "#7C3AED") + "15", color: cat.color || "#7C3AED" }}
              >
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 rounded-md text-[#6B6780] hover:text-[#38BDF8] hover:bg-[#38BDF8]/10 transition-colors">
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button className="p-1.5 rounded-md text-[#6B6780] hover:text-[#FB7185] hover:bg-[#FB7185]/10 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <h3 className="text-[15px] font-semibold text-white mb-1">{cat.name}</h3>
            <p className="text-[12px] text-[#6B6780] mb-3 line-clamp-2">{cat.description}</p>
            <div className="flex items-center gap-2">
              <span className="text-[24px] font-bold text-white">{bookCounts[cat.id] || 0}</span>
              <span className="text-[12px] text-[#6B6780]">books</span>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Category">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowModal(false); }}>
          <div>
            <label className="text-[12px] text-[#6B6780] uppercase tracking-wider mb-1.5 block">Name *</label>
            <input type="text" className="input-field" placeholder="Category name" required />
          </div>
          <div>
            <label className="text-[12px] text-[#6B6780] uppercase tracking-wider mb-1.5 block">Description</label>
            <textarea className="input-field min-h-[80px] resize-none" placeholder="Category description..." />
          </div>
          <div>
            <label className="text-[12px] text-[#6B6780] uppercase tracking-wider mb-1.5 block">Accent Color</label>
            <div className="flex gap-2">
              {["#A78BFA", "#38BDF8", "#34D399", "#FBBF24", "#FB7185", "#22D3EE", "#E879F9", "#F472B6"].map((color) => (
                <button key={color} type="button" className="w-8 h-8 rounded-lg border-2 border-transparent hover:border-white/30 transition-colors" style={{ backgroundColor: color }} />
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-3">
            <button type="submit" className="btn-primary flex-1">Add Category</button>
            <button type="button" onClick={() => setShowModal(false)} className="btn-secondary">Cancel</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
