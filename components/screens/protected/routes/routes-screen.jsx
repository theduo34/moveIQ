import { View, Text, Pressable, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Plus, Map } from "lucide-react-native";
import { RouteAlertCard } from "../../../features/home/route-alert";
import { ROUTE_ALERTS } from "../../../features/home/home";

const RoutesScreen = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handleCardPress = (alert) => {
    router.push({
      pathname: "/(protected)/(stack)/route-detail",
      params: { id: alert.id, name: alert.route },
    });
  };

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <View className="px-4 pt-4 pb-2">
        <Text className="text-2xl font-medium text-[#003838]">Routes</Text>
      </View>

      {ROUTE_ALERTS.length === 0 ? (
        // ── Empty state ──
        <View className="flex-1 items-center justify-center px-8">
          <View className="w-16 h-16 rounded-full bg-gray-100 items-center justify-center mb-4">
            <Map size={28} color="#9CA3AF" strokeWidth={1.5} />
          </View>
          <Text className="text-base font-semibold text-gray-500 text-center">
            No saved routes yet
          </Text>
          <Text className="text-sm text-gray-400 text-center mt-1">
            Add routes you travel frequently to monitor them in real time
          </Text>
          <Pressable
            onPress={() => router.push("/(protected)/(stack)/add-route")}
            className="mt-6 bg-emerald-800 rounded-full px-6 py-3"
          >
            <Text className="text-sm font-semibold text-white">Add your first route</Text>
          </Pressable>
        </View>
      ) : (
        // ── Routes list ──
        <View className="flex-1">
          <FlatList
            data={ROUTE_ALERTS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <RouteAlertCard
                alert={item}
                onPress={() => handleCardPress(item)}
              />
            )}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingTop: 8,
              paddingBottom: insets.bottom + 120,
            }}
            showsVerticalScrollIndicator={false}
          />

          {/* Add Route FAB */}
          <Pressable
            onPress={() => router.push("/(protected)/(stack)/add-route")}
            className="absolute right-4 flex-row items-center bg-gray-100 rounded-full px-4 py-3 gap-2"
            style={{
              bottom: insets.bottom + 24,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 6,
              elevation: 4,
            }}
          >
            <Plus size={16} color="#374151" strokeWidth={2.5} />
            <Text className="text-sm font-semibold text-gray-700">Add Route</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default RoutesScreen;