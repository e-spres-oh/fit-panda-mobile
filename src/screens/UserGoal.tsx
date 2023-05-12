import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import Title from '../components/Title';
import Screen from '../components/layout/Screen';
import { Colors } from '../constants';
import { Routes } from '../routes/routes';
import { RouteParams } from '../routes/types';

type RoutePropType = StackNavigationProp<RouteParams, Routes.UserGoal>;

enum Goals {
  LoseWeight = 'lose_weight',
  MaintainWeight = 'maintain_weight',
  GainWeight = 'gain_weight',
}

const UserGoalScreen: React.FC = () => {
  const navigation = useNavigation<RoutePropType>();
  const [goal, setUserGoal] = useState(Goals.LoseWeight);

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.scrollViewContainer} bounces={false}>
        <Title title={'What is your goal?'} />
        <View style={styles.inputFieldsContainer}>
          <Button
            mode="contained"
            style={[
              styles.button,
              Goals.LoseWeight === goal && { backgroundColor: Colors.selectedButton },
            ]}
            labelStyle={{ color: 'black' }}
            onPress={() => {
              setUserGoal(Goals.LoseWeight);
            }}
          >
            Lose weight
          </Button>

          <Button
            mode="contained"
            style={[
              styles.button,
              Goals.MaintainWeight === goal && {
                backgroundColor: Colors.selectedButton,
              },
            ]}
            labelStyle={{ color: 'black' }}
            onPress={() => {
              setUserGoal(Goals.MaintainWeight);
            }}
          >
            Maintain Weight
          </Button>

          <Button
            mode="contained"
            style={[
              styles.button,
              Goals.GainWeight === goal && {
                backgroundColor: Colors.selectedButton,
              },
            ]}
            labelStyle={{ color: 'black' }}
            onPress={() => {
              setUserGoal(Goals.GainWeight);
            }}
          >
            Gain Weight
          </Button>

          <Button
            mode="contained"
            style={styles.nextButton}
            onPress={() => {
              navigation.navigate(Routes.SignUpCongrats);
            }}
          >
            Next
          </Button>
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
  },
  inputFieldsContainer: {
    flex: 3,
  },
  button: {
    backgroundColor: Colors.inputBackground,
    borderWidth: 0,
    justifyContent: 'center',
    marginTop: 10,
  },
  nextButton: {
    marginTop: 40,
  },
});

export default UserGoalScreen;
