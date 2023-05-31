import React from 'react';
import { Platform, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { IStore, RootContext } from '../stores/rootStore';
import { Routes } from '../routes/routes';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteParams } from '../routes/types';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../constants';
import RNDateTimePicker from "@react-native-community/datetimepicker";

type RoutePropType = StackNavigationProp<RouteParams, Routes.Home>;

const TargetFoodComponent: React.FC = () => {
  const rootStore = React.useContext<IStore>(RootContext);
  const user = rootStore.getUser();
  const target = user.target;
  const [food, setFood] = React.useState<number>(rootStore.getTotalConsumed());
  const [remaining, setRemaining] = React.useState<number>(target - food);

  React.useEffect(() => {
    const updateValues = () => {
      const totalFood = rootStore.getTotalConsumed();
      setFood(totalFood);
      setRemaining(target - totalFood);
    };

    updateValues();
  }, [rootStore, target]);

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <Text style={styles.text}>Target</Text>
        <Text style={styles.text}>{target} kcal</Text>
      </View>

      <View style={styles.column}>
        <Text style={styles.text}>Food</Text>
        <Text style={styles.text}>{food} kcal</Text>
      </View>

      <View style={styles.column}>
        <Text style={styles.text}>Remaining</Text>
        <Text style={styles.text}>{remaining} kcal</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '20%',
    backgroundColor: Colors.blueButtonMain,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: '5%',
  },
  text: {
    fontSize: 16,
    color: 'white',
  }
});

export default TargetFoodComponent;