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

type RoutePropType = StackNavigationProp<RouteParams, Routes.UserActivityLevel>;

enum ActivityLevel {
  Low = 'low',
  Moderate = 'moderate',
  High = 'high',
  VeryHigh = 'very_high',
}

const UserActivityLevelScreen: React.FC = () => {
  const navigation = useNavigation<RoutePropType>();
  const [activityLevel, setActivityLevel] = useState(ActivityLevel.Low);

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.scrollViewContainer} bounces={false}>
        <View style={styles.titleContainer}>
          <Title title={'What is your activity level?'} />
        </View>
        <View style={styles.inputFieldsContainer}>
          <Text style={styles.inputLabel}>Little or no activity</Text>
          <Button
            mode="contained"
            style={[
              styles.button,
              ActivityLevel.Low === activityLevel && { backgroundColor: Colors.selectedButton },
            ]}
            labelStyle={{ color: 'black' }}
            onPress={() => {
              setActivityLevel(ActivityLevel.Low);
            }}
          >
            Low
          </Button>
          <Text style={styles.inputLabel}>
            Walking or cycling to work, light chores in spare time
          </Text>
          <Button
            mode="contained"
            style={[
              styles.button,
              ActivityLevel.Moderate === activityLevel && {
                backgroundColor: Colors.selectedButton,
              },
            ]}
            labelStyle={{ color: 'black' }}
            onPress={() => {
              setActivityLevel(ActivityLevel.Moderate);
            }}
          >
            Moderate
          </Button>
          <Text style={styles.inputLabel}>
            Physical activity throughout the day. Active in spare time
          </Text>
          <Button
            mode="contained"
            style={[
              styles.button,
              ActivityLevel.High === activityLevel && { backgroundColor: Colors.selectedButton },
            ]}
            labelStyle={{ color: 'black' }}
            onPress={() => {
              setActivityLevel(ActivityLevel.High);
            }}
          >
            High
          </Button>
          <Text style={styles.inputLabel}>
            Physically demanding daily activity, Intense activity in spare time
          </Text>
          <Button
            mode="contained"
            style={[
              styles.button,
              ActivityLevel.VeryHigh === activityLevel && {
                backgroundColor: Colors.selectedButton,
              },
            ]}
            labelStyle={{ color: 'black' }}
            onPress={() => {
              setActivityLevel(ActivityLevel.VeryHigh);
            }}
          >
            Very high
          </Button>

          <Button
            mode="contained"
            style={styles.nextButton}
            onPress={() => {
              navigation.navigate(Routes.UserGoal);
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
  titleContainer: {
    flex: 1,
  },
  subtitle: {
    marginTop: 10,
    marginHorizontal: 70,
  },
  inputFieldsContainer: {
    flex: 4,
  },
  inputLabel: {
    fontSize: 15,
    marginHorizontal: 50,
    textAlign: 'center',
    color: Colors.textLabel,
  },
  selectable: {
    height: 48,
    marginBottom: 20,
    marginTop: 10,
  },
  input: {
    textAlign: 'center',
    height: 48,
    marginBottom: 20,
    marginTop: 5,
  },
  button: {
    backgroundColor: Colors.inputBackground,
    borderWidth: 0,
    justifyContent: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  nextButton: {
    marginTop: 40,
  },
});

export default UserActivityLevelScreen;
