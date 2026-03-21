// components/shared/logout-sheet.jsx
import { View, Text, Pressable } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useRef, useMemo } from "react";

const LogoutSheet = ({ visible, onConfirm, onCancel }) => {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["35%"], []);

  if (!visible) return null;

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose
      onClose={onCancel}
      handleIndicatorStyle={{ backgroundColor: "#E5E7EB", width: 40 }}
      backgroundStyle={{ borderRadius: 28 }}
    >
      <BottomSheetView className="flex-1 px-6 pt-4 pb-8 items-center">
        <Text className="text-2xl font-bold text-emerald-900 mt-2">
          Log Out?
        </Text>
        <Text className="text-sm text-gray-400 text-center mt-2 mb-8">
          Are you sure you want to log out?
        </Text>

        <Pressable
          onPress={onConfirm}
          className="w-full bg-emerald-800 rounded-full py-4 items-center mb-3 active:opacity-80"
        >
          <Text className="text-base font-semibold text-white">Yes, Log out</Text>
        </Pressable>

        <Pressable
          onPress={onCancel}
          className="w-full border border-gray-200 rounded-full py-4 items-center active:opacity-80"
        >
          <Text className="text-base font-semibold text-emerald-800">Cancel</Text>
        </Pressable>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default LogoutSheet;