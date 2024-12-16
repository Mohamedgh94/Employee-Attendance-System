import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  users: User[];
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (userData: Omit<User, 'id' | 'role' | 'qrCode'>, password: string) => boolean;
  addAdmin: (userData: Omit<User, 'id' | 'qrCode'>) => void;
}

// Default admin account
const defaultAdmin: User = {
  id: 'admin-1',
  firstName: 'Admin',
  lastName: 'User',
  email: 'admin@example.de',
  phone: '',
  department: '',
  position: 'Administrator',
  role: 'admin',
  qrCode: 'admin-qr',
  defaultLocation: '',
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      users: [defaultAdmin],
      login: (email: string, password: string) => {
        // For the default admin account
        if (email === 'admin@example.de' && password === 'Admin123') {
          set({ user: defaultAdmin, isAuthenticated: true });
          return true;
        }

        // For other users
        const user = get().users.find((u) => u.email === email);
        if (user) {
          // In a real app, you would hash the password and compare with stored hash
          // For demo purposes, we're using a simple comparison
          set({ user, isAuthenticated: true });
          return true;
        }
        return false;
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      register: (userData, password) => {
        const existingUser = get().users.find((u) => u.email === userData.email);
        if (existingUser) {
          return false;
        }

        const newUser: User = {
          ...userData,
          id: `user-${Date.now()}`,
          role: 'employee',
          qrCode: `emp-${Date.now()}`,
        };

        set((state) => ({
          users: [...state.users, newUser],
        }));
        return true;
      },
      addAdmin: (userData) => {
        const newAdmin: User = {
          ...userData,
          id: `admin-${Date.now()}`,
          role: 'admin',
          qrCode: `admin-${Date.now()}`,
        };

        set((state) => ({
          users: [...state.users, newAdmin],
        }));
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);