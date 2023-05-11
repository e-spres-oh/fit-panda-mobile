import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { Button, SegmentedButtons, Text, TextInput, ToggleButton } from 'react-native-paper';

import Subtitle from '../components/Subtitle';
import Title from '../components/Title';
import Screen from '../components/layout/Screen';
import { Colors } from '../constants';
import { Routes } from '../routes/routes';
import { RouteParams } from '../routes/types';

type RoutePropType = StackNavigationProp<RouteParams, Routes.UserInfo>;

const UserInfoScreen: React.FC = () => {
  const navigation = useNavigation<RoutePropType>();
  const [selected, setSelected] = React.useState('lose');


  return (
    <Screen>
      <ScrollView bounces={false}>
        <View style={styles.mainButtonsContainer}>
          <View style={styles.titleContainer}>
            <Title title={'What is your goal?'} />
          </View>
          <View> 
            <ToggleButton.Group
                onValueChange={setSelected}
                value={selected}>
                <ToggleButton
                    style={selected === 'lose' ? styles.toggleButtonContainerSelected : styles.toggleButtonContainer}
                    icon={() => <View><Text>Lose Weight</Text></View>}
                    value="lose"
                />
                <ToggleButton
                    style={selected === 'maintain' ? styles.toggleButtonContainerSelected : styles.toggleButtonContainer}
                    icon={() => <View><Text>Maintain Weight</Text></View>}
                    value="maintain"
                />
                <ToggleButton
                    style={selected === 'gain' ? styles.toggleButtonContainerSelected : styles.toggleButtonContainer}
                    icon={() => <View><Text>Gain Weight</Text></View>}
                    value="gain"
                />
            </ToggleButton.Group>
          </View>

          <Button
            mode="contained"
            style={styles.bottomButton}
            onPress={() => {
              navigation.navigate(Routes.Congratulations);
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
    alignContent: 'center',
    flexDirection: 'column',
  },
  mainButtonsContainer: {
    justifyContent: 'center',
    width: '100%',
    flexGrow: 1,
  },
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: Dimensions.get('window').height,
    width: '100%',
    // backgroundColor: Colors.background,
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
  toggleButtonContainerSelected: {
    backgroundColor: '#D3E0F8',
    borderRadius: 10,
    alignSelf: 'center',
    marginVertical: 20,
    width: '90%',
    marginBottom: 30,
  },
  toggleButtonContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    alignSelf: 'center',
    marginVertical: 20,
    width: '90%',
    marginBottom: 30,
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
