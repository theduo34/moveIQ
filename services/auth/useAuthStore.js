import { create } from "zustand";
import { authService } from "./auth-service";

export const useAuthStore = create((set, get) => ({
  // ── State ────
  token: null,
  loading: false,
  error: null,

  // ── Register ─────
  register: async ({ name, email, password }) => {
    set({ loading: true, error: null });
    try {
      const data = await authService.register({ name, email, password });
      set({ user: data.user, token: data.token });
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message ?? err.message;
      set({ error: message });
      return { success: false, error: message };
    } finally {
      set({ loading: false });
    }
  },

  // ── Login ──────
  login: async ({ email, password }) => {
    set({ loading: true, error: null });
    try {
      const data = await authService.login({ email, password });
      set({ user: data.user, token: data.token });
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message ?? err.message;
      set({ error: message });
      return { success: false, error: message };
    } finally {
      set({ loading: false });
    }
  },

  // ── Get current user ─────
  fetchMe: async () => {
    set({ loading: true, error: null });
    try {
      const data = await authService.getMe();
      set({ user: data.user });
    } catch (err) {
      set({ error: err.response?.data?.message ?? err.message });
    } finally {
      set({ loading: false });
    }
  },

  // ── Logout ────────
  logout: () => {
    set({ user: null, token: null, error: null });
  },

  // ── Helpers ────────
  isAuthenticated: () => !!get().token,
  clearError: () => set({ error: null }),
}));