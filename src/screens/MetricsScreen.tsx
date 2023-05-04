import React from 'react';
import { SafeAreaView, StyleSheet, Dimensions, View } from 'react-native';
import { Button, SegmentedButtons, Text, TextInput, ToggleButton } from 'react-native-paper';
import { Routes } from '../routes/routes';
import { useNavigation } from '@react-navigation/native';
import { RouteParams } from '../routes/types';
import { StackNavigationProp } from '@react-navigation/stack';
// import { Colors } from '../constants';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { Routes } from '../routes/routes';
// import { RouteProp, useRoute } from '@react-navigation/native';
// import { RouteParams } from '../routes/types';

// type RouteType = RouteProp<RouteParams, Routes.Login>;
type RoutePropType = StackNavigationProp<RouteParams, Routes.Metrics>;

const MetricsScreen: React.FC = () => {
  const [value, setValue] = React.useState('male');
  const [selected, setSelected] = React.useState('male');
  //   const route = useRoute<RouteType>();
  const navigation = useNavigation<RoutePropType>();

  return (
    // <KeyboardAwareScrollView style={styles.background}>
    <SafeAreaView style={styles.container}>
      <View style={styles.mainButtonsContainer}>
        <Text style={styles.logo}>Welcome!</Text>
        <Text style={styles.subtitle}>Let's customise Fit Panda for{'\n'}your Goals</Text>
        <Text style={styles.subtitle_small}>Please select witch sex we should use to calculate{'\n'} your calorie needs</Text>
        <ToggleButton.Row 
          onValueChange={setSelected}
          value={selected}>
          <ToggleButton
            style={selected === 'male' ? styles.toggleButtonContainerSelected : styles.toggleButtonContainer}
            icon={() => <View><Text>Male</Text></View>}
            value="male"
          />
          <ToggleButton
            style={selected === 'female' ? styles.toggleButtonContainerSelected : styles.toggleButtonContainer}
            icon={() => <View><Text>Female</Text></View>}
            value="female"
          />
        </ToggleButton.Row>
        {/* <SegmentedButtons style={styles.segmentedButtonsContainer}
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: 'male',
            label: 'Male',
          },
          {
            value: 'female',
            label: 'Female',
          },
        ]}
      /> */}

       {/* TODO: Scrollable wheel */}

        <Text style={styles.subtitle_small}>How tall are you?</Text>
        <TextInput
          mode="outlined"
          inputMode="numeric"
          style={styles.input}
          placeholder="170 cm"
          outlineStyle={styles.inputField}
        />
        <Text style={styles.subtitle_small}>How much do you weigh?</Text>
        <TextInput
          mode="outlined"
          inputMode="numeric"
          style={styles.input}
          placeholder="80 kg"
          outlineStyle={styles.inputField}
        />
        <Text style={styles.subtitle_small}>How old are you?</Text>
        <TextInput
          mode="outlined"
          inputMode="numeric"
          style={styles.input}
          placeholder="40"
          outlineStyle={styles.inputField}
        />
        <Button mode="contained" style={styles.button}
        onPress={() => {
          navigation.navigate(Routes.ActivityLevel);
        }}>
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
  segmentedButtonsContainer: {
    borderRadius: 5,
    paddingHorizontal: 20,
    color: 'blue',
  },
  input: {
    width: '90%',
    marginVertical: 10,
    alignItems: 'center',
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
    paddingHorizontal: 50,
    marginBottom: 20,
  },
  subtitle_small: {
    fontSize: 12,
    color: '#666B78',
    textAlign: 'center',
    paddingHorizontal: 50,
    marginTop: 20,
  },
  button: {
    marginVertical: 20,
    width: '90%',
  },
  toggleButtonContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 10,
    width: '45%',
    marginBottom: 10,
  },
  toggleButtonContainerSelected: {
    backgroundColor: '#D3E0F8',
    borderRadius: 10,
    marginVertical: 10,
    width: '45%',
    marginBottom: 10,
  },
});

export default MetricsScreen;
