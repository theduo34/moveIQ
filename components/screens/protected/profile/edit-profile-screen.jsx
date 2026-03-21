import { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useAuthStore } from "../../../../store/auth/useAuthStore";
import Avatar from "../../../shared/avatar";

// ── Reusable form field ───────────────────────────────────────────────────────
const FormField = ({ label, value, onChangeText, keyboardType, placeholder, editable = true }) => (
  <View className="mb-4">
    <Text className="text-sm text-gray-400 mb-2">{label}</Text>
    <TextInput
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      placeholder={placeholder}
      placeholderTextColor="#9CA3AF"
      editable={editable}
      className="bg-gray-100 rounded-2xl px-4 py-4 text-sm text-gray-900"
      style={{ opacity: editable ? 1 : 0.6 }}
    />
  </View>
);

const EditProfileScreen = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user, updateUser } = useAuthStore();

  const nameParts = (user?.name ?? "").split(" ");
  const [firstName, setFirstName] = useState(nameParts[0] ?? "");
  const [lastName, setLastName] = useState(nameParts.slice(1).join(" ") ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");

  const handleSave = () => {
    updateUser({
      name: `${firstName} ${lastName}`.trim(),
      email,
      phone,
    });
    Alert.alert("Saved", "Profile updated successfully.");
    router.back();
  };

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <View className="flex-row items-center px-4 pt-4 pb-3 gap-3">
        <Pressable
          onPress={() => router.back()}
          className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center"
        >
          <ArrowLeft size={18} color="#1B6B5A" strokeWidth={2.5} />
        </Pressable>
        <Text className="text-xl font-bold text-emerald-900">Edit profile</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: insets.bottom + 120 }}
      >
        {/* Avatar */}
        <View className="items-center my-6">
          <Avatar
            name={firstName || "U"}
            size={100}
            showCamera
            onCameraPress={() => {}}
          />
        </View>

        <FormField
          label="First Name"
          value={firstName}
          onChangeText={setFirstName}
          placeholder="First name"
        />
        <FormField
          label="Last Name"
          value={lastName}
          onChangeText={setLastName}
          placeholder="Last name"
        />
        <FormField
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholder="Email address"
        />
        <FormField
          label="Phone number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          placeholder="+234 000 000 000"
        />
      </ScrollView>

      {/* Save button */}
      <View
        className="absolute bottom-0 left-0 right-0 px-4 bg-white"
        style={{ paddingBottom: insets.bottom + 16, paddingTop: 12 }}
      >
        <Pressable
          onPress={handleSave}
          className="bg-emerald-800 rounded-full py-4 items-center active:opacity-80"
        >
          <Text className="text-base font-semibold text-white">Save changes</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default EditProfileScreen;