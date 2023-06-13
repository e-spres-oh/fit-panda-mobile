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
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen: React.FC = () => {
  const { getUserProfile } = useUserStore();
  const { selectedDate, getFoods } = useFoodStore();

  useEffect(() => {
    getUserProfile().catch((e) => console.log(e));
  }, []);

  useFocusEffect(
    useCallback(() => {
      getFoods().catch((e) => console.log(e));
    }, [selectedDate])
  );

  return (
    <Screen>
      <View style={styles.container}>
        <TopRowHome />
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
