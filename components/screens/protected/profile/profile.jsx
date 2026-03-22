import { Pressable, Text } from "react-native";
import useAuth from "../../../../hooks/useAuth";
import ScreenLayout from "../../../layout/screen-layout";


const ProfileScreen = () => {

  const {handleLogout} = useAuth()


    
  return(
    <ScreenLayout
      screen={"profile"}
      navbarTitle={"Profile"}
    >
      <Pressable onPress={handleLogout}>
        <Text className={"text-red-600"}>Routes Screen</Text>
      </Pressable>
    </ScreenLayout>
  )
}
export default ProfileScreen;