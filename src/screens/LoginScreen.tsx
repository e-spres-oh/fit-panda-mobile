import React from 'react';
import { SafeAreaView, StyleSheet, Dimensions, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';

import CustomButton from '../components/TextButton';
import CustomInputText from '../components/TextInput';
import Title from '../components/Title';
// import { Colors } from '../constants';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { Routes } from '../routes/routes';
// import { RouteProp, useRoute } from '@react-navigation/native';
// import { RouteParams } from '../routes/types';

// type RouteType = RouteProp<RouteParams, Routes.Login>;

const LoginScreen: React.FC = () => {
  const [hidePassword, setHidePassword] = React.useState(true);
  const [email, setEmail] = React.useState<string | null>(null);
  const [password, setPassword] = React.useState<string | null>(null);
  const [isOk, setIsOk] = React.useState<boolean>(false);


  React.useEffect(() => {
    if (email !== null && password !== null) {
      setIsOk(true)
    } else {
      setIsOk(false)
    }
  }, [email, password])

  //   const route = useRoute<RouteType>();

  return (
    // <KeyboardAwareScrollView style={styles.background}>
    <SafeAreaView style={styles.container}>

      <View style={styles.mainButtonsContainer}>
        <Title customStyles={styles.logo}>Log in</Title>

        <CustomInputText
          inputMode="email"
          label="Email"
          outlineStyle={styles.inputField}
          setValue={setEmail}
          required={true}
        />

        <CustomInputText
          label="Password"
          outlineStyle={styles.inputField}
          secureTextEntry={hidePassword}
          right={<TextInput.Icon icon="eye" onPress={() => setHidePassword(!hidePassword)} />}
          setValue={setPassword}
          required={true}
        />

        <CustomButton mode="contained">
          Log in
        </CustomButton>

      </View>

      <CustomButton mode="text" customStyles={styles.button}>
        Forgot password?
      </CustomButton>

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
    // backgroundColor: Colors.inputBackground,
    borderWidth: 0,
  },
  mainButtonsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    flexGrow: 1,
  },
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: Dimensions.get('window').height,
    width: '100%',
    // padding: 24,
    // backgroundColor: Colors.background,
  },
  logo: {
    fontSize: 30,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "transparent",
  },
});

export default LoginScreen;
