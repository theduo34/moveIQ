import { useState } from "react";
import { View, Text, Pressable, FlatList, ScrollView, TouchableOpacity, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  Car, TrafficCone, ChevronRight, Plus,
  ThumbsUp, ThumbsDown, CornerUpLeft, AlertCircle, CheckCircle2
} from "lucide-react-native";
import { RouteAlertCard } from "../../../features/home/route-alert";
import { ROUTE_ALERTS } from "../../../features/home/home";

// ─── Mock live feed data ──────────────────────────────────────────────────────
const LIVE_FEED = [
  {
    id: "f1",
    type: "traffic",
    title: "Heavy Traffic",
    route: "Lagos-Ibadan Express way",
    time: "12 mins ago",
    passengers: 13,
    verified: 3,
    comments: [
      {
        id: "c1",
        name: "Tolulope",
        avatar: null,
        date: "24/02/2026",
        text: "A trailer fell across both sides of the road and has held traffic on multiple lanes, I would advice anyone coming this route to consider another route.",
        upvotes: 14,
        downvotes: 1,
      },
      {
        id: "c2",
        name: "Rashida",
        avatar: null,
        date: "24/02/2026",
        text: "Yes! it is a nasty holdup, I wish I had seen this before getting on the bus.",
        upvotes: 4,
        downvotes: 0,
      },
    ],
  },
];

// ─── Tab bar ──────────────────────────────────────────────────────────────────
const TABS = ["Saved Routes", "Live feed", "Top Reports"];

const TabBar = ({ active, onChange }) => (
  <View className="flex-row border-b border-gray-100 px-4">
    {TABS.map((tab) => (
      <Pressable
        key={tab}
        onPress={() => onChange(tab)}
        className="mr-6 pb-3 pt-1"
      >
        <Text
          className={`text-sm font-semibold ${
            active === tab ? "text-emerald-900" : "text-gray-400"
          }`}
        >
          {tab}
        </Text>
        {active === tab && (
          <View className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-900 rounded-full" />
        )}
      </Pressable>
    ))}
  </View>
);

// ─── Avatar placeholder ───────────────────────────────────────────────────────
const Avatar = ({ name, size = 40 }) => (
  <View
    className="rounded-full bg-gray-200 items-center justify-center"
    style={{ width: size, height: size }}
  >
    <Text className="text-xs font-bold text-gray-500">
      {name?.charAt(0).toUpperCase()}
    </Text>
  </View>
);

// ─── Comment row ──────────────────────────────────────────────────────────────
const CommentRow = ({ comment }) => {
  const [upvotes, setUpvotes] = useState(comment.upvotes);
  const [downvotes, setDownvotes] = useState(comment.downvotes);

  return (
    <View className="py-3 border-b border-gray-100">
      <View className="flex-row items-center justify-between mb-1">
        <View className="flex-row items-center gap-2">
          <Avatar name={comment.name} size={32} />
          <Text className="text-sm font-semibold text-gray-900">{comment.name}</Text>
        </View>
        <Text className="text-xs text-gray-400">{comment.date}</Text>
      </View>
      <Text className="text-sm text-gray-600 mt-1 leading-5">{comment.text}</Text>
      <View className="flex-row items-center gap-4 mt-2">
        <Pressable
          className="flex-row items-center gap-1"
          onPress={() => {}}
        >
          <CornerUpLeft size={13} color="#9CA3AF" strokeWidth={2} />
          <Text className="text-xs text-gray-400">Reply</Text>
        </Pressable>
        <View className="w-px h-3 bg-gray-200" />
        <Pressable
          className="flex-row items-center gap-1"
          onPress={() => setUpvotes((v) => v + 1)}
        >
          <ThumbsUp size={13} color="#9CA3AF" strokeWidth={2} />
          <Text className="text-xs text-gray-400">{upvotes} Upvote</Text>
        </Pressable>
        <View className="w-px h-3 bg-gray-200" />
        <Pressable
          className="flex-row items-center gap-1"
          onPress={() => setDownvotes((v) => v + 1)}
        >
          <ThumbsDown size={13} color="#9CA3AF" strokeWidth={2} />
          <Text className="text-xs text-gray-400">{downvotes} Downvote</Text>
        </Pressable>
      </View>
    </View>
  );
};

