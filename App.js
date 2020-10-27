import { StatusBar } from 'expo-status-bar';
import React from 'react';
import SignupLoginScreen from './screens/SignupLoginScreen';
import { AppTabNavigator } from './components/AppTabNavigator';
import { createAppContainer, createSwitchNavigator,} from 'react-navigation';

export default function App() {
  return (
    <AppContainer />
  );
}

const switchNavigator = createSwitchNavigator({
  SignupLoginScreen:{screen: SignupLoginScreen},
  BottomTab:{screen: AppTabNavigator}
})

const AppContainer =  createAppContainer(switchNavigator);