import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Screen from '../components/layout/Screen';
import { IStore, RootContext } from '../stores/rootStore';
import { UserProfile } from '../types';
import { Routes } from '../routes/routes';
import { RouteParams } from '../routes/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type RoutePropType = StackNavigationProp<RouteParams, Routes.Welcome>;

const HomeScreen: React.FC = () => {
  const rootStore = React.useContext<IStore>(RootContext);
  const [user, setUser] = React.useState<UserProfile | undefined>();
  const navigation = useNavigation<RoutePropType>();

  React.useEffect(() => {
    rootStore.getUserProfile();
    setUser(rootStore.getUser());
  }, [])

  const onAddFoodPress = () => {
    navigation.navigate(Routes.AddFood)
  }

  return (
    <Screen>
      <View style={styles.container}>
        <Text>{`Welcome ${user ? user.name : ''}\n\n`}</Text>
        <Text>{JSON.stringify(user, null, 2)} </Text>
        <Button mode="contained" style={styles.button} onPress={onAddFoodPress}>
          Login
        </Button>
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
  button: {
    marginVertical: 20,
    width: '100%',
  },
});

export default HomeScreen;
