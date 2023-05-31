import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { IStore, RootContext } from '../stores/rootStore';
import { Routes } from '../routes/routes';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteParams } from '../routes/types';
import { Colors } from '../constants';
import CardComponent from './CardComponent';
import { Food } from '../stores/rootStore';

type RoutePropType = StackNavigationProp<RouteParams, Routes.Home>;

const DisplayedFoodsComponent: React.FC = () => {
  const rootStore = React.useContext<IStore>(RootContext);
  const [cardData, setCardData] = React.useState<Food[]>([]);

  // get all the foods to display
  React.useEffect(() => {
    const fetchFoods = async () => {
      const date = rootStore.getDate();
      const foods = await rootStore.getFoodsByDate(date);
      setCardData(foods);
    };

    fetchFoods();
  }, []);

  // calculate and store the total kcal consumed
  React.useEffect(() => {
    const calculateTotalKcal = () => {
      const total = cardData.reduce((sum, food) => sum + food.kcal, 0);
      rootStore.setTotalConsumed(total);
    };

    calculateTotalKcal();
  }, [cardData]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {cardData.map((food, index) => (
          <CardComponent key={index} food={food} color={index % 2 === 0 ? Colors.foodButtonGray : Colors.foodButtonGreen}/>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  cardContainer: {
    marginBottom: 10,
  },
});

export default DisplayedFoodsComponent;