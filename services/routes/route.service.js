import api from "../api";
import { ROUTE_ALERTS } from "../../components/features/home/home";

// ── Mock route data ──────
const MOCK_ROUTES = [
  { id: "r1", name: "Iyana Oworo - CMS", incidents: 3, lastUpdated: "2 mins ago" },
  { id: "r2", name: "Iyana - Ibadan Express Way", incidents: 3, lastUpdated: "2 mins ago" },
  { id: "r3", name: "Lekki - Ojodu Berger", incidents: 1, lastUpdated: "7 mins ago" },
  { id: "r4", name: "Mile 2 - Iyana Oba", incidents: 0, lastUpdated: "9 mins ago" },
  { id: "r5", name: "Iyana Oba - Oshodi", incidents: 2, lastUpdated: "11 mins ago" },
  { id: "r6", name: "Iyana - Ikotun", incidents: 2, lastUpdated: "13 mins ago" },
  { id: "r7", name: "Lagos-Ibadan Express way", incidents: 4, lastUpdated: "5 mins ago" },
  { id: "r8", name: "Iyanapaja - CMS", incidents: 1, lastUpdated: "3 mins ago" },
  { id: "r9", name: "Oshodi - Apapa", incidents: 0, lastUpdated: "15 mins ago" },
  { id: "r10", name: "Maryland - Ojota", incidents: 2, lastUpdated: "8 mins ago" },
  { id: "r11", name: "Surulere - TBS", incidents: 1, lastUpdated: "20 mins ago" },
  { id: "r12", name: "Berger - Ikeja", incidents: 3, lastUpdated: "6 mins ago" },
];

export const routeService = {
  // ── GET /routes/alerts ────────
  getAlerts: async () => {
    // TODO: uncomment when backend is connected
    // const { data } = await api.get("/routes/alerts");
    // return data;
    return ROUTE_ALERTS;
  },

  // ── GET /routes/:id ─────────
  getRouteById: async (id) => {
    // TODO: uncomment when backend is connected
    // const { data } = await api.get(`/routes/${id}`);
    // return data;
    return MOCK_ROUTES.find((r) => r.id === id) ?? null;
  },

  // ── GET /routes/search?q=query ────────
  searchRoutes: async (query) => {
    // TODO: uncomment when backend is connected
    // const { data } = await api.get("/routes/search", { params: { q: query } });
    // return data;
    const q = query.toLowerCase().trim();
    if (!q) return MOCK_ROUTES;
    return MOCK_ROUTES.filter((r) => r.name.toLowerCase().includes(q));
  },

  // ── POST /routes/save ──────────
  saveRoutes: async (routeIds) => {
    // TODO: uncomment when backend is connected
    // const { data } = await api.post("/routes/save", { routeIds });
    // return data;
    console.log("ROUTES: saving routes", routeIds);
    return { success: true };
  },

  // ── DELETE /routes/save/:id ────────
  removeSavedRoute: async (routeId) => {
    // TODO: uncomment when backend is connected
    // const { data } = await api.delete(`/routes/save/${routeId}`);
    // return data;
    console.log("ROUTES: removing route", routeId);
    return { success: true };
  },
};