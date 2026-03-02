import ScreenLayout from "../../layout/screen-layout";
import {Text, View} from "react-native";

const LoginScreen = () => {
  return(
    <ScreenLayout
      screen={"login"}
      showNavbar={false}
    >
      <View>
        <Text>Login Screen</Text>
      </View>
    </ScreenLayout>
  )
}
export default LoginScreen;