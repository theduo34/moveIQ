import {View, Text, ActivityIndicator} from "react-native";
import BottomSheet, {BottomSheetScrollView} from "@gorhom/bottom-sheet";
import {useRef, useMemo, useEffect} from "react";
import {useRouteStore} from "../../../store/routes/useRoutesStore";
import {RouteAlertCard} from "./route-alert";
import {ROUTE_ALERTS} from "./home";
import { useRouter } from "expo-router";

const RouteSheet = () => {
  const {alerts, loading, error, fetchAlerts} = useRouteStore();
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["40%", "85%"], []);
  const router = useRouter();

  useEffect(() => {
    fetchAlerts()
  }, [fetchAlerts]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      handleIndicatorStyle={{backgroundColor: "#E5E7EB", width: 40}}
      backgroundStyle={{borderRadius: 34, borderColor: "#E9EAEB", borderWidth: 2}}
      enableDynamicSizing={false}
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