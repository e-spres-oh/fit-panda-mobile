import React from 'react';
import { StyleSheet, View, ScrollView, FlatList, Text } from 'react-native';
import { Colors } from '../constants';
import CardComponent from './CardComponent';
import { useFoodStore } from '../hooks/useFoodsStore';

const DisplayedFoodsComponent: React.FC = () => {
  const { foods } = useFoodStore();

  return (
    <View style={styles.container}>
      <FlatList
        data={foods}
        scrollEnabled={true}
        bounces={true}
        ListEmptyComponent={() => <Text>No foods to display</Text>}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListFooterComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item, index }) => (
          <CardComponent
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
