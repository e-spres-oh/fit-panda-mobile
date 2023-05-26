import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import Title from '../components/Title';
import Screen from '../components/layout/Screen';
import { Colors } from '../constants';
import { Routes } from '../routes/routes';
import { RouteParams } from '../routes/types';
import { UserGoal } from '../types';
import { IStore, RootContext } from '../stores/rootStore';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RoutePropType = StackNavigationProp<RouteParams, Routes.Home>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<RoutePropType>();
  const rootStore = React.useContext<IStore>(RootContext);
  const user = rootStore.getUser();

  const onAddFoodPressed = () => {
    navigation.navigate(Routes.AddFood);
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Text>{`Welcome ${user.name}\n\n`}</Text>
        <Text>{JSON.stringify(user, null, 2)} </Text>

        <TouchableOpacity style={styles.bottomActionButton} onPress={onAddFoodPressed}>
          <IconButton icon="pizza" size={20} />
          <Text style={styles.bottomActionButtonContent}>Add food</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
  },
  logo: {
    width: '20%',
  },
  bottomActionButton: {
    backgroundColor: Colors.blueButtonMain,
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 10,
  },
  bottomActionButtonContent: {
    color: 'white',
    fontSize: 16,
    marginRight: 10,
  }
});

export default HomeScreen;