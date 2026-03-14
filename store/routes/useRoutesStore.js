import { create } from "zustand";
import { routeService } from "../../services/routes/route.service";

export const useRouteStore = create((set, get) => ({
  // ── State ──────────────────────────────────────────────────────────────────
  alerts: [],
  selectedRoute: null,
  loading: false,
  error: null,

  // Search state
  searchQuery: "",
  searchResults: [],
  searchLoading: false,
  searchError: null,

  // ── Alerts ─────────────────────────────────────────────────────────────────
  fetchAlerts: async () => {
    set({ loading: true, error: null });
    try {
      const data = await routeService.getAlerts();
      set({ alerts: Array.isArray(data) ? data : [] });
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  // ── Search ─────────────────────────────────────────────────────────────────
  setSearchQuery: (query) => set({ searchQuery: query }),

  searchRoutes: async (query) => {
    if (!query.trim()) {
      set({ searchResults: [], searchQuery: "" });
      return;
    }
    set({ searchLoading: true, searchError: null, searchQuery: query });
    try {
      const data = await routeService.searchRoutes(query);
      set({ searchResults: Array.isArray(data) ? data : [] });
    } catch (err) {
      set({ searchError: err.message });
    } finally {
      set({ searchLoading: false });
    }
  },

  clearSearch: () => set({
    searchQuery: "",
    searchResults: [],
    searchError: null,
  }),

  // ── Route selection ────────────────────────────────────────────────────────
  setSelectedRoute: (route) => set({ selectedRoute: route }),

  clearError: () => set({ error: null }),
}));