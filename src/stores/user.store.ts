// stores/user.store.ts
import { create } from 'zustand';
import { AppUser } from '../models/app-user';

type RegisterDraft = {
  name: string;
  email: string;
  phoneNumber: number;
  dateOfBirth: string;
  avatar: string;
  provider?: 'email' | 'google';
};

type UserStore = {
  // ===== AUTH USER =====
  user: AppUser | null;
  isHydrated: boolean;

  setUser: (user: AppUser) => void;
  updateUser: (patch: Partial<AppUser>) => void;
  clearUser: () => void;
  hydrate: (user: AppUser | null) => void;

  // ===== REGISTER DRAFT =====
  registerDraft: RegisterDraft | null;
  setRegisterDraft: (draft: RegisterDraft) => void;
  clearRegisterDraft: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  // ===== AUTH USER =====
  user: null,
  isHydrated: false,

  setUser: (user) => set({ user }),
  updateUser: (patch) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...patch } : state.user,
    })),
  clearUser: () => set({ user: null }),

  hydrate: (user) => set({ user, isHydrated: true }),

  // ===== REGISTER DRAFT =====
  registerDraft: null,
  setRegisterDraft: (draft) => set({ registerDraft: draft }),
  clearRegisterDraft: () => set({ registerDraft: null }),
}));
