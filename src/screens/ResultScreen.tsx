import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState, useContext } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, SegmentedButtons, Text, TextInput } from 'react-native-paper';
import Subtitle from '../components/Subtitle';
import Title from '../components/Title';
import Screen from '../components/layout/Screen';
import { Colors } from '../constants';
import { Routes } from '../routes/routes';
import { RouteParams } from '../routes/types';
import { AppContext } from '../components/AppContextProvider';
import { AppContextProvider } from '../components/AppContextProvider';

type RoutePropType = StackNavigationProp<RouteParams, Routes.Results>;

const ResultScreen: React.FC = () => {
  const navigation = useNavigation<RoutePropType>();
  const [value, setValue] = useState('');
  const [pressedButton, setPressedButton] = useState('low');
  const [cal, setCal] = useState(2600);
  const { useHomeRoute, setUseHomeRoute } = useContext(AppContext);

  const handleDefaultRoute = () => {
    setUseHomeRoute(!useHomeRoute);
  };


  return (
    <Screen>
      <ScrollView bounces={false}>
        <View style={styles.scrollViewContainer}>
          <View style={styles.titleContainer}>
            <Title title={'Congratulations!'} />
          </View>
          <View style={styles.inputFieldsContainer}>
            <Text style={styles.subtitle}>
              Your custom plan is ready and you're one step closer to your goal weight
            </Text>

            <Text style={styles.inputLabel}>
              Your KCals allowance per day is
            </Text>
            
            
            <TouchableOpacity disabled={true} style={styles.activityButton}>
              <Text style={styles.activityText}>{cal}</Text>
            </TouchableOpacity>

          </View>

          <Button
            mode="contained"
            style={styles.bottomButton}
            onPress={() => {
              handleDefaultRoute;
              navigation.navigate(Routes.Home);
            }}
          >
            Start your journey!
          </Button>
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
  },
  titleContainer: {
    flex: 1,
  },
  subtitle: {
    fontSize: 15,
    marginHorizontal: 50,
    textAlign: 'center',
    color: Colors.textLabel,
    marginVertical: '5%',
  },
  inputFieldsContainer: {
    flex: 4,
  },
  inputLabel: {
    fontSize: 12,
    marginHorizontal: 50,
    textAlign: 'center',
    color: Colors.textLabel,
    
  },
  activityButton: {
    backgroundColor: Colors.inputBackground,
    textAlign: 'center',
    justifyContent: 'center',
    height: 48,
    marginBottom: 20,
    marginTop: 5,
    borderRadius: 10,
  },
  activityText: {
    fontSize: 18,
    textAlign: 'center',
  },
  bottomButton: {
    bottom: 0,
    width: '100%',
    marginVertical: 20,
  },
});

export default ResultScreen;
