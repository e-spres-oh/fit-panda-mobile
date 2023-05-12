import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <Text>{'\n'} {'\n'} {'\n'} {'\n'}   Homescreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
});
export default HomeScreen;
