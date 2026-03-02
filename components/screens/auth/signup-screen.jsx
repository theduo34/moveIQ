import ScreenLayout from "../../layout/screen-layout";
import {Text, View} from "react-native";

const SignUpScreen = () => {
  return(
    <ScreenLayout
      screen={"signup"}
      showNavbar={false}
    >
      <View>
        <Text>Sign up Screen</Text>
      </View>
    </ScreenLayout>
  )
}
export default SignUpScreen;