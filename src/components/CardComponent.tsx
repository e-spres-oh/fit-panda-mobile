import React, { useRef } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  PanResponder,
  Animated,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';
import { Food } from '../types';
import { BASE_URL, endpoints } from '../endpoints';
import { useUserStore } from '../hooks/useUserStore';
import { Button } from 'react-native-paper';
import { Colors } from '../constants';
import { useFoodStore } from '../hooks/useFoodsStore';

interface CardProps {
  food: Food;
  color: string;
}

const CardComponent: React.FC<CardProps> = ({ food, color }) => {
  const { authToken } = useUserStore();
  const { deleteFood, deletePhoto, getFoods } = useFoodStore();

  const pan = useRef(new Animated.Value(0)).current;
  const oldPan = useRef(0);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
        pan.setValue(gestureState.dx + oldPan.current);
      },
      onPanResponderRelease: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
        console.log(gestureState);
        if (gestureState.dx + oldPan.current < -50) {
          Animated.spring(pan, {
            toValue: -80,
            useNativeDriver: true,
          }).start(() => {
            pan.setValue(-80);
            oldPan.current = -80;
          });
        } else {
          Animated.spring(pan, {
            toValue: 0,
            useNativeDriver: true,
          }).start(() => {
            pan.setValue(0);
            oldPan.current = 0;
          });
        }
      },
    })
  ).current;

  const onDeleteFood = async () => {
    if (food.photoId) {
      await deletePhoto(food.id);
    }
    await deleteFood(food.id);
    await getFoods();
  };

  return (
    <View>
      <Animated.View
        style={[
          {
            transform: [{ translateX: pan }],
          },
          { zIndex: 1000 },
        ]}
        {...panResponder.panHandlers}
      >
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
      </Animated.View>
      <Button
        onPress={onDeleteFood}
        mode="contained"
        buttonColor={Colors.deleteFoodButton}
        contentStyle={{ height: '100%' }}
        style={styles.button}
      >
        Delete
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: '100%',
    zIndex: 100,
    borderRadius: 10,
  },
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
