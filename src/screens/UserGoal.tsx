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
import { MyContext } from "../store/myStore";

type RoutePropType = StackNavigationProp<RouteParams, Routes.UserGoal>;

enum Goals {
  LoseWeight = 'LOSE_WEIGHT',
  MaintainWeight = 'MAINTAIN_WEIGHT',
  GainWeight = 'GAIN_WEIGHT',
}

const UserGoalScreen: React.FC = () => {
  const navigation = useNavigation<RoutePropType>();
  const [goal, setUserGoal] = useState(Goals.LoseWeight);

  const myStore = React.useContext(MyContext);

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

              if (myStore.userProfile !== null) {
                myStore.userProfile.goal = goal;
                navigation.navigate(Routes.SignUpCongrats);
              }
              else {
                // some error occurred

                //deleting saved data (store)
                myStore.reset();

                //navigate to first Sign screen to
                navigation.navigate(Routes.SignUp);
              }
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
