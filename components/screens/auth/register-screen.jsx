import { router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { auth } from "../../../services/firebase";
import MoveSafeView from "../../MoveSafeView";



const RegisterScreen = () => {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

  const handleSignup = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    console.log("User created:", userCredential.user.email);
  router.push('/(auth)/login')

  } catch (error) {
    console.log(error.message);
  }
};


  return(
  
    <MoveSafeView bgColor={'#003838'}>

      <View>
        <Text style={Styles.text1}>Sign up</Text>

      </View>


      <View>
        <Text style={Styles.text2}>Name</Text>
      </View>


      <View style={Styles.regView}>
        <TextInput style={Styles.input} placeholder="Olivia Grace" placeholderTextColor={'#a4a7ae'}/>
      </View>

      <View>
        <Text style={Styles.text2}>Email or Phone</Text>
      </View>
      
      
      <View style={Styles.regView}>
        <TextInput style={Styles.input}  onChangeText={setEmail} placeholder="olivia@untitled.com" placeholderTextColor={'#a4a7ae'}/>
      </View>


      <View>
        <Text style={Styles.text2}>Password</Text>
      </View>


      <View style={Styles.regView}>
        <TextInput style={Styles.input} onChangeText={setPassword} secureTextEntry placeholder="Enter your password" placeholderTextColor={'#a4a7ae'}/>
      </View>


      <Pressable onPress={handleSignup}>
        <View style={Styles.signInView}>
          <Text style={Styles.siginInText}>Sign up</Text>
        </View>
      </Pressable>


      <View>
        <Text>or</Text>

      </View>


      <View style={Styles.googleView}>
        <Image style={Styles.google} source={require('../../../assets/images/google.png')}/>
        <Text style={Styles.googleText}>Sign up with Google</Text>
      </View>


      
      <View style={{flexDirection:'row', marginTop:30, alignSelf:'center'}}>
        <Text style={{fontFamily:'semibold', fontSize:16, fontWeight:600, color:'#FFFFFF'}}>Already have an account?</Text>
      
        <Pressable onPress={() => {
          router.push('/(auth)/login')
        } }>
          <Text style={{fontFamily:'bold', color:'#60F5C3', left:5, fontSize:16}}>Sign in</Text>
        </Pressable>  
      </View>
 

    
   </MoveSafeView>

  )
}
export default RegisterScreen;



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



