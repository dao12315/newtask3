// stores/user.store.ts
import { create } from 'zustand';
import { AppUser } from '../models/app-user';

type UserStore = {
  user: AppUser | null;
  isHydrated: boolean; // đã restore từ storage chưa

  setUser: (user: AppUser) => void;
  updateUser: (patch: Partial<AppUser>) => void;
  clearUser: () => void;

  hydrate: (user: AppUser | null) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isHydrated: false,

  setUser: (user) => set({ user }),
  updateUser: (patch) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...patch } : state.user,
    })),
  clearUser: () => set({ user: null }),

  hydrate: (user) => set({ user, isHydrated: true }),
}));
