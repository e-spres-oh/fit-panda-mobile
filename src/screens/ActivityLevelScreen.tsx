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

type RoutePropType = StackNavigationProp<RouteParams, Routes.ActivityLevel>;

const ActivityLevelScreen: React.FC = () => {
  const navigation = useNavigation<RoutePropType>();
  const [value, setValue] = useState('');
  const [pressedButton, setPressedButton] = useState('low');


  return (
    <Screen>
      <ScrollView bounces={false}>
        <View style={styles.scrollViewContainer}>
          <View style={styles.titleContainer}>
            <Title title={'What is your activity level?'} />
          </View>
          <View style={styles.inputFieldsContainer}>
            <Text style={styles.inputLabel}>
              Little or no activity
            </Text>
            
            <TouchableOpacity style={[styles.activityButton, pressedButton === 'low' && {backgroundColor: Colors.selectedButton}]} onPress={() => setPressedButton('low')}>
              <Text style={styles.activityText}>Low</Text>
            </TouchableOpacity>

            <Text style={styles.inputLabel}>Walking or cycling to work, light chores in spare time</Text>
            
            <TouchableOpacity style={[styles.activityButton, pressedButton === 'moderate' && {backgroundColor: Colors.selectedButton}]} onPress={() => setPressedButton('moderate')}>
              <Text style={styles.activityText}>Moderate</Text>
            </TouchableOpacity>

            <Text style={styles.inputLabel}>Physical activity throughout the day,</Text>
            <Text style={styles.inputLabel}>Active in spare time</Text>
            
            <TouchableOpacity style={[styles.activityButton, pressedButton === 'high' && {backgroundColor: Colors.selectedButton}]} onPress={() => setPressedButton('high')}>
              <Text style={styles.activityText}>High</Text>
            </TouchableOpacity>

            <Text style={styles.inputLabel}>Physical demanding daily activity,</Text>
            <Text style={styles.inputLabel}>Intense activity in spare time</Text>
            
            <TouchableOpacity style={[styles.activityButton, pressedButton === 'very_high' && {backgroundColor: Colors.selectedButton}]} onPress={() => setPressedButton('very_high')}>
              <Text style={styles.activityText}>Very high</Text>
            </TouchableOpacity>

          </View>

          <Button
            mode="contained"
            style={styles.bottomButton}
            onPress={() => {
              navigation.navigate(Routes.Goal);
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

export default ActivityLevelScreen;
