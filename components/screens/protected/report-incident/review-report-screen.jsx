import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {buildReportPayload} from "../../../features/report-incident/report";
import ReviewCard from "../../../features/report-incident/review-card";

export default function ReviewReportScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();

    const {
        routeLabel,
        routeType,
        routeDistance,
        incidentLabel,
        incidentId,
        notes,
        timestamp,
    } = params;

    const handleReport = () => {
        const payload = buildReportPayload({
            selectedRoute: { label: routeLabel, type: routeType, distance: routeDistance },
            selectedIncident: { id: incidentId, label: incidentLabel },
            notes,
        });

        console.log("[ReviewReportScreen] Submitting report payload:", payload);

        router.push("/(protected)/(stack)/report-incident/success");
    };

    const handleEdit = () => {
        router.back();
    };

    return (
        <View className="flex-1 bg-[#F8F9FA]">
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
                <Text className="text-lg font-bold text-gray-800">Review report</Text>

                <TouchableOpacity className="ml-auto">
                    <Text className="text-sm font-semibold text-[#1B6B5A]">Saved Routes</Text>
                </TouchableOpacity>
            </View>

            {/* Review card feature */}
            <ReviewCard
                incidentId={incidentId}
                incidentLabel={incidentLabel}
                routeLabel={routeLabel}
                routeType={routeType}
                routeDistance={routeDistance}
                notes={notes}
                timestamp={timestamp}
                onEdit={handleEdit}
            />

            <View className="px-5 pb-8 pt-3 bg-[#F8F9FA]">
                <TouchableOpacity
                    onPress={handleReport}
                    activeOpacity={0.85}
                    className="flex-row items-center justify-center py-4 rounded-2xl bg-[#1B6B5A]"
                >
                    <Ionicons name="megaphone-outline" size={17} color="#fff" />
                    <Text className="text-base font-bold text-white ml-2">Report</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}