import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator
} from 'react-native';
import React, {useEffect, useState} from 'react';
import tw from 'tailwind-react-native-classnames';
import ImagePicker from 'react-native-image-crop-picker';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/actions/userAction';

type Props = {
  navigation: any;
};

const SignupScreen = ({navigation}: Props) => {
  const dispatch = useDispatch()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [conPassword, setConPassword] = useState('');
  const [avatar, setAvatar] = useState('');

  const {error, user, loading, message, isAuthenticated} = useSelector((state: any) => state.user)

  useEffect(() => {
    if(error){
      Alert.alert(error)
    }
    if(message){
      Alert.alert(message)
    }
    if(isAuthenticated) {
      navigation.navigate('Home Screen');
    }
  },[error, message])

  const uploadImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.9,
      includeBase64: true,
      mediaType: 'photo',
    }).then(image => {
      if(image){
        setAvatar('data:image/jpeg;base64,' + image.data);
      }
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if(name === '' && email === '') {
      return Alert.alert('Please fill all the details')
    }
    if (password === '' && conPassword === ''){
      return Alert.alert('Enter your password')
    }
    if(password !== conPassword) {
      return Alert.alert('Passwords do not match')
    }
    if(avatar === ''){
      return Alert.alert('Add your profile photo')
    }
    registerUser(name, email, password, avatar)(dispatch);
    setName('')
    setEmail('')
    setPassword('')
    setConPassword('')
    setAvatar('');
  };

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
        <Text style={tw`text-xl font-semibold text-center`}>
          Create Account
        </Text>
        <Image
          style={tw`h-14 w-14 rounded-full bg-gray-600 mx-auto mt-2`}
          source={{
            uri: avatar
              ? avatar
              : 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png',
          }}
        />
        <TextInput
          placeholder="Enter your full name"
          style={tw`w-full h-8 border border-gray-400 px-2 my-2 rounded-sm`}
          value={name}
          onChangeText={text => setName(text)}
          autoCapitalize="none"
        />
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
        <TextInput
          placeholder="Re-enter your password"
          style={tw`w-full h-8 border border-gray-400 px-2 my-2 rounded-sm`}
          secureTextEntry={true}
          value={conPassword}
          onChangeText={text => setConPassword(text)}
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={uploadImage} style={tw`flex flex-row py-2`}>
          <Image
            style={tw`w-4 h-4`}
            source={{
              uri: 'https://img.icons8.com/?size=512&id=84056&format=png',
            }}
          />
          <Text style={tw`underline ml-2`}>
            {avatar ? 'Change profile photo' : 'Upload Profile Photo'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSubmit}
          style={tw`w-full h-8 bg-gray-700 rounded-sm mt-2`}>
          <Text style={tw`text-white text-lg text-center`}>Sign Up</Text>
        </TouchableOpacity>
        <View style={tw`pt-2 flex flex-row`}>
          <Text>Already have an account yet?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={tw`font-bold ml-2`}>
            <Text style={tw`font-semibold`}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignupScreen;
