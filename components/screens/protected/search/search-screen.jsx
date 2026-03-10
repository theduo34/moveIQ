import ScreenLayout from "../../../layout/screen-layout";
import {Text, View} from "react-native";

const SearchScreen = () => {
  return(
    <ScreenLayout
      screen={"search"}
      navbarTitle={"Search"}
    >
      <View>
        <Text className={"text-red-600"}>Search Screen</Text>
      </View>
    </ScreenLayout>
  )
}
export default SearchScreen;