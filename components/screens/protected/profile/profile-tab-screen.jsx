
import { View, Text, Pressable, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Settings, Pencil, FileText, Lock, Moon, Share2 } from "lucide-react-native";
import { useAuthStore } from "../../../../store/auth/useAuthStore";
import Avatar from "../../../shared/avatar";
import SettingsRow from "../../../shared/settings-row";
import SectionCard from "../../../shared/section-card";
import { useState } from "react";

const StatItem = ({ value, label, showBorder }) => (
  <View
    className="flex-1 items-center py-4"
    style={showBorder ? { borderLeftWidth: 1, borderRightWidth: 1, borderColor: "#E5E7EB" } : undefined}
  >
    <Text className="text-2xl font-bold text-emerald-700">{value}</Text>
    <Text className="text-xs text-emerald-600 text-center mt-1">{label}</Text>
  </View>
);

const ProfileTabScreen = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user } = useAuthStore();
  const [darkMode, setDarkMode] = useState(false);

  const displayName = user?.name ?? user?.email?.split("@")[0] ?? "User";
  const email = user?.email ?? "";

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 pt-4 pb-3">
        <Text className="text-xl font-bold text-emerald-900">Profile</Text>
        <Pressable
          onPress={() => router.push("/(protected)/(stack)/settings")}
          className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center"
        >
          <Settings size={18} color="#1B6B5A" strokeWidth={2} />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: insets.bottom + 100 }}
      >
        {/* Avatar + name */}
        <View className="items-center mt-4 mb-6">
          <Avatar
            name={displayName}
            size={96}
            showCamera
            onCameraPress={() => {}}
          />
          <Text className="text-lg font-bold text-gray-900 mt-3">{displayName}</Text>
          <Text className="text-sm text-gray-400 mt-0.5">{email}</Text>
        </View>

        {/* Stats */}
        <SectionCard style={{ marginBottom: 24 }}>
          <View className="flex-row">
            <StatItem value="15" label={"Incidents\nReported"} />
            <StatItem value="11" label={"Saved\nRoutes"} showBorder />
            <StatItem value="30" label={"Confirmed\nReports"} />
          </View>
        </SectionCard>

        {/* Menu */}
        <SectionCard>
          <SettingsRow
            icon={Pencil}
            label="Edit profile"
            onPress={() => router.push("/(protected)/(stack)/edit-profile")}
          />
          <SettingsRow icon={FileText} label="Add bio (Optional)" onPress={() => {}} />
          <SettingsRow icon={Lock} label="Change password" onPress={() => {}} />
          <SettingsRow
            icon={Moon}
            label="Dark mode"
            isToggle
            toggleValue={darkMode}
            onToggleChange={setDarkMode}
          />
          <SettingsRow
            icon={Share2}
            label="Invite friends"
            onPress={() => {}}
            showBorder={false}
          />
        </SectionCard>
      </ScrollView>
    </View>
  );
};

export default ProfileTabScreen;