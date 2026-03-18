import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { validateReportForm, buildReportPayload } from "./report";
import RouteSelector from "./route-selector";
import IncidentTypeGrid from "./incident-type-grid";
import NotesInput from "./notes-input";

export default function ReportIncidentForm() {
    const router = useRouter();
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [selectedIncident, setSelectedIncident] = useState(null);
    const [notes, setNotes] = useState("");

    const handleReview = () => {
        const { isValid, errors } = validateReportForm({ selectedRoute, selectedIncident });

        if (!isValid) {
            const firstError = Object.values(errors)[0];
            Alert.alert("Incomplete Report", firstError);
            return;
        }

        const payload = buildReportPayload({ selectedRoute, selectedIncident, notes });

        console.log("[ReportIncidentForm] Navigating to review with payload:", payload);

        router.push({
            pathname: "/(protected)/(stack)/report-incident/review",
            params: {
                routeLabel: selectedRoute.label,
                routeType: selectedRoute.type,
                routeDistance: selectedRoute.distance,
                incidentLabel: selectedIncident.label,
                incidentId: selectedIncident.id,
                notes: notes.trim(),
                timestamp: new Date().toISOString(),
            },
        });
    };

    const canSubmit = selectedRoute && selectedIncident;

    return (
        <View className="flex-1 bg-[#F8F9FA]">
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <RouteSelector
                    selectedRoute={selectedRoute}
                    onSelectRoute={setSelectedRoute}
                />

                <IncidentTypeGrid
                    selectedIncident={selectedIncident}
                    onSelectIncident={setSelectedIncident}
                />

                <NotesInput notes={notes} onChangeNotes={setNotes} />
            </ScrollView>

            {/* Review CTA */}
            <View className="px-5 pb-8 pt-3 bg-[#F8F9FA]">
                <TouchableOpacity
                    onPress={handleReview}
                    activeOpacity={0.85}
                    className={`flex-row items-center justify-center py-4 rounded-2xl ${
                        canSubmit ? "bg-[#1B6B5A]" : "bg-gray-300"
                    }`}
                >
                    <Text className={`text-base font-bold mr-2 ${canSubmit ? "text-white" : "text-gray-400"}`}>
                        Review
                    </Text>
                    <Ionicons
                        name="arrow-forward"
                        size={16}
                        color={canSubmit ? "#fff" : "#9CA3AF"}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}