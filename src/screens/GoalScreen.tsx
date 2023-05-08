import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, SegmentedButtons, Text, TextInput } from 'react-native-paper';

import Subtitle from '../components/Subtitle';
import Title from '../components/Title';
import Screen from '../components/layout/Screen';
import { Colors } from '../constants';
import { Routes } from '../routes/routes';
import { RouteParams } from '../routes/types';

type RoutePropType = StackNavigationProp<RouteParams, Routes.Goal>;

const GoalScreen: React.FC = () => {
  const navigation = useNavigation<RoutePropType>();
  const [value, setValue] = useState('');
  const [pressedButton, setPressedButton] = useState('lose');


  return (
    <Screen>
      <ScrollView bounces={false}>
        <View style={styles.scrollViewContainer}>
          <View style={styles.titleContainer}>
            <Title title={'What is your activity level?'} />
          </View>
          <View style={styles.inputFieldsContainer}>
            <TouchableOpacity style={[styles.activityButton, pressedButton === 'lose' && {backgroundColor: Colors.selectedButton}]} onPress={() => setPressedButton('lose')}>
              <Text style={styles.activityText}>Lose Weight</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.activityButton, pressedButton === 'maintain' && {backgroundColor: Colors.selectedButton}]} onPress={() => setPressedButton('maintain')}>
              <Text style={styles.activityText}>Maintain Weight</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.activityButton, pressedButton === 'gain' && {backgroundColor: Colors.selectedButton}]} onPress={() => setPressedButton('gain')}>
              <Text style={styles.activityText}>Gain Weight</Text>
            </TouchableOpacity>
          </View>

          <Button
            mode="contained"
            style={styles.bottomButton}
            onPress={() => {
              navigation.navigate(Routes.Results);
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
  activityButton: {
    backgroundColor: Colors.inputBackground,
    textAlign: 'center',
    justifyContent: 'center',
    height: 48,
    marginBottom: 20,
    marginTop: 5,
    borderRadius: 10,
  },
  activityText: {
    fontSize: 18,
    textAlign: 'center',
  },
  bottomButton: {
    bottom: 0,
    width: '100%',
    marginVertical: 20,
  },
});

export default GoalScreen;
