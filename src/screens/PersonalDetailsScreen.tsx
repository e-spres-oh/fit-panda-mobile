import React from 'react';
import { SafeAreaView, StyleSheet, Dimensions, View, TouchableOpacity } from 'react-native';
import { Button, Text, TextInput, Switch, ToggleButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteParams } from '../routes/types';
import { Routes } from '../routes/routes';

type RoutePropType = StackNavigationProp<RouteParams, Routes.Welcome>;
type Gender = 'male' | 'female';

const PersonalDetailsScreen: React.FC = () => {
  const navigation = useNavigation<RoutePropType>();
  const [hidePassword, setHidePassword] = React.useState(true);
  const [gender, setGender] = React.useState<Gender>('male');

  const handleToggle = (value: Gender) => {
    setGender(value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainButtonsContainer}>
        <Text style={styles.logo}>Welcome!</Text>
        <Text style={styles.subtitle}>Let's customize Fit Panda for your Goals</Text>

        <Text style={styles.genderText}>Please select which sex we should use to calculate your calorie needs</Text>

        <View style={styles.containerGenders}>
          <TouchableOpacity onPress={() => handleToggle('male')} style={gender === 'male' ? styles.selectedButton1 : styles.genderButton1}>
            <Text style={styles.genderButtonText}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleToggle('female')} style={gender === 'female' ? styles.selectedButton2 : styles.genderButton2}>
            <Text style={styles.genderButtonText}>Female</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.genderText}>How tall are you?</Text>

        <TextInput
          mode="outlined"
          inputMode="text"
          style={styles.input}
          placeholder="170 cm"
          outlineStyle={styles.inputField}
        />

        <Text style={styles.genderText}>How much do you weigh?</Text>

        <TextInput
          mode="outlined"
          inputMode="text"
          style={styles.input}
          placeholder="80 kg"
          outlineStyle={styles.inputField}
        />

        <Text style={styles.genderText}>How old are you?</Text>

        <TextInput
          mode="outlined"
          inputMode="text"
          style={styles.input}
          placeholder="40"
          outlineStyle={styles.inputField}
        />
        
        <Button mode="contained" style={styles.button}>
          Next
        </Button>
        
      </View>
      
    
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
    marginBottom: '7%',
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  logo: {
    fontSize: 28,
    marginHorizontal: '15%',
    textAlign: 'center',
    marginBottom: '2%',
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
    marginBottom: '5%',
    marginHorizontal: '22%',
    textAlign: 'center',
  },
  button: {
    marginVertical: 20,
    width: '90%',
  },
  containerGenders: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10%',
  },
  genderButton1: {
    width: '45%',
    height: 40,
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: 'center',
  },
  genderButton2: {
    width: '45%',
    height: 40,
    backgroundColor: '#fff',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
  },
  genderText: {
    color: 'gray',
    fontSize: 12,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginHorizontal: '19%',
  },
  genderButtonText: {
    fontSize: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  selectedButton1: {
    backgroundColor: '#D8EFFF',
    width: '45%',
    height: 40,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: 'center',
  },
  selectedButton2: {
    backgroundColor: '#D8EFFF',
    width: '45%',
    height: 40,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
  },
});

export default PersonalDetailsScreen;