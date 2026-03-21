
// app/_layout.jsx
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth"; // ← from firebase/auth
import { auth } from "../services/firebase";         // ← auth instance from your file
import { useAuthStore } from "../store/auth/useAuthStore";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import "../global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { isAuthenticated, setFromFirebase, logout } = useAuthStore();
  const [authReady, setAuthReady] = useState(false);

  const [loaded, error] = useFonts({
    bold: require('../assets/fonts/Poppins/Poppins-Bold.ttf'),
    regular: require('../assets/fonts/Poppins/Poppins-Regular.ttf'),
    extrabold: require('../assets/fonts/Poppins/Poppins-ExtraBold.ttf'),
    light: require('../assets/fonts/Poppins/Poppins-Light.ttf'),
    semibold: require('../assets/fonts/Poppins/Poppins-SemiBold.ttf'),
    medium: require('../assets/fonts/Poppins/Poppins-Medium.ttf')
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setFromFirebase(user);
      } else {
        logout();
      }
      setAuthReady(true);
    });
    return unsubscribe;
  }, [logout, setFromFirebase]);

  useEffect(() => {
    if ((loaded || error) && authReady) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error, authReady]);

  if (!loaded && !error) return null;
  if (!authReady) return null;

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
        </Stack>
      </SafeAreaProvider>
    </BottomSheetModalProvider>
  </GestureHandlerRootView>
  );
}