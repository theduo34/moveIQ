import React from "react";
import {View, Text, TouchableOpacity, ScrollView} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {useRouter} from "expo-router";
import {NOTIFICATION_STYLE, NOTIFICATION_TYPE, formatTimeAgo} from "./notification";

function formatTypelabel(type) {
    switch (type) {
        case NOTIFICATION_TYPE.INCIDENT:
            return "Incident Alert";
        case NOTIFICATION_TYPE.ALERT_CLEAR:
            return "All Clear";
        case NOTIFICATION_TYPE.ROUTE_UPDATE:
            return "Route Update";
        default:
            return "Notification";
    }
}

export default function NotificationDetailContent(
    {
        type,
        title,
        fullDescription,
        routeLabel,
        timestamp,
        incidentId,
        isLinkedToIncident,
    }) {
    const router = useRouter();
    const style = NOTIFICATION_STYLE[type] ?? NOTIFICATION_STYLE[NOTIFICATION_TYPE.GENERAL];
    const timeAgo = timestamp ? formatTimeAgo(timestamp) : "";

    const handleViewIncident = () => {
        console.log("[NotificationDetailContent] View incident tapped — incidentId:", incidentId);
    };

    return (
        <ScrollView
            className="flex-1"
            contentContainerStyle={{padding: 20, paddingBottom: 48}}
            showsVerticalScrollIndicator={false}
        >
            <View className="flex-row items-center mb-5">
                <View
                    className="w-14 h-14 rounded-2xl items-center justify-center mr-4"
                    style={{backgroundColor: style.bgColor}}
                >
                    <Ionicons name={style.iconName} size={28} color={style.iconColor}/>
                </View>
                <View>
                    <View
                        className="px-3 py-1 rounded-full mb-1"
                        style={{backgroundColor: style.bgColor}}
                    >
                        <Text className="text-xs font-bold" style={{color: style.iconColor}}>
                            {formatTypelabel(type)}
                        </Text>
                    </View>
                    <Text className="text-xs text-gray-400">{timeAgo}</Text>
                </View>
            </View>

            <Text className="text-xl font-bold text-gray-900 mb-2 leading-tight">{title}</Text>

            {routeLabel ? (
                <View className="flex-row items-center mb-4">
                    <Ionicons name="navigate-circle-outline" size={15} color="#1B6B5A"/>
                    <Text className="text-xs font-semibold text-[#1B6B5A] ml-1">{routeLabel}</Text>
                </View>
            ) : null}

            <View className="h-px bg-gray-100 mb-4"/>

            <Text className="text-sm text-gray-600 leading-6">{fullDescription}</Text>

            {isLinkedToIncident === "true" && incidentId && incidentId !== "null" ? (
                <TouchableOpacity
                    onPress={handleViewIncident}
                    activeOpacity={0.85}
                    className="mt-8 flex-row items-center justify-center py-4 rounded-2xl bg-primary"
                >
                    <Ionicons name="eye-outline" size={17} color="#fff"/>
                    <Text className="text-sm font-bold text-white ml-2">View Incident Report</Text>
                </TouchableOpacity>
            ) : null}

            {(isLinkedToIncident === "false" || !isLinkedToIncident) && (
                <TouchableOpacity
                    onPress={() => router.back()}
                    activeOpacity={0.85}
                    className="mt-8 flex-row items-center justify-center py-4 rounded-2xl border border-[#1B6B5A]"
                >
                    <Text className="text-sm font-semibold text-[#1B6B5A]">Got it</Text>
                </TouchableOpacity>
            )}
        </ScrollView>
    );
}
