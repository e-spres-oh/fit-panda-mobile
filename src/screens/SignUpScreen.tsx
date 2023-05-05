import React from 'react';
import { SafeAreaView, StyleSheet, Dimensions, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
// import { Colors } from '../constants';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { Routes } from '../routes/routes';
// import { RouteProp, useRoute } from '@react-navigation/native';
// import { RouteParams } from '../routes/types';

// type RouteType = RouteProp<RouteParams, Routes.Login>;

const SignUpScreen: React.FC = () => {
  const [hidePassword, setHidePassword] = React.useState(true);
  //   const route = useRoute<RouteType>();

  return (
    // <KeyboardAwareScrollView style={styles.background}>
    <SafeAreaView style={styles.container}>
      <View style={styles.mainButtonsContainer}>
        <Text style={styles.logo}>Sign up </Text>
        <Text style={styles.logo2}>and jump right in</Text>
        <Text style={styles.textSub}>
        We are pretty sure you will use this
        <Text style={{color:'grey'}}> thing to become better and better </Text>
        <Text style={{color:'grey'}}>every day</Text>
      </Text>
        <TextInput
          mode="outlined"
          
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
        <Button mode="contained" style={styles.button}>
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
    marginBottom: 10,
  },

  logo2: {
    fontSize: 30,
    marginTop: -10,
    marginBottom: 10,
  },
  button: {
    marginVertical: 20,
    width: '90%',
  },
  textSub: {
    fontSize: 18,
    width:'85%',
    //fontWeight: "bold",
    color: "grey",
    textAlign:'center',
    marginBottom: 15,
    
   
  },
});

export default SignUpScreen;