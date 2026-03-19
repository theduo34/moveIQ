import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function EmptyNotifications() {
    return (
        <View className="flex-1 items-center justify-center px-10 pb-20">
            <View className="w-24 h-24 rounded-full bg-gray-100 items-center justify-center mb-6">
                <Ionicons name="notifications-off-outline" size={44} color="#D1D5DB" />
            </View>

            <Text className="text-xl font-bold text-gray-700 mb-2 text-center">
                No Alerts yet
            </Text>
            <Text className="text-sm text-gray-400 text-center leading-5">
                We&#39;ll notify you when your{"\n"}saved routes change
            </Text>
        </View>
    );
}