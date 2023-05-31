import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import Screen from '../components/layout/Screen';
import { IStore, RootContext } from '../stores/rootStore';
import { Routes } from '../routes/routes';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteParams } from '../routes/types';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../constants';
import BottomRowHome from '../components/BottomRowComponent';
import TopRowHome from '../components/TopRowComponent';
import DateRowHome from '../components/DateRowComponent';
import TargetFoodComponent from '../components/TargetFoodComponent';
import DisplayedFoodsComponent from '../components/DisplayedFoodsComponent';

type RoutePropType = StackNavigationProp<RouteParams, Routes.Home>;

const HomeScreen: React.FC = () => {
  const rootStore = React.useContext<IStore>(RootContext);
  const navigation = useNavigation<RoutePropType>();

  return (
    <Screen>
      <View style={styles.container}>
        <TopRowHome/>
        <DateRowHome/>
        <TargetFoodComponent/>
        <Text style={styles.textFoods}>Foods for today</Text>
        <View style={styles.displayedFoods}>
          <DisplayedFoodsComponent/>
        </View>
        <BottomRowHome/>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
  },
  displayedFoods: {
    height: '50%',
  },
  textFoods: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: '3%',
  }
});

export default HomeScreen;
