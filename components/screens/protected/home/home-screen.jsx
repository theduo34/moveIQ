import MapSection from "../../../features/home/map-section";
import RouteSheet from "../../../features/home/route-sheet";
import { SafeAreaView } from "react-native-safe-area-context";
const HomeScreen = () => {
  return (
    // Plain View — no SafeAreaView so map bleeds to screen edges
    // The bottom sheet and search bar handle their own safe area insets
    <SafeAreaView className="flex-1">
      <MapSection />
      <RouteSheet />
    </SafeAreaView>
  );
};

export default HomeScreen;