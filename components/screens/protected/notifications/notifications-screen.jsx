import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import NotificationList from "../../../features/notifications/notification-list";

export default function NotificationsScreen() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-white">
            <View
                className="flex-row items-center justify-between px-5 pt-14 pb-4 bg-white border-b border-gray-100"
                style={{ shadowColor: "#000", shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 }}
            >
                <View className="flex-row items-center">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center mr-3"
                    >
                        <Ionicons name="arrow-back" size={18} color="#1A1A1A" />
                    </TouchableOpacity>
                    <Text className="text-lg font-bold text-gray-800">Notifications</Text>
                </View>

                <TouchableOpacity className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center">
                    <Ionicons name="ellipsis-vertical" size={16} color="#6B7280" />
                </TouchableOpacity>
            </View>

            <NotificationList />
        </View>
    );
}