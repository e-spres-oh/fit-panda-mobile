import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import Subtitle from '../components/Subtitle';
import Title from '../components/Title';
import Screen from '../components/layout/Screen';
import { Colors } from '../constants';
import { Routes } from '../routes/routes';
import { RouteParams } from '../routes/types';

type RoutePropType = StackNavigationProp<RouteParams, Routes.Welcome>;

const SignUpScreen: React.FC = () => {
  const [hidePassword, setHidePassword] = React.useState(true);
  const navigation = useNavigation<RoutePropType>();

  return (
    <Screen>
      <ScrollView>
        <View style={styles.mainContainer}>
          <Title title={`Sign up\n and jump right in`}></Title>
          <Subtitle
            subtitle="We are pretty sure you will use this thing to become better and better every day"
            style={styles.subtitle}
          />
          <TextInput
            mode="outlined"
            inputMode="text"
            style={styles.input}
            placeholder="Name"
            outlineStyle={styles.inputField}
          />
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
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => navigation.navigate(Routes.Home)}
          >
            Register
          </Button>
        </View>
      </ScrollView>
      <Button mode="text" style={styles.button} onPress={() => navigation.navigate(Routes.Login)}>
        Got an account? Sign In!
      </Button>
    </Screen>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.background,
  },
  subtitle: {
    marginTop: 15,
    marginBottom: 20,
    marginHorizontal: 15,
  },
  mainContainer: {
    justifyContent: 'center',
    flexGrow: 1,
  },
  inputField: {
    borderRadius: 5,
    backgroundColor: Colors.inputBackground,
    borderWidth: 0,
  },
  input: {
    width: '100%',
    marginVertical: 10,
  },
  button: {
    marginVertical: 20,
    width: '100%',
  },
});

export default SignUpScreen;
