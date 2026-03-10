import { Stack } from "expo-router";
import "../global.css"
import {SafeAreaProvider} from "react-native-safe-area-context";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";

export default function RootLayout() {
  const isAuthenticated = true;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
     <BottomSheetModalProvider>
       <SafeAreaProvider>
         <Stack screenOptions={{ headerShown: false }}>

           <Stack.Protected guard={!isAuthenticated}>
             <Stack.Screen name={"(auth)"}/>
           </Stack.Protected>

           <Stack.Protected guard={isAuthenticated}>
             <Stack.Screen name={"(protected)"}/>
           </Stack.Protected>

         </Stack>
       </SafeAreaProvider>
     </BottomSheetModalProvider>
   </GestureHandlerRootView>
  )
}
