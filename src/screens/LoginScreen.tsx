import React from 'react';
import { SafeAreaView, StyleSheet, Dimensions, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { Routes } from '../routes/routes';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RouteParams } from '../routes/types';

type RouteType = RouteProp<RouteParams, Routes.Login>;

const LoginScreen: React.FC = () => {
  const [hidePassword, setHidePassword] = React.useState(true);
  const route = useRoute<RouteType>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainButtonsContainer}>
        <Text style={styles.logo}>Log in</Text>
        <TextInput
          mode="outlined"
          inputMode="email"
          style={styles.input}
          placeholder="Email"
          outlineStyle={styles.inputField}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          mode="outlined"
          outlineStyle={styles.inputField}
          secureTextEntry={hidePassword}
          right={<TextInput.Icon icon="eye" onPress={() => setHidePassword(!hidePassword)} />}
        />
        <Button mode="contained" style={styles.button}>
          Login
        </Button>
      </View>
      <Button mode="text" style={styles.button}>
        Forgot password?
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputField: {
    borderRadius: 5,
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
  },
  logo: {
    fontSize: 30,
    marginBottom: 20,
  },
  button: {
    marginVertical: 20,
    width: '90%',
  },
});

export default LoginScreen;
