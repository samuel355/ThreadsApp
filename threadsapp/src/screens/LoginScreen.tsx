import { View, Text, TextInput, TouchableOpacity, ToastAndroid, Alert } from 'react-native'
import React, { useState } from 'react'
import tw from 'tailwind-react-native-classnames';

type Props = {
  navigation: any;
}

const LoginScreen = ({navigation}: Props) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const submitHandler = (e:any) => {
    Alert.alert('Login Successfully');
    
    ToastAndroid.showWithGravity(
      'Login successfully',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
    )
  }

  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <View style={tw`w-80`}>
        <Text style = {tw `text-xl font-semibold text-center`}>Login</Text>
        <TextInput 
          placeholder='Enter your email' 
          style={tw`w-full h-8 border border-gray-400 px-2 my-2 rounded-sm`} 
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput 
          placeholder='Enter your password' 
          style={tw`w-full h-8 border border-gray-400 px-2 my-2 rounded-sm`} 
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity onPress={submitHandler} style={tw`w-full h-8 bg-gray-700 rounded-sm mt-2`}>
          <Text style={tw`text-white text-lg text-center`}>Login</Text>
        </TouchableOpacity>
        <View style={tw`pt-2 flex flex-row`}>
          <Text>Don't have an account yet?</Text> 
          <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={tw `font-bold ml-2`}>
            <Text style={tw `font-semibold`}>Sign up</Text> 
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default LoginScreen