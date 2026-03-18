// components/screens/protected/search/search-screen.jsx
import { useEffect, useRef, useState } from "react";
import {
  View, Text, TextInput, Pressable,
  FlatList, ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ChevronDown, ChevronUp, MapPin, Search, X, Navigation } from "lucide-react-native";
import { useRouteStore } from "../../../../store/routes/useRoutesStore";
import { useMapStore } from "../../../../store/map/useMapStore";

// ─── Route result row (from our mock routes) ──────────────────────────────────
const RouteResultRow = ({ item, onPress }) => (
  <Pressable
    onPress={() => onPress(item)}
    className="flex-row items-center py-4 px-4 border-b border-gray-100 active:bg-gray-50"
  >
    <MapPin size={18} color="#1B6B5A" strokeWidth={2} style={{ marginRight: 12 }} />
    <View className="flex-1">
      <Text className="text-sm font-semibold text-gray-900">{item.name}</Text>
      <Text className="text-xs text-gray-400 mt-0.5">
        {item.incidents === 0
          ? "Clear route"
          : `${item.incidents} incidence${item.incidents > 1 ? "s" : ""} reported`}
      </Text>
    </View>
    <Text className="text-xs text-gray-400">{item.lastUpdated}</Text>
  </Pressable>
);

// ─── Nominatim result row (real location search) ──────────────────────────────
const LocationResultRow = ({ item, onPress }) => (
  <Pressable
    onPress={() => onPress(item)}
    className="flex-row items-center py-4 px-4 border-b border-gray-100 active:bg-gray-50"
  >
    <Navigation size={18} color="#6B7280" strokeWidth={2} style={{ marginRight: 12 }} />
    <View className="flex-1">
      <Text className="text-sm font-semibold text-gray-900" numberOfLines={1}>
        {item.display_name?.split(",")[0]}
      </Text>
      <Text className="text-xs text-gray-400 mt-0.5" numberOfLines={1}>
        {item.display_name}
      </Text>
    </View>
  </Pressable>
);

