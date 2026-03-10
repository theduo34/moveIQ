import {Text, TouchableOpacity, View} from "react-native";
import {BadgeCheck, Car, ChevronRight, Clock, TrafficCone, Users} from "lucide-react-native";

const ICON_MAP = {
  traffic: {Icon: Car, color: "#EF4444", iconBg: "bg-red-100", titleColor: "text-red-500"},
  construction: {Icon: TrafficCone, color: "#F97316", iconBg: "bg-orange-100", titleColor: "text-orange-500"},
  cleared: {Icon: TrafficCone, color: "#22C55E", iconBg: "bg-green-100", titleColor: "text-green-500"},
};

export const RouteAlertCard = ({alert}) => {
  const {Icon, color, iconBg, titleColor} = ICON_MAP[alert.type];

  return (
    <TouchableOpacity
      className="flex-row items-center bg-card border border-border rounded-2xl p-4 mb-3"
      activeOpacity={0.7}
    >
      <View className={`w-12 h-12 rounded-xl ${iconBg} items-center justify-center mr-4`}>
        <Icon size={22} color={color} strokeWidth={2}/>
      </View>

      <View className="flex-1">
        <Text className={`text-sm font-semibold ${titleColor}`}>{alert.title}</Text>
        <Text className="text-xs text-text-primary font-medium mt-0.5">{alert.route}</Text>

        <View className="flex-row items-center gap-3 mt-1.5">
          <View className="flex-row items-center">
            <Clock size={11} color="#9CA3AF" strokeWidth={2}/>
            <Text className="text-xs text-gray-400 ml-1">{alert.time}</Text>
          </View>
          <View className="flex-row items-center">
            <Users size={11} color="#9CA3AF" strokeWidth={2}/>
            <Text className="text-xs text-gray-400 ml-1">{alert.passengers}</Text>
          </View>
          <View className="flex-row items-center">
            <BadgeCheck size={11} color="#9CA3AF" strokeWidth={2}/>
            <Text className="text-xs text-gray-400 ml-1">{alert.verified}</Text>
          </View>
        </View>
      </View>

      <ChevronRight size={18} color="#D1D5DB" strokeWidth={2}/>
    </TouchableOpacity>
  );
};
