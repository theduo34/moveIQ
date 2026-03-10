import { create } from "zustand";
import {routeService} from "../../services/routes/route.service";

export const useRouteStore = create((set, get) => ({
  // State
  alerts: [],
  selectedRoute: null,
  loading: false,
  error: null,

  fetchAlerts: async () => {
    console.log("STORE: fetchAlerts started");
    set({ loading: true, error: null });
    try {
      const data = await routeService.getAlerts();
      console.log("STORE: data received:", data);
      set({ alerts: Array.isArray(data) ? data : [] });
      console.log("STORE: alerts set to:", data);
    } catch (err) {
      console.log("STORE: error:", err.message);
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  setSelectedRoute: (route) => set({ selectedRoute: route }),

  clearError: () => set({ error: null }),
}));