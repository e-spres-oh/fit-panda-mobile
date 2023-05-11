import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, Dimensions } from 'react-native';
import { Button, SegmentedButtons, TextInput, ToggleButton } from 'react-native-paper';
// import { Colors } from '../constants';
// import { RouteProp, useNavigation } from '@react-navigation/native';
import { RouteParams } from '../routes/types';
import { Routes } from '../routes/routes';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type RoutePropType = StackNavigationProp<RouteParams, Routes.Welcome>;

const ActivityLevelScreen: React.FC = () => {
    const navigation = useNavigation<RoutePropType>();
    const [selected, setSelected] = React.useState('low');
    return (
        // <KeyboardAwareScrollView style={styles.background}>
        <SafeAreaView style={styles.container}>
          <View style={styles.mainButtonsContainer}>
            <Text style={styles.logo}>What is your activity{'\n'}level?</Text>
            <ToggleButton.Group
                onValueChange={setSelected}
                value={selected}>
                <Text style={styles.subtitle_small}>Little or no activity</Text>
                <ToggleButton
                    style={selected === 'low' ? styles.toggleButtonContainerSelected : styles.toggleButtonContainer}
                    icon={() => <View><Text>Low</Text></View>}
                    value="low"
                />
                <Text style={styles.subtitle_small}>Walking or cycling to work, light chores in spare time</Text>
                <ToggleButton
                    style={selected === 'moderate' ? styles.toggleButtonContainerSelected : styles.toggleButtonContainer}
                    icon={() => <View><Text>Moderate</Text></View>}
                    value="moderate"
                />
                <Text style={styles.subtitle_small}>Physical activity throughout the day. Active in spare time</Text>
                <ToggleButton
                    style={selected === 'high' ? styles.toggleButtonContainerSelected : styles.toggleButtonContainer}
                    icon={() => <View><Text>High</Text></View>}
                    value="high"
                />
                <Text style={styles.subtitle_small}>Physically demanding daily activity, Intense activity in spare time</Text>
                <ToggleButton
                    style={selected === 'very_high' ? styles.toggleButtonContainerSelected : styles.toggleButtonContainer}
                    icon={() => <View><Text>Very high</Text></View>}
                    value="very_high"
                />
            </ToggleButton.Group>
            <Button mode="contained" style={styles.button}
                onPress={() => {
                navigation.navigate(Routes.UserGoals);
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
      },
      logo: {
        fontSize: 30,
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
      },
      subtitle: {
        fontSize: 16,
        color: 'grey',
        textAlign: 'center',
        paddingHorizontal: 50,
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
        marginVertical: 20,
        width: '90%',
        marginBottom: 30,
      },
      toggleButtonContainerSelected: {
        backgroundColor: '#D3E0F8',
        borderRadius: 10,
        marginVertical: 20,
        width: '90%',
        marginBottom: 30,
      },
    });

export default ActivityLevelScreen;