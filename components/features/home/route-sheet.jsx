import {View, Text, ActivityIndicator} from "react-native";
import BottomSheet, {BottomSheetScrollView} from "@gorhom/bottom-sheet";
import {useMemo, useEffect} from "react";
import {useRouteStore} from "../../../store/routes/useRoutesStore";
import {useMapStore} from "../../../store/map/useMapStore";
import {RouteAlertCard} from "./route-alert";
import {ROUTE_ALERTS} from "./home";
import { useRouter } from "expo-router";

const RouteSheet = ({ sheetRef }) => {
  const {alerts, loading, error, fetchAlerts} = useRouteStore();
  const routeCoords = useMapStore((state) => state.routeCoords);
  const snapPoints = useMemo(() => ["20%", "40%", "85%"], []);
  const router = useRouter();

  useEffect(() => {
    fetchAlerts()
  }, [fetchAlerts]);

  // Collapse to 20% whenever a route is loaded so the map is visible
  useEffect(() => {
    if (routeCoords.length > 0) {
      sheetRef?.current?.snapToIndex(0);
    }
  }, [routeCoords]);

  return (
    <BottomSheet
      ref={sheetRef}
      index={1}
      snapPoints={snapPoints}
      handleIndicatorStyle={{backgroundColor: "#E5E7EB", width: 40}}
      backgroundStyle={{borderRadius: 34, borderColor: "#E9EAEB", borderWidth: 2}}
      enableDynamicSizing={false}
      enablePanDownToClose={false}
    >
      <View className="flex-row items-center justify-between px-4 py-4">
        <View className="flex-row items-center">
        <View className="w-5 h-5 flex justify-center items-center bg-[#60F5C3] mr-2 rounded-full">
        <View className="w-2 h-2 bg-[#006951] rounded-full"/>
        </View>
        <Text className="text-2xl font-medium text-[#003838]">
          Live on your route
        </Text>
        </View>
        <View>
          <Text className="text-[#535862] text-md font-medium">Saved Routes</Text>
        </View>
      </View>

      <BottomSheetScrollView
        contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 120}}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {loading ? (
          <ActivityIndicator className="mt-6" color="#56034C"/>
        ) : (
           <>
      {/* Live on your route */}
      {ROUTE_ALERTS.map((alert) => (
        <RouteAlertCard key={alert.id} alert={alert}  onPress={() => router.push({
      pathname: "/(protected)/(stack)/route-detail",
      params: { id: alert.id, name: alert.route },
    })}/>
      ))}

      {/* Other routes */}
      <View className="flex-row items-center mt-4 mb-3">
        <View className="w-5 h-5 flex justify-center items-center bg-[#60F5C3] mr-2 rounded-full">
          <View className="w-2 h-2 bg-[#006951] rounded-full"/>
        </View>
        <Text className="text-2xl font-medium text-[#003838]">
          Other routes
        </Text>
      </View>

      {ROUTE_ALERTS.map((alert) => (
        <RouteAlertCard key={`other-${alert.id}`} alert={alert}  onPress={() => router.push({
      pathname: "/(protected)/(stack)/route-detail",
      params: { id: alert.id, name: alert.route },
    })}/>
      ))}
    </>
        )}
      </BottomSheetScrollView>
    </BottomSheet>
  );
};
export default RouteSheet;