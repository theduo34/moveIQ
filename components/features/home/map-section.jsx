/* eslint-disable react/no-unescaped-entities */
import { useRef, useState } from "react";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MapView, { UrlTile, PROVIDER_DEFAULT } from "react-native-maps";
import { TriangleAlert, Crosshair, Search, ChevronDown } from "lucide-react-native";
import { useRouter } from "expo-router";

const INITIAL_REGION = {
  latitude: 6.5244,
  longitude: 3.3792,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

const OSM_TILE_URL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";

// ─── Search Bar Trigger (not an input — tapping opens Search screen) ──────────
const SearchBarTrigger = ({ onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.85}
    className="flex-row items-center bg-white rounded-full px-4 h-12 shadow-md"
    style={{
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    }}
  >
    <Search size={16} color="#1B6B5A" strokeWidth={2} />
    <Text className="flex-1 ml-3 text-sm text-gray-400">
      Search Route "Try Iyana - CMS"
    </Text>
    <ChevronDown size={16} color="#9CA3AF" strokeWidth={2} />
  </TouchableOpacity>
);

// ─── Report FAB ───────────────────────────────────────────────────────────────
const ReportFAB = ({ onPress }) => (
  <Pressable
    onPress={onPress}
    className="w-14 h-14 rounded-full bg-emerald-800 items-center justify-center active:opacity-80"
    style={{
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 8,
    }}
  >
    <TriangleAlert size={18} color="#F5A623" strokeWidth={2.5} />
    <Text className="text-white font-semibold mt-0.5" style={{ fontSize: 9 }}>
      Report
    </Text>
  </Pressable>
);

// ─── Recenter Button ──────────────────────────────────────────────────────────
const RecenterButton = ({ onPress }) => (
  <Pressable
    onPress={onPress}
    className="w-10 h-10 rounded-full bg-white items-center justify-center active:opacity-80"
    style={{
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 6,
      elevation: 4,
    }}
  >
    <Crosshair size={18} color="#1B6B5A" strokeWidth={2} />
  </Pressable>
);

// ─── Main MapSection ──────────────────────────────────────────────────────────
const MapSection = () => {
  const mapRef = useRef(null);
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handleRecenter = () => {
    mapRef.current?.animateToRegion(INITIAL_REGION, 600);
  };

const handleOpenSearch = () => {
  router.push("/search");
};

  return (
    <View className="flex-1">
      {/* Map — full bleed */}
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        provider={PROVIDER_DEFAULT}
        initialRegion={INITIAL_REGION}
        showsUserLocation
        showsMyLocationButton={false}
        showsCompass={false}
        rotateEnabled={false}
        toolbarEnabled={false}
      >
        <UrlTile
          urlTemplate={OSM_TILE_URL}
          maximumZ={19}
          flipY={false}
          zIndex={1}
        />
      </MapView>

      {/* Search bar trigger — top inset aware */}
      <View
        className="absolute left-4 right-4"
        style={{ top: insets.top }}
      >
        <SearchBarTrigger onPress={handleOpenSearch} />
      </View>

      {/* FABs — bottom inset aware */}
      <View
        className="absolute right-4 items-center gap-3"
        style={{ bottom: insets.bottom + 24 }}
      >
        <ReportFAB onPress={() => {}} />
        <RecenterButton onPress={handleRecenter} />
      </View>
    </View>
  );
};

export default MapSection;