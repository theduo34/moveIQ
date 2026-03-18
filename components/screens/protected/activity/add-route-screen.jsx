import { useEffect, useState } from "react";
import { View, Text, Pressable, FlatList, ActivityIndicator, Animated } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ChevronDown, CheckSquare, Square } from "lucide-react-native";
import SearchBar from "../../../shared/search-bar";
import { routeService } from "../../../../services/routes/route.service";

// ─── Route checkbox row ────
const RouteCheckRow = ({ item, selected, onToggle }) => (
  <Pressable
    onPress={() => onToggle(item.id)}
    className={`flex-row items-center py-4 px-4 border-b border-gray-100 active:bg-gray-50 ${
      selected ? "bg-gray-50" : "bg-white"
    }`}
  >
    {selected ? (
      <CheckSquare size={20} color="#1B6B5A" strokeWidth={2} />
    ) : (
      <Square size={20} color="#D1D5DB" strokeWidth={2} />
    )}
    <View className="flex-1 ml-3">
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

// ─── Toast ──────
const Toast = ({ visible, message }) => {
  if (!visible) return null;
  return (
    <View className="absolute bottom-32 self-center bg-green-50 border border-green-200 rounded-full px-5 py-2.5">
      <Text className="text-xs font-medium text-green-700">{message}</Text>
    </View>
  );
};

// ─── Main Screen ──────
const AddRouteScreen = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Load all routes on mount
  useEffect(() => {
    handleSearch("");
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => handleSearch(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  const handleSearch = async (q) => {
    setLoading(true);
    try {
      const data = await routeService.searchRoutes(q);
      setResults(data);
    } catch (e) {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const showToast = (message) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  };

  const handleSave = () => {
    if (selected.length === 0) return;
    // TODO: call API to save routes
    showToast(
      selected.length === 1
        ? "New route has been added to saved routes"
        : `${selected.length} routes added to saved routes`
    );
    setTimeout(() => router.back(), 2800);
  };

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <View className="flex-row items-center px-4 pt-4 pb-3 gap-3">
        <Pressable
          onPress={() => router.back()}
          className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center"
        >
          <ChevronDown size={18} color="#1B6B5A" strokeWidth={2.5} />
        </Pressable>
        <Text className="text-lg font-bold text-emerald-900">Add route</Text>
      </View>

      {/* Search bar */}
      <View className="px-4 mb-2">
        <SearchBar
          placeholder="Search route..."
          value={query}
          onChangeText={setQuery}
          onClear={() => setQuery("")}
        />
      </View>

      {/* Results label */}
      {query.length > 0 && !loading && (
        <Text className="text-xs text-gray-400 px-4 mb-1">
          All results for {query}
        </Text>
      )}

      {/* Loading */}
      {loading && <ActivityIndicator className="mt-6" color="#1B6B5A" />}

      {/* Route list */}
      {!loading && (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <RouteCheckRow
              item={item}
              selected={selected.includes(item.id)}
              onToggle={toggleSelect}
            />
          )}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
        />
      )}

      {/* Toast */}
      <Toast visible={toastVisible} message={toastMessage} />

      {/* Save button */}
      <View
        className="absolute bottom-0 left-0 right-0 px-4 bg-white"
        style={{ paddingBottom: insets.bottom + 16, paddingTop: 12 }}
      >
        <Pressable
          onPress={handleSave}
          className={`rounded-full py-4 items-center ${
            selected.length > 0 ? "bg-emerald-800" : "bg-gray-200"
          }`}
        >
          <Text
            className={`text-sm font-bold ${
              selected.length > 0 ? "text-white" : "text-gray-400"
            }`}
          >
            Save Route{selected.length > 1 ? "s" : ""}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default AddRouteScreen;