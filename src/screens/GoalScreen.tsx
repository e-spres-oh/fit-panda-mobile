import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Title from '../components/Title';
import Screen from '../components/layout/Screen';
import { Colors } from '../constants';
import { Routes } from '../routes/routes';
import { RouteParams } from '../routes/types';

type RoutePropType = StackNavigationProp<RouteParams, Routes.Allowance>;

const GoalScreen: React.FC = () => {
  const navigation = useNavigation<RoutePropType>();
  const [isLosePressed, setLosePressed] = useState(false);
  const [isMaintainPressed, setMaintainPressed] = useState(false);
  const [isGainPressed, setGainPressed] = useState(false);

  return (
    <Screen>
        <View style={styles.scrollViewContainer}>
          <View style={styles.titleContainer}>
            <Title title={'What is your goal?'} />
          </View>
          <View style={styles.inputFieldsContainer}>
            
            <TouchableOpacity 
                style={[
                    styles.button, 
                    isLosePressed && { backgroundColor: Colors.selectedButton }
                ]} 
                onPress={() => {
                    setLosePressed(true);
                    setMaintainPressed(false);
                    setGainPressed(false);
                }}
            >
            <Text style={[styles.buttonText, isLosePressed && { color: 'black' }]}>Lose Weight</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[
                    styles.button, 
                    isMaintainPressed && { backgroundColor: Colors.selectedButton }
                ]} 
                onPress={() => {
                    setLosePressed(false);
                    setMaintainPressed(true);
                    setGainPressed(false);
                }}
            >
            <Text style={[styles.buttonText, isMaintainPressed && { color: 'black' }]}>Maintain Weight</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[
                    styles.button, 
                    isGainPressed && { backgroundColor: Colors.selectedButton }
                ]} 
                onPress={() => {
                    setLosePressed(false);
                    setMaintainPressed(false);
                    setGainPressed(true);
                }}
            >
            <Text style={[styles.buttonText, isGainPressed && { color: 'black' }]}>Gain Weight</Text>
            </TouchableOpacity>
          </View>

          <Button
            mode="contained"
            style={styles.bottomButton}
            onPress={() => {
              navigation.navigate(Routes.Allowance);
            }}
          >
            Next
          </Button>
        </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
  },
  titleContainer: {
    flex: 0.75,
    marginTop: 40,
  },
  inputFieldsContainer: {
    flex: 4,
  },
  button: {
    backgroundColor: Colors.inputBackground,
    textAlign: 'center',
    justifyContent: 'center',
    height: 48,
    marginBottom: 10,
    marginTop: 5,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'grey'
  },
  bottomButton: {
    bottom: 300,
    width: '100%',
    marginVertical: 20,
  },
});

export default GoalScreen;
