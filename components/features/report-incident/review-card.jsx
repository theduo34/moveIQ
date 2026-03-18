import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { INCIDENT_TYPES } from "./report";

const ICON_MAP = {
    heavy_traffic: "car",
    accident_crash: "alert-circle",
    construction_roadblock: "construct",
    police_lasma: "shield-checkmark",
};

const ICON_COLOR_MAP = {
    heavy_traffic: "#DC2626",
    accident_crash: "#EA580C",
    construction_roadblock: "#D97706",
    police_lasma: "#2563EB",
};

export default function ReviewCard({ incidentId, incidentLabel, routeLabel, routeType, routeDistance, notes, timestamp, onEdit }) {
    const iconName = ICON_MAP[incidentId] || "warning";
    const iconColor = ICON_COLOR_MAP[incidentId] || "#6B7280";
    const incidentConfig = INCIDENT_TYPES.find((i) => i.id === incidentId);

    const formattedTime = timestamp
        ? new Date(timestamp).toLocaleTimeString("en-NG", { hour: "2-digit", minute: "2-digit" })
        : "Just now";

    return (
        <View className="flex-1 px-5 pt-4">
            {/* Route + Incident summary card */}
            <View
                className="bg-white rounded-2xl p-4 mb-4 border border-gray-100"
                style={{ shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}
            >
                <View className="flex-row items-center">
                    {/* Incident icon */}
                    <View
                        className={`w-12 h-12 rounded-xl items-center justify-center mr-3 ${incidentConfig?.color?.bg ?? "bg-gray-100"}`}
                    >
                        <Ionicons name={iconName} size={22} color={iconColor} />
                    </View>

                    {/* Route info */}
                    <View className="flex-1">
                        <Text className="text-sm font-bold text-gray-800" numberOfLines={1}>
                            {incidentLabel}
                        </Text>
                        <Text className="text-xs text-gray-500 mt-0.5" numberOfLines={1}>
                            {routeLabel}
                        </Text>
                        <View className="flex-row items-center mt-1">
                            <Text className="text-xs text-gray-400">
                                {routeType}
                                {routeDistance ? ` · ${routeDistance}` : ""}
                            </Text>
                        </View>
                    </View>

                    <Ionicons name="chevron-forward" size={16} color="#D1D5DB" />
                </View>
            </View>

            {/* Report Details */}
            <View
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-4"
                style={{ shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}
            >
                <View className="px-4 pt-4 pb-2 border-b border-gray-50">
                    <Text className="text-sm font-bold text-[#1B6B5A]">Report Details</Text>
                </View>

                {/* Reported by */}
                <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-50">
                    <Text className="text-sm text-gray-500">Reported by</Text>
                    <Text className="text-sm font-semibold text-gray-800">You</Text>
                </View>

                <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-50">
                    <Text className="text-sm text-gray-500">Timestamp</Text>
                    <Text className="text-sm font-semibold text-gray-800">{formattedTime}</Text>
                </View>

                <View className="flex-row justify-between items-start px-4 py-3">
                    <Text className="text-sm text-gray-500">Notes</Text>
                    <Text className="text-sm font-semibold text-gray-800 max-w-[60%] text-right">
                        {notes?.trim() ? notes.trim() : "—"}
                    </Text>
                </View>
            </View>

            <TouchableOpacity
                onPress={onEdit}
                className="flex-row items-center justify-center py-3"
                activeOpacity={0.7}
            >
                <Ionicons name="create-outline" size={16} color="#1B6B5A" />
                <Text className="text-sm font-semibold text-[#1B6B5A] ml-1">Edit Report</Text>
            </TouchableOpacity>
        </View>
    );
}