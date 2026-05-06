// ============================================================
// SUPABASE DATABASE MIGRATION - Digital Library Management
// Run this SQL in Supabase SQL Editor to create all tables
// ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- USERS TABLE (extends Supabase auth.users)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('super_admin', 'admin', 'teacher', 'member')),
  avatar_url TEXT,
  qr_code TEXT,
  phone TEXT,
  class_name TEXT,
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ROLE PERMISSIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.role_permissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  role TEXT NOT NULL CHECK (role IN ('super_admin', 'admin', 'teacher', 'member')),
  permission TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(role, permission)
);

-- ============================================================
-- CATEGORIES
-- ============================================================
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  color TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- BOOKS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.books (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  isbn TEXT UNIQUE,
  publisher TEXT,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  stock INTEGER DEFAULT 1,
  available_stock INTEGER DEFAULT 1,
  cover_url TEXT,
  pdf_url TEXT,
  qr_code TEXT,
  description TEXT,
  language TEXT DEFAULT 'Indonesian',
  publication_year INTEGER,
  page_count INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- BORROWINGS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.borrowings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  book_id UUID NOT NULL REFERENCES public.books(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'active', 'returned', 'overdue', 'rejected')),
  borrow_date TIMESTAMPTZ DEFAULT NOW(),
  due_date TIMESTAMPTZ NOT NULL,
  return_date TIMESTAMPTZ,
  approved_by UUID REFERENCES public.users(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- FINES
-- ============================================================
CREATE TABLE IF NOT EXISTS public.fines (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  borrowing_id UUID NOT NULL REFERENCES public.borrowings(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  amount DECIMAL(12, 2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'unpaid' CHECK (status IN ('unpaid', 'paid')),
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- REVIEWS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  book_id UUID NOT NULL REFERENCES public.books(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(book_id, user_id)
);

-- ============================================================
-- BOOKMARKS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.bookmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  book_id UUID NOT NULL REFERENCES public.books(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, book_id)
);

-- ============================================================
-- NOTIFICATIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL DEFAULT 'system',
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- AUDIT LOGS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  table_name TEXT,
  record_id TEXT,
  details JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- MESSAGES
-- ============================================================
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SETTINGS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_books_category ON public.books(category_id);
CREATE INDEX IF NOT EXISTS idx_books_title ON public.books USING gin(to_tsvector('simple', title));
CREATE INDEX IF NOT EXISTS idx_borrowings_user ON public.borrowings(user_id);
CREATE INDEX IF NOT EXISTS idx_borrowings_status ON public.borrowings(status);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON public.notifications(user_id, is_read);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user ON public.audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON public.messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver ON public.messages(receiver_id);

-- ============================================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.borrowings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;

-- Users: Everyone can view, only self or admin can update
CREATE POLICY "Users viewable by all authenticated" ON public.users FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can manage users" ON public.users FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('super_admin', 'admin'))
);

-- Books: All can view, admin+ can manage
CREATE POLICY "Books viewable by all" ON public.books FOR SELECT USING (true);
CREATE POLICY "Admins can manage books" ON public.books FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('super_admin', 'admin'))
);

-- Categories: All can view, admin+ can manage
CREATE POLICY "Categories viewable by all" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Admins can manage categories" ON public.categories FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('super_admin', 'admin'))
);

-- Borrowings: Own data or admin
CREATE POLICY "Members view own borrowings" ON public.borrowings FOR SELECT USING (
  user_id = auth.uid() OR EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('super_admin', 'admin', 'teacher'))
);
CREATE POLICY "Members can create borrowings" ON public.borrowings FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Admins can manage borrowings" ON public.borrowings FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('super_admin', 'admin'))
);

-- Notifications: own data only
CREATE POLICY "Users see own notifications" ON public.notifications FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "System can create notifications" ON public.notifications FOR INSERT WITH CHECK (true);

-- Bookmarks: own data only
CREATE POLICY "Users manage own bookmarks" ON public.bookmarks FOR ALL USING (user_id = auth.uid());

-- Messages: sender or receiver
CREATE POLICY "Users see own messages" ON public.messages FOR SELECT USING (sender_id = auth.uid() OR receiver_id = auth.uid());
CREATE POLICY "Users can send messages" ON public.messages FOR INSERT WITH CHECK (sender_id = auth.uid());

