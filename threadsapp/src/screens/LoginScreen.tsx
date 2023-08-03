import { View, Text, TextInput, TouchableOpacity, ToastAndroid, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'tailwind-react-native-classnames';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/actions/userAction';

type Props = {
  navigation: any;
}

const LoginScreen = ({navigation}: Props) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()

  const {user, error, loading} = useSelector((state:any) => state.user)

  const submitHandler = (e:any) => {
    if(email === '' && password === ''){
      return Alert.alert("Enter your email and password")
    }
    loginUser(email, password)(dispatch)
    setEmail('')
    setPassword('')
  }

  useEffect(() => {
    if(error){
      Alert.alert(error)
    }
    if(user){
      navigation.navigate('Home')
    }
  }, [error, user])


  return (
    <View style={tw`flex-1 items-center justify-center relative`}>
      {loading ? (
        <View
          style={tw`flex justify-center items-center w-full h-full bg-gray-900 absolute opacity-40`}>
          <ActivityIndicator size="small" color="white" />
        </View>
      ) : (
        <></>
      )}
      <View style={tw`w-80`}>
        <Text style={tw`text-xl font-semibold text-center`}>Login</Text>
        <TextInput
          placeholder="Enter your email"
          style={tw`w-full h-8 border border-gray-400 px-2 my-2 rounded-sm`}
          value={email}
          onChangeText={text => setEmail(text)}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Enter your password"
          style={tw`w-full h-8 border border-gray-400 px-2 my-2 rounded-sm`}
          secureTextEntry={true}
          value={password}
          onChangeText={text => setPassword(text)}
          autoCapitalize="none"
        />
        <TouchableOpacity
          onPress={submitHandler}
          style={tw`w-full h-8 bg-gray-700 rounded-sm mt-2`}>
          <Text style={tw`text-white text-lg text-center`}>Login</Text>
        </TouchableOpacity>
        <View style={tw`pt-2 flex flex-row`}>
          <Text>Don't have an account yet?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home Screen')}
            style={tw`font-bold ml-2`}>
            <Text style={tw`font-semibold`}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default LoginScreen