import ScreenLayout from "../../layout/screen-layout";
import {Text, View} from "react-native";

const MapScreen = () => {
  return(
    <ScreenLayout
      screen={"map"}
      navbarTitle={"Map"}
    >
      <View>
        <Text className={"text-red-600"}>Map Screen</Text>
      </View>
    </ScreenLayout>
  )
}
export default MapScreen;