import { useRef } from "react";
import { Text } from "react-native";
import MapSection from "../../../features/home/map-section";
import RouteSheet from "../../../features/home/route-sheet";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const sheetRef = useRef(null);

  const collapseSheet = () => sheetRef.current?.snapToIndex(0);

  return (
    <SafeAreaView className="flex-1">
      <MapSection onMapInteraction={collapseSheet} />
      <RouteSheet sheetRef={sheetRef} />
    </SafeAreaView>
  );
};

export default HomeScreen;