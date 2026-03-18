import { Stack } from "expo-router";

export default function ReportIncidentLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="review" />
            <Stack.Screen name="success" options={{ gestureEnabled: false }} />
        </Stack>
    );
}