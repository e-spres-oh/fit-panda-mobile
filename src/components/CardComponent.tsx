import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Food, Photo } from '../types';
import { BASE_URL, endpoints } from '../endpoints';
import { useUserStore } from '../hooks/useUserStore';

interface CardProps {
  food: Food;
  color: string;
}

const CardComponent: React.FC<CardProps> = ({ food, color }) => {
  const { authToken } = useUserStore();
  return (
    <View style={[styles.card, { backgroundColor: color }]}>
      {food.photoId && (
        <Image
          source={{
            uri: `${BASE_URL}${endpoints.Foods}/${food.id}/photo`,
            method: 'GET',
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }}
          style={styles.image}
        />
      )}
      <View style={styles.textContainer}>
        <Text style={styles.foodName}>{food.name}</Text>
        <Text style={styles.kcal}>{food.kcal + ' kcal'}</Text>
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
    padding: 10,
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
    marginLeft: 10,
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
