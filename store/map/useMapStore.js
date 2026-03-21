import { create } from "zustand";

export const useMapStore = create((set, get) => ({
  // ── State ──────
  currentLocation: null,   // { latitude, longitude }
  origin: null,            // { latitude, longitude, name } — custom origin, null = use currentLocation
  destination: null,        // { latitude, longitude, name }
  routeCoords: [],          // [{ latitude, longitude }, ...]
  routeLoading: false,
  routeError: null,

  // ── Actions ───
  setCurrentLocation: (coords) => set({ currentLocation: coords }),
  setOrigin: (coords) => set({ origin: coords }),

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

  // Fetch A-to-B route via OSRM, fall back to straight line if it fails or times out
  fetchRoute: async (start, end) => {
    const straightLine = [
      { latitude: start.latitude, longitude: start.longitude },
      { latitude: end.latitude, longitude: end.longitude },
    ];

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000); // 6s timeout

    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${start.longitude},${start.latitude};${end.longitude},${end.latitude}?geometries=geojson`;
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeout);
      const json = await res.json();

      if (json.routes && json.routes.length > 0) {
        const coords = json.routes[0].geometry.coordinates.map((c) => ({
          latitude: c[1],
          longitude: c[0],
        }));
        set({ routeCoords: coords });
      } else {
        set({ routeCoords: straightLine });
      }
    } catch (err) {
      clearTimeout(timeout);
      set({ routeCoords: straightLine });
    }
  },

  clearDestination: () => set({ origin: null, destination: null, routeCoords: [], routeError: null }),
}));