import React from 'react';
import { SafeAreaView, StyleSheet, Dimensions, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import ToggleButton from 'react-native-paper/lib/typescript/src/components/ToggleButton/ToggleButton';
import ToggleButtonGroup from 'react-native-paper/lib/typescript/src/components/ToggleButton/ToggleButtonGroup';
// import { Colors } from '../constants';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { Routes } from '../routes/routes';
// import { RouteProp, useRoute } from '@react-navigation/native';
// import { RouteParams } from '../routes/types';

// type RouteType = RouteProp<RouteParams, Routes.Login>;

const OnBoardingScreen: React.FC = () => {
  //const [hidePassword, setHidePassword] = React.useState(true);
  //   const route = useRoute<RouteType>();

  return (
    // <KeyboardAwareScrollView style={styles.background}>
    <SafeAreaView style={styles.container}>
      <View style={styles.mainButtonsContainer}>
        <Text style={styles.logo}>Welcome!</Text>
        <Text style={styles.subtitle}>Let's customize Fit Panda for your Goals </Text>
        <Text style={styles.labels}>
          Please select which sex we should use to calculate your calorie needs
        </Text>
        {/* const [value, setValue] = React.useState('left'); return ( }
         <ToggleButtonGroup onValueChange={(value) => setValue(value)} value={value}>
          <ToggleButton icon="format-align-left" value="left" />
          <ToggleButton icon="format-align-right" value="right" />
        </ToggleButtonGroup> */}
        <Text style={styles.labels}>How tall are you? </Text>
        <TextInput
          mode="outlined"
          inputMode="text"
          style={styles.input}
          placeholder="cm"
          outlineStyle={styles.inputField}
        />
        <Text style={styles.labels}>How much do you weigh? </Text>
        <TextInput
          mode="outlined"
          inputMode="text"
          style={styles.input}
          placeholder="kg"
          outlineStyle={styles.inputField}
        />
        <Text style={styles.labels}>How old are you? </Text>
        <TextInput
          mode="outlined"
          inputMode="text"
          style={styles.input}
          placeholder="years"
          outlineStyle={styles.inputField}
        />
        <Button mode="contained" style={styles.button}>
          Next
        </Button>
      </View>
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
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    marginBottom: 20,
    color: '#696969',
  },
  // paragraph: {
  //   textAlign: 'center',
  //   fontSize: 13,
  //   marginTop: 20,
  //   marginHorizontal: 20,
  //   marginBottom: 30,
  //   color: '#696969',
  // },
  labels: {
    textAlign: 'center',
    fontSize: 12,
    marginHorizontal: 20,
    color: '#696969',
  },
  button: {
    marginVertical: 20,
    width: '90%',
  },
});

export default OnBoardingScreen;
