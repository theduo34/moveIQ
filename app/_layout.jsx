// import { Stack } from "expo-router";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
// import { useFonts } from "expo-font";
// import "../global.css";
// import { useAuthStore } from "../store/auth/useAuthStore";
// import { useEffect } from "react";

// export default function RootLayout() {
//   // 1. Keep Rhoda's Font Loading
//   const [loaded, error] = useFonts({
//     bold: require('../assets/fonts/Poppins/Poppins-Bold.ttf'),
//     regular: require('../assets/fonts/Poppins/Poppins-Regular.ttf'),
//     extrabold: require('../assets/fonts/Poppins/Poppins-ExtraBold.ttf'),
//     light: require('../assets/fonts/Poppins/Poppins-Light.ttf'),
//     semibold: require('../assets/fonts/Poppins/Poppins-SemiBold.ttf'),
//     medium: require('../assets/fonts/Poppins/Poppins-Medium.ttf')
//   });

//   // 2. Keep the Auth logic from main
//   // const isAuthenticated = false;

//     const { isAuthenticated, setFromFirebase, logout } = useAuthStore();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setFromFirebase(user);
//       } else {
//         logout();
//       }
//     });
//     return unsubscribe;
//   }, []);

//   if (error) return null;
//   if (!loaded) return null; // Add this so the app doesn't crash while fonts load

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <BottomSheetModalProvider>
//         <SafeAreaProvider>
//           <Stack screenOptions={{ headerShown: false }}>
//             {/* Using the logic from main but ensuring Rhoda's screen names match */}
//             <Stack.Screen name="index" />
            
//             <Stack.Protected guard={!isAuthenticated}>
//               <Stack.Screen name="(auth)" />
//             </Stack.Protected>

//             <Stack.Protected guard={isAuthenticated}>
//               <Stack.Screen name="(protected)" />
//             </Stack.Protected>
//           </Stack>
//         </SafeAreaProvider>
//       </BottomSheetModalProvider>
//     </GestureHandlerRootView>
//   );
// }

// This file is the root layout of your app. It wraps all the screens and provides common functionality like font loading and authentication state management.

// app/_layout.jsx
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth"; // ← from firebase/auth
import { auth } from "../services/firebase";         // ← auth instance from your file
import { useAuthStore } from "../store/auth/useAuthStore";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import "../global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

export default function RootLayout() {
  const { isAuthenticated, setFromFirebase, logout } = useAuthStore();

    // 1. Keep Rhoda's Font Loading
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
    });
    return unsubscribe;
  }, []);

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
            <Stack.Screen
              name="search-route"
              options={{ presentation: "modal", animation: "slide_from_bottom", headerShown: false }}
            />
            <Stack.Screen
              name="add-route"
              options={{ presentation: "modal", animation: "slide_from_bottom", headerShown: false }}
            />
          </Stack>
        </SafeAreaProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}