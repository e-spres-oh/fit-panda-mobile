import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { DefaultTheme, MD3Theme, Provider as PaperProvider } from 'react-native-paper';
import { Routes } from './src/routes/routes';
import { RouteParams } from './src/routes/types';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import UserInfoScreen from './src/screens/UserInfoScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import ActivityScreen from './src/screens/ActivityScreen';
import GoalScreen from './src/screens/GoalScreen';
import CongratulationsScreen from './src/screens/CongratulationsScreen';
import HomeScreen from './src/screens/HomeScreen';

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
          <Stack.Navigator initialRouteName={Routes.UserInfo}>
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
              name={Routes.SignUp}
              component={SignUpScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={Routes.UserInfo}
              component={UserInfoScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={Routes.Activity}
              component={ActivityScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={Routes.Goal}
              component={GoalScreen}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name={Routes.Congratulations}
              component={CongratulationsScreen}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name={Routes.Home}
              component={HomeScreen}
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
