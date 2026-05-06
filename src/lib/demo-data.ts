import type { Book, Category, Borrowing, Notification, AuditLog, ChartDataPoint } from "@/types/database";

// ============================================================
// DEMO CATEGORIES
// ============================================================
export const demoCategories: Category[] = [
  { id: "cat-1", name: "Fiction", description: "Novels and literary fiction", icon: "BookOpen", color: "#A78BFA", created_at: "2024-01-01T00:00:00Z" },
  { id: "cat-2", name: "Non-Fiction", description: "Educational and factual books", icon: "GraduationCap", color: "#38BDF8", created_at: "2024-01-01T00:00:00Z" },
  { id: "cat-3", name: "Science", description: "Natural sciences and research", icon: "Atom", color: "#34D399", created_at: "2024-01-01T00:00:00Z" },
  { id: "cat-4", name: "Mathematics", description: "Math and statistics", icon: "Calculator", color: "#FBBF24", created_at: "2024-01-01T00:00:00Z" },
  { id: "cat-5", name: "History", description: "Historical accounts", icon: "Clock", color: "#FB7185", created_at: "2024-01-01T00:00:00Z" },
  { id: "cat-6", name: "Technology", description: "CS and engineering", icon: "Cpu", color: "#22D3EE", created_at: "2024-01-01T00:00:00Z" },
  { id: "cat-7", name: "Literature", description: "Classic literature and poetry", icon: "BookMarked", color: "#E879F9", created_at: "2024-01-01T00:00:00Z" },
  { id: "cat-8", name: "Religion", description: "Religious and spiritual texts", icon: "Heart", color: "#F472B6", created_at: "2024-01-01T00:00:00Z" },
];

// ============================================================
// DEMO BOOKS
// ============================================================
export const demoBooks: Book[] = [
  {
    id: "book-1", title: "Laskar Pelangi", author: "Andrea Hirata", isbn: "978-979-1227-00-2",
    publisher: "Bentang Pustaka", category_id: "cat-1", stock: 5, available_stock: 3,
    cover_url: null, pdf_url: null, qr_code: null, description: "Novel tentang perjuangan anak-anak Belitung dalam meraih pendidikan.",
    language: "Indonesian", publication_year: 2005, page_count: 529, is_active: true,
    created_at: "2024-01-15T00:00:00Z", updated_at: "2024-01-15T00:00:00Z",
    category: { id: "cat-1", name: "Fiction", description: null, icon: "BookOpen", color: "#A78BFA", created_at: "2024-01-01T00:00:00Z" },
  },
  {
    id: "book-2", title: "Bumi Manusia", author: "Pramoedya Ananta Toer", isbn: "978-979-99858-0-5",
    publisher: "Hasta Mitra", category_id: "cat-7", stock: 3, available_stock: 1,
    cover_url: null, pdf_url: null, qr_code: null, description: "Kisah Minke di era kolonial Belanda.",
    language: "Indonesian", publication_year: 1980, page_count: 535, is_active: true,
    created_at: "2024-02-01T00:00:00Z", updated_at: "2024-02-01T00:00:00Z",
    category: { id: "cat-7", name: "Literature", description: null, icon: "BookMarked", color: "#E879F9", created_at: "2024-01-01T00:00:00Z" },
  },
  {
    id: "book-3", title: "Fisika Dasar", author: "Halliday & Resnick", isbn: "978-0-471-32057-9",
    publisher: "Wiley", category_id: "cat-3", stock: 8, available_stock: 5,
    cover_url: null, pdf_url: null, qr_code: null, description: "Textbook fisika dasar universitas.",
    language: "Indonesian", publication_year: 2013, page_count: 1136, is_active: true,
    created_at: "2024-02-15T00:00:00Z", updated_at: "2024-02-15T00:00:00Z",
    category: { id: "cat-3", name: "Science", description: null, icon: "Atom", color: "#34D399", created_at: "2024-01-01T00:00:00Z" },
  },
  {
    id: "book-4", title: "Kalkulus", author: "James Stewart", isbn: "978-1-285-74062-1",
    publisher: "Cengage", category_id: "cat-4", stock: 6, available_stock: 4,
    cover_url: null, pdf_url: null, qr_code: null, description: "Buku teks kalkulus standar.",
    language: "Indonesian", publication_year: 2015, page_count: 1368, is_active: true,
    created_at: "2024-03-01T00:00:00Z", updated_at: "2024-03-01T00:00:00Z",
    category: { id: "cat-4", name: "Mathematics", description: null, icon: "Calculator", color: "#FBBF24", created_at: "2024-01-01T00:00:00Z" },
  },
  {
    id: "book-5", title: "Sejarah Indonesia Modern", author: "M.C. Ricklefs", isbn: "978-0-333-57690-2",
    publisher: "Serambi", category_id: "cat-5", stock: 4, available_stock: 2,
    cover_url: null, pdf_url: null, qr_code: null, description: "Sejarah Indonesia dari abad ke-13.",
    language: "Indonesian", publication_year: 2008, page_count: 625, is_active: true,
    created_at: "2024-03-15T00:00:00Z", updated_at: "2024-03-15T00:00:00Z",
    category: { id: "cat-5", name: "History", description: null, icon: "Clock", color: "#FB7185", created_at: "2024-01-01T00:00:00Z" },
  },
  {
    id: "book-6", title: "Clean Code", author: "Robert C. Martin", isbn: "978-0-13-235088-4",
    publisher: "Prentice Hall", category_id: "cat-6", stock: 3, available_stock: 2,
    cover_url: null, pdf_url: null, qr_code: null, description: "A handbook of agile software craftsmanship.",
    language: "English", publication_year: 2008, page_count: 464, is_active: true,
    created_at: "2024-04-01T00:00:00Z", updated_at: "2024-04-01T00:00:00Z",
    category: { id: "cat-6", name: "Technology", description: null, icon: "Cpu", color: "#22D3EE", created_at: "2024-01-01T00:00:00Z" },
  },
  {
    id: "book-7", title: "Ayat-Ayat Cinta", author: "Habiburrahman El Shirazy", isbn: "978-979-3062-79-7",
    publisher: "Republika", category_id: "cat-8", stock: 7, available_stock: 5,
    cover_url: null, pdf_url: null, qr_code: null, description: "Novel religi bestseller Indonesia.",
    language: "Indonesian", publication_year: 2004, page_count: 419, is_active: true,
    created_at: "2024-04-15T00:00:00Z", updated_at: "2024-04-15T00:00:00Z",
    category: { id: "cat-8", name: "Religion", description: null, icon: "Heart", color: "#F472B6", created_at: "2024-01-01T00:00:00Z" },
  },
  {
    id: "book-8", title: "Sapiens", author: "Yuval Noah Harari", isbn: "978-0-06-231609-7",
    publisher: "Harper", category_id: "cat-2", stock: 4, available_stock: 3,
    cover_url: null, pdf_url: null, qr_code: null, description: "A brief history of humankind.",
    language: "English", publication_year: 2011, page_count: 443, is_active: true,
    created_at: "2024-05-01T00:00:00Z", updated_at: "2024-05-01T00:00:00Z",
    category: { id: "cat-2", name: "Non-Fiction", description: null, icon: "GraduationCap", color: "#38BDF8", created_at: "2024-01-01T00:00:00Z" },
  },
];

