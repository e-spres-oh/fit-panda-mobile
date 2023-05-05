import React from 'react';
import { SafeAreaView, StyleSheet, Dimensions, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { Routes } from '../routes/routes';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteParams } from '../routes/types';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';

type RoutePropType = StackNavigationProp<RouteParams, Routes.SignUp>;

const SignUpScreen: React.FC = () => {
    const [hidePassword, setHidePassword] = React.useState(true);
    const navigation = useNavigation<RoutePropType>();

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.mainButtonsContainer}>
          <Text style={styles.text2}>Sign up                                 and jump right in</Text>
          <Text style={styles.text1}>
            We are pretty sure you will use this thing to become better and better       every day
          </Text>
          <TextInput
            mode="outlined"
            inputMode="text"
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#666B78"
            outlineStyle={styles.inputField}
          />

          <TextInput
            mode="outlined"
            inputMode="email"
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#666B78"
            outlineStyle={styles.inputField}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#666B78"
            mode="outlined"
            outlineStyle={styles.inputField}
            right={<TextInput.Icon icon="eye" onPress={() => setHidePassword(!hidePassword)} />}
          />

          <Button
            mode="contained"
            style={styles.button}
            onPress={() => {
              navigation.navigate(Routes.Personal);
            }}
          >
            Register
          </Button>
        </View>
        <Button
          mode="text"
          style={styles.button}
          textColor="#666B78"
          onPress={() => {
            navigation.navigate(Routes.Login);
          }}
        >
          Got an account? Sign in!
        </Button>
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  inputField: {
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
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
    color: '#666B78',
  },
  logo: {
    fontSize: 30,
    marginBottom: 20,
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
    /* or 150% */
    textAlign: 'center',
    letterSpacing: -0.5,
    /* Neutral / Dark */
    color: '#666B78',
  },
  text2: {
    marginBottom: 8,
    marginTop: 122,
    marginLeft: 24,
    marginRight: 24,
    fontFamily: 'Inter',
    fontStyle: 'normal',
    //fontWeight: 500,
    fontSize: 30,
    lineHeight: 40,
    textAlign: 'center',
    letterSpacing: -1.15,
    color: '#000618',
  },
  button: {
    marginVertical: 20,
    width: '87.2%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
  },
});
  
  export default SignUpScreen;
  