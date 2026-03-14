import { useRef, useState, useMemo } from "react";
import {
  View, Text, Pressable, ScrollView,
  TouchableOpacity, Modal, Animated,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import MapView, { UrlTile, PROVIDER_NONE } from "react-native-maps";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import {
  ArrowLeft, MoreVertical, Car, AlertCircle,
  CheckCircle2, ThumbsUp, ThumbsDown, CornerUpLeft,
  BookmarkPlus, BookmarkMinus, History, HelpCircle, X,
} from "lucide-react-native";

const OSM_TILE_URL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";

// ─── Mock incident data ───────────────────────────────────────────────────────
const MOCK_INCIDENT = {
  id: "i1",
  type: "traffic",
  title: "Heavy Traffic",
  time: "12:13 pm",
  unconfirmed: 13,
  confirmed: 3,
  comments: [
    {
      id: "c1",
      name: "Tolulope",
      date: "24/02/2026",
      time: "3h ago",
      text: "A trailer fell across both sides of the road and has held traffic on multiple lanes, I would advice anyone coming this route to consider another route.",
      upvotes: 14,
      downvotes: 1,
      replies: [
        {
          id: "c1r1",
          name: "Rashida",
          date: "24/02/2026",
          time: "1h ago",
          text: "Yes! it is a nasty holdup, I wish I had seen this before getting on the bus.",
          upvotes: 4,
          downvotes: 0,
        },
      ],
    },
    {
      id: "c2",
      name: "Yimika",
      date: "24/02/2026",
      time: "30mins ago",
      text: "I have just passed the location and it is now getting cleared",
      upvotes: 14,
      downvotes: 1,
      replies: [],
    },
  ],
};

// ─── Avatar ───────────────────────────────────────────────────────────────────
const Avatar = ({ name, size = 44 }) => (
  <View
    className="rounded-full bg-gray-200 items-center justify-center overflow-hidden"
    style={{ width: size, height: size }}
  >
    <Text className="font-bold text-gray-500" style={{ fontSize: size * 0.38 }}>
      {name?.charAt(0).toUpperCase()}
    </Text>
  </View>
);

// ─── Comment row ──────────────────────────────────────────────────────────────
const CommentRow = ({ comment, isReply = false }) => {
  const [upvotes, setUpvotes] = useState(comment.upvotes);
  const [downvotes, setDownvotes] = useState(comment.downvotes);

  return (
    <View className={`py-3 ${isReply ? "pl-10 border-t border-gray-50" : "border-t border-gray-100"}`}>
      <View className="flex-row items-start gap-3">
        <Avatar name={comment.name} size={isReply ? 32 : 44} />
        <View className="flex-1">
          <View className="flex-row items-center justify-between">
            <Text className="text-sm font-semibold text-gray-900">{comment.name}</Text>
            <Text className="text-xs text-gray-400">{comment.date}</Text>
          </View>
          <Text className="text-sm text-gray-600 mt-1 leading-5">{comment.text}</Text>
          <View className="flex-row items-center gap-4 mt-2">
            <Pressable className="flex-row items-center gap-1" onPress={() => {}}>
              <CornerUpLeft size={12} color="#9CA3AF" strokeWidth={2} />
              <Text className="text-xs text-gray-400">Reply</Text>
            </Pressable>
            <View className="w-px h-3 bg-gray-200" />
            <Pressable
              className="flex-row items-center gap-1"
              onPress={() => setUpvotes((v) => v + 1)}
            >
              <ThumbsUp size={12} color="#9CA3AF" strokeWidth={2} />
              <Text className="text-xs text-gray-400">{upvotes} Upvote</Text>
            </Pressable>
            <View className="w-px h-3 bg-gray-200" />
            <Pressable
              className="flex-row items-center gap-1"
              onPress={() => setDownvotes((v) => v + 1)}
            >
              <ThumbsDown size={12} color="#9CA3AF" strokeWidth={2} />
              <Text className="text-xs text-gray-400">{downvotes} Downvote</Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* Replies */}
      {comment.replies?.map((reply) => (
        <CommentRow key={reply.id} comment={reply} isReply />
      ))}
    </View>
  );
};

