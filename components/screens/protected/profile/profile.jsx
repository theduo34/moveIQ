import ScreenLayout from "../../../layout/screen-layout";
import {Text, View} from "react-native";

const ProfileScreen = () => {
  return(
    <ScreenLayout
      screen={"profile"}
      navbarTitle={"Profile"}
    >
      <View>
        <Text className={"text-red-600"}>Routes Screen</Text>
      </View>
    </ScreenLayout>
  )
}
export default ProfileScreen;