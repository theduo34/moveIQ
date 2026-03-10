import {ROUTE_ALERTS} from "../../components/features/home/home";
import api from "../api";

export const routeService = {
  getAlerts: async () => {
    // const { data } = await api.get("/routes/alerts");
    // return data;
    console.log("SERVICE: getAlerts called, data:", ROUTE_ALERTS); // add this
    return ROUTE_ALERTS;
  },

  getRouteById: async (id) => {
    const { data } = await api.get(`/routes/${id}`);
    return data;
  },

  searchRoutes: async (query) => {
    const { data } = await api.get("/routes/search", { params: { q: query } });
    return data;
  },
};