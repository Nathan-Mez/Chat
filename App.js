import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';

// import the screens
import Start from './components/Start';
import Chat from './components/Chat';
import * as Font from 'expo-font';

import 'react-native-gesture-handler';
// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

/*Create the navigator, Library for screen Navigation
  Regurns Object Naviation and Screen */
const Stack = createStackNavigator();

let customFonts = { 
  'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
  'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
 };

export default class chatApp extends Component {

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
  }

  componentDidMount() {
    this._loadFontsAsync();              //When component is mounted customFonts is loaded using '_loadFontsAsynd()' hook
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Screen1"
        >
          <Stack.Screen
            name="Start"
            component={Start}
          />
          <Stack.Screen
            name="Chat"
            component={Chat}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}  

