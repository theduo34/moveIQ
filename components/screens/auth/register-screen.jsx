import ScreenLayout from "../../layout/screen-layout";
import {Text, View} from "react-native";

const RegisterScreen = () => {
  return(
    <ScreenLayout
      screen={"register"}
      showNavbar={false}
    >
      <View>
        <Text>Register up Screen</Text>
      </View>
    </ScreenLayout>
  )
}
export default RegisterScreen;