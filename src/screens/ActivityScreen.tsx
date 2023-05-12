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

type RoutePropType = StackNavigationProp<RouteParams, Routes.Goal>;

const ActivityScreen: React.FC = () => {
  const navigation = useNavigation<RoutePropType>();
  const [isLowPressed, setIsLowPressed] = useState(false);
  const [isModeratePressed, setIsModeratePressed] = useState(false);
  const [isHighPressed, setIsHighPressed] = useState(false);
  const [isVeryHighPressed, setIsVeryHighPressed] = useState(false);

  return (
    <Screen>
        <View style={styles.scrollViewContainer}>
          <View style={styles.titleContainer}>
            <Title title={'What is your activity level?'} />
          </View>
          <View style={styles.inputFieldsContainer}>
            <Text style={styles.buttonLabel}>
                Little or no activity
            </Text>
            <TouchableOpacity 
                style={[
                    styles.button, 
                    isLowPressed && { backgroundColor: Colors.selectedButton }
                ]} 
                onPress={() => {
                    setIsLowPressed(true);
                    setIsModeratePressed(false);
                    setIsHighPressed(false);
                    setIsVeryHighPressed(false);
                }}
            >
            <Text style={[styles.buttonText, isLowPressed && { color: 'black' }]}>Low</Text>
            </TouchableOpacity>

            <Text style={styles.buttonLabel}>
                Walking or cycling to work, light chores in spare time
            </Text>
            <TouchableOpacity 
                style={[
                    styles.button, 
                    isModeratePressed && { backgroundColor: Colors.selectedButton }
                ]} 
                onPress={() => {
                    setIsLowPressed(false);
                    setIsModeratePressed(true);
                    setIsHighPressed(false);
                    setIsVeryHighPressed(false);
                }}
            >
            <Text style={[styles.buttonText, isModeratePressed && { color: 'black' }]}>Moderate</Text>
            </TouchableOpacity>

            <Text style={styles.buttonLabel}>
                Physical activity throughout the day. Active in spare time
            </Text>
            <TouchableOpacity 
                style={[
                    styles.button, 
                    isHighPressed && { backgroundColor: Colors.selectedButton }
                ]} 
                onPress={() => {
                    setIsLowPressed(false);
                    setIsModeratePressed(false);
                    setIsHighPressed(true);
                    setIsVeryHighPressed(false);
                }}
            >
             <Text style={[styles.buttonText, isHighPressed && { color: 'black' }]}>High</Text>
            </TouchableOpacity>

            <Text style={styles.buttonLabel}>
                Physically demanding daily activity, Intense activity in spare time
            </Text>
            <TouchableOpacity 
                style={[
                    styles.button, 
                    isVeryHighPressed && { backgroundColor: Colors.selectedButton }
                ]} 
                onPress={() => {
                    setIsLowPressed(false);
                    setIsModeratePressed(false);
                    setIsHighPressed(false);
                    setIsVeryHighPressed(true);
                }}
            >
             <Text style={[styles.buttonText, isVeryHighPressed && { color: 'black' }]}>Very high</Text>
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
    marginBottom: 20,
    marginTop: 5,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'grey'
  },
  buttonLabel: {
    fontSize: 15,
    marginHorizontal: 50,
    marginTop: 15,
    textAlign: 'center',
    color: Colors.textLabel,
  },
  bottomButton: {
    bottom: 40,
    width: '100%',
    marginVertical: 20,
  },
});

export default ActivityScreen;
