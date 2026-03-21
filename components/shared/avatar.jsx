// components/shared/avatar.jsx
import { View, Text, Image, Pressable } from "react-native";
import { Camera } from "lucide-react-native";

const Avatar = ({
  uri,
  name,
  size = 96,
  showCamera = false,
  onCameraPress,
}) => {
  const fontSize = size * 0.38;

  return (
    <View style={{ width: size, height: size }}>
      {uri ? (
        <Image
          source={{ uri }}
          style={{ width: size, height: size, borderRadius: size / 2 }}
        />
      ) : (
        <View
          className="bg-gray-200 items-center justify-center"
          style={{ width: size, height: size, borderRadius: size / 2 }}
        >
          <Text className="font-bold text-gray-500" style={{ fontSize }}>
            {name?.charAt(0).toUpperCase() ?? "?"}
          </Text>
        </View>
      )}

      {showCamera && (
        <Pressable
          onPress={onCameraPress}
          className="absolute bottom-0 right-0 w-8 h-8 rounded-xl bg-emerald-700 items-center justify-center"
        >
          <Camera size={14} color="#fff" strokeWidth={2} />
        </Pressable>
      )}
    </View>
  );
};

export default Avatar;