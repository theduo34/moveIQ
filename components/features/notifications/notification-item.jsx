import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NOTIFICATION_STYLE, formatTimeAgo } from "./notification";

export default function NotificationItem({ notification, onPress }) {
    const { type, title, shortDescription, timestamp, isRead } = notification;
    const style = NOTIFICATION_STYLE[type] ?? NOTIFICATION_STYLE["general"];

    return (
        <TouchableOpacity
            onPress={() => onPress(notification)}
            activeOpacity={0.75}
            className={`flex-row items-start px-5 py-4 border-b border-gray-100 ${
                isRead ? "bg-white" : "bg-green-50/40"
            }`}
        >
            <View
                className="w-11 h-11 rounded-2xl items-center justify-center mr-3 mt-0.5 flex-shrink-0"
                style={{ backgroundColor: style.bgColor }}
            >
                <Ionicons name={style.iconName} size={20} color={style.iconColor} />
            </View>

            <View className="flex-1">
                <View className="flex-row items-start justify-between">
                    <Text
                        className={`text-sm flex-1 mr-2 leading-tight ${
                            isRead ? "font-semibold text-gray-700" : "font-bold text-gray-900"
                        }`}
                        style={{ color: isRead ? "#374151" : style.iconColor }}
                        numberOfLines={2}
                    >
                        {title}
                    </Text>
                    {!isRead && (
                        <View className="w-2 h-2 rounded-full bg-[#1B6B5A] mt-1 flex-shrink-0" />
                    )}
                </View>

                <Text className="text-xs text-gray-500 mt-1 leading-4" numberOfLines={2}>
                    {shortDescription}
                </Text>

                <Text className="text-xs text-gray-400 mt-1.5">{formatTimeAgo(timestamp)}</Text>
            </View>
        </TouchableOpacity>
    );
}