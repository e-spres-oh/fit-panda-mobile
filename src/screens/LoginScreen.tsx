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
import { MyContext } from "../store/myStore";

type RoutePropType = StackNavigationProp<RouteParams, Routes.Welcome>;
type RegisterData = {
  email: string;
  password: string;
};


const LoginScreen: React.FC = () => {
  const [hidePassword, setHidePassword] = React.useState(true);
  const navigation = useNavigation<RoutePropType>();
  const myStore = React.useContext(MyContext);
  const [registerData, setRegisterData] = React.useState<RegisterData>({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMEssage] = React.useState('');


  const onRegisterPress = () => {
    navigation.navigate(Routes.SignUp);
  };

  const onLoginPress = async () => {
    try {

      await myStore.login(registerData.email, registerData.password);

      console.log("Is Logged in: ", myStore.isLoggedIn);

      if (myStore.isLoggedIn === false) {
        setErrorMEssage('Incorect email/password');
      } else {
        navigation.navigate(Routes.Homepage);
      }

    } catch (e) {
      console.log(e);
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
          value={registerData.email}
          onChangeText={(text) => setRegisterData({ ...registerData, email: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          mode="outlined"
          outlineStyle={styles.inputField}
          secureTextEntry={hidePassword}
          right={<TextInput.Icon icon="eye" onPress={() => setHidePassword(!hidePassword)} />}
          value={registerData.password}
          onChangeText={(text) => setRegisterData({ ...registerData, password: text })}
        />
        {errorMessage && (
          <Text variant="labelLarge" style={styles.errorMessage}>
            {errorMessage}
          </Text>
        )}
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
  errorMessage: {
    color: Colors.error,
  },
});

export default LoginScreen;
