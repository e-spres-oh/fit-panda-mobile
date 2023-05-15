import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState, useContext } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, SegmentedButtons, Text, TextInput } from 'react-native-paper';
import { MyContext } from '../store/MyStore';
import Subtitle from '../components/Subtitle';
import Title from '../components/Title';
import Screen from '../components/layout/Screen';
import { Colors } from '../constants';
import { Routes } from '../routes/routes';
import { RouteParams } from '../routes/types';

type RoutePropType = StackNavigationProp<RouteParams, Routes.UserInfo>;
type UserInfoData = {
  gender: string;
  height: string;
  weight: string;
  age: string;
};

const UserInfoScreen: React.FC = () => {
  const navigation = useNavigation<RoutePropType>();
  const myStore = useContext(MyContext);
  const [userInfoData, setUserInfoData] = useState<UserInfoData>({
    gender: 'male',
    height: '170',
    weight: '80',
    age: '40',
  });

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.scrollViewContainer} bounces={false}>
        <Title title={'Welcome!'} />
        <Subtitle subtitle={'Let’s customize Fit Panda for your Goals'} style={styles.subtitle} />
        <View style={styles.inputFieldsContainer}>
          <Text style={styles.inputLabel}>
            Please select which sex we should use to calculate your calorie needs
          </Text>
          <SegmentedButtons
            value={userInfoData.gender}
            onValueChange={(value: string) => {
              setUserInfoData({ ...userInfoData, gender: value });
            }}
            style={styles.selectable}
            buttons={[
              {
                value: 'male',
                label: 'Male',
                style: {
                  backgroundColor:
                    userInfoData.gender === 'male' ? Colors.selectedButton : Colors.inputBackground,
                  borderWidth: 0,
                  justifyContent: 'center',
                },
              },
              {
                value: 'female',
                label: 'Female',
                style: {
                  backgroundColor:
                    userInfoData.gender === 'female' ? Colors.selectedButton : Colors.inputBackground,
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
            value={userInfoData.height}
            onChangeText={(text) => setUserInfoData({ ...userInfoData, height: text })}
          />
          <Text style={styles.inputLabel}>How much do you weigh?</Text>
          <TextInput
            mode="outlined"
            inputMode="email"
            style={styles.input}
            placeholder="80 kg"
            outlineStyle={styles.inputField}
            value={userInfoData.weight}
            onChangeText={(text) => setUserInfoData({ ...userInfoData, weight: text })}
          />
          <Text style={styles.inputLabel}>How old are you?</Text>
          <TextInput
            style={styles.input}
            placeholder="40"
            mode="outlined"
            outlineStyle={styles.inputField}
            value={userInfoData.age}
            onChangeText={(text) => setUserInfoData({ ...userInfoData, age: text })}
          />

          <Button
            mode="contained"
            style={styles.nextButton}
            onPress={async () => {
              const userProfile = await myStore.fetchUserProfile();
              userProfile.sex = userInfoData.gender;
              userProfile.age = parseInt(userInfoData.age);
              userProfile.height = parseInt(userInfoData.height);
              userProfile.weight = parseInt(userInfoData.weight);
              await myStore.saveUserProfile(userProfile, myStore.userId);
              navigation.navigate(Routes.UserActivityLevel);
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
});

export default UserInfoScreen;
