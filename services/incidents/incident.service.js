// services/incidents/incident.service.js
import api from "../api";

// ── Mock incident data (replace with real API when backend is ready) ──────────
const MOCK_INCIDENTS = [
  {
    _id: "i1",
    type: "Traffic",
    latitude: 6.5244,
    longitude: 3.3792,
    createdAt: "2026-02-24T12:13:00Z",
  },
  {
    _id: "i2",
    type: "Roadblock",
    latitude: 6.531,
    longitude: 3.385,
    createdAt: "2026-02-24T11:00:00Z",
  },
];

export const incidentService = {
  // ── POST /incidents ─────────────────────────────────────────────────────
  createIncident: async ({ type, latitude, longitude }) => {
    // TODO: uncomment when backend is connected
    // const { data } = await api.post("/incidents", { type, latitude, longitude });
    // return data;

    // Mock response
    console.log("INCIDENT: creating incident", { type, latitude, longitude });
    return { success: true, incident: { _id: Date.now().toString(), type, latitude, longitude } };
  },

  // ── GET /incidents ───────
  getIncidents: async () => {
    // TODO: uncomment when backend is connected
    // const { data } = await api.get("/incidents");
    // return data;

    // Mock response
    console.log("INCIDENT: fetching incidents");
    return MOCK_INCIDENTS;
  },
};