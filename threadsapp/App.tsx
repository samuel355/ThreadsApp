import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Main from './Navigations/Main';
import Auth from './Navigations/Auth';
import Store from './redux/Store';
import { Provider } from 'react-redux';

function App() {
  return (
      <Provider store={Store}>
        <AppStack />
      </Provider>
    )
}

const AppStack = () => {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <>
      {isLogin ? (
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
