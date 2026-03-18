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

export default function IncidentTypeGrid({ selectedIncident, onSelectIncident }) {
    return (
        <View className="mb-5">
            <View className="flex-row items-center mb-3">
                <View className="w-2 h-2 rounded-full bg-[#1B6B5A] mr-2" />
                <Text className="text-base font-bold text-gray-800">
                    {`What's happening?`}
                </Text>
            </View>

            <View className="flex-row flex-wrap" style={{ gap: 10 }}>
                {INCIDENT_TYPES.map((incident) => {
                    const isSelected = selectedIncident?.id === incident.id;
                    const iconName = ICON_MAP[incident.id] || "warning";

                    return (
                        <TouchableOpacity
                            key={incident.id}
                            onPress={() => onSelectIncident(incident)}
                            activeOpacity={0.85}
                            style={{ width: "47.5%" }}
                            className={`relative p-3 rounded-2xl border-2 ${incident.color.bg} ${
                                isSelected ? incident.color.selectedBorder : incident.color.border
                            }`}
                        >
                            {/* Selected check */}
                            {isSelected && (
                                <View className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#1B6B5A] items-center justify-center">
                                    <Ionicons name="checkmark" size={11} color="#fff" />
                                </View>
                            )}

                            {/* Icon */}
                            <View
                                className={`w-10 h-10 rounded-xl items-center justify-center mb-2 bg-white`}
                                style={{ shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 4, elevation: 1 }}
                            >
                                <Ionicons name={iconName} size={20} color={
                                    incident.id === "heavy_traffic" ? "#DC2626"
                                        : incident.id === "accident_crash" ? "#EA580C"
                                            : incident.id === "construction_roadblock" ? "#D97706"
                                                : "#2563EB"
                                } />
                            </View>

                            {/* Labels */}
                            <Text className={`text-sm font-bold leading-tight ${incident.color.text}`}>
                                {incident.label}
                            </Text>
                            <Text className="text-xs text-gray-400 mt-0.5">{incident.subtitle}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}