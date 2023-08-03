import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Main from './Navigations/Main';
import Auth from './Navigations/Auth';
import Store from './redux/Store';
import { Provider, useSelector } from 'react-redux';

function App() {
  return (
      <Provider store={Store}>
        <AppStack />
      </Provider>
    )
}

const AppStack = () => {
  const {isAuthenticated} = useSelector((state:any) => state.user)
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
