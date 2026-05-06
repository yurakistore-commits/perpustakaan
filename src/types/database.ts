// ============================================================
// DATABASE TYPES - Digital Library Management System
// ============================================================

export type UserRole = "super_admin" | "admin" | "teacher" | "member";

export type BorrowStatus =
  | "pending"
  | "approved"
  | "active"
  | "returned"
  | "overdue"
  | "rejected";

export type FineStatus = "unpaid" | "paid";

export type NotificationType =
  | "borrow_approved"
  | "borrow_rejected"
  | "due_reminder"
  | "overdue_alert"
  | "new_book"
  | "system"
  | "message";

export type NotificationPriority = "low" | "normal" | "high" | "urgent";

// ============================================================
// TABLE TYPES
// ============================================================

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar_url: string | null;
  qr_code: string | null;
  phone: string | null;
  class_name: string | null;
  is_active: boolean;
  last_login: string | null;
  created_at: string;
  updated_at: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  publisher: string;
  category_id: string;
  stock: number;
  available_stock: number;
  cover_url: string | null;
  pdf_url: string | null;
  qr_code: string | null;
  description: string | null;
  language: string;
  publication_year: number;
  page_count: number | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  // Relations
  category?: Category;
}

export interface Category {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  color: string | null;
  book_count?: number;
  created_at: string;
}

export interface Borrowing {
  id: string;
  user_id: string;
  book_id: string;
  status: BorrowStatus;
  borrow_date: string;
  due_date: string;
  return_date: string | null;
  approved_by: string | null;
  notes: string | null;
  created_at: string;
  // Relations
  user?: User;
  book?: Book;
  approver?: User;
}

export interface Fine {
  id: string;
  borrowing_id: string;
  user_id: string;
  amount: number;
  status: FineStatus;
  paid_at: string | null;
  created_at: string;
  // Relations
  borrowing?: Borrowing;
  user?: User;
}

export interface Review {
  id: string;
  book_id: string;
  user_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  // Relations
  user?: User;
  book?: Book;
}

export interface Bookmark {
  id: string;
  user_id: string;
  book_id: string;
  created_at: string;
  // Relations
  book?: Book;
}

export interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  message: string;
  is_read: boolean;
  priority: NotificationPriority;
  data: Record<string, unknown> | null;
  created_at: string;
}

export interface AuditLog {
  id: string;
  user_id: string;
  action: string;
  table_name: string | null;
  record_id: string | null;
  details: Record<string, unknown> | null;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
  // Relations
  user?: User;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  is_read: boolean;
  created_at: string;
  // Relations
  sender?: User;
  receiver?: User;
}

export interface Settings {
  id: string;
  key: string;
  value: string;
  description: string | null;
  updated_at: string;
}

export interface RolePermission {
  id: string;
  role: UserRole;
  permission: string;
  created_at: string;
}

// ============================================================
// PERMISSION KEYS
// ============================================================

export const PERMISSIONS = {
  // Books
  BOOKS_CREATE: "books.create",
  BOOKS_EDIT: "books.edit",
  BOOKS_DELETE: "books.delete",
  BOOKS_VIEW: "books.view",
  // Users
  USERS_CREATE: "users.create",
  USERS_EDIT: "users.edit",
  USERS_DELETE: "users.delete",
  USERS_VIEW: "users.view",
  // Borrowing
  BORROW_CREATE: "borrow.create",
  BORROW_APPROVE: "borrow.approve",
  BORROW_RETURN: "borrow.return",
  BORROW_VIEW_ALL: "borrow.view_all",
  // Reports
  REPORTS_VIEW: "reports.view",
  REPORTS_EXPORT: "reports.export",
  // Settings
  SETTINGS_MANAGE: "settings.manage",
  // Analytics
  ANALYTICS_VIEW: "analytics.view",
  // Audit
  AUDIT_VIEW: "audit.view",
} as const;

export type PermissionKey = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

// ============================================================
// DASHBOARD STATS
// ============================================================

export interface DashboardStats {
  totalBooks: number;
  totalMembers: number;
  activeBorrowings: number;
  overdueCount: number;
  totalFines: number;
  totalCategories: number;
  newMembersThisMonth: number;
  borrowingsThisMonth: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  secondaryValue?: number;
}
