import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import ReportIncidentForm from "../../../features/report-incident/report-incident-forms";

export default function ReportIncidentScreen() {
    const router = useRouter();

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
                <Text className="text-lg font-bold text-gray-800">Report an incident</Text>
            </View>

            <ReportIncidentForm />
        </View>
    );
}