// ─── Main Screen ──────────────────────────────────────────────────────────────
const SearchScreen = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const inputRef = useRef(null);

  const { searchQuery, searchResults, searchLoading, searchRoutes, clearSearch } = useRouteStore();
  const { searchAndRoute, routeLoading, routeError, clearDestination } = useMapStore();

  const [localQuery, setLocalQuery] = useState(searchQuery ?? "");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [locationResults, setLocationResults] = useState([]);
  const [locationLoading, setLocationLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("routes"); // "routes" | "places"

  // Auto-focus input when screen mounts
  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 100);
    return () => clearTimeout(timer);
  }, []);

  // Debounced search — both routes and places
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localQuery.trim()) {
        searchRoutes(localQuery);
        searchPlaces(localQuery);
      } else {
        clearSearch();
        setLocationResults([]);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [localQuery]);

  // Search real places via Nominatim
  const searchPlaces = async (query) => {
    setLocationLoading(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5&countrycodes=ng`,
        { headers: { "User-Agent": "MoveIQ/1.0" } }
      );
      const data = await res.json();
      setLocationResults(Array.isArray(data) ? data : []);
    } catch (e) {
      setLocationResults([]);
    } finally {
      setLocationLoading(false);
    }
  };

  const handleClear = () => {
    setLocalQuery("");
    clearSearch();
    setLocationResults([]);
    clearDestination();
    inputRef.current?.focus();
  };

  // Selecting a route → navigate to route detail
  const handleSelectRoute = (route) => {
    clearSearch();
    router.push({
      pathname: "/(protected)/(stack)/route-detail",
      params: { id: route.id, name: route.name },
    });
  };

  // Selecting a place → set as destination on map + draw route
  const handleSelectPlace = async (place) => {
    const dest = {
      latitude: parseFloat(place.lat),
      longitude: parseFloat(place.lon),
      name: place.display_name,
    };
    // Set destination directly in map store
    useMapStore.getState().setCurrentLocation(useMapStore.getState().currentLocation);
    useMapStore.setState({ destination: dest });

    // Fetch route
    const current = useMapStore.getState().currentLocation;
    if (current) {
      await useMapStore.getState().fetchRoute(current, dest);
    }

    clearSearch();
    router.back(); // Go back to map to show the route
  };

  const handleBack = () => {
    clearSearch();
    router.back();
  };

  const isLoading = searchLoading || locationLoading;
  const hasRouteResults = searchResults.length > 0;
  const hasLocationResults = locationResults.length > 0;
  const hasAnyResults = hasRouteResults || hasLocationResults;

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <View className="flex-row items-center px-4 pt-4 pb-2 gap-3">
        <Pressable
          onPress={handleBack}
          className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center"
        >
          <ChevronDown size={18} color="#1B6B5A" strokeWidth={2.5} />
        </Pressable>
        <Text className="text-lg font-bold text-emerald-900">Search route</Text>
      </View>

      {/* Search bar */}
      <View className="mx-4 mt-3 mb-2">
        <View className="flex-row items-center bg-white border border-gray-200 rounded-full px-4 h-12 shadow-sm">
          <Search size={18} color="#1B6B5A" strokeWidth={2} />
          <TextInput
            ref={inputRef}
            value={localQuery}
            onChangeText={setLocalQuery}
            placeholder="Search route or place..."
            placeholderTextColor="#9CA3AF"
            className="flex-1 ml-3 text-sm text-gray-900"
            returnKeyType="search"
            onSubmitEditing={() => searchRoutes(localQuery)}
          />
          {localQuery.length > 0 ? (
            <Pressable onPress={handleClear} hitSlop={8}>
              <X size={16} color="#9CA3AF" strokeWidth={2} />
            </Pressable>
          ) : (
            <Pressable onPress={() => setDropdownOpen((v) => !v)} hitSlop={8}>
              {dropdownOpen
                ? <ChevronUp size={16} color="#9CA3AF" strokeWidth={2} />
                : <ChevronDown size={16} color="#9CA3AF" strokeWidth={2} />
              }
            </Pressable>
          )}
        </View>
      </View>

      {/* Tabs — only show when there are results */}
      {localQuery.length > 0 && hasAnyResults && (
        <View className="flex-row px-4 mb-2 gap-4">
          <Pressable onPress={() => setActiveTab("routes")}>
            <Text className={`text-xs font-semibold pb-1 border-b-2 ${
              activeTab === "routes"
                ? "text-emerald-800 border-emerald-800"
                : "text-gray-400 border-transparent"
            }`}>
              Routes ({searchResults.length})
            </Text>
          </Pressable>
          <Pressable onPress={() => setActiveTab("places")}>
            <Text className={`text-xs font-semibold pb-1 border-b-2 ${
              activeTab === "places"
                ? "text-emerald-800 border-emerald-800"
                : "text-gray-400 border-transparent"
            }`}>
              Places ({locationResults.length})
            </Text>
          </Pressable>
        </View>
      )}

      {/* Results label */}
      {localQuery.length > 0 && !isLoading && (
        <Text className="text-xs text-gray-400 px-4 mb-1">
          All results for {localQuery}
        </Text>
      )}

      {/* Loading */}
      {isLoading && <ActivityIndicator className="mt-8" color="#1B6B5A" />}

      {/* Route results */}
      {!isLoading && activeTab === "routes" && hasRouteResults && (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <RouteResultRow item={item} onPress={handleSelectRoute} />
          )}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Place results */}
      {!isLoading && activeTab === "places" && hasLocationResults && (
        <FlatList
          data={locationResults}
          keyExtractor={(item) => item.place_id?.toString()}
          renderItem={({ item }) => (
            <LocationResultRow item={item} onPress={handleSelectPlace} />
          )}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Empty state */}
      {!isLoading && localQuery.length > 0 && !hasAnyResults && (
        <View className="items-center mt-16 px-8">
          <MapPin size={40} color="#D1D5DB" strokeWidth={1.5} />
          <Text className="text-sm font-semibold text-gray-400 mt-3">
            No results for {`"${localQuery}"`}
          </Text>
          <Text className="text-xs text-gray-300 mt-1 text-center">
            Try a different search term
          </Text>
        </View>
      )}
    </View>
  );
};

export default SearchScreen;