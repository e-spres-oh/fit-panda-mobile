import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import Screen from '../components/layout/Screen';
import { Colors } from '../constants';
import { Routes } from '../routes/routes';
import { RouteParams } from '../routes/types';
import { MyContext } from "../store/myStore";

type RoutePropType = StackNavigationProp<RouteParams, Routes.Welcome>;

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<RoutePropType>();
  const myStore = React.useContext(MyContext);

  React.useEffect(()=> {
    //daca exista un token se incearca autentificarea cu acesta in homepage
    if(myStore.token !== '') {
      navigation.navigate(Routes.Homepage);
    }
  }, [])


  return (
    <Screen>
      <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
      <View style={styles.buttonsContainer}>
        <Button
          style={styles.button}
          mode="contained"
          onPress={() => {
            navigation.navigate(Routes.SignUp);
          }}
        >
          Sign up for free
        </Button>
        <Button
          style={styles.button}
          mode="outlined"
          textColor="#000"
          onPress={() => {
            navigation.navigate(Routes.Login);
          }}
        >
          Login
        </Button>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
  },
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '100%',
    backgroundColor: Colors.background,
  },
  buttonsContainer: {
    width: '100%',
    marginBottom: 20,
  },
  logo: {
    width: '90%',
  },
});

export default WelcomeScreen;
