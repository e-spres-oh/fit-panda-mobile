import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import Title from '../components/Title';
import Screen from '../components/layout/Screen';
import { Colors } from '../constants';
import { Routes } from '../routes/routes';
import { RouteParams } from '../routes/types';
import { MyContext } from '../store/MyStore';
import { Alert } from 'react-native/Libraries/Alert/Alert';

type RoutePropType = StackNavigationProp<RouteParams, Routes.Welcome>;

const LoginScreen: React.FC = () => {
  const [hidePassword, setHidePassword] = React.useState(true);
  const navigation = useNavigation<RoutePropType>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const myStore = useContext(MyContext);

  const onRegisterPress = () => {
    navigation.navigate(Routes.SignUp);
  };

  const isValidEmail = (value: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(value);
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
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          mode="outlined"
          outlineStyle={styles.inputField}
          secureTextEntry={hidePassword}
          right={<TextInput.Icon icon="eye" onPress={() => setHidePassword(!hidePassword)} />}
          onChangeText={(text) => setPassword(text)}
        />
        <Button mode="contained" style={styles.button} 
        onPress={async () => {
          if (!isValidEmail(username) || !password) {
            Alert.alert('Invalid email', 'Please enter a valid email address');
            return;
          }
          await myStore.login(username, password);
          navigation.navigate(Routes.Home);
        }}>
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
