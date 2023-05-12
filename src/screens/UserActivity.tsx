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

const UserActivity: React.FC = () => {

    const navigation = useNavigation<RoutePropType>();
    const [activityStatus, setActivityStatus] = React.useState<string>('low');

    const options = [
        {
            inputLabelText: 'Little or no activity',
            inputText: 'Low',
        },
        {
            inputLabelText: 'Walking or cycling to work, light chores in spare time',
            inputText: 'Moderate',
        },
        {
            inputLabelText: 'Physical activity throughout the day. Active in spare time',
            inputText: 'High',
        },
        {
            inputLabelText: 'Physically demanding daily activity, Intense activity in spare time',
            inputText: 'Very high',
        }
    ]

    return (
        <Screen>
            <ScrollView bounces={false}>
                <View style={styles.scrollViewContainer}>
                    <View style={styles.titleContainer}>
                        <Title title={'What is your activity\n level?'} />
                    </View>

                    <VerticalButtons options={options} valueSetter={setActivityStatus} />

                    <Button
                        mode="contained"
                        style={styles.bottomButton}
                        onPress={() => {
                            navigation.navigate(Routes.UserGoals);
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
        marginBottom: 20,
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


export default UserActivity;