import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import Subtitle from '../components/Subtitle';
import Title from '../components/Title';
import Screen from '../components/layout/Screen';
import { Colors } from '../constants';
import { Routes } from '../routes/routes';
import { RouteParams } from '../routes/types';

type RoutePropType = StackNavigationProp<RouteParams, Routes.Home>;

const AllowanceScreen: React.FC = () => {
  const navigation = useNavigation<RoutePropType>();
  const [number, setNumber] = useState(2600);

  return (
    <Screen>
    <ScrollView>
    <View style={styles.mainContainer}>
        <View style={styles.titleContainer}>
            <Title title={'Congratulations!'} />
          </View>
          <Subtitle
            subtitle="Your custom plan is ready and you're one step closer to your goal weight"
            style={styles.subtitle}
          />
          <Text style={styles.kcalsLabel}>
            Your KCals allowance per day is
          </Text>
          <View style={styles.kcalsContainer}>
            <Text style={styles.kcals}>{number}</Text>
          </View>
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => navigation.navigate(Routes.Home)}
          >
            Start your journey!
          </Button>
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flex: 0.75,
    marginTop: 40,
  },
  subtitle: {
    marginVertical: 40,
    marginHorizontal: 15,
  },
  mainContainer: {
    justifyContent: 'center',
    flexGrow: 1,
  },
  kcalsLabel: {
    fontSize: 15,
    marginHorizontal: 50,
    marginTop: 15,
    textAlign: 'center',
    color: Colors.textLabel,
  },
  kcalsContainer: {
    backgroundColor: 'white', 
    borderRadius: 10, 
    padding: 5, 
    height: 50
  },
  kcals: {
    color: 'black', 
    fontSize: 16, 
    textAlign: 'center', 
    marginTop: 10 
  },
  button: {
    marginVertical: 30,
    width: '100%',
  },
});

export default AllowanceScreen;
