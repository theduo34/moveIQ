import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { auth } from "../../../app/firebase";
import MoveSafeView from "../../MoveSafeView";



const LoginScreen = () => {

   const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in:", userCredential.user.email);

    
      router.replace("/(protected)/(tabs)/home"); 
    } catch (error) {
      console.log("Login error:", error.message);
      alert(error.message); 
    }
  };

 
  return(
  
    <MoveSafeView bgColor={'#003838'}>

      <View>
        <Text style={Styles.text1}>Sign in</Text>
      </View>


      <View>
        <Text style={Styles.text2}>Email or Phone</Text>
      </View>


      <View style={Styles.regView}>
        <Image style={Styles.image} source={require('../../../assets/images/mail.png')}/>
        <TextInput style={Styles.input} autoCapitalize="none" keyboardType="email-address" onChangeText={setEmail} placeholder="Enter your email or phone no" placeholderTextColor={'#a4a7ae'}/>
      </View>


      <View>
        <Text style={Styles.text2}>Password</Text>
      </View>


      <View style={Styles.regView}>
        <Image style={Styles.image} source={require('../../../assets/images/lock.png')}/>
        <TextInput style={Styles.input} placeholder="Enter your password" secureTextEntry onChangeText={setPassword} placeholderTextColor={'#a4a7ae'}/>
      </View>


      <Pressable onPress={handleLogin}>
        <View style={Styles.signInView}>
          <Text style={Styles.siginInText}>Sign In</Text>
        </View>
      </Pressable>


      <View>
        <Text>or</Text>

      </View>


      <View style={Styles.googleView}>
        <Image style={Styles.google} source={require('../../../assets/images/google.png')}/>
        <Text style={Styles.googleText}>Sign in with Google</Text>
      </View>


      
      <View style={{flexDirection:'row', marginTop:30, alignSelf:'center'}}>
        <Text style={{fontFamily:'semibold', fontSize:16, fontWeight:600, color:'#FFFFFF'}}>Don't have an account?</Text>
      
        <Pressable onPress={() => {
          router.push('/(auth)/signup')
        } }>
          <Text style={{fontFamily:'bold', color:'#60F5C3', left:5, fontSize:16}}>Sign up</Text>
        </Pressable>  
      </View>
 

    
   </MoveSafeView>

  )
}
export default LoginScreen;



const Styles = StyleSheet.create({

  text1:{
    fontSize: 36,
    fontFamily: 'semibold',
    fontWeight: 600,
    color:'white',
    textAlign:'center',
    marginTop:80,
    lineHeight: 44,
    
  },

  text2:{
    fontSize: 18,
    fontFamily: 'medium',
    fontWeight: 500,
    color:'#f5f5f5',
    textAlign:'left',
    marginTop:30,
    lineHeight:28
  },

  regView:{
    flexDirection:'row',
    borderRadius:5,
    width:325,
    height:56,
    backgroundColor:'#f5f5f5',
    paddingHorizontal:15
  },

  image:{
    width:32,
    height:32,
    marginVertical: 12
  },

  input:{
    fontFamily:'medium',
    fontSize:14,
    fontWeight:500,
    top:2,   
  },

  signInView:{
    backgroundColor:'#00a779',
    width: 325,
    height:49,
    marginTop: 35,
    borderRadius:5,
    
  },

  siginInText:{
    textAlign:'center',
    fontFamily:'semibold',
    fontSize:20,
    color: '#FDFDFD',
    marginVertical:12

  },

  googleText:{
    fontFamily:'semibold',
    color:'#414651',
    fontSize:16,
    fontWeight:600,
    marginVertical:15,
    left:70
    
  },

  google:{
    width:24,
    height:24,
    left:50
    
  },

  googleView:{
    flexDirection:'row',
    borderRadius:5,
    width:325,
    height:56,
    backgroundColor:'#f5f5f5',
    paddingHorizontal:15,
    alignItems:'center',
    marginTop:30

  }
})




