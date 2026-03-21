import api from "../api";
import { ROUTE_ALERTS } from "../../components/features/home/home";

// ── Mock route data ──────
const MOCK_ROUTES = [
  {
    id: "r1", name: "Iyana Oworo - CMS", incidents: 3, lastUpdated: "2 mins ago",
    origin:      { latitude: 6.5833, longitude: 3.3833, name: "Iyana Oworo" },
    destination: { latitude: 6.4541, longitude: 3.3947, name: "CMS, Lagos Island" },
  },
  {
    id: "r2", name: "Iyana Ipaja - Ibadan Expressway", incidents: 3, lastUpdated: "2 mins ago",
    origin:      { latitude: 6.5667, longitude: 3.2667, name: "Iyana Ipaja" },
    destination: { latitude: 6.6508, longitude: 3.3624, name: "Ojodu Berger / Lagos-Ibadan Expressway" },
  },
  {
    id: "r3", name: "Lekki - Ojodu Berger", incidents: 1, lastUpdated: "7 mins ago",
    origin:      { latitude: 6.4698, longitude: 3.5852, name: "Lekki" },
    destination: { latitude: 6.6508, longitude: 3.3624, name: "Ojodu Berger" },
  },
  {
    id: "r4", name: "Mile 2 - Iyana Oba", incidents: 0, lastUpdated: "9 mins ago",
    origin:      { latitude: 6.4698, longitude: 3.2969, name: "Mile 2" },
    destination: { latitude: 6.5285, longitude: 3.2438, name: "Iyana Oba" },
  },
  {
    id: "r5", name: "Iyana Oba - Oshodi", incidents: 2, lastUpdated: "11 mins ago",
    origin:      { latitude: 6.5285, longitude: 3.2438, name: "Iyana Oba" },
    destination: { latitude: 6.5568, longitude: 3.3438, name: "Oshodi" },
  },
  {
    id: "r6", name: "Iyana Ipaja - Ikotun", incidents: 2, lastUpdated: "13 mins ago",
    origin:      { latitude: 6.5667, longitude: 3.2667, name: "Iyana Ipaja" },
    destination: { latitude: 6.5064, longitude: 3.2827, name: "Ikotun" },
  },
  {
    id: "r7", name: "Lagos - Ibadan Expressway", incidents: 4, lastUpdated: "5 mins ago",
    origin:      { latitude: 6.6508, longitude: 3.3624, name: "Ojodu Berger" },
    destination: { latitude: 7.3775, longitude: 3.9470, name: "Ibadan" },
  },
  {
    id: "r8", name: "Iyanapaja - CMS", incidents: 1, lastUpdated: "3 mins ago",
    origin:      { latitude: 6.5456, longitude: 3.2611, name: "Iyanapaja" },
    destination: { latitude: 6.4541, longitude: 3.3947, name: "CMS, Lagos Island" },
  },
  {
    id: "r9", name: "Oshodi - Apapa", incidents: 0, lastUpdated: "15 mins ago",
    origin:      { latitude: 6.5568, longitude: 3.3438, name: "Oshodi" },
    destination: { latitude: 6.4474, longitude: 3.3597, name: "Apapa" },
  },
  {
    id: "r10", name: "Maryland - Ojota", incidents: 2, lastUpdated: "8 mins ago",
    origin:      { latitude: 6.5619, longitude: 3.3619, name: "Maryland" },
    destination: { latitude: 6.5853, longitude: 3.3853, name: "Ojota" },
  },
  {
    id: "r11", name: "Surulere - TBS", incidents: 1, lastUpdated: "20 mins ago",
    origin:      { latitude: 6.5133, longitude: 3.3622, name: "Surulere" },
    destination: { latitude: 6.4515, longitude: 3.3906, name: "TBS, Lagos Island" },
  },
  {
    id: "r12", name: "Berger - Ikeja", incidents: 3, lastUpdated: "6 mins ago",
    origin:      { latitude: 6.6508, longitude: 3.3624, name: "Ojodu Berger" },
    destination: { latitude: 6.6018, longitude: 3.3515, name: "Ikeja" },
  },
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