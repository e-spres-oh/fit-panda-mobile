import React from 'react';
import { SafeAreaView, StyleSheet, Dimensions, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

type Gender = 'male' | 'female';

const OnboardingScreen: React.FC = () => {

    const [gender, setGender] = React.useState<Gender>('male');

    const switch_gender = (value: Gender) => {
        setGender(value);
      };
    
      const dismissKeyboard = () => {
        Keyboard.dismiss();
      };

  return (
  <TouchableWithoutFeedback onPress={dismissKeyboard}>
    <SafeAreaView style={styles.container}>
      <View style={styles.buttons}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.subtitle}>Let's customise Fit Pand for {'\n'}your Goals</Text>

        <Text style={styles.text}>Please select witch sex we should use to {'\n'}calculate your calorie needs</Text>
        <View style={styles.gender_button}>
          <TouchableOpacity
           style={gender === 'male' ? styles.male_pressed : styles.male_notPressed}
           onPress={() => switch_gender('male')}
           >
            <Text style={gender === 'male' ? styles.genderText_pressed : styles.genderText_Notpressed}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={gender === 'female' ? styles.female_pressed : styles.female_notPressed}
            onPress={() => switch_gender('female')}
            >
            <Text style={gender === 'female' ? styles.genderText_pressed : styles.genderText_Notpressed}>Female</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.text}>How tall are you?</Text>
        <TextInput
          mode="outlined"
          inputMode="numeric"
          style={styles.inputText}
          placeholder="170 cm"
          outlineStyle={styles.inputFields}
        />

        <Text style={styles.text}>How much do you weigh?</Text>
        <TextInput
          mode="outlined"
          inputMode="numeric"
          style={styles.inputText}
          placeholder="80 kg"
          outlineStyle={styles.inputFields}
        />

        <Text style={styles.text}>How old are you?</Text>
        <TextInput
          mode="outlined"
          inputMode="numeric"
          style={styles.inputText}
          placeholder="40"
          outlineStyle={styles.inputFields}
        />

        <Button mode="contained" style={styles.next_button}>
          Next
        </Button>
      </View>
    </SafeAreaView>
  </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  buttons: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flexGrow: 1,
  },
  container: {
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: '100%',
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 35,
    marginLeft: 60,
    marginRight: 60,
    textAlign: 'center',
    color: 'grey'
  },
  text: {
    fontSize: 13,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey'
  },
  next_button: {
    marginVertical: 10,
    width: '90%',
  },
  gender_button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '-4%',
    marginBottom: '7%',
  },
  male_notPressed: {
    width: '45%',
    height: 50,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: 'center',
  },
  female_notPressed: {
    width: '45%',
    height: 50,
    backgroundColor: 'white',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
  },
  genderText_pressed: {
    fontSize: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: '500'
  },
  genderText_Notpressed: {
    fontSize: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: '500',
    color: 'grey'
  },
  male_pressed: {
    backgroundColor: '#D3E0F8',
    width: '45%',
    height: 50,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: 'center',
  },
  female_pressed: {
    backgroundColor: '#D3E0F8',
    width: '45%',
    height: 50,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
  },
  inputText: {
    width: '90%',
    marginBottom: '7%',
    backgroundColor: 'white',
    marginTop: '-5%',
    textAlign: 'center',
    fontWeight: '500'
  },
  inputFields: {
    borderRadius: 10,
    borderWidth: 0,
    height: 50
  },
});

export default OnboardingScreen;