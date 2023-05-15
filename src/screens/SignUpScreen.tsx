import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';
import Subtitle from '../components/Subtitle';
import Title from '../components/Title';
import Screen from '../components/layout/Screen';
import { Colors } from '../constants';
import { Routes } from '../routes/routes';
import { RouteParams } from '../routes/types';
import { BASE_URL, endpoints } from '../endpoints';
import { MyContext } from '../store/MyStore';
import { Alert } from 'react-native/Libraries/Alert/Alert';

type RoutePropType = StackNavigationProp<RouteParams, Routes.Welcome>;
type RegisterData = {
  name: string;
  email: string;
  password: string;
};

const SignUpScreen: React.FC = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const [errorMessage, setErrorMEssage] = useState('');
  const navigation = useNavigation<RoutePropType>();
  const [registerData, setRegisterData] = useState<RegisterData>({
    name: '',
    email: '',
    password: '',
  });
  const myStore = useContext(MyContext);

  const isValidEmail = (value: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(value);
  };

  return (
    <Screen>
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
          value={registerData.name}
          onChangeText={(text) => setRegisterData({ ...registerData, name: text })}
          outlineStyle={styles.inputField}
        />
        <TextInput
          mode="outlined"
          inputMode="email"
          style={styles.input}
          placeholder="Email"
          outlineStyle={styles.inputField}
          keyboardType="email-address"
          value={registerData.email}
          onChangeText={(text) => setRegisterData({ ...registerData, email: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          mode="outlined"
          outlineStyle={styles.inputField}
          secureTextEntry={hidePassword}
          value={registerData.password}
          onChangeText={(text) => setRegisterData({ ...registerData, password: text })}
          right={<TextInput.Icon icon="eye" onPress={() => setHidePassword(!hidePassword)} />}
        />
        {errorMessage && (
          <Text variant="labelLarge" style={styles.errorMessage}>
            {errorMessage}
          </Text>
        )}
        <Button mode="contained" style={styles.button} 
        onPress={async () => {
          if (!isValidEmail(registerData.email) || !registerData.password) {
            Alert.alert('Invalid email', 'Please enter a valid email address');
            return;
          }
          await myStore.register(registerData.email, registerData.password);
          const userProfile = await myStore.fetchUserProfile();
          userProfile.name = registerData.name;
          await myStore.saveUserProfile(userProfile, myStore.userId);
          myStore.isLoggedIn = true;
          navigation.navigate(Routes.UserInfo);
        }}>
          Register
        </Button>
      </View>
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
  errorMessage: {
    color: Colors.error,
  },
});

export default SignUpScreen;
