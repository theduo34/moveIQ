import ScreenLayout from "../../layout/screen-layout";
import {Text, View} from "react-native";

const SettingsScreen = () => {
  return(
    <ScreenLayout
      screen={"settings"}
      navbarTitle={"Settings"}
    >
      <View>
        <Text className={"text-red-600"}>Settings Screen</Text>
      </View>
    </ScreenLayout>
  )
}
export default SettingsScreen;