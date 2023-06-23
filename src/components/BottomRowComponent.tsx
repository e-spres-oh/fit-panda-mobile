import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, IconButton, Button, FAB } from 'react-native-paper';
import { Routes } from '../routes/routes';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteParams } from '../routes/types';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../constants';

type RoutePropType = StackNavigationProp<RouteParams, Routes.Home>;

const BottomRowComponent: React.FC = () => {
  const navigation = useNavigation<RoutePropType>();

  return (
    <FAB
      icon="plus"
      style={styles.button}
      color="white"
      onPress={() => navigation.navigate(Routes.AddFoodBarcode)}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 0,
    right: 16,
    backgroundColor: Colors.blueButtonMain,
    borderRadius: 50,
  },
});

export default BottomRowComponent;
