// components/screens/protected/search/search-screen.jsx
import { useState } from "react";
import { View, Text, TextInput, Pressable, FlatList, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ChevronDown, MapPin, Search, X, AlertCircle } from "lucide-react-native";
import { useRouteStore } from "../../../../store/routes/useRoutesStore";
import { useMapStore } from "../../../../store/map/useMapStore";

// ─── Route row ────────────────────────────────────────────────────────────────
const RouteRow = ({ item, onPress, loading }) => (
  <Pressable
    onPress={() => onPress(item)}
    disabled={loading}
    className="flex-row items-center py-4 px-4 border-b border-gray-100 active:bg-gray-50"
  >
    <View className="w-9 h-9 rounded-full bg-emerald-50 items-center justify-center mr-3">
      <MapPin size={16} color="#1B6B5A" strokeWidth={2} />
    </View>
    <View className="flex-1">
      <Text className="text-sm font-semibold text-gray-900">{item.name}</Text>
      <Text className="text-xs text-gray-400 mt-0.5">
        {item.origin.name} → {item.destination.name}
      </Text>
    </View>
    {item.incidents > 0 && (
      <View className="flex-row items-center gap-1 bg-red-50 rounded-full px-2 py-1">
        <AlertCircle size={11} color="#DC2626" strokeWidth={2} />
        <Text className="text-xs font-semibold text-red-600">{item.incidents}</Text>
      </View>
    )}
  </Pressable>
);

// ─── Main Screen ──────────────────────────────────────────────────────────────
const SearchScreen = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const { searchResults, searchLoading, searchRoutes, clearSearch } = useRouteStore();
  const { clearDestination } = useMapStore();

  const [query, setQuery] = useState("");
  const [routeLoading, setRouteLoading] = useState(false);

  const handleSearch = (text) => {
    setQuery(text);
    if (text.trim()) {
      searchRoutes(text);
    } else {
      clearSearch();
    }
  };

  const handleClear = () => {
    setQuery("");
    clearSearch();
  };

  const handleSelectRoute = async (route) => {
    setRouteLoading(true);
    useMapStore.setState({ origin: route.origin, destination: route.destination });
    await useMapStore.getState().fetchRoute(route.origin, route.destination);
    setRouteLoading(false);
    clearSearch();
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(protected)/(tabs)/home");
    }
  };

  const handleBack = () => {
    clearSearch();
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(protected)/(tabs)/home");
    }
  };

  // Show all routes when no search, filtered results when searching
  const displayRoutes = query.trim() ? searchResults : useRouteStore.getState().searchResults.length === 0
    ? [] // will be populated by initial load below
    : searchResults;

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <View className="flex-row items-center px-4 pt-4 pb-3 gap-3">
        <Pressable
          onPress={handleBack}
          className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center"
        >
          <ChevronDown size={18} color="#1B6B5A" strokeWidth={2.5} />
        </Pressable>
        <Text className="text-lg font-bold text-emerald-900">Select a route</Text>
      </View>

      {/* Search / filter bar */}
      <View className="mx-4 mb-3">
        <View className="flex-row items-center bg-white border border-gray-200 rounded-full px-4 h-12 shadow-sm">
          <Search size={18} color="#1B6B5A" strokeWidth={2} />
          <TextInput
            value={query}
            onChangeText={handleSearch}
            placeholder="Filter routes..."
            placeholderTextColor="#9CA3AF"
            className="flex-1 ml-3 text-sm text-gray-900"
            returnKeyType="search"
            autoFocus={false}
          />
          {query.length > 0 && (
            <Pressable onPress={handleClear} hitSlop={8}>
              <X size={16} color="#9CA3AF" strokeWidth={2} />
            </Pressable>
          )}
        </View>
      </View>

      {/* Loading overlay while fetching route */}
      {routeLoading && (
        <View className="absolute inset-0 bg-white/80 items-center justify-center z-10">
          <ActivityIndicator size="large" color="#1B6B5A" />
          <Text className="text-sm text-gray-500 mt-3">Loading route...</Text>
        </View>
      )}

      {/* Route list */}
      <AllRoutes
        query={query}
        searchResults={searchResults}
        searchLoading={searchLoading}
        onSelect={handleSelectRoute}
        routeLoading={routeLoading}
      />
    </View>
  );
};

// Separate component so we can load all routes on mount
import { useEffect } from "react";
const AllRoutes = ({ query, searchResults, searchLoading, onSelect, routeLoading }) => {
  const { searchRoutes } = useRouteStore();

  // Load all routes on mount by searching with empty string (returns all)
  const [allRoutes, setAllRoutes] = useState([]);

  useEffect(() => {
    const { routeService } = require("../../../../services/routes/route.service");
    routeService.searchRoutes("").then(setAllRoutes);
  }, []);

  const routes = query.trim() ? searchResults : allRoutes;

  if (searchLoading) return <ActivityIndicator className="mt-8" color="#1B6B5A" />;

  return (
    <FlatList
      data={routes}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <RouteRow item={item} onPress={onSelect} loading={routeLoading} />
      )}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <View className="items-center mt-16 px-8">
          <MapPin size={40} color="#D1D5DB" strokeWidth={1.5} />
          <Text className="text-sm font-semibold text-gray-400 mt-3">No routes found</Text>
        </View>
      }
    />
  );
};

export default SearchScreen;
