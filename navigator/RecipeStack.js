import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

const settingScreenNavigator = createStackNavigator({
   
})

const App = createAppContainer(settingScreenNavigator);
export default App;