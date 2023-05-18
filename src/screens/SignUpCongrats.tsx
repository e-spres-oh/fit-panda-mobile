import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

import Title from '../components/Title';
import Screen from '../components/layout/Screen';
import { Colors } from '../constants';
import { Routes } from '../routes/routes';
import { RouteParams } from '../routes/types';
import Subtitle from '../components/Subtitle';
import { MyContext } from "../store/myStore";

type RoutePropType = StackNavigationProp<RouteParams, Routes.SignUpCongrats>;

const SignUpCongratsScreen: React.FC = () => {
  const navigation = useNavigation<RoutePropType>();
  const [kcal, setKcal] = useState('2600');
  const [errorMessage, setErrorMEssage] = useState('');
  const myStore = React.useContext(MyContext);

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.scrollViewContainer} bounces={false}>
        <Title title={'Congratulations!'} />
        <Subtitle
          subtitle={'Your custom plan is ready and you’re one step closer to your goal weight'}
          style={styles.subtitle}
        />
        <View style={styles.inputFieldsContainer}>
          <Text style={styles.inputLabel}>Your KCals allowance per day is</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter kcals"
            value={kcal}
            onChangeText={setKcal}
            mode="outlined"
            outlineStyle={styles.inputField}
            keyboardType="numeric"
          />
          {errorMessage && (
            <Text variant="labelLarge" style={styles.errorMessage}>
              {errorMessage}
            </Text>
          )}
          <Button
            mode="contained"
            style={styles.nextButton}
            onPress={() => {

              if (myStore.userProfile !== null) {
                try {

                  if (Number(kcal) > 100) {
                    myStore.userProfile.target = Number(kcal);
                    myStore.saveUserProfile(myStore.userProfile, myStore.userId);
                    navigation.navigate(Routes.Homepage);
                  } else {
                    setErrorMEssage("Please fill with correct data!");
                  }
                } catch (e) {
                  console.log(e);
                }
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
  inputFieldsContainer: {
    flex: 3,
    marginTop: 30,
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
  inputLabel: {
    fontSize: 15,
    marginHorizontal: 50,
    textAlign: 'center',
    color: Colors.textLabel,
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
  subtitle: {
    marginTop: 10,
    marginHorizontal: 50,
  },
  errorMessage: {
    color: Colors.error,
  },
});

export default SignUpCongratsScreen;
