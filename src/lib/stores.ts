import { create } from "zustand";
import type { User, UserRole, Notification } from "@/types/database";

// ============================================================
// AUTH STORE
// ============================================================
interface AuthState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user, isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),
  logout: () => set({ user: null, isLoading: false }),
}));

// ============================================================
// SIDEBAR STORE
// ============================================================
interface SidebarState {
  isOpen: boolean;
  isCollapsed: boolean;
  toggle: () => void;
  setOpen: (open: boolean) => void;
  setCollapsed: (collapsed: boolean) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: false,
  isCollapsed: false,
  toggle: () => set((s) => ({ isOpen: !s.isOpen })),
  setOpen: (isOpen) => set({ isOpen }),
  setCollapsed: (isCollapsed) => set({ isCollapsed }),
}));

// ============================================================
// NOTIFICATION STORE
// ============================================================
interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isOpen: boolean;
  setNotifications: (n: Notification[]) => void;
  addNotification: (n: Notification) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  setOpen: (open: boolean) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  unreadCount: 0,
  isOpen: false,
  setNotifications: (notifications) =>
    set({
      notifications,
      unreadCount: notifications.filter((n) => !n.is_read).length,
    }),
  addNotification: (n) =>
    set((s) => ({
      notifications: [n, ...s.notifications],
      unreadCount: s.unreadCount + (n.is_read ? 0 : 1),
    })),
  markAsRead: (id) =>
    set((s) => ({
      notifications: s.notifications.map((n) =>
        n.id === id ? { ...n, is_read: true } : n
      ),
      unreadCount: Math.max(0, s.unreadCount - 1),
    })),
  markAllAsRead: () =>
    set((s) => ({
      notifications: s.notifications.map((n) => ({ ...n, is_read: true })),
      unreadCount: 0,
    })),
  setOpen: (isOpen) => set({ isOpen }),
}));

// ============================================================
// SEARCH STORE
// ============================================================
interface SearchState {
  isOpen: boolean;
  query: string;
  setOpen: (open: boolean) => void;
  setQuery: (query: string) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  isOpen: false,
  query: "",
  setOpen: (isOpen) => set({ isOpen, query: isOpen ? "" : "" }),
  setQuery: (query) => set({ query }),
}));

// ============================================================
// MOCK DATA FOR DEMO
// ============================================================
export const DEMO_USERS: User[] = [
  {
    id: "1",
    email: "admin@perpustakaan.id",
    name: "Ahmad Supardi",
    role: "super_admin",
    avatar_url: null,
    qr_code: null,
    phone: "+628123456789",
    class_name: null,
    is_active: true,
    last_login: new Date().toISOString(),
    created_at: "2024-01-15T00:00:00Z",
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    email: "pengurus@perpustakaan.id",
    name: "Siti Nurhaliza",
    role: "admin",
    avatar_url: null,
    qr_code: null,
    phone: "+628987654321",
    class_name: null,
    is_active: true,
    last_login: new Date().toISOString(),
    created_at: "2024-02-10T00:00:00Z",
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    email: "guru@perpustakaan.id",
    name: "Budi Santoso",
    role: "teacher",
    avatar_url: null,
    qr_code: null,
    phone: "+628555123456",
    class_name: null,
    is_active: true,
    last_login: new Date().toISOString(),
    created_at: "2024-03-01T00:00:00Z",
    updated_at: new Date().toISOString(),
  },
  {
    id: "4",
    email: "siswa@perpustakaan.id",
    name: "Rina Kartika",
    role: "member",
    avatar_url: null,
    qr_code: null,
    phone: null,
    class_name: "XII IPA 1",
    is_active: true,
    last_login: new Date().toISOString(),
    created_at: "2024-06-15T00:00:00Z",
    updated_at: new Date().toISOString(),
  },
];

export const getRoleName = (role: UserRole): string => {
  const names: Record<UserRole, string> = {
    super_admin: "Super Admin",
    admin: "Admin Pengurus",
    teacher: "Guru",
    member: "Anggota",
  };
  return names[role];
};

export const getRoleColor = (role: UserRole): string => {
  const colors: Record<UserRole, string> = {
    super_admin: "#A78BFA",
    admin: "#38BDF8",
    teacher: "#34D399",
    member: "#FBBF24",
  };
  return colors[role];
};
