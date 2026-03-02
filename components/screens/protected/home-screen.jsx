import ScreenLayout from "../../layout/screen-layout";
import {Text, View} from "react-native";

const HomeScreen = () => {
  return(
    <ScreenLayout
      screen={"home"}
    >
      <View>
        <Text className={"text-red-600"}>Home Screen</Text>
      </View>
    </ScreenLayout>
  )
}
export default HomeScreen;