// ─── Live feed card ───────────────────────────────────────────────────────────
const LiveFeedCard = ({ item }) => {
  const ICON_MAP = {
    traffic: { Icon: Car, color: "#EF4444", iconBg: "bg-red-100", titleColor: "text-red-500" },
    construction: { Icon: TrafficCone, color: "#F97316", iconBg: "bg-orange-100", titleColor: "text-orange-500" },
    cleared: { Icon: TrafficCone, color: "#22C55E", iconBg: "bg-green-100", titleColor: "text-green-500" },
  };
  const { Icon, color, iconBg, titleColor } = ICON_MAP[item.type];

  return (
    <View className="bg-gray-50 rounded-2xl p-4 mb-4">
      {/* Alert header */}
      <Pressable className="flex-row items-center mb-3">
        <View className={`w-10 h-10 rounded-xl ${iconBg} items-center justify-center mr-3`}>
          <Icon size={18} color={color} strokeWidth={2} />
        </View>
        <View className="flex-1">
          <Text className={`text-sm font-semibold ${titleColor}`}>{item.title}</Text>
          <Text className="text-xs text-gray-500 font-medium">{item.route}</Text>
          <View className="flex-row items-center gap-3 mt-0.5">
            <Text className="text-xs text-gray-400">{item.time}</Text>
            <View className="flex-row items-center gap-1">
              <AlertCircle size={11} color="#9CA3AF" strokeWidth={2} />
              <Text className="text-xs text-gray-400">{item.passengers}</Text>
            </View>
            <View className="flex-row items-center gap-1">
              <CheckCircle2 size={11} color="#9CA3AF" strokeWidth={2} />
              <Text className="text-xs text-gray-400">{item.verified}</Text>
            </View>
          </View>
        </View>
        <ChevronRight size={16} color="#D1D5DB" strokeWidth={2} />
      </Pressable>

      {/* Comments */}
      {item.comments.map((c) => (
        <CommentRow key={c.id} comment={c} />
      ))}
    </View>
  );
};

// ─── Filter chips ─────────────────────────────────────────────────────────────
const FILTERS = ["Reports", "Routes", "Incidents"];

const FilterChips = ({ active, onChange }) => (
  <View className="flex-row gap-2 px-4 py-3">
    {FILTERS.map((f) => (
      <Pressable
        key={f}
        onPress={() => onChange(f)}
        className={`px-4 py-1.5 rounded-full border ${
          active === f
            ? "bg-emerald-900 border-emerald-900"
            : "bg-white border-gray-200"
        }`}
      >
        <Text
          className={`text-xs font-semibold ${
            active === f ? "text-white" : "text-gray-500"
          }`}
        >
          {f}
        </Text>
      </Pressable>
    ))}
  </View>
);

// ─── Main Screen ───────
const ActivityScreen = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Saved Routes");
  const [activeFilter, setActiveFilter] = useState("Reports");

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <View className="px-4 pt-4 pb-2">
        <Text className="text-xl font-bold text-emerald-900">Activities</Text>
      </View>

      {/* Tabs */}
      <TabBar active={activeTab} onChange={setActiveTab} />

      {/* ── Saved Routes tab ── */}
      {activeTab === "Saved Routes" && (
        <View className="flex-1">
          <FlatList
            data={ROUTE_ALERTS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Pressable
                onPress={() =>
                  router.push({
                    pathname: "/(protected)/(stack)/route-detail",
                    params: { id: item.id, name: item.title },
                  })
                }
              >
                <RouteAlertCard alert={item}  onPress={() => router.push({
    pathname: "/(protected)/(stack)/route-detail",
    params: { id: item.id, name: item.route },
  })} />
              </Pressable>
            )}
            contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom + 100 }}
            showsVerticalScrollIndicator={false}
          />

          {/* Add Route FAB */}
          <Pressable
            onPress={() => router.push("/(protected)/(stack)/add-route")}
            className="absolute bottom-8 right-4 flex-row items-center bg-gray-100 rounded-full px-4 py-3 gap-2"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 6,
              elevation: 4,
              bottom: insets.bottom + 24,
            }}
          >
            <Plus size={16} color="#374151" strokeWidth={2.5} />
            <Text className="text-sm font-semibold text-gray-700">Add Route</Text>
          </Pressable>
        </View>
      )}

      {/* ── Live feed tab ── */}
      {activeTab === "Live feed" && (
        <View className="flex-1">
          <FilterChips active={activeFilter} onChange={setActiveFilter} />
          <ScrollView
            contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom + 80 }}
            showsVerticalScrollIndicator={false}
          >
            {LIVE_FEED.map((item) => (
              <LiveFeedCard key={item.id} item={item} />
            ))}
          </ScrollView>
        </View>
      )}

      {/* ── Top Reports tab ── */}
      {activeTab === "Top Reports" && (
        <View className="flex-1 items-center justify-center">
          <Text className="text-sm text-gray-400">Top reports coming soon</Text>
        </View>
      )}
    </View>
  );
};

export default ActivityScreen;