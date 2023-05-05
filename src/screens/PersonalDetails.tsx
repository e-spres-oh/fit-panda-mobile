import React from "react";
import { SafeAreaView, StyleSheet, Dimensions, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { Routes } from '../routes/routes';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteParams } from '../routes/types';
import { useNavigation } from '@react-navigation/native';
import { ButtonGroup } from '../components/ButtonGroup';
import * as Font from 'expo-font';

type RoutePropType = StackNavigationProp<RouteParams, Routes.Personal>;

const PersonalDetails: React.FC = () => {
    const [hidePassword, setHidePassword] = React.useState(true);
    const navigation = useNavigation<RoutePropType>();
  const printButtonLabel = (item: any) => {
      console.log(item)
    }
    return (
      // <KeyboardAwareScrollView style={styles.background}>
      <SafeAreaView style={styles.container}>
        <View style={styles.mainButtonsContainer}>
        <Text style={styles.text2}>Welcome!</Text>
        <Text style={styles.text1}>Let’s customise Fit Pand for                       your Goals</Text>
          <Text style={styles.text33}>Please select witch sex we should use to      calculate your calorie needs</Text>
            <ButtonGroup
                buttons={['Male', 'Female']}
                doSomethingAfterClick={printButtonLabel}
              />
          <Text style={styles.text3}>How tall are you?</Text>
          <TextInput
          mode="outlined"
          inputMode="text"
          style={[styles.input, { textAlign: 'center' }]}
          placeholder="170 cm"
          outlineStyle={styles.inputField}
        />


          <Text style={styles.text3}>How much do you weigh?</Text>
          <TextInput
            mode="outlined"
            inputMode="email"
            style={[styles.input, { textAlign: 'center' }]}
            placeholder="80 kg"
            outlineStyle={styles.inputField}
          />
          <Text style={styles.text3}>How old are you?</Text>
          <TextInput
          style={[styles.input, { textAlign: 'center' }]}
          placeholder="40"
            mode="outlined"
            outlineStyle={styles.inputField}

        />

              <Button mode="contained" style={styles.button} onPress={() => {
         navigation.navigate(Routes.Personal)
        }} >
            Next
          </Button>
        </View>
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  inputField: {
    borderRadius: 5,
    borderWidth: 0,
    backgroundColor: '#FFFFFF',

  },
  mainButtonsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
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
  },
  input: {
    width: '90%',
    marginVertical: 10,
  },
  logo: {
      fontSize: 30,
      marginBottom: 20,
  },
  text4: {
    fontSize: 13,
    color: '#666B78',
  },
  text1: {
      marginBottom: 20,
      marginLeft: 62,
      marginRight: 61,
      fontFamily: 'Inter',
      fontStyle: 'normal',
      //fontWeight: 400,
      fontSize: 16,
      lineHeight: 24,
      textAlign: 'center',
      letterSpacing: -0.5,
      color: '#666B78'
  },
  text2: {
      fontSize: 30,
      marginBottom: 8,
      marginTop: 122,
      color: '#000618',
      marginLeft: 24,
      marginRight: 24,
      fontFamily: 'Inter',
      fontStyle: 'normal',
      fontWeight: '500',
      lineHeight: 40,
      textAlign: 'center',
      letterSpacing: -1.15,
    
  },
  text3: {
    marginTop: 20,
    marginBottom: -10,
    marginLeft: 62,
    marginRight: 61,
    textAlign: 'center',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    //fontWeight: 500,
    fontSize: 12,
    lineHeight: 22,
    letterSpacing: -0.25,
    color: '#666B78',
  },
  text33: {
    marginTop: 20,
    marginLeft: 62,
    marginRight: 61,
    fontFamily: 'Inter',
    fontStyle: 'normal',
    //fontWeight: 500,
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    letterSpacing: -0.25,
    color: '#666B78'
  },

  button: {
    marginVertical: 20,
    width: '87.2%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10

  }


});

export default PersonalDetails;
