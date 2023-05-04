import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import {
  DefaultTheme,
  MD3LightTheme,
  MD3Theme,
  Provider as PaperProvider,
} from 'react-native-paper';
import WelcomeScreen from './src/screens/WelcomeScreen';
import React from 'react';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RouteParams } from './src/routes/types';
import { Routes } from './src/routes/routes';

const colors = {
  primary: '#5589f8',
  background: '#edf1f5',
};

const theme: MD3Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...colors,
    surfaceVariant: '#fff',
    secondaryContainer: '#fff',
  },
  roundness: 1,
};

const Stack = createNativeStackNavigator<RouteParams>();

export default function App() {
  return (
    <>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={Routes.Welcome}>
            <Stack.Screen
              name={Routes.Welcome}
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={Routes.Login}
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={Routes.Signup}
              component={SignupScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={Routes.Onboarding}
              component={OnboardingScreen}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </>
  );
}