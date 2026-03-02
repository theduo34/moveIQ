import ScreenLayout from "../../layout/screen-layout";
import {Text, View} from "react-native";

const RouteScreen = () => {
  return(
    <ScreenLayout
      screen={"route"}
      navbarTitle={"Route"}
    >
      <View>
        <Text className={"text-red-600"}>Route Screen</Text>
      </View>
    </ScreenLayout>
  )
}
export default RouteScreen;