import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const TABS = [
    { id: "all", label: "All Notifications" },
    { id: "unread", label: "Unread" },
];

export default function NotificationTabs({ activeTab, onTabChange, unreadCount }) {
    return (
        <View className="flex-row border-b border-border bg-white px-5">
            {TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                    <TouchableOpacity
                        key={tab.id}
                        onPress={() => onTabChange(tab.id)}
                        className="mr-6 pb-3 pt-1"
                    >
                        <View className="flex-row items-center">
                            <Text
                                className={`text-sm font-semibold ${
                                    isActive ? "text-[#1B6B5A]" : "text-gray-400"
                                }`}
                            >
                                {tab.label}
                            </Text>
                            {tab.id === "unread" && unreadCount > 0 && (
                                <View className="ml-1.5 w-4 h-4 rounded-full bg-primary items-center justify-center">
                                    <Text className="text-white text-[9px] font-bold">{unreadCount}</Text>
                                </View>
                            )}
                        </View>
                        {isActive && (
                            <View className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                        )}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}