import { Dimensions, Keyboard, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const MoveSafeView = ({children, bgColor}) => {

    const {width} = Dimensions.get('screen')
    return(

        <TouchableWithoutFeedback onPress={()=> {
            Keyboard.dismiss()}}>
        <SafeAreaView style ={{
            paddingHorizontal: width * 0.04,
            flex: 1,
            backgroundColor: bgColor ? bgColor : 'white'
        }}>

            {children}

        </SafeAreaView>
        </TouchableWithoutFeedback>
    )

}

export default MoveSafeView;