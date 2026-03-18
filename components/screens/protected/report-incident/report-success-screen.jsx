import React from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import SuccessView from "../../../features/report-incident/success-view";

export default function ReportSuccessScreen() {
    const router = useRouter();

    const handleBackToHome = () => {
        console.log("[ReportSuccessScreen] Navigating back to home");
        router.replace("/");
    };

    return (
        <View className="flex-1 bg-white">
            <SuccessView onBackToHome={handleBackToHome} />
        </View>
    );
}