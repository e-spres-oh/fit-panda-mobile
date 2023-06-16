import React, { useRef, useState } from 'react';
import { View, Image, Text, StyleSheet, PanResponder, Animated, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Food, Photo } from '../types';
import { BASE_URL, endpoints } from '../endpoints';
import { useUserStore } from '../hooks/useUserStore';
import { useFoodStore } from '../hooks/useFoodsStore';
import { BottomSheet } from "react-native-btr";
import { IconButton } from 'react-native-paper';

interface CardProps {
  food: Food;
  color: string;
  ScrollSetter: React.Dispatch<React.SetStateAction<Boolean>>;
}

const CardComponent: React.FC<CardProps> = ({ food, color, ScrollSetter }) => {
  const { authToken } = useUserStore();
  const { deleteFood, getFoods } = useFoodStore();
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState<boolean>(false);

  const panX = useRef(new Animated.Value(0)).current;
  const panResponder = PanResponder.create({

    onStartShouldSetPanResponder: () => true,

    onPanResponderMove: (_, gestureState) => {
      if (gestureState.dx < 0 && gestureState.dx > -79) {
        panX.setValue(gestureState.dx);
        ScrollSetter(true);
      }
    },

    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dx <= -79) {
        Animated.spring(panX, {
          toValue: -79,
          useNativeDriver: true,
        }).start();
      }
      else {
        if (gestureState.dx > 0) {
          Animated.spring(panX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        } else {
          toggleBottomSheet();
        }
      }
      ScrollSetter(false);
    },

  });

  const animatedStyles = {
    transform: [{ translateX: panX }],
  };

  const deleteHandle = (foodId: number) => {
    deleteFood(foodId);
    getFoods().catch((e) => console.log(e));
  };

  const toggleBottomSheet = () => {
    setIsBottomSheetVisible(!isBottomSheetVisible);
  };

  return (
    <View style={[styles.card]}>

      <Animated.View
        style={[styles.swipeableItem, animatedStyles, { backgroundColor: color }]} {...panResponder.panHandlers}>

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

      </Animated.View>

      {/* Delete button */}

      <TouchableOpacity style={styles.deleteButton} onPress={() => { deleteHandle(food.id) }}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>


      <BottomSheet
        visible={isBottomSheetVisible}
        onBackButtonPress={toggleBottomSheet}
        onBackdropPress={toggleBottomSheet}
      >

        <View style={styles.bottomSheetView}>

          {/* Header */}
          <View style={styles.BottomSheetHeader}>
            <IconButton
              icon="close"
              size={30}
              style={styles.BottomSheetCloseIcon}
              onPress={toggleBottomSheet}
            />
            <Text
              style={styles.BottomSheetHeaderText}
            >
              {food.name}
            </Text>
          </View>

          {/* Content */}
          <View style={{ position: 'relative', width: '100%', height: 213, justifyContent: 'center', alignItems: 'center' }}>
            {food.photoId && (
              <Image
                source={{
                  uri: `${BASE_URL}${endpoints.Foods}/${food.id}/photo`,
                  method: 'GET',
                  headers: {
                    Authorization: `Bearer ${authToken}`,
                  },
                }}
                style={styles.BottomSheetImage}
              />
            )}
          </View>

          {/* bottom */}
          <View style={styles.BottomSheetFooter}>

            <View style={{ flexDirection: 'row', gap: 5 }}>
              <Text style={{ fontSize: 18 }}>{food.kcal}</Text>
              <Text style={{ color: '#666B78', fontSize: 18 }}>Kcal</Text>
            </View>

            <IconButton
              icon="delete"
              size={24}
              iconColor={'red'}
              onPress={() => deleteHandle(food.id)}
            />
          </View>

        </View>
      </BottomSheet>

    </View >
  );
};

const styles = StyleSheet.create({
  card: {
    height: 70,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#FF453A',
  },
  swipeableItem: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    padding: 10,
    borderRadius: 10,
    left: 0,
    top: 0,
    zIndex: 1,
  },
  deleteButton: {
    height: '100%',
    width: 79,
    justifyContent: 'center',
    alignItems: 'center'
  },
  deleteButtonText: {
    color: '#fff'
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
  bottomSheetView: {
    backgroundColor: "#fff",
    width: "100%",
    height: 350,
  },
  BottomSheetHeader: {
    position: 'relative',
    flexDirection: "row",
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#3C3C43',
    borderStyle: 'solid',
    marginBottom: 5,
  },
  BottomSheetHeaderText: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    fontSize: 20,
    zIndex: -1,
  },
  BottomSheetCloseIcon: {
    // marginRight: 130,
  },
  BottomSheetImage: {
    width: '100%',
    maxHeight: '100%',
    aspectRatio: 1 / 1,
  },
  BottomSheetFooter: {
    marginTop: 5,
    borderTopWidth: 1,
    borderTopColor: '#D9D9D9',
    borderStyle: 'solid',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    alignItems: 'center',
  }
});

export default CardComponent;
