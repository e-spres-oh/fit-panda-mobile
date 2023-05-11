import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, SegmentedButtons, Text, TextInput } from 'react-native-paper';

import Subtitle from '../components/Subtitle';
import Title from '../components/Title';
import Screen from '../components/layout/Screen';
import { Colors } from '../constants';
import { Routes } from '../routes/routes';
import { RouteParams } from '../routes/types';

type RoutePropType = StackNavigationProp<RouteParams, Routes.Congratulations>;

const CongratulationsScreen: React.FC = () => {
  const navigation = useNavigation<RoutePropType>();
  

  return (
    <Screen>
      <ScrollView bounces={false}>
        <View style={styles.scrollViewContainer}>
          <View style={styles.titleContainer}>
            <Title title={'Congratulations!'} />
            <Subtitle
              subtitle={'Your custom plan is ready and you\'re one step closer to your goal weight'}
              style={styles.subtitle}
            ></Subtitle>
          </View>
          <View style={styles.inputFieldsContainer}>
            <Text style={styles.inputLabel}>
              Your KCals allowance per day is
            </Text>
            <TextInput
              mode="outlined"
              inputMode="text"
              style={styles.input}
              placeholder={'2600'}
              outlineStyle={styles.inputField}
            />
           
          </View>

          <Button
            mode="contained"
            style={styles.bottomButton}
            onPress={() => {
              navigation.navigate(Routes.SignUp);
            }}
          >
            Start your journey!
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
    marginBottom: 20,
    marginTop:20,
  },
  subtitle: {
    fontSize:18,
    marginTop: 40,
    marginHorizontal: 10,
  },
  inputFieldsContainer: {
    flex: 4,
    marginTop: 30,
    

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
  inputField: {
    borderRadius: 5,
    backgroundColor: Colors.inputBackground,
    borderWidth: 0,
  },
  input: {
    textAlign: 'center',
    height: 48,
    marginBottom: 20,
    marginTop: 5,
  },
  bottomButton: {
    bottom: 0,
    width: '100%',
    marginVertical: 20,
  },
});

export default CongratulationsScreen;
