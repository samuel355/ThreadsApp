import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {loadUser, loginUser} from '../../redux/actions/userAction';
import {useDispatch, useSelector} from 'react-redux';
import {useTailwind} from 'tailwind-rn';
import tw from 'tailwind-react-native-classnames';

type Props = {
  navigation: any;
};

const LoginScreen = ({navigation}: Props) => {
  const {error, isAuthenticated} = useSelector((state: any) => state.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const submitHandler = (e: any) => {
    loginUser(email, password)(dispatch);
  };

  useEffect(() => {
    if (error) {
      if (Platform.OS === 'android') {
        ToastAndroid.show(
          'Email and password not matching!',
          ToastAndroid.LONG,
        );
      } else {
        Alert.alert('Email and password not matching!');
      }
    }
    if (isAuthenticated) {
      loadUser()(dispatch);
      if (Platform.OS === 'android') {
      ToastAndroid.show('Login successful!', ToastAndroid.LONG);
      } else{
        Alert.alert('Login successful!');
      }
    }
  }, [isAuthenticated, error]);

  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <View style={tw`w-80`}>
        <Text style={tw`text-xl font-semibold text-center text-black`}>
          Login
        </Text>
        <TextInput
          placeholder="Enter your email"
          value={email}
          placeholderTextColor={'#000'}
          onChangeText={text => setEmail(text)}
          style={tw`w-full h-9 border border-gray-950 px-2 my-2 text-black`}
        />
        <TextInput
          placeholder="Enter your password"
          style={tw`w-full h-9 border border-gray-950 px-2 my-2 text-black`}
          value={password}
          placeholderTextColor={'#000'}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
        />
        <TouchableOpacity className="mt-5">
          <Text
            style={tw`w-full text-white text-center py-1 mt-3 text-xl bg-black`}
            onPress={submitHandler}>
            Login
          </Text>
        </TouchableOpacity>
        <Text
          style={tw`pt-3 text-black`}
          onPress={() => navigation.navigate('Signup')}>
          Don't have any account? <Text style={tw`font-semibold text-lg`}>Sign up</Text>
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;
