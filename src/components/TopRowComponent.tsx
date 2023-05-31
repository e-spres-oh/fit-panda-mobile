import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { IStore, RootContext } from '../stores/rootStore';
import { Routes } from '../routes/routes';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteParams } from '../routes/types';

type RoutePropType = StackNavigationProp<RouteParams, Routes.Home>;

const TopRowComponent: React.FC = () => {
  const rootStore = React.useContext<IStore>(RootContext);
  const user = rootStore.getUser();

  return (
    <View style={styles.topRow}>
      <Text style={styles.greetingText}>{`Salut, ${user.name}`}</Text>
      <IconButton icon="dots-vertical" size={20} style={{marginHorizontal: 0}} onPress={() => {}}/>
    </View>
  );
};

const styles = StyleSheet.create({
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: '3%',
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default TopRowComponent;