import 'react-native-gesture-handler';
import React, { useEffect, useRef, useState } from 'react';
import type { Node } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './Screen/SplashScreen.js';
import LoginScreen from './Screen/LoginScreen.js';
import RegisterScreen from './Screen/RegisterScreen.js';
import Navigator from './Navigator.js';

const Stack = createNativeStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          title: 'Login',
          headerShown: false,
          animation: 'none',
          orientation: 'portrait_up',
        }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: 'Register',
          headerShown: false,
          animation: 'none',
          orientation: 'portrait_up',
        }}
      />
    </Stack.Navigator>
  );
};

const App: () => Node = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Navigator"
          component={Navigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
