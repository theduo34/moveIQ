import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
// import "../global.css";
import { useFonts } from "expo-font";


export default function RootLayout() {

   const [loaded, error] = useFonts({
    bold: require('../assets/fonts/Poppins/Poppins-Bold.ttf'),
    regular: require('../assets/fonts/Poppins/Poppins-Regular.ttf'),
    extrabold: require('../assets/fonts/Poppins/Poppins-ExtraBold.ttf'),
    light: require('../assets/fonts/Poppins/Poppins-Light.ttf'),
    semibold: require('../assets/fonts/Poppins/Poppins-SemiBold.ttf'),
    medium: require('../assets/fonts/Poppins/Poppins-Medium.ttf')
  })

  if (error) {
    return null
  }

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name={"(auth)"}/>
        <Stack.Screen name={"(protected)"}/>
      </Stack>
    </SafeAreaProvider>
  )
}
