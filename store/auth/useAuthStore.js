// store/auth/useAuthStore.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authService } from "../../services/auth/auth-service";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      // ── Login ─────────────────────────────────────────────────────────────
      login: async (credentials) => {
        set({ loading: true, error: null });
        try {
          const { user, token } = await authService.login(credentials);
          set({ user, token, isAuthenticated: true });
          return { success: true };
        } catch (err) {
          const message = err.response?.data?.message ?? err.message;
          set({ error: message });
          return { success: false, error: message };
        } finally {
          set({ loading: false });
        }
      },

      // ── Register ──────────────────────────────────────────────────────────
      register: async (payload) => {
        set({ loading: true, error: null });
        try {
          const { user, token } = await authService.register(payload);
          set({ user, token, isAuthenticated: true });
          return { success: true };
        } catch (err) {
          const message = err.response?.data?.message ?? err.message;
          set({ error: message });
          return { success: false, error: message };
        } finally {
          set({ loading: false });
        }
      },

      setFromFirebase: (firebaseUser) => {
  set({
    user: {
      id: firebaseUser.uid,
      name: firebaseUser.displayName,
      email: firebaseUser.email,
    },
    token: null, // Firebase manages its own token
    isAuthenticated: true,
  });
},

      // ── Logout ────────────────────────────────────────────────────────────
      logout: () => set({ user: null, token: null, isAuthenticated: false, error: null }),

      // ── Update user ───────────────────────────────────────────────────────
      updateUser: (updates) =>
        set((state) => ({ user: { ...state.user, ...updates } })),

      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
      // Only persist token and user — not loading/error states
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);