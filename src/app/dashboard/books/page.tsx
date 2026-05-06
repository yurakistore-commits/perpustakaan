"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Search, Plus, Filter, BookOpen, Eye, Edit, Trash2,
  Download, ChevronLeft, ChevronRight, Grid3X3, List,
} from "lucide-react";
import { Badge, Modal } from "@/components/ui/dashboard-components";
import { demoBooks, demoCategories } from "@/lib/demo-data";
import { cn } from "@/lib/utils";
import type { Book } from "@/types/database";

// ============================================================
// BOOK CARD (Grid view)
// ============================================================
function BookCard({ book, onClick }: { book: Book; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="glass-card glass-card-hover overflow-hidden cursor-pointer group"
      onClick={onClick}
    >
      {/* Cover Placeholder */}
      <div className="h-40 bg-gradient-to-br from-[#1A1726] to-[#13111C] flex items-center justify-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `linear-gradient(135deg, ${book.category?.color || "#7C3AED"}33, transparent)`,
          }}
        />
        <BookOpen className="w-10 h-10 text-[#6B6780]" />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors">
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors">
            <Edit className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <div className="flex items-center gap-2">
          <span
            className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: (book.category?.color || "#7C3AED") + "15",
              color: book.category?.color || "#7C3AED",
            }}
          >
            {book.category?.name || "Uncategorized"}
          </span>
        </div>
        <h3 className="text-[14px] font-semibold text-white line-clamp-1">{book.title}</h3>
        <p className="text-[12px] text-[#6B6780]">{book.author}</p>
        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] text-[#9B97A8]">{book.publication_year}</span>
          <Badge variant={book.available_stock > 0 ? "success" : "danger"}>
            {book.available_stock > 0 ? `${book.available_stock} available` : "Unavailable"}
          </Badge>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================
// BOOKS PAGE
// ============================================================
export default function BooksPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredBooks = useMemo(() => {
    return demoBooks.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase()) ||
        book.isbn.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === "all" || book.category_id === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-[20px] font-bold text-white font-display">Books</h2>
          <p className="text-[13px] text-[#6B6780] mt-0.5">{demoBooks.length} books in library</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn-primary flex items-center gap-2 w-fit">
          <Plus className="w-4 h-4" />
          Add Book
        </button>
      </div>

      {/* Filters */}
      <div className="glass-card p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6780]" />
            <input
              type="text"
              placeholder="Search books by title, author, or ISBN..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input-field w-full sm:w-48"
          >
            <option value="all">All Categories</option>
            {demoCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <div className="flex gap-1 bg-[#0B0A10] rounded-lg p-1 border border-white/[0.06]">
            <button
              onClick={() => setViewMode("grid")}
              className={cn("p-2 rounded-md transition-colors", viewMode === "grid" ? "bg-[#7C3AED]/15 text-[#A78BFA]" : "text-[#6B6780] hover:text-white")}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn("p-2 rounded-md transition-colors", viewMode === "list" ? "bg-[#7C3AED]/15 text-[#A78BFA]" : "text-[#6B6780] hover:text-white")}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Books Grid */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} onClick={() => setSelectedBook(book)} />
          ))}
        </div>
      ) : (
        <div className="glass-card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left text-[12px] font-semibold text-[#6B6780] uppercase tracking-wider py-3 px-4">Book</th>
                <th className="text-left text-[12px] font-semibold text-[#6B6780] uppercase tracking-wider py-3 px-4 hidden md:table-cell">Category</th>
                <th className="text-left text-[12px] font-semibold text-[#6B6780] uppercase tracking-wider py-3 px-4 hidden md:table-cell">ISBN</th>
                <th className="text-left text-[12px] font-semibold text-[#6B6780] uppercase tracking-wider py-3 px-4">Stock</th>
                <th className="text-left text-[12px] font-semibold text-[#6B6780] uppercase tracking-wider py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book) => (
                <tr key={book.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-12 rounded-md bg-[#1A1726] flex items-center justify-center shrink-0">
                        <BookOpen className="w-4 h-4 text-[#6B6780]" />
                      </div>
                      <div>
                        <p className="text-[13px] font-medium text-white">{book.title}</p>
                        <p className="text-[11px] text-[#6B6780]">{book.author}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 hidden md:table-cell">
                    <span
                      className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: (book.category?.color || "#7C3AED") + "15",
                        color: book.category?.color || "#7C3AED",
                      }}
                    >
                      {book.category?.name}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[13px] text-[#9B97A8] hidden md:table-cell">{book.isbn}</td>
                  <td className="py-3 px-4">
                    <Badge variant={book.available_stock > 0 ? "success" : "danger"}>
                      {book.available_stock}/{book.stock}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <button onClick={() => setSelectedBook(book)} className="p-1.5 rounded-md text-[#6B6780] hover:text-[#A78BFA] hover:bg-[#7C3AED]/10 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-md text-[#6B6780] hover:text-[#38BDF8] hover:bg-[#38BDF8]/10 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-md text-[#6B6780] hover:text-[#FB7185] hover:bg-[#FB7185]/10 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-[13px] text-[#6B6780]">
          Showing {filteredBooks.length} of {demoBooks.length} books
        </p>
        <div className="flex items-center gap-1">
          <button className="p-2 rounded-lg text-[#6B6780] hover:text-white hover:bg-white/[0.04] transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded-lg bg-[#7C3AED]/15 text-[#A78BFA] text-[13px] font-medium flex items-center justify-center">1</button>
          <button className="w-8 h-8 rounded-lg text-[#6B6780] hover:text-white hover:bg-white/[0.04] text-[13px] font-medium flex items-center justify-center transition-colors">2</button>
          <button className="p-2 rounded-lg text-[#6B6780] hover:text-white hover:bg-white/[0.04] transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Book Detail Modal */}
      <Modal isOpen={!!selectedBook} onClose={() => setSelectedBook(null)} title="Book Details" size="lg">
        {selectedBook && (
          <div className="space-y-5">
            <div className="flex gap-5">
              <div className="w-32 h-44 rounded-xl bg-gradient-to-br from-[#1A1726] to-[#0F0D17] flex items-center justify-center shrink-0">
                <BookOpen className="w-10 h-10 text-[#6B6780]" />
              </div>
              <div className="space-y-3 flex-1 min-w-0">
                <h3 className="text-[18px] font-bold text-white">{selectedBook.title}</h3>
                <p className="text-[14px] text-[#9B97A8]">by {selectedBook.author}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="primary">{selectedBook.category?.name}</Badge>
                  <Badge variant={selectedBook.available_stock > 0 ? "success" : "danger"}>
                    {selectedBook.available_stock > 0 ? "Available" : "Unavailable"}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "ISBN", value: selectedBook.isbn },
                { label: "Publisher", value: selectedBook.publisher },
                { label: "Year", value: selectedBook.publication_year },
                { label: "Language", value: selectedBook.language },
                { label: "Pages", value: selectedBook.page_count || "N/A" },
                { label: "Stock", value: `${selectedBook.available_stock} / ${selectedBook.stock}` },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-[11px] text-[#6B6780] uppercase tracking-wider mb-1">{item.label}</p>
                  <p className="text-[14px] text-white">{item.value}</p>
                </div>
              ))}
            </div>
            {selectedBook.description && (
              <div>
                <p className="text-[11px] text-[#6B6780] uppercase tracking-wider mb-1">Description</p>
                <p className="text-[13px] text-[#9B97A8] leading-relaxed">{selectedBook.description}</p>
              </div>
            )}
            <div className="flex gap-3 pt-2">
              <button className="btn-primary flex items-center gap-2 flex-1 justify-center">
                <ArrowLeftRight className="w-4 h-4" />
                Borrow
              </button>
              {selectedBook.pdf_url && (
                <button className="btn-secondary flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  E-Book
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Add Book Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Book" size="lg">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowAddModal(false); }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[12px] text-[#6B6780] uppercase tracking-wider mb-1.5 block">Title *</label>
              <input type="text" className="input-field" placeholder="Book title" required />
            </div>
            <div>
              <label className="text-[12px] text-[#6B6780] uppercase tracking-wider mb-1.5 block">Author *</label>
              <input type="text" className="input-field" placeholder="Author name" required />
            </div>
            <div>
              <label className="text-[12px] text-[#6B6780] uppercase tracking-wider mb-1.5 block">ISBN</label>
              <input type="text" className="input-field" placeholder="978-xxx-xxx" />
            </div>
            <div>
              <label className="text-[12px] text-[#6B6780] uppercase tracking-wider mb-1.5 block">Publisher</label>
              <input type="text" className="input-field" placeholder="Publisher name" />
            </div>
            <div>
              <label className="text-[12px] text-[#6B6780] uppercase tracking-wider mb-1.5 block">Category</label>
              <select className="input-field">
                {demoCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[12px] text-[#6B6780] uppercase tracking-wider mb-1.5 block">Stock</label>
              <input type="number" className="input-field" placeholder="1" defaultValue={1} min={1} />
            </div>
            <div>
              <label className="text-[12px] text-[#6B6780] uppercase tracking-wider mb-1.5 block">Year</label>
              <input type="number" className="input-field" placeholder="2024" />
            </div>
            <div>
              <label className="text-[12px] text-[#6B6780] uppercase tracking-wider mb-1.5 block">Language</label>
              <input type="text" className="input-field" placeholder="Indonesian" defaultValue="Indonesian" />
            </div>
          </div>
          <div>
            <label className="text-[12px] text-[#6B6780] uppercase tracking-wider mb-1.5 block">Description</label>
            <textarea className="input-field min-h-[80px] resize-none" placeholder="Book description..." />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[12px] text-[#6B6780] uppercase tracking-wider mb-1.5 block">Cover Image</label>
              <input type="file" accept="image/*" className="input-field text-[13px] text-[#6B6780]" />
            </div>
            <div>
              <label className="text-[12px] text-[#6B6780] uppercase tracking-wider mb-1.5 block">PDF E-Book</label>
              <input type="file" accept=".pdf" className="input-field text-[13px] text-[#6B6780]" />
            </div>
          </div>
          <div className="flex gap-3 pt-3">
            <button type="submit" className="btn-primary flex-1">Add Book</button>
            <button type="button" onClick={() => setShowAddModal(false)} className="btn-secondary">Cancel</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
