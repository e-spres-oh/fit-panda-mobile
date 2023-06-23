import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, FlatList, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../constants';
import CardComponent from './CardComponent';
import { useFoodStore } from '../hooks/useFoodsStore';

const DisplayedFoodsComponent: React.FC = () => {
  const { foods } = useFoodStore();
  const [isFlatListScrolling, setIsFlatListScrolling] = useState(false);

  const handleScrollBegin = () => {
    setIsFlatListScrolling(true);
  };
  const handleScrollEnd = () => {
    setIsFlatListScrolling(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={foods}
        scrollEnabled={true}
        onScrollBeginDrag={handleScrollBegin}
        onScrollEndDrag={handleScrollEnd}
        bounces={true}
        ListEmptyComponent={() => <Text>No foods to display</Text>}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListFooterComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item, index }) => (
          <CardComponent
            key={index}
            food={item}
            parentScrolling={isFlatListScrolling}
            color={index % 2 === 0 ? Colors.foodButtonGray : Colors.foodButtonGreen}
          />
        )}
      />
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