// ============================================================
// DEMO BORROWINGS
// ============================================================
export const demoBorrowings: Borrowing[] = [
  {
    id: "bor-1", user_id: "4", book_id: "book-1", status: "active",
    borrow_date: "2026-04-28T00:00:00Z", due_date: "2026-05-12T00:00:00Z",
    return_date: null, approved_by: "2", notes: null, created_at: "2026-04-28T00:00:00Z",
    user: { id: "4", email: "siswa@perpustakaan.id", name: "Rina Kartika", role: "member", avatar_url: null, qr_code: null, phone: null, class_name: "XII IPA 1", is_active: true, last_login: null, created_at: "", updated_at: "" },
    book: demoBooks[0],
  },
  {
    id: "bor-2", user_id: "4", book_id: "book-3", status: "pending",
    borrow_date: "2026-05-05T00:00:00Z", due_date: "2026-05-19T00:00:00Z",
    return_date: null, approved_by: null, notes: null, created_at: "2026-05-05T00:00:00Z",
    user: { id: "4", email: "siswa@perpustakaan.id", name: "Rina Kartika", role: "member", avatar_url: null, qr_code: null, phone: null, class_name: "XII IPA 1", is_active: true, last_login: null, created_at: "", updated_at: "" },
    book: demoBooks[2],
  },
  {
    id: "bor-3", user_id: "4", book_id: "book-6", status: "returned",
    borrow_date: "2026-04-10T00:00:00Z", due_date: "2026-04-24T00:00:00Z",
    return_date: "2026-04-22T00:00:00Z", approved_by: "2", notes: null, created_at: "2026-04-10T00:00:00Z",
    user: { id: "4", email: "siswa@perpustakaan.id", name: "Rina Kartika", role: "member", avatar_url: null, qr_code: null, phone: null, class_name: "XII IPA 1", is_active: true, last_login: null, created_at: "", updated_at: "" },
    book: demoBooks[5],
  },
  {
    id: "bor-4", user_id: "4", book_id: "book-2", status: "overdue",
    borrow_date: "2026-04-01T00:00:00Z", due_date: "2026-04-15T00:00:00Z",
    return_date: null, approved_by: "2", notes: null, created_at: "2026-04-01T00:00:00Z",
    user: { id: "4", email: "siswa@perpustakaan.id", name: "Rina Kartika", role: "member", avatar_url: null, qr_code: null, phone: null, class_name: "XII IPA 1", is_active: true, last_login: null, created_at: "", updated_at: "" },
    book: demoBooks[1],
  },
];

