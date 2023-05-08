import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { createContext, useState, useContext } from 'react';
import { DefaultTheme, MD3Theme, Provider as PaperProvider } from 'react-native-paper';
import { Routes } from './src/routes/routes';
import { RouteParams } from './src/routes/types';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import UserInfoScreen from './src/screens/UserInfoScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import ActivityLevelScreen from './src/screens/ActivityLevelScreen';
import GoalScreen from './src/screens/GoalScreen';
import ResultScreen from './src/screens/ResultScreen';
import HomeScreen from './src/screens/HomeScreen';
import { AppContextProvider } from './src/components/AppContextProvider';
import { AppContext } from './src/components/AppContextProvider';

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
  const { useHomeRoute } = useContext(AppContext);
  const initialRouteName = useHomeRoute ? Routes.Home : Routes.Welcome;

  return (
    <>
      <AppContextProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName={initialRouteName}>
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
                name={Routes.ActivityLevel}
                component={ActivityLevelScreen}
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
                name={Routes.Results}
                component={ResultScreen}
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
      </AppContextProvider>
    </>
  );
}