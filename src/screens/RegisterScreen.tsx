import React from 'react';
import { SafeAreaView, StyleSheet, Dimensions, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { Routes } from '../routes/routes';
// import { Colors } from '../constants';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { Routes } from '../routes/routes';
// import { RouteProp, useRoute } from '@react-navigation/native';
import { RouteParams } from '../routes/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type RoutePropType = StackNavigationProp<RouteParams, Routes.Register>;

const RegisterScreen: React.FC = () => {
  const [hidePassword, setHidePassword] = React.useState(true);
  //   const route = useRoute<RouteType>();
  const navigation = useNavigation<RoutePropType>();
  return (
    // <KeyboardAwareScrollView style={styles.background}>
    <SafeAreaView style={styles.container}>
      <View style={styles.mainButtonsContainer}>
        <Text style={styles.logo}>Sign up{'\n'}and jump right in</Text>
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
        <Button mode="contained" style={styles.button}
          onPress={() => {
            navigation.navigate(Routes.Metrics);
          }}>
          Register
        </Button>
      </View>
      <Button mode="text" style={styles.button}>
        Got an account? Sign in!
      </Button>
    </SafeAreaView>
    // </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  background: {
    // backgroundColor: Colors.background,
  },
  inputField: {
    borderRadius: 5,
    backgroundColor: 'white',
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
  },
  logo: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: 'grey',
    textAlign: 'center',
    marginHorizontal: 70,
    marginBottom: 50,
  },
  button: {
    marginVertical: 20,
    width: '90%',
  },
});

export default RegisterScreen;
