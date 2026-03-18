import { create } from "zustand";

export const useMapStore = create((set, get) => ({
  // ── State ──────
  currentLocation: null,   // { latitude, longitude }
  destination: null,        // { latitude, longitude, name }
  routeCoords: [],          // [{ latitude, longitude }, ...]
  routeLoading: false,
  routeError: null,

  // ── Actions ───
  setCurrentLocation: (coords) => set({ currentLocation: coords }),

  // Search destination via Nominatim + fetch route via OSRM
  searchAndRoute: async (query) => {
    if (!query.trim()) return;

    set({ routeLoading: true, routeError: null });

    try {
      // 1. Geocode the search query via Nominatim
      const geoRes = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1&countrycodes=ng`,
        { headers: { "User-Agent": "MoveIQ/1.0" } }
      );
      const geoData = await geoRes.json();

      if (!geoData || geoData.length === 0) {
        set({ routeError: "Location not found. Try a different search.", routeLoading: false });
        return null;
      }

      const dest = {
        latitude: parseFloat(geoData[0].lat),
        longitude: parseFloat(geoData[0].lon),
        name: geoData[0].display_name,
      };

      set({ destination: dest });

      // 2. Fetch route via OSRM if we have current location
      const { currentLocation } = get();
      if (currentLocation) {
        await get().fetchRoute(currentLocation, dest);
      }

      return dest;
    } catch (err) {
      set({ routeError: err.message });
      return null;
    } finally {
      set({ routeLoading: false });
    }
  },

  // Fetch A-to-B route via OSRM
  fetchRoute: async (start, end) => {
    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${start.longitude},${start.latitude};${end.longitude},${end.latitude}?geometries=geojson`;
      const res = await fetch(url);
      const json = await res.json();

      if (json.routes && json.routes.length > 0) {
        const coords = json.routes[0].geometry.coordinates.map((c) => ({
          latitude: c[1],
          longitude: c[0],
        }));
        set({ routeCoords: coords });
      }
    } catch (err) {
      console.log("OSRM routing error:", err.message);
    }
  },

  clearDestination: () => set({ destination: null, routeCoords: [], routeError: null }),
}));