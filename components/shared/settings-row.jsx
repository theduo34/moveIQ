// components/shared/settings-row.jsx
import { View, Text, Pressable, Switch } from "react-native";
import { ChevronRight } from "lucide-react-native";

const SettingsRow = ({
  icon: Icon,
  iconColor = "#374151",
  label,
  onPress,
  isToggle = false,
  toggleValue = false,
  onToggleChange,
  isDestructive = false,
  showBorder = true,
}) => {
  const labelColor = isDestructive ? "#EF4444" : "#181D27";
  const iconTint = isDestructive ? "#EF4444" : iconColor;

  return (
    <Pressable
      onPress={!isToggle ? onPress : undefined}
      className={`flex-row items-center px-4 py-4 active:bg-gray-50 ${
        showBorder ? "border-b border-gray-100" : ""
      }`}
    >
      {Icon && (
        <View className="w-7 items-center mr-3">
          <Icon size={20} color={iconTint} strokeWidth={1.8} />
        </View>
      )}
      <Text className="flex-1 text-sm font-medium" style={{ color: labelColor }}>
        {label}
      </Text>
      {isToggle ? (
        <Switch
          value={toggleValue}
          onValueChange={onToggleChange}
          trackColor={{ false: "#D1D5DB", true: "#006951" }}
          thumbColor="#fff"
        />
      ) : (
        <ChevronRight size={16} color={isDestructive ? "#EF4444" : "#9CA3AF"} strokeWidth={2} />
      )}
    </Pressable>
  );
};

export default SettingsRow;