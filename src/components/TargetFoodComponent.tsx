import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Colors } from '../constants';
import { useUserStore } from '../hooks/useUserStore';
import { useFoodStore } from '../hooks/useFoodsStore';

const TargetFoodComponent: React.FC = () => {
  const { user } = useUserStore();
  const { totalConsumed } = useFoodStore();
  const userConsumedKcal = totalConsumed();

  const target = user?.target ?? 0;
  const remaining = userConsumedKcal - target;

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <Text style={styles.text}>Target</Text>
        <Text style={styles.text}>{target} kcal</Text>
      </View>

      <View style={styles.column}>
        <Text style={styles.text}>Food</Text>
        <Text style={styles.text}>{userConsumedKcal} kcal</Text>
      </View>

      <View style={styles.column}>
        <Text style={[styles.text, remaining > 0 && { color: Colors.error }]}>
          {remaining > 0 ? 'Overeating' : 'Remaining'}
        </Text>
        <Text style={[styles.text, remaining > 0 && { color: Colors.error }]}>
          {Math.abs(remaining)} kcal
        </Text>
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
  },
});

export default TargetFoodComponent;