// ============================================================
// DEMO NOTIFICATIONS
// ============================================================
export const demoNotifications: Notification[] = [
  { id: "n1", user_id: "1", type: "system", title: "Welcome", message: "Welcome to the Digital Library Management System.", is_read: true, priority: "normal", data: null, created_at: "2026-05-06T10:00:00Z" },
  { id: "n2", user_id: "1", type: "borrow_approved", title: "Borrow Approved", message: "Borrow request for 'Laskar Pelangi' by Rina Kartika has been approved.", is_read: false, priority: "normal", data: null, created_at: "2026-05-06T14:00:00Z" },
  { id: "n3", user_id: "1", type: "overdue_alert", title: "Overdue Alert", message: "'Bumi Manusia' is overdue by 21 days. Member: Rina Kartika.", is_read: false, priority: "high", data: null, created_at: "2026-05-06T08:00:00Z" },
  { id: "n4", user_id: "1", type: "new_book", title: "New Book Added", message: "'Clean Code' by Robert C. Martin has been added to the library.", is_read: true, priority: "low", data: null, created_at: "2026-05-05T16:00:00Z" },
  { id: "n5", user_id: "1", type: "due_reminder", title: "Due Tomorrow", message: "'Fisika Dasar' is due tomorrow for member Rina Kartika.", is_read: false, priority: "high", data: null, created_at: "2026-05-06T07:00:00Z" },
];

// ============================================================
// DEMO AUDIT LOGS
// ============================================================
export const demoAuditLogs: AuditLog[] = [
  { id: "al-1", user_id: "1", action: "login", table_name: null, record_id: null, details: { method: "email" }, ip_address: "192.168.1.100", user_agent: "Chrome/125", created_at: "2026-05-06T16:00:00Z", user: { id: "1", email: "admin@perpustakaan.id", name: "Ahmad Supardi", role: "super_admin", avatar_url: null, qr_code: null, phone: null, class_name: null, is_active: true, last_login: null, created_at: "", updated_at: "" } },
  { id: "al-2", user_id: "2", action: "borrow.approve", table_name: "borrowings", record_id: "bor-1", details: { book: "Laskar Pelangi", member: "Rina Kartika" }, ip_address: "192.168.1.101", user_agent: "Firefox/126", created_at: "2026-05-06T14:30:00Z", user: { id: "2", email: "pengurus@perpustakaan.id", name: "Siti Nurhaliza", role: "admin", avatar_url: null, qr_code: null, phone: null, class_name: null, is_active: true, last_login: null, created_at: "", updated_at: "" } },
  { id: "al-3", user_id: "2", action: "book.create", table_name: "books", record_id: "book-8", details: { title: "Sapiens" }, ip_address: "192.168.1.101", user_agent: "Firefox/126", created_at: "2026-05-06T10:15:00Z", user: { id: "2", email: "pengurus@perpustakaan.id", name: "Siti Nurhaliza", role: "admin", avatar_url: null, qr_code: null, phone: null, class_name: null, is_active: true, last_login: null, created_at: "", updated_at: "" } },
  { id: "al-4", user_id: "4", action: "borrow.request", table_name: "borrowings", record_id: "bor-2", details: { book: "Fisika Dasar" }, ip_address: "192.168.1.155", user_agent: "Chrome Mobile/125", created_at: "2026-05-05T09:00:00Z", user: { id: "4", email: "siswa@perpustakaan.id", name: "Rina Kartika", role: "member", avatar_url: null, qr_code: null, phone: null, class_name: "XII IPA 1", is_active: true, last_login: null, created_at: "", updated_at: "" } },
];

// ============================================================
// CHART DATA
// ============================================================
export const monthlyBorrowData: ChartDataPoint[] = [
  { name: "Jan", value: 45, secondaryValue: 12 },
  { name: "Feb", value: 62, secondaryValue: 18 },
  { name: "Mar", value: 78, secondaryValue: 8 },
  { name: "Apr", value: 91, secondaryValue: 22 },
  { name: "May", value: 56, secondaryValue: 15 },
  { name: "Jun", value: 34, secondaryValue: 5 },
  { name: "Jul", value: 28, secondaryValue: 3 },
  { name: "Aug", value: 48, secondaryValue: 10 },
  { name: "Sep", value: 85, secondaryValue: 20 },
  { name: "Oct", value: 102, secondaryValue: 14 },
  { name: "Nov", value: 95, secondaryValue: 16 },
  { name: "Dec", value: 67, secondaryValue: 9 },
];

export const categoryDistribution: ChartDataPoint[] = [
  { name: "Fiction", value: 35 },
  { name: "Non-Fiction", value: 20 },
  { name: "Science", value: 18 },
  { name: "Technology", value: 12 },
  { name: "History", value: 8 },
  { name: "Others", value: 7 },
];

export const weeklyActivity: ChartDataPoint[] = [
  { name: "Mon", value: 18 },
  { name: "Tue", value: 24 },
  { name: "Wed", value: 31 },
  { name: "Thu", value: 28 },
  { name: "Fri", value: 22 },
  { name: "Sat", value: 8 },
  { name: "Sun", value: 4 },
];
