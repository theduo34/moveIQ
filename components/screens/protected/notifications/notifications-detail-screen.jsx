import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import NotificationDetailContent from "../../../features/notifications/notification-detail-content";

export default function NotificationDetailScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();

    const {
        type,
        title,
        fullDescription,
        routeLabel,
        timestamp,
        incidentId,
        isLinkedToIncident,
    } = params;

    return (
        <View className="flex-1 bg-white">
            <View
                className="flex-row items-center px-5 pt-14 pb-4 bg-white border-b border-gray-100"
                style={{ shadowColor: "#000", shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 }}
            >
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center mr-3"
                >
                    <Ionicons name="arrow-back" size={18} color="#1A1A1A" />
                </TouchableOpacity>
                <Text className="text-lg font-bold text-gray-800">Notification</Text>
            </View>

            <NotificationDetailContent
                type={type}
                title={title}
                fullDescription={fullDescription}
                routeLabel={routeLabel}
                timestamp={timestamp}
                incidentId={incidentId}
                isLinkedToIncident={isLinkedToIncident}
            />
        </View>
    );
}