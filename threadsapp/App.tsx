import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Store from './redux/Store';
import { Provider, useSelector } from 'react-redux';
import RootNavigator from './Navigations';

function App() {
  return (
    <Provider store={Store}>
      <RootNavigator />
    </Provider>
  );
}

export default App;
