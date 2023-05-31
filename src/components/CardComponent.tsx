import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Photo } from '../types';
import { Food } from '../stores/rootStore';

interface CardProps {
  food: Food;
  color: string;
}

const CardComponent: React.FC<CardProps> = ({ food, color }) => {
  return (
    <View style={[styles.card, { backgroundColor: color }]}>
      <Image source={{ uri: food.photo?.uri }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.foodName}>{food.foodName}</Text>
        <Text style={styles.kcal}>{food.kcal + " kcal"}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 70,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  foodName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  kcal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginRight: 10,
  },
});

export default CardComponent;