/* eslint-disable react/no-unescaped-entities */
import { useRef, useState, useEffect } from "react";
import { View, Text, Pressable, TouchableOpacity, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MapView, { UrlTile, Marker, Polyline, PROVIDER_NONE } from "react-native-maps";
import { TriangleAlert, Crosshair, Search, ChevronDown } from "lucide-react-native";
import { useRouter } from "expo-router";
import * as Location from "expo-location";
import { useMapStore } from "../../../store/map/useMapStore";

const INITIAL_REGION = {
  latitude: 6.5244,
  longitude: 3.3792,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

const OSM_TILE_URL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";

// ─── Search Bar Trigger ───────────────────────────────────────────────────────
const SearchBarTrigger = ({ onPress, destinationName }) => (
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
    <Text className="flex-1 ml-3 text-sm text-gray-400" numberOfLines={1}>
      {destinationName ?? 'Search Route "Try Iyana - CMS"'}
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

  const { destination, routeCoords, setCurrentLocation, currentLocation } = useMapStore();

  const [locationError, setLocationError] = useState(null);
  const [locating, setLocating] = useState(true);

  // ── Live location tracking ─────────────────────────────────────────────────
  useEffect(() => {
    let subscription;

    const startTracking = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocationError("Location permission denied.");
        setLocating(false);
        return;
      }

      // Get initial position fast
      const initial = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      const coords = {
        latitude: initial.coords.latitude,
        longitude: initial.coords.longitude,
      };
      setCurrentLocation(coords);
      setLocating(false);

      // Animate map to live location
      mapRef.current?.animateToRegion(
        { ...coords, latitudeDelta: 0.05, longitudeDelta: 0.05 },
        800
      );

      // Watch for position updates
      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 5,
        },
        (loc) => {
          setCurrentLocation({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          });
        }
      );
    };

    startTracking();
    return () => subscription?.remove();
  }, []);

  const handleRecenter = () => {
    if (currentLocation) {
      mapRef.current?.animateToRegion(
        { ...currentLocation, latitudeDelta: 0.05, longitudeDelta: 0.05 },
        600
      );
    } else {
      mapRef.current?.animateToRegion(INITIAL_REGION, 600);
    }
  };

  const handleOpenSearch = () => {
    router.push("/(protected)/(stack)/search-route");
  };

  return (
    <View className="flex-1">
      {/* Map — full bleed */}
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        provider={PROVIDER_NONE}
        initialRegion={INITIAL_REGION}
        showsUserLocation={true}
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

        {/* Destination marker */}
        {destination && (
          <Marker
            coordinate={destination}
            title="Destination"
            description={destination.name}
            pinColor="#1B6B5A"
          />
        )}

        {/* Route polyline */}
        {routeCoords.length > 0 && (
          <Polyline
            coordinates={routeCoords}
            strokeColor="#1B6B5A"
            strokeWidth={4}
          />
        )}
      </MapView>

      {/* Locating indicator */}
      {locating && (
        <View className="absolute top-20 self-center bg-white rounded-full px-4 py-2 flex-row items-center gap-2 shadow-sm">
          <ActivityIndicator size="small" color="#1B6B5A" />
          <Text className="text-xs text-gray-500">Finding your location...</Text>
        </View>
      )}

      {/* Location error */}
      {locationError && (
        <View className="absolute top-20 self-center bg-red-50 border border-red-200 rounded-full px-4 py-2">
          <Text className="text-xs text-red-600">{locationError}</Text>
        </View>
      )}

      {/* Search bar trigger — top inset aware */}
      <View
        className="absolute left-4 right-4"
        style={{ top: insets.top }}
      >
        <SearchBarTrigger
          onPress={handleOpenSearch}
          destinationName={destination?.name}
        />
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