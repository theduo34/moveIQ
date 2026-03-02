import ScreenLayout from "../../layout/screen-layout";
import {Text, View} from "react-native";

const VerifyScreen = () => {
  return(
    <ScreenLayout
      screen={"verify"}
      showNavbar={false}
    >
      <View>
        <Text>Verify Screen</Text>
      </View>
    </ScreenLayout>
  )
}
export default VerifyScreen;