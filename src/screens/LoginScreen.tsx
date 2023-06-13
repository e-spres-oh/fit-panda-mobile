import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';
import Title from '../components/Title';
import Screen from '../components/layout/Screen';
import { Colors } from '../constants';
import { Routes } from '../routes/routes';
import { RouteParams } from '../routes/types';
import { useUserStore } from '../hooks/useUserStore';

type RoutePropType = StackNavigationProp<RouteParams, Routes.Welcome>;

const LoginScreen: React.FC = () => {
  const [hidePassword, setHidePassword] = React.useState(true);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigation = useNavigation<RoutePropType>();
  const [errorMessage, setErrorMessage] = React.useState('');
  const { login } = useUserStore();

  const onRegisterPress = () => {
    navigation.navigate(Routes.SignUp);
  };

  const onLogin = async () => {
    try {
      const successful = await login(email, password);
      if (successful) {
        navigation.navigate(Routes.Home);
      } else {
        setErrorMessage('Invalid credentials');
      }
    } catch (e: any) {
      console.log(e);
    }
  };

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
          onChangeText={(text) => {
            setEmail(text);
            setErrorMessage('');
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          mode="outlined"
          outlineStyle={styles.inputField}
          secureTextEntry={hidePassword}
          right={<TextInput.Icon icon="eye" onPress={() => setHidePassword(!hidePassword)} />}
          onChangeText={(text) => {
            setPassword(text);
            setErrorMessage('');
          }}
        />
        <Text>{errorMessage}</Text>
        <Button mode="contained" style={styles.button} onPress={onLogin}>
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
