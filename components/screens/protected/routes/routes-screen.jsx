import ScreenLayout from "../../../layout/screen-layout";
import {Text, View} from "react-native";

const RoutesScreen = () => {
  return(
    <ScreenLayout
      screen={"routes"}
      navbarTitle={"Routes"}
    >
      <View>
        <Text className={"text-red-600"}>Routes Screen</Text>
      </View>
    </ScreenLayout>
  )
}
export default RoutesScreen;