// ─── Overflow menu ────────────────────────────────────────────────────────────
const OverflowMenu = ({ visible, onClose, isSaved, onToggleSave, onHistory, onHelp }) => (
  <Modal
    visible={visible}
    transparent
    animationType="fade"
    onRequestClose={onClose}
  >
    <Pressable className="flex-1" onPress={onClose}>
      <View
        className="absolute right-4 bg-white rounded-2xl overflow-hidden"
        style={{
          top: 90,
          width: 220,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.12,
          shadowRadius: 16,
          elevation: 12,
        }}
      >
        <Pressable
          className="flex-row items-center px-4 py-4 border-b border-gray-100 active:bg-gray-50"
          onPress={() => { onToggleSave(); onClose(); }}
        >
          {isSaved ? (
            <BookmarkMinus size={18} color="#374151" strokeWidth={2} />
          ) : (
            <BookmarkPlus size={18} color="#374151" strokeWidth={2} />
          )}
          <Text className="text-sm text-gray-700 ml-3">
            {isSaved ? "Remove saved route" : "Add to saved routes"}
          </Text>
        </Pressable>

        <Pressable
          className="flex-row items-center px-4 py-4 border-b border-gray-100 active:bg-gray-50"
          onPress={() => { onHistory(); onClose(); }}
        >
          <History size={18} color="#374151" strokeWidth={2} />
          <Text className="text-sm text-gray-700 ml-3">Route History</Text>
        </Pressable>

        <Pressable
          className="flex-row items-center px-4 py-4 active:bg-gray-50"
          onPress={() => { onHelp(); onClose(); }}
        >
          <HelpCircle size={18} color="#374151" strokeWidth={2} />
          <Text className="text-sm text-gray-700 ml-3">Help & feedback</Text>
        </Pressable>
      </View>
    </Pressable>
  </Modal>
);

