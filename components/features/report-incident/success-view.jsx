import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SuccessView({ onBackToHome }) {
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            tension: 60,
            friction: 6,
            useNativeDriver: true,
        }).start();

        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                delay: 300,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 400,
                delay: 300,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <View className="flex-1 bg-white items-center justify-center px-8">
            <Animated.View
                style={{ transform: [{ scale: scaleAnim }] }}
                className="w-24 h-24 rounded-full bg-[#1B6B5A] items-center justify-center mb-8"
            >
                <Ionicons name="checkmark" size={44} color="#fff" />
            </Animated.View>

            {/* Text block */}
            <Animated.View
                style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
                className="items-center"
            >
                <Text className="text-2xl font-bold text-gray-800 mb-2">Report Shared!</Text>
                <Text className="text-sm text-gray-500 text-center leading-5">
                    Thanks for helping others{"\n"}commute smarter
                </Text>
            </Animated.View>

            <Animated.View
                style={{ opacity: fadeAnim, width: "100%", position: "absolute", bottom: 48 }}
                className="px-5"
            >
                <TouchableOpacity
                    onPress={onBackToHome}
                    activeOpacity={0.85}
                    className="bg-[#1B6B5A] py-4 rounded-2xl items-center"
                >
                    <Text className="text-base font-bold text-white">Back to Home</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}