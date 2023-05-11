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

type RoutePropType = StackNavigationProp<RouteParams, Routes.UserInfo>;

const UserInfoScreen: React.FC = () => {
  const navigation = useNavigation<RoutePropType>();
  const [value, setValue] = useState('');

  return (
    <Screen>
      <ScrollView bounces={false}>
        <View style={styles.scrollViewContainer}>
          <View style={styles.titleContainer}>
            <Title title={'Welcome!'} />
            <Subtitle
              subtitle={'Let’s customise Fit Pand for your Goals'}
              style={styles.subtitle}
            ></Subtitle>
          </View>
          <View style={styles.inputFieldsContainer}>
            <Text style={styles.inputLabel}>
              Please select witch sex we should use to calculate your calorie needs
            </Text>
            <SegmentedButtons
              value={value}
              onValueChange={setValue}
              style={styles.selectable}
              buttons={[
                {
                  value: 'male',
                  label: 'Male',
                  style: {
                    backgroundColor:
                      value === 'male' ? Colors.selectedButton : Colors.inputBackground,
                    borderWidth: 0,
                    justifyContent: 'center',
                  },
                },
                {
                  value: 'female',
                  label: 'Female',
                  style: {
                    backgroundColor:
                      value === 'female' ? Colors.selectedButton : Colors.inputBackground,
                    borderWidth: 0,
                    justifyContent: 'center',
                  },
                },
              ]}
            />
            <Text style={styles.inputLabel}>How tall are you?</Text>
            <TextInput
              mode="outlined"
              inputMode="text"
              style={styles.input}
              placeholder={'170 cm'}
              outlineStyle={styles.inputField}
            />
            <Text style={styles.inputLabel}>How much do you weigh?</Text>
            <TextInput
              mode="outlined"
              inputMode="email"
              style={styles.input}
              placeholder="80 kg"
              outlineStyle={styles.inputField}
            />
            <Text style={styles.inputLabel}>How old are you?</Text>
            <TextInput
              style={styles.input}
              placeholder="40"
              mode="outlined"
              outlineStyle={styles.inputField}
            />
          </View>

          <Button
            mode="contained"
            style={styles.bottomButton}
            onPress={() => {
              navigation.navigate(Routes.Activity);
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

export default UserInfoScreen;