// ─── Toast ────────────────────────────────────────────────────────────────────
const Toast = ({ visible, message }) => {
  if (!visible) return null;
  return (
    <View
      className="absolute self-center bg-green-50 border border-green-200 rounded-full px-5 py-2.5"
      style={{ bottom: "45%" }}
    >
      <Text className="text-xs font-medium text-green-700">{message}</Text>
    </View>
  );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────
const RouteDetailScreen = ({ routeName = "Iyanapaja - CMS", region }) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const mapRef = useRef(null);
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["50%", "80%"], []);

  const [menuVisible, setMenuVisible] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const mapRegion = region ?? {
    latitude: 6.5244,
    longitude: 3.3792,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  };

  const handleToggleSave = () => {
    setIsSaved((v) => !v);
    showToast(isSaved ? "Route removed from saved routes" : "Added to saved routes");
  };

  return (
    <View className="flex-1 bg-transparent rounded-2xl">
      {/* ── Pink header ── */}
      <View
        className="bg-[#FEE4E2] px-4 pb-4 rounded-2xl"
        style={{ paddingTop: insets.top + 12 , borderRadius: 32}}
      >
        {/* Nav row */}
        <View className="flex-row items-center justify-between mb-4">
          <Pressable
            onPress={() => router.back()}
            className="w-12 h-9 rounded-full  items-center justify-center"
          >
            <ArrowLeft size={18} color="#1B6B5A" strokeWidth={2.5} />
          </Pressable>
          <Text className="text-2xl font-medium text-gray-900">{routeName}</Text>
          <Pressable
            onPress={() => setMenuVisible(true)}
            className="w-9 h-9 rounded-full items-center justify-center"
          >
            <MoreVertical size={18} color="#374151" strokeWidth={2} />
          </Pressable>
        </View>

        {/* Status pill */}
        <View className="bg-[#912018] rounded-[36px] flex-row items-center pr-6 pl-3 py-3 gap-3">
          <View className="w-12 h-12 rounded-full bg-[#FEE4E2] items-center justify-center">
            <Car size={18} color="#912018" strokeWidth={2} />
          </View>
          <Text className="flex-1 text-sm font-semibold text-white">
            {MOCK_INCIDENT.title}
          </Text>
          <Text className="text-xs text-white/80">{MOCK_INCIDENT.time}</Text>
        </View>
      </View>

      {/* ── Map ── */}
      <View style={{ height: 360 }}>
        <MapView
          ref={mapRef}
          style={{ flex: 1 }}
          provider={PROVIDER_NONE}
          initialRegion={mapRegion}
          showsUserLocation
          showsMyLocationButton={false}
          showsCompass={false}
          rotateEnabled={false}
          toolbarEnabled={false}
        >
          <UrlTile urlTemplate={OSM_TILE_URL} maximumZ={19} flipY={false} zIndex={1} />
        </MapView>
      </View>

      {/* ── Bottom sheet ── */}
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        handleIndicatorStyle={{ backgroundColor: "#E5E7EB", width: 40 }}
        backgroundStyle={{ borderRadius: 28 }}
        enableDynamicSizing={false}
      >
        {/* Sheet header */}
        <View className="flex-row items-center justify-between px-5 py-3 ">
          <View className="flex-row items-center mt-4 mb-3">
                  <View className="w-5 h-5 flex justify-center items-center bg-[#60F5C3] mr-2 rounded-full">
                    <View className="w-2 h-2 bg-[#006951] rounded-full"/>
                  </View>
                  <Text className="text-2xl font-medium text-[#003838]">
                    Incidence Report
                  </Text>
                </View>
          <View className="flex-row items-center gap-3">
            <View className="flex-row items-center gap-1">
              <AlertCircle size={16} color="#fff" strokeWidth={2} fill="#DC6803" />
              <Text className="text-xs font-semibold text-gray-600">
                {MOCK_INCIDENT.unconfirmed}
              </Text>
            </View>
            <View className="flex-row items-center gap-1">
              <CheckCircle2 size={16} color="#fff" strokeWidth={2} fill="#008565" />
              <Text className="text-xs font-semibold text-gray-600">
                {MOCK_INCIDENT.confirmed}
              </Text>
            </View>
          </View>
        </View>

   

       <View style={{ flex: 1 }}>
    <BottomSheetScrollView
      contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 16 }}
      showsVerticalScrollIndicator={false}
      style={{ flex: 1 }}
    >
      {MOCK_INCIDENT.comments.map((comment) => (
        <CommentRow key={comment.id} comment={comment} />
      ))}
    </BottomSheetScrollView>
  </View>
</BottomSheet>
{/* Action buttons — always visible at bottom of sheet */}
<View
      className="flex-row gap-3 px-5 absolute left-0 right-0"
      style={{ bottom: insets.bottom + 16, paddingTop: 12 }}
    >
      <Pressable
        className="flex-1 flex-row items-center justify-center gap-2 bg-[#FEF0C7] border border-[#D5D7DA] rounded-full py-3.5 active:opacity-80"
        onPress={() => showToast("Thanks for confirming!")}
      >
        <AlertCircle size={16} color="#fff" strokeWidth={2} fill="#DC6803"/>
        <Text className="text-lg font-medium text-[#7A2E0E]">Still there</Text>
      </Pressable>
      <Pressable
        className="flex-1 flex-row items-center justify-center gap-2 bg-[#CCFFE8] border border-[#D5D7DA] rounded-full py-3.5 active:opacity-80"
        onPress={() => showToast("Thanks! Route marked as cleared.")}
      >
        <CheckCircle2 size={16} color="#fff" strokeWidth={2} fill="#05603A" />
        <Text className="text-lg font-medium text-[#05603A]">Cleared</Text>
      </Pressable>
    </View>
      {/* Overflow menu */}
      <OverflowMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        isSaved={isSaved}
        onToggleSave={handleToggleSave}
        onHistory={() => router.push("/(protected)/(stack)/route-history")}
        onHelp={() => {}}
      />

      {/* Toast */}
      <Toast visible={toastVisible} message={toastMessage} />
    </View>
  );
};

export default RouteDetailScreen;