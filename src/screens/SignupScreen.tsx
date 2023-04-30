import React from 'react';
import { SafeAreaView, StyleSheet, Dimensions, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteParams } from '../routes/types';
import { Routes } from '../routes/routes';

type RoutePropType = StackNavigationProp<RouteParams, Routes.Welcome>;

const SignupScreen: React.FC = () => {
  const navigation = useNavigation<RoutePropType>();
  const [hidePassword, setHidePassword] = React.useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainButtonsContainer}>
        <Text style={styles.logo}>Sign up</Text>
        <Text style={styles.logo}>and jump right in</Text>
        <Text style={styles.subtitle}>We are pretty sure you will use this thing to become better and better every day</Text>
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
        <Button mode="contained" 
          style={styles.button}
          onPress={() => {
            navigation.navigate(Routes.PersonalDetails);
          }}
        >
          Register
        </Button>
      </View>
      <Button mode="text" 
        style={styles.button} 
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
  background: {
    // backgroundColor: Colors.background,
  },
  inputField: {
    borderRadius: 5,
    // backgroundColor: Colors.inputBackground,
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
    // backgroundColor: Colors.background,
  },
  input: {
    width: '90%',
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  logo: {
    fontSize: 28,
    marginHorizontal: '15%',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
    marginBottom: '5%',
    marginHorizontal: '20%',
    textAlign: 'center',
  },
  button: {
    marginVertical: 20,
    width: '90%',
  },
});

export default SignupScreen;