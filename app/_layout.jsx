import { Stack } from "expo-router";
import "../global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
// import { useAuthStore } from "../store/auth/useAuthStore";

export default function RootLayout() {
  // TODO: replace with real auth check
  // const isAuthenticated = useAuthStore((s) => s.isAuthenticated());
  const isAuthenticated = true;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <SafeAreaProvider>
          <Stack screenOptions={{ headerShown: false }}>

            <Stack.Protected guard={!isAuthenticated}>
              <Stack.Screen name="(auth)" />
            </Stack.Protected>

            <Stack.Protected guard={isAuthenticated}>
              <Stack.Screen name="(protected)" />
            </Stack.Protected>

            {/* <Stack.Screen
              name="search-route"
              options={{
                presentation: "modal",
                animation: "slide_from_bottom",
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="add-route"
              options={{
                presentation: "modal",
                animation: "slide_from_bottom",
                headerShown: false,
              }}
            /> */}

          </Stack>
        </SafeAreaProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}