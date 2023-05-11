import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import Title from '../components/Title';
import Screen from '../components/layout/Screen';
import { Colors } from '../constants';
import { Routes } from '../routes/routes';
import { RouteParams } from '../routes/types';
import Subtitle from '../components/Subtitle';

type RoutePropType = StackNavigationProp<RouteParams, Routes.Welcome>;

const CongratulationsScreen: React.FC = () => {
  const [hidePassword, setHidePassword] = React.useState(true);
  const navigation = useNavigation<RoutePropType>();

  const onRegisterPress = () => {
    navigation.navigate(Routes.SignUp);
  };

  return (
    <Screen>
      <View style={styles.mainButtonsContainer}>
        <Title title="Congratulations!" style={styles.title} />
        <Subtitle
          subtitle={'Your custom plan is ready and you’re one step closer to your goal weight'}
          style={styles.subtitle}
        ></Subtitle>
        <Text style={styles.inputLabel}>How tall are you?</Text>
        <TextInput
          mode="outlined"
          inputMode="numeric"
          style={styles.input}
          placeholder={'2600'}
          outlineStyle={styles.inputField}
          onSubmitEditing={() => navigation.navigate(Routes.YourProfile)}
        />
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => navigation.navigate(Routes.YourProfile)}
        >
          Start your journey!
        </Button>
      </View>
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
  inputLabel: {
    fontSize: 15,
    marginHorizontal: 50,
    textAlign: 'center',
    color: Colors.textLabel,
  },
  subtitle: {
    marginTop: 10,
    marginHorizontal: 40,
    marginBottom: 50,
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

export default CongratulationsScreen;
