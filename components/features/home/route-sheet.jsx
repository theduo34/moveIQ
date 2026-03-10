import {View, Text, ActivityIndicator} from "react-native";
import BottomSheet, {BottomSheetScrollView} from "@gorhom/bottom-sheet";
import {useRef, useMemo, useEffect} from "react";
import {useRouteStore} from "../../../store/routes/useRoutesStore";
import {RouteAlertCard} from "./route-alert";
import {ROUTE_ALERTS} from "./home";

const RouteSheet = () => {
  const {alerts, loading, error, fetchAlerts} = useRouteStore();
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["50%", "85%"], []);

  useEffect(() => {
    fetchAlerts()
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      handleIndicatorStyle={{backgroundColor: "#E5E7EB", width: 40}}
      backgroundStyle={{borderRadius: 28}}
      enableDynamicSizing={false}
    >
      <View className="flex-row items-center px-4 py-2">
        <View className="w-2 h-2 rounded-full bg-green-500 mr-2"/>
        <Text className="text-base font-semibold text-text-primary">
          Live on your route
        </Text>
      </View>

      <BottomSheetScrollView
        contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 120}}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {loading ? (
          <ActivityIndicator className="mt-6" color="#56034C"/>
        ) : (
          ROUTE_ALERTS.map((alert) => (
            <RouteAlertCard key={alert.id} alert={alert}/>
          ))
        )}
      </BottomSheetScrollView>
    </BottomSheet>
  );
};
export default RouteSheet;