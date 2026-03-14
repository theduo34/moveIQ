import { useState } from "react";
import {
  View, Text, Pressable, ScrollView, Modal,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  ArrowLeft, ChevronDown, ChevronUp,
  History, ThumbsUp, ThumbsDown, CornerUpLeft,
} from "lucide-react-native";

// ─── Mock data grouped by month ───────────────────────────────────────────────
const HISTORY_DATA = {
  2026: [
    {
      month: "February",
      reports: [
        {
          id: "r1",
          name: "Tolulope",
          date: "24/02/2026",
          text: "A trailer fell across both sides of the road and has held traffic on multiple lanes, I would advice anyone coming this route to consider another route.",
          upvotes: 14,
          downvotes: 1,
          replies: [
            {
              id: "r1-1",
              name: "Rashida",
              date: "24/02/2026",
              text: "Yes! it is a nasty holdup, I wish I had seen this before getting on the bus.",
              upvotes: 4,
              downvotes: 0,
            },
          ],
        },
        {
          id: "r2",
          name: "Yimika",
          date: "24/02/2026",
          text: "I have just passed the location and it is now getting cleared",
          upvotes: 14,
          downvotes: 1,
          replies: [
            {
              id: "r2-1",
              name: "Chidi",
              date: "24/02/2026",
              text: "Thank you for the update, I will take an alternative route.",
              upvotes: 2,
              downvotes: 0,
            },
          ],
        },
      ],
    },
    {
      month: "January",
      reports: [
        {
          id: "r3",
          name: "Amara",
          date: "15/01/2026",
          text: "Road is clear this morning, smooth ride from Iyana to CMS. About 20 minutes.",
          upvotes: 8,
          downvotes: 0,
          replies: [],
        },
      ],
    },
  ],
  2025: [
    {
      month: "December",
      reports: [
        {
          id: "r4",
          name: "Kunle",
          date: "22/12/2025",
          text: "Heavy gridlock due to Christmas shopping traffic. Avoid between 3pm - 8pm.",
          upvotes: 22,
          downvotes: 2,
          replies: [],
        },
      ],
    },
  ],
  2024: [],
  2023: [],
};

const YEARS = [2026, 2025, 2024, 2023];

// ─── Avatar ───────────────────────────────────────────────────────────────────
const Avatar = ({ name, size = 44 }) => (
  <View
    className="rounded-full bg-gray-200 items-center justify-center overflow-hidden flex-shrink-0"
    style={{ width: size, height: size }}
  >
    <Text className="font-bold text-gray-500" style={{ fontSize: size * 0.38 }}>
      {name?.charAt(0).toUpperCase()}
    </Text>
  </View>
);

// ─── Comment / Reply row ──────────────────────────────────────────────────────
const CommentRow = ({ comment, isReply = false }) => {
  const [upvotes, setUpvotes] = useState(comment.upvotes);
  const [downvotes, setDownvotes] = useState(comment.downvotes);

  return (
    <View className={`py-3 border-t border-gray-100 ${isReply ? "pl-12" : ""}`}>
      <View className="flex-row items-start gap-3">
        <Avatar name={comment.name} size={isReply ? 30 : 44} />
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
      {!isReply && comment.replies?.map((reply) => (
        <CommentRow key={reply.id} comment={reply} isReply />
      ))}
    </View>
  );
};

// ─── Month section ────────────────────────────────────────────────────────────
const MonthSection = ({ month, reports }) => (
  <View className="mb-4">
    <Text className="text-xl font-bold text-gray-900 mb-1">{month}</Text>
    <View className="bg-white rounded-2xl border border-gray-100 px-4">
      {reports.map((report) => (
        <CommentRow key={report.id} comment={report} />
      ))}
    </View>
  </View>
);

// ─── Year dropdown ────────────────────────────────────────────────────────────
const YearDropdown = ({ selectedYear, onSelect }) => {
  const [open, setOpen] = useState(false);

  return (
    <View className="relative">
      <Pressable
        onPress={() => setOpen((v) => !v)}
        className="flex-row items-center bg-gray-100 rounded-full px-3 py-1.5 gap-1"
      >
        <Text className="text-sm font-semibold text-gray-700">{selectedYear}</Text>
        {open ? (
          <ChevronUp size={14} color="#374151" strokeWidth={2} />
        ) : (
          <ChevronDown size={14} color="#374151" strokeWidth={2} />
        )}
      </Pressable>

      {open && (
        <View
          className="absolute right-0 bg-white rounded-2xl overflow-hidden z-50"
          style={{
            top: 36,
            width: 100,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 8,
          }}
        >
          {YEARS.map((year) => (
            <Pressable
              key={year}
              onPress={() => { onSelect(year); setOpen(false); }}
              className={`px-4 py-3 active:bg-gray-50 ${
                year === selectedYear ? "bg-gray-50" : ""
              }`}
            >
              <Text
                className={`text-sm ${
                  year === selectedYear
                    ? "font-bold text-emerald-900"
                    : "text-gray-500"
                }`}
              >
                {year}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────
const RouteHistoryScreen = ({ routeName = "Iyanapaja - CMS" }) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [selectedYear, setSelectedYear] = useState(2026);

  const monthGroups = HISTORY_DATA[selectedYear] ?? [];

  return (
    <View className="flex-1 bg-white">
      {/* Pink header inherited from route detail — just the bottom sheet content */}
      <View
        className="flex-row items-center justify-between px-4 pt-4 pb-3"
        style={{ paddingTop: insets.top + 12 }}
      >
        {/* Back button */}
        <Pressable
          onPress={() => router.back()}
          className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center"
        >
          <ArrowLeft size={18} color="#1B6B5A" strokeWidth={2.5} />
        </Pressable>

        <Text className="text-lg font-bold text-emerald-900">Route History</Text>

        {/* Year filter + history icon */}
        <View className="flex-row items-center gap-2">
          <YearDropdown selectedYear={selectedYear} onSelect={setSelectedYear} />
          <Pressable className="w-8 h-8 items-center justify-center">
            <History size={18} color="#9CA3AF" strokeWidth={2} />
          </Pressable>
        </View>
      </View>

      {/* Content */}
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 8,
          paddingBottom: insets.bottom + 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        {monthGroups.length === 0 ? (
          <View className="items-center mt-20">
            <History size={40} color="#D1D5DB" strokeWidth={1.5} />
            <Text className="text-sm font-semibold text-gray-400 mt-3">
              No history for {selectedYear}
            </Text>
          </View>
        ) : (
          monthGroups.map((group) => (
            <MonthSection
              key={group.month}
              month={group.month}
              reports={group.reports}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default RouteHistoryScreen;