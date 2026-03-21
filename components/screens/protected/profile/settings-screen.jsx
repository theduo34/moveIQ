// components/screens/protected/profile/settings-screen.jsx
import { useState, useRef, useMemo } from "react";
import { View, Text, Pressable, ScrollView, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import {
  Map, Bell, BellRing, Sun, HelpCircle,
  KeyRound, Shield, Database, Star, LogOut, Trash2,
} from "lucide-react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useAuthStore } from "../../../../store/auth/useAuthStore";
import { auth } from "../../../../services/firebase";
import Avatar from "../../../shared/avatar";
import SettingsRow from "../../../shared/settings-row";
import SectionCard from "../../../shared/section-card";

const SettingsScreen = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [logoutVisible, setLogoutVisible] = useState(false);
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["35%"], []);

  const displayName = user?.name ?? user?.email?.split("@")[0] ?? "User";
  const email = user?.email ?? "";

  const handleLogoutConfirm = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.log("Firebase signout error:", e.message);
    }
    logout();
    setLogoutVisible(false);
    router.replace("/(auth)/login");
  };

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: insets.bottom + 100 }}
      >
        {/* Title */}
        <Text className="text-2xl font-bold text-emerald-900 pt-4 pb-4">Settings</Text>

        {/* User card */}
        <Pressable
          onPress={() => router.push("/(protected)/(stack)/edit-profile")}
          className="flex-row items-center bg-gray-100 rounded-full px-4 py-3 mb-4 active:opacity-80"
        >
          <Avatar name={displayName} size={48} />
          <View className="flex-1 ml-3">
            <Text className="text-sm font-bold text-emerald-900">{displayName}</Text>
            <Text className="text-xs text-emerald-600 mt-0.5">{email}</Text>
          </View>
          <View className="w-6 h-6 items-center justify-center">
            <Text className="text-gray-400 text-lg">›</Text>
          </View>
        </Pressable>

        {/* Preferences */}
        <SectionCard>
          <SettingsRow icon={Map} label="Saved routes" onPress={() => router.push("/(protected)/(tabs)/routes")} />
          <SettingsRow icon={BellRing} label="Incidents alert" onPress={() => {}} />
          <SettingsRow icon={Bell} label="Push notification" onPress={() => {}} />
          <SettingsRow icon={Sun} label="Display" onPress={() => {}} showBorder={false} />
        </SectionCard>

        {/* Support & Legal */}
        <SectionCard>
          <SettingsRow icon={HelpCircle} label="FAQ" onPress={() => {}} />
          <SettingsRow icon={KeyRound} label="Security" onPress={() => {}} />
          <SettingsRow icon={Shield} label="Privacy policy" onPress={() => {}} />
          <SettingsRow icon={Database} label="Storage and data" onPress={() => {}} />
          <SettingsRow icon={Star} label="Rate us" onPress={() => {}} />
          <SettingsRow
            icon={LogOut}
            label="Log out"
            onPress={() => setLogoutVisible(true)}
            showBorder={false}
          />
        </SectionCard>

        {/* Danger zone */}
        <SectionCard className="bg-red-50">
          <SettingsRow
            icon={Trash2}
            label="Delete account"
            isDestructive
            onPress={() =>
              Alert.alert(
                "Delete account",
                "This will permanently delete your account. Are you sure?",
                [
                  { text: "Cancel", style: "cancel" },
                  { text: "Delete", style: "destructive", onPress: () => {} },
                ]
              )
            }
            showBorder={false}
          />
        </SectionCard>
      </ScrollView>

      {/* Logout bottom sheet */}
      {logoutVisible && (
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          enablePanDownToClose
          onClose={() => setLogoutVisible(false)}
          handleIndicatorStyle={{ backgroundColor: "#E5E7EB", width: 40 }}
          backgroundStyle={{ borderRadius: 28 }}
        >
          <BottomSheetView className="flex-1 px-6 pt-2 pb-8 items-center">
            <Text className="text-2xl font-bold text-emerald-900 mt-2">Log Out?</Text>
            <Text className="text-sm text-gray-400 text-center mt-2 mb-6">
              Are you sure you want to log out?
            </Text>
            <Pressable
              onPress={handleLogoutConfirm}
              className="w-full bg-emerald-800 rounded-full py-4 items-center mb-3 active:opacity-80"
            >
              <Text className="text-base font-semibold text-white">Yes, Log out</Text>
            </Pressable>
            <Pressable
              onPress={() => setLogoutVisible(false)}
              className="w-full border border-gray-200 rounded-full py-4 items-center active:opacity-80"
            >
              <Text className="text-base font-semibold text-emerald-800">Cancel</Text>
            </Pressable>
          </BottomSheetView>
        </BottomSheet>
      )}
    </View>
  );
};

export default SettingsScreen;