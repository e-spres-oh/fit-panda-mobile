import React from 'react';
import { SafeAreaView, StyleSheet, Image, View } from 'react-native';
import { Button } from 'react-native-paper';
// import { Colors } from '../constants';
// import { RouteProp, useNavigation } from '@react-navigation/native';
import { RouteParams } from '../routes/types';
import { Routes } from '../routes/routes';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type RoutePropType = StackNavigationProp<RouteParams, Routes.Welcome>;

const WelcomeScreen: React.FC = () => {
    const navigation = useNavigation<RoutePropType>();
  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
      <View style={styles.buttonsContainer}>
        <Button style={styles.button} mode="contained"
          onPress={() => {
            navigation.navigate(Routes.Register);
          }}>
          Sign up for free
        </Button>
        <Button
          style={styles.button}
          mode="outlined"
          textColor="#000"
          onPress={() => {
            navigation.navigate(Routes.Login);
          }}
        >
          Login
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
  },
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '100%',
    width: '100%',
   // backgroundColor: Colors.background,
  },
  buttonsContainer: {
    width: '80%',
    marginBottom: 20,
  },
  logo: {
    width: '90%',
  },
});

export default WelcomeScreen;