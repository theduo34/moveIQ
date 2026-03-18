import {Text, TouchableOpacity, View} from "react-native";
import {LucideTrafficCone, BadgeCheck, Car, ChevronRight, Clock, TrafficCone, InfoIcon} from "lucide-react-native";

const ICON_MAP = {
  traffic: {Icon: Car, color: "#912018", iconBg: "bg-[#FEE4E2]", titleColor: "text-[#912018]"},
  construction: {Icon: TrafficCone, color: "#93370D", iconBg: "bg-[#FEF0C7]", titleColor: "text-[#B54708]"},
  cleared: {Icon: LucideTrafficCone, color: "#003838", iconBg: "bg-[#CCFFE8]", titleColor: "text-[#006951]"},
};

export const RouteAlertCard = ({alert, onPress}) => {
  const {Icon, color, iconBg, titleColor} = ICON_MAP[alert.type];

  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center bg-[#FAFAFA] border-[#E9EAEB] border rounded-[34px] p-4 mb-3"
      activeOpacity={0.7}
    >
      <View className={`w-[68px] h-[68px] rounded-[20px] ${iconBg} items-center justify-center mr-4`}>
        <Icon size={22} color={color} strokeWidth={2}/>
      </View>

      <View className="flex-1">
        <Text className={`text-md font-semibold ${titleColor}`}>{alert.title}</Text>
        <Text className="text-sm text-[#181D27] font-medium mt-0.5">{alert.route}</Text>

        <View className="flex-row items-center gap-3 mt-1.5">
          <View className="flex-row items-center">
            <Text className="text-xs text-[#717680] ml-1">{alert.time}</Text>
          </View>
          <View className="flex-row items-center">
            <InfoIcon size={16} color="#ffffff" strokeWidth={2} fill="#717680"/>
            <Text className="text-xs text-[#717680] ml-1">{alert.passengers}</Text>
          </View>
          <View className="flex-row items-center">
            <BadgeCheck size={16} color="#ffffff" strokeWidth={2} fill="#A4A7AE"/>
            <Text className="text-xs text-[#A4A7AE] ml-1">{alert.verified}</Text>
          </View>
        </View>
      </View>

      <ChevronRight size={18} color="#D1D5DB" strokeWidth={2}/>
    </TouchableOpacity>
  );
};
