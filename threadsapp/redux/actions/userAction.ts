import axios from 'axios';
import {URI} from '../URI';
import {Dispatch} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Register User
export const registerUser =
  (name: string, email: string, password: string, avatar: string) =>
  async (dispatch: Dispatch<any>) => {
    try {
      dispatch({
        type: 'userRegisterRequest',
      });
      const config = {headers: {'Content-Type': 'application/json'}};
      const {data} = await axios.post(
        `${URI}/registration`,
        {name, email, password, avatar},
        config,
      );
      dispatch({
        type: 'userRegisterSuccess',
        payload: data,
      });

      const user = JSON.stringify(data.user);
      await AsyncStorage.setItem('user', user);
    } catch (error: any) {
      dispatch({
        type: 'userRegisterFailed',
        payload: error.response.data.message,
      });
      console.log(error);
    }
  };

//Login User
export const loginUser =
  (email: string, password: string) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({
        type: 'userLoginRequest',
      });
      const config = {headers: {'Content-Type': 'application/json'}};
      const {data} = await axios.post(
        `${URI}/login`,
        {email, password},
        config,
      );
      dispatch({
        type: 'userLoginSuccess',
        payload: data.user,
      });
    } catch (error: any) {
      dispatch({
        type: 'userLoginFailed',
        payload: error.response.data.message,
      });
      console.log(error);
    }
  };

//Load User
export const loadUser = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({
      type: 'userLoadRequest',
    });
    const jsonValue = await AsyncStorage.getItem('user');
    if (jsonValue !== null) {
      const user = JSON.parse(jsonValue);
      dispatch({
        type: 'userLoadSuccess',
        payload: user,
      });
    }
  } catch (error: any) {
    dispatch({
      type: 'userLoadFailed',
      payload: error.response.data.message,
    });
    console.log(error);
  }
};
