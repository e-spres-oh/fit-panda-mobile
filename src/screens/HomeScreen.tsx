import React, { useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import Screen from '../components/layout/Screen';
import TopRowHome from '../components/TopRowComponent';
import BottomRowHome from '../components/BottomRowComponent';
import DateRowHome from '../components/DateRowComponent';
import TargetFoodComponent from '../components/TargetFoodComponent';
import DisplayedFoodsComponent from '../components/DisplayedFoodsComponent';
import { useUserStore } from '../hooks/useUserStore';
import { useFoodStore } from '../hooks/useFoodsStore';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteParams } from '../routes/types';
import { Routes } from '../routes/routes';

type RoutePropType = StackNavigationProp<RouteParams, Routes.Home>;

const HomeScreen: React.FC = () => {
  const { getUserProfile, logout } = useUserStore();
  const { selectedDate, getFoods } = useFoodStore();
  const navigation = useNavigation<RoutePropType>();

  useEffect(() => {
    getUserProfile().catch((e) => console.log(e));
  }, []);

  useFocusEffect(
    useCallback(() => {
      getFoods().catch((e) => console.log(e));
    }, [selectedDate])
  );

  const onLogout = () => {
    logout();
    navigation.navigate(Routes.Welcome);
  };

  return (
    <Screen>
      <View style={styles.container}>
        <TopRowHome onLogout={onLogout} />
        <DateRowHome />
        <TargetFoodComponent />
        <Text style={styles.textFoods}>Foods for today</Text>
        <View style={styles.displayedFoods}>
          <DisplayedFoodsComponent />
        </View>
        <BottomRowHome />
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
  },
});

export default HomeScreen;
