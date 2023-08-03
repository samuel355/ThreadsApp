import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import LoginScreen from '../src/screens/LoginScreen';
import SignupScreen from '../src/screens/SignupScreen';
import HomeScreen from '../src/screens/HomeScreen';
import Dashboard from '../src/screens/Dashboard';
import Ionicons from 'react-native-vector-icons/Ionicons';

Ionicons.loadFont().catch((error: any) => {
  console.info(error);
});

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        //Hide top Header name
        headerShown: false,
        tabBarActiveTintColor: '#ffc107',
        tabBarInactiveTintColor: 'gray',

        tabBarIcon: ({color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Account') {
            iconName = 'person';
          }
          return <Ionicons name={iconName} size={18} color={color} />;
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Account" component={AccountStackNavigator} />
    </Tab.Navigator>
  );
};

//Account Stacks
const AccountStack = createNativeStackNavigator();
const AccountStackNavigator = () => {
  const {user} = useSelector((state: any) => state.user);
  return (
    <AccountStack.Navigator screenOptions={{headerShown: false}}>
      {user ? (
        <>
          <AccountStack.Screen name="Dashboard" component={Dashboard} />
        </>
      ) : (
        <>
          <AccountStack.Screen name="Login" component={LoginScreen} />
          <AccountStack.Screen name="Signup" component={SignupScreen} />
        </>
      )}
    </AccountStack.Navigator>
  );
};

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home-main" component={HomeTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
