import ScreenLayout from "../../../layout/screen-layout";
import {Text, View} from "react-native";

const ActivityScreen = () => {
  return(
    <ScreenLayout
      screen={"activity"}
      navbarTitle={"Activity"}
    >
      <View>
        <Text className={"text-red-600"}>Activity Screen</Text>
      </View>
    </ScreenLayout>
  )
}
export default ActivityScreen;