import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, FlatList, Text } from 'react-native';
import { Colors } from '../constants';
import CardComponent from './CardComponent';
import { useFoodStore } from '../hooks/useFoodsStore';

const DisplayedFoodsComponent: React.FC = () => {
  const { foods } = useFoodStore();
  const [isScrollDisabled, setIsScrollDisasbled] = useState<Boolean>(false);

  return (
    <View style={styles.container}>
      <FlatList
        data={foods}
        ListEmptyComponent={() => <Text>No foods to display</Text>}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListFooterComponent={() => <View style={{ height: 10 }} />}
        scrollEnabled={!isScrollDisabled}
        renderItem={({ item, index }) => (
          <CardComponent
            ScrollSetter={setIsScrollDisasbled}
            key={index}
            food={item}
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
