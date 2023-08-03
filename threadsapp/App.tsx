import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Main from './Navigations/Main';
import Auth from './Navigations/Auth';
import Store from './redux/Store';
import { Provider, useSelector } from 'react-redux';
import { loadUser } from './redux/actions/userAction';

function App() {
  return (
      <Provider store={Store}>
        <AppStack />
      </Provider>
    )
}

const AppStack = () => {
  const {isAuthenticated, user} = useSelector((state:any) => state.user)
  useEffect(() => {
    //Store.dispatch(loadUser())
    if(user){
      
    }
  },[])
  return (
    <>
      {isAuthenticated ? (
        <NavigationContainer>
          <Main />
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <Auth />
        </NavigationContainer>
      )}
    </>
  );
};
export default App;
