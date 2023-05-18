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
import { MyContext } from "../store/myStore";

type RoutePropType = StackNavigationProp<RouteParams, Routes.UserInfo>;
type RegisterData = {
  gen: string;
  height: string;
  weight: string;
  age: string;
};


const UserInfoScreen: React.FC = () => {
  const navigation = useNavigation<RoutePropType>();
  const [errorMessage, setErrorMEssage] = useState('');
  const [registerData, setRegisterData] = useState<RegisterData>({
    gen: 'M',
    height: '',
    weight: '',
    age: '',
  });

  const myStore = React.useContext(MyContext);

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.scrollViewContainer} bounces={false}>
        <Title title={'Welcome!'} />
        <Subtitle subtitle={'Let’s customize Fit Panda for your Goals'} style={styles.subtitle} />
        <View style={styles.inputFieldsContainer}>
          <Text style={styles.inputLabel}>
            Please select witch sex we should use to calculate your calorie needs
          </Text>
          <SegmentedButtons
            value={registerData.gen}
            onValueChange={(text) => setRegisterData({ ...registerData, gen: text })}
            style={styles.selectable}
            buttons={[
              {
                value: 'M',
                label: 'Male',
                style: {
                  backgroundColor:
                    registerData.gen === 'M' ? Colors.selectedButton : Colors.inputBackground,
                  borderWidth: 0,
                  justifyContent: 'center',
                },
              },
              {
                value: 'F',
                label: 'Female',
                style: {
                  backgroundColor:
                    registerData.gen === 'F' ? Colors.selectedButton : Colors.inputBackground,
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
            value={registerData.height}
            onChangeText={(text) => setRegisterData({ ...registerData, height: text })}
          />
          <Text style={styles.inputLabel}>How much do you weigh?</Text>
          <TextInput
            mode="outlined"
            inputMode="email"
            style={styles.input}
            placeholder="80 kg"
            outlineStyle={styles.inputField}
            value={registerData.weight}
            onChangeText={(text) => setRegisterData({ ...registerData, weight: text })}
          />
          <Text style={styles.inputLabel}>How old are you?</Text>
          <TextInput
            style={styles.input}
            placeholder="40"
            mode="outlined"
            outlineStyle={styles.inputField}
            value={registerData.age}
            onChangeText={(text) => setRegisterData({ ...registerData, age: text })}
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
              //save data in store
              if (myStore.userProfile !== null) {

                if (registerData.gen.trim() === '' ||
                  Number(registerData.height) < 1 ||
                  Number(registerData.weight) < 1 ||
                  Number(registerData.age) < 1
                ) {
                  setErrorMEssage("Please fill with correct data!");
                } else {

                  // myStore.userProfile = {
                  //   ...myStore.userProfile,
                  //   sex: registerData.gen,
                  //   height: Number(registerData.height),
                  //   weight: Number(registerData.height),
                  //   age: Number(registerData.age)
                  // }
                  myStore.userProfile.sex = registerData.gen;
                  myStore.userProfile.height = Number(registerData.height);
                  myStore.userProfile.weight = Number(registerData.weight);
                  myStore.userProfile.age = Number(registerData.age);

                  navigation.navigate(Routes.UserActivityLevel);
                }
              }
              else {
                // some error occurred

                //deleting saved data (store)
                myStore.reset();

                //navigate to first Sign screen to
                navigation.navigate(Routes.SignUp);
              }
            }
            }
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
    marginBottom: 30,
  },
  inputFieldsContainer: {
    flex: 3,
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
  nextButton: {
    marginTop: 40,
  },
  errorMessage: {
    color: Colors.error,
  },
});

export default UserInfoScreen;
