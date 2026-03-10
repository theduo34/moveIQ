// import { View } from "react-native";
// import MapView from "react-native-maps";
//
// const MapSection = () => {
//   return (
//     <View className="h-64 w-full">
//       <MapView
//         className="flex-1"
//         initialRegion={{
//           latitude: 6.5244,
//           longitude: 3.3792,
//           latitudeDelta: 0.05,
//           longitudeDelta: 0.05,
//         }}
//       />
//     </View>
//   );
// };
//
// export default MapSection;

import { View, Image } from "react-native";
import { useState } from "react";
import SearchBar from "../../../components/shared/search-bar";

const MapSection = () => {
  const [query, setQuery] = useState("");

  return (
    <View className="relative h-64 w-full">
      <Image
        source={{ uri: "https://api.mapbox.com/styles/v1/mapbox/light-v11/static/3.3792,6.5244,13,0/400x300?access_token=YOUR_TOKEN" }}
        className="w-full h-full"
        resizeMode="cover"
      />
      <View className="absolute top-8 left-4 right-4 z-10">
        <SearchBar
          placeholder='Search Route "Try Iyana - CMS"'
          value={query}
          onChangeText={setQuery}
          onClear={() => setQuery("")}
        />
      </View>
    </View>
  );
};

export default MapSection;
