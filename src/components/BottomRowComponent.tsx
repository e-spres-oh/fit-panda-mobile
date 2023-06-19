import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { Routes } from '../routes/routes';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteParams } from '../routes/types';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../constants';

type RoutePropType = StackNavigationProp<RouteParams, Routes.Home>;

const BottomRowComponent: React.FC = () => {
  const navigation = useNavigation<RoutePropType>();

  return (
    <View style={styles.bottomRow}>
          <TouchableOpacity style={[styles.bottomActionButton, {backgroundColor: Colors.blueButtonMain}]} onPress={() => navigation.navigate(Routes.AddFood)}>
            <IconButton icon="pizza" size={20} iconColor='white' style={{marginHorizontal: 0}}/>
            <Text style={styles.bottomActionButtonContent}>Add food</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.bottomActionButton, {backgroundColor: Colors.barcodeButton}]} onPress={() => {navigation.navigate(Routes.CodeScanner)}}>
            <IconButton icon="barcode" size={20} iconColor='white' style={{marginHorizontal: 0}}/>
            <Text style={styles.bottomActionButtonContent}>Scan barcode</Text>
          </TouchableOpacity>
        </View>
  );
};

const styles = StyleSheet.create({
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomActionButton: {
    width: '47%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 10,
  },
  bottomActionButtonContent: {
    color: 'white',
    fontSize: 16,
    marginRight: 10,
  }
});

export default BottomRowComponent;