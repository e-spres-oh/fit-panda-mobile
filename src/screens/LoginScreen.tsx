import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import Title from '../components/Title';
import Screen from '../components/layout/Screen';
import { Colors } from '../constants';
import { Routes } from '../routes/routes';
import { RouteParams } from '../routes/types';
import { IStore, RootContext } from '../stores/rootStore';

type RoutePropType = StackNavigationProp<RouteParams, Routes.Welcome>;

const LoginScreen: React.FC = () => {
  const rootStore = React.useContext<IStore>(RootContext);
  const [hidePassword, setHidePassword] = React.useState(true);
  const navigation = useNavigation<RoutePropType>();
  const [email, setEmail] = useState<string>();
  const [pass, setPass] = useState<string>();

  const onRegisterPress = () => {
    navigation.navigate(Routes.SignUp);
  };

  const onLoginPress = () => {
    if (email !== undefined && pass !== undefined) {
      try {
        rootStore.login(email, pass);
        navigation.navigate(Routes.Home);
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("Empty data");
    }
  }

  return (
    <Screen>
      <View style={styles.mainButtonsContainer}>
        <Title title="Log in" style={styles.title} />
        <TextInput
          mode="outlined"
          inputMode="email"
          style={styles.input}
          placeholder="Email"
          outlineStyle={styles.inputField}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          mode="outlined"
          outlineStyle={styles.inputField}
          secureTextEntry={hidePassword}
          right={<TextInput.Icon icon="eye" onPress={() => setHidePassword(!hidePassword)} />}
          value={pass}
          onChangeText={(text) => setPass(text)}
        />
        <Button mode="contained" style={styles.button} onPress={onLoginPress}>
          Login
        </Button>
      </View>
      <Button mode="text" style={styles.button} onPress={onRegisterPress}>
        No account? Sign up!
      </Button>
    </Screen>
  );
};

const styles = StyleSheet.create({
  title: { marginBottom: 20 },
  mainButtonsContainer: {
    justifyContent: 'center',
    width: '100%',
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

export default LoginScreen;