-- Audit logs: admin+ only
CREATE POLICY "Admins view audit logs" ON public.audit_logs FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('super_admin', 'admin'))
);

-- Settings: super admin only
CREATE POLICY "Super admin manages settings" ON public.settings FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'super_admin')
);

-- Role Permissions: readable by all authenticated, managed by super admin
CREATE POLICY "Role permissions viewable" ON public.role_permissions FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Super admin manages permissions" ON public.role_permissions FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'super_admin')
);

-- Fines: own data or admin
CREATE POLICY "Members view own fines" ON public.fines FOR SELECT USING (
  user_id = auth.uid() OR EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('super_admin', 'admin'))
);

-- Reviews: viewable by all, create own
CREATE POLICY "Reviews viewable by all" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Users manage own reviews" ON public.reviews FOR ALL USING (user_id = auth.uid());

-- ============================================================
-- DEFAULT PERMISSIONS SEED
-- ============================================================
INSERT INTO public.role_permissions (role, permission) VALUES
  ('super_admin', 'books.create'),
  ('super_admin', 'books.edit'),
  ('super_admin', 'books.delete'),
  ('super_admin', 'books.view'),
  ('super_admin', 'users.create'),
  ('super_admin', 'users.edit'),
  ('super_admin', 'users.delete'),
  ('super_admin', 'users.view'),
  ('super_admin', 'borrow.create'),
  ('super_admin', 'borrow.approve'),
  ('super_admin', 'borrow.return'),
  ('super_admin', 'borrow.view_all'),
  ('super_admin', 'reports.view'),
  ('super_admin', 'reports.export'),
  ('super_admin', 'settings.manage'),
  ('super_admin', 'analytics.view'),
  ('super_admin', 'audit.view'),
  ('admin', 'books.create'),
  ('admin', 'books.edit'),
  ('admin', 'books.delete'),
  ('admin', 'books.view'),
  ('admin', 'users.create'),
  ('admin', 'users.edit'),
  ('admin', 'users.view'),
  ('admin', 'borrow.approve'),
  ('admin', 'borrow.return'),
  ('admin', 'borrow.view_all'),
  ('admin', 'reports.view'),
  ('admin', 'reports.export'),
  ('admin', 'analytics.view'),
  ('teacher', 'books.view'),
  ('teacher', 'users.view'),
  ('teacher', 'borrow.view_all'),
  ('teacher', 'analytics.view'),
  ('member', 'books.view'),
  ('member', 'borrow.create')
ON CONFLICT DO NOTHING;

-- ============================================================
-- DEFAULT CATEGORIES SEED
-- ============================================================
INSERT INTO public.categories (name, description, icon, color) VALUES
  ('Fiction', 'Novels, short stories, and literary fiction', 'BookOpen', '#A78BFA'),
  ('Non-Fiction', 'Educational, informational, and factual books', 'GraduationCap', '#38BDF8'),
  ('Science', 'Physics, chemistry, biology, and natural sciences', 'Atom', '#34D399'),
  ('Mathematics', 'Algebra, geometry, calculus, and statistics', 'Calculator', '#FBBF24'),
  ('History', 'Historical accounts, civilizations, and events', 'Clock', '#FB7185'),
  ('Technology', 'Computer science, engineering, and innovation', 'Cpu', '#22D3EE'),
  ('Literature', 'Classic literature, poetry, and drama', 'BookMarked', '#E879F9'),
  ('Religion', 'Religious texts, theology, and spirituality', 'Heart', '#F472B6'),
  ('Art & Music', 'Visual arts, music theory, and creative arts', 'Palette', '#C084FC'),
  ('Sports', 'Athletics, physical education, and sports', 'Trophy', '#4ADE80')
ON CONFLICT DO NOTHING;

-- ============================================================
-- DEFAULT SETTINGS SEED
-- ============================================================
INSERT INTO public.settings (key, value, description) VALUES
  ('library_name', 'Perpustakaan Digital Ahmad', 'Library display name'),
  ('borrow_duration_days', '14', 'Default borrow duration in days'),
  ('max_borrow_per_user', '3', 'Maximum active borrows per user'),
  ('fine_per_day', '1000', 'Fine amount per day for overdue books (IDR)'),
  ('allow_ebook_download', 'true', 'Allow members to download e-books')
ON CONFLICT DO NOTHING;
