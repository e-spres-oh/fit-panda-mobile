import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import Screen from '../components/layout/Screen';
import { Colors } from '../constants';
import { Routes } from '../routes/routes';
import { RouteParams } from '../routes/types';

type RoutePropType = StackNavigationProp<RouteParams, Routes.YourProfile>;

const YourProfileScreen: React.FC = () => {
  const navigation = useNavigation<RoutePropType>();
  return (
    <View style={styles.container}>
      <Text>Your info here one day</Text>
    </View>
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
    backgroundColor: Colors.background,
  },
  buttonsContainer: {
    width: '100%',
    marginBottom: 20,
  },
  logo: {
    width: '90%',
  },
});

export default YourProfileScreen;
