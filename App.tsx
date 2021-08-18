/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { StatusBar, View } from 'react-native';
import { RootStack } from './src/routes/RootStack';


const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <RootStack />
      <StatusBar barStyle={'light-content'} />
    </View>
  )
};



export default App;
