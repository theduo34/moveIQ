import { Stack } from "expo-router";

export default function StackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="route-detail" />
      <Stack.Screen name="route-history" />
      <Stack.Screen
        name="search-route"
        options={{ presentation: "modal", animation: "slide_from_bottom" }}
      />
      <Stack.Screen
        name="add-route"
        options={{ presentation: "modal", animation: "slide_from_bottom" }}
      />
        <Stack.Screen name="report-incident" />
    </Stack>
  );
}