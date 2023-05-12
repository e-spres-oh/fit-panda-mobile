import * as React from 'react';
import { Routes } from '../routes/routes';
import { RouteParams } from '../routes/types';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

import Title from '../components/Title';
import Screen from '../components/layout/Screen';
import VerticalButtons from '../components/VerticalButtons';

type RoutePropType = StackNavigationProp<RouteParams, Routes.UserInfo>;

const GoalsScreen: React.FC = () => {

    const navigation = useNavigation<RoutePropType>();
    const [goalStatus, setGoalStatus] = React.useState<string>('Lose Weight');

    const options = [
        {
            inputText: 'Lose Weight',
        },
        {
            inputText: 'Maintain Weight',
        },
        {
            inputText: 'Gain Weight',
        },
    ]

    return (
        <Screen>
            <ScrollView bounces={false}>
                <View style={styles.scrollViewContainer}>
                    <View style={styles.titleContainer}>
                        <Title title={'What is your goal?'} />
                    </View>

                    <VerticalButtons options={options} valueSetter={setGoalStatus} />

                    <Button
                        mode="contained"
                        style={styles.bottomButton}
                        onPress={() => {
                            navigation.navigate(Routes.Congratulations);
                        }}
                    >
                        Next
                    </Button>
                </View>
            </ScrollView>
        </Screen>
    )
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        flex: 1,
        height: '100%',
    },
    titleContainer: {
        flex: 1,
        marginVertical: 30,
    },
    subtitle: {
        marginTop: 10,
        marginHorizontal: 70,
    },
    bottomButton: {
        bottom: 0,
        width: '100%',
        marginVertical: 20,
    },

});


export default GoalsScreen;