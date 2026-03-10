import RouteSheet from "../../../features/home/route-sheet";
import MapSection from "../../../features/home/map-section";
import {SafeAreaView} from "react-native-safe-area-context";

const HomeScreen = () => {
  return (
    <SafeAreaView
      className="flex-1 bg-background"
      edges={["top"]}
      >
      <MapSection />
      <RouteSheet />
    </SafeAreaView>
  );
};

export default HomeScreen;