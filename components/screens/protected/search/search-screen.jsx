import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ChevronDown, ChevronUp, MapPin, Search, X } from "lucide-react-native";
import { useRouteStore } from "../../../../store/routes/useRoutesStore";

// ─── Single result row ────────────────────────────────────────────────────────
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

// ─── Main Screen ──────────────────────────────────────────────────────────────
const SearchScreen = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const inputRef = useRef(null);

  const { searchQuery, searchResults, searchLoading, searchRoutes, clearSearch } =
    useRouteStore();

  const [localQuery, setLocalQuery] = useState(searchQuery ?? "");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Auto-focus input when screen mounts
  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 100);
    return () => clearTimeout(timer);
  }, []);

  // Search as user types
  useEffect(() => {
    const timer = setTimeout(() => {
      searchRoutes(localQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [localQuery]);

  const handleClear = () => {
    setLocalQuery("");
    clearSearch();
    inputRef.current?.focus();
  };

  const handleSelectRoute = (route) => {
    clearSearch();
    // Navigate to route detail
    router.push({
      pathname: "/(protected)/(stack)/route-detail",
      params: { id: route.id, name: route.name },
    });
  };

  const handleBack = () => {
    clearSearch();
    router.back();
  };

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
            placeholder="Search route..."
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
              {dropdownOpen ? (
                <ChevronUp size={16} color="#9CA3AF" strokeWidth={2} />
              ) : (
                <ChevronDown size={16} color="#9CA3AF" strokeWidth={2} />
              )}
            </Pressable>
          )}
        </View>
      </View>

      {/* Results label */}
      {localQuery.length > 0 && !searchLoading && (
        <Text className="text-xs text-gray-400 px-4 mb-1 mt-1">
          All results for {localQuery}
        </Text>
      )}

      {/* Loading */}
      {searchLoading && (
        <ActivityIndicator className="mt-8" color="#1B6B5A" />
      )}

      {/* Results list */}
      {!searchLoading && searchResults.length > 0 && (
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

      {/* Empty state */}
      {!searchLoading && localQuery.length > 0 && searchResults.length === 0 && (
        <View className="items-center mt-16 px-8">
          <MapPin size={40} color="#D1D5DB" strokeWidth={1.5} />
          <Text className="text-sm font-semibold text-gray-400 mt-3">
            No routes found for {`"${localQuery}"`}
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