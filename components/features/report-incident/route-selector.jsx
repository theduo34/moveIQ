import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    FlatList,
    Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {DUMMY_ROUTES, DUMMY_SAVED_ROUTES} from "./report";

export default function RouteSelector({ selectedRoute, onSelectRoute }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [activeTab, setActiveTab] = useState("current");

    const routes = activeTab === "saved" ? DUMMY_SAVED_ROUTES : DUMMY_ROUTES;

    const handleSelect = (route) => {
        onSelectRoute(route);
        setModalVisible(false);
    };

    return (
        <>
            {/* Trigger */}
            <View className="mb-5">
                <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-sm font-medium text-gray-500">Current Route</Text>
                    <TouchableOpacity onPress={() => { setActiveTab("saved"); setModalVisible(true); }}>
                        <Text className="text-sm font-semibold text-[#1B6B5A]">Saved Routes</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    onPress={() => { setActiveTab("current"); setModalVisible(true); }}
                    className="flex-row items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3"
                    style={{ shadowColor: "#000", shadowOpacity: 0.04, shadowRadius: 6, elevation: 1 }}
                >
                    <View className="flex-row items-center flex-1">
                        <Ionicons name="location-outline" size={18} color="#1B6B5A" />
                        <Text
                            className={`ml-2 text-sm flex-1 ${selectedRoute ? "text-gray-800 font-medium" : "text-gray-400"}`}
                            numberOfLines={1}
                        >
                            {selectedRoute ? selectedRoute.label : "Select a route..."}
                        </Text>
                    </View>
                    <Ionicons name="chevron-down" size={16} color="#9CA3AF" />
                </TouchableOpacity>
            </View>

            {/* Modal */}
            <Modal
                visible={modalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <Pressable
                    className="flex-1 bg-black/40"
                    onPress={() => setModalVisible(false)}
                />
                <View className="bg-white rounded-t-3xl px-5 pt-4 pb-8" style={{ maxHeight: "65%" }}>
                    <View className="w-10 h-1 bg-gray-200 rounded-full self-center mb-4" />

                    <View className="flex-row bg-gray-100 rounded-xl p-1 mb-4">
                        {["current", "saved"].map((tab) => (
                            <TouchableOpacity
                                key={tab}
                                onPress={() => setActiveTab(tab)}
                                className={`flex-1 py-2 rounded-lg items-center ${activeTab === tab ? "bg-white" : ""}`}
                                style={activeTab === tab ? { shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 4, elevation: 2 } : {}}
                            >
                                <Text className={`text-sm font-semibold ${activeTab === tab ? "text-[#1B6B5A]" : "text-gray-500"}`}>
                                    {tab === "current" ? "All Routes" : "Saved Routes"}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Route List */}
                    <FlatList
                        data={routes}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => {
                            const isSelected = selectedRoute?.id === item.id;
                            return (
                                <TouchableOpacity
                                    onPress={() => handleSelect(item)}
                                    className={`flex-row items-center justify-between px-4 py-3 mb-2 rounded-xl border ${
                                        isSelected
                                            ? "border-[#1B6B5A] bg-green-50"
                                            : "border-gray-100 bg-gray-50"
                                    }`}
                                >
                                    <View className="flex-row items-center flex-1">
                                        <View className={`w-8 h-8 rounded-full items-center justify-center mr-3 ${isSelected ? "bg-[#1B6B5A]" : "bg-gray-200"}`}>
                                            <Ionicons name="navigate" size={14} color={isSelected ? "#fff" : "#6B7280"} />
                                        </View>
                                        <View className="flex-1">
                                            <Text className={`text-sm font-semibold ${isSelected ? "text-[#1B6B5A]" : "text-gray-800"}`} numberOfLines={1}>
                                                {item.label}
                                            </Text>
                                            <Text className="text-xs text-gray-400 mt-0.5">
                                                {item.type} · {item.distance}
                                            </Text>
                                        </View>
                                    </View>
                                    {isSelected && (
                                        <Ionicons name="checkmark-circle" size={20} color="#1B6B5A" />
                                    )}
                                </TouchableOpacity>
                            );
                        }}
                    />
                </View>
            </Modal>
        </>
    );
}