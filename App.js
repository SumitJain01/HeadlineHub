import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '@src/screens/HomeScreen';
import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const Stack = createStackNavigator();
const splashScreenTime = 500;

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, splashScreenTime);
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
