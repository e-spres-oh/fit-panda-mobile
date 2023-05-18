import * as React from 'react';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

import Title from '../components/Title';
import Screen from '../components/layout/Screen';
import { Colors } from '../constants';
import { Routes } from '../routes/routes';
import { RouteParams } from '../routes/types';
import Subtitle from '../components/Subtitle';
import { MyContext } from "../store/myStore";

type RoutePropType = StackNavigationProp<RouteParams, Routes.SignUpCongrats>;
type UserProfile = {
    name: string;
    sex: string;
    height: number;
    weight: number;
    age: number;
    activity: string;
    goal: string;
    target: number;
    userId: number;
};

const HomeScreen: React.FC = () => {
    // const navigation = useNavigation<RoutePropType>();
    const myStore = React.useContext(MyContext);
    const navigation = useNavigation<RoutePropType>();
    const [userProfile, setUserProfile] = React.useState<UserProfile | null>(null);
    const getProfile = async () => {
        try {
            myStore.userProfile = await myStore.fetchUserProfile();
            //pentru a randa datele
            setUserProfile(myStore.userProfile);
            if (myStore.userProfile.name === 'PLACEHOLDER' || myStore.userProfile.name === undefined) {
                throw "user undefined";
            }

        } catch (e) {
            console.log(e);
            navigation.navigate(Routes.Welcome);
        }
    }

    React.useEffect(() => {
        getProfile();
    }, [])

    return (
        <Screen>
            <ScrollView contentContainerStyle={styles.scrollViewContainer} bounces={false}>
                <Title title={'Home!'} />
                <Text>
                    Welcome, {userProfile !== null ? userProfile.name : 'User profile is empty'}!
                </Text>
                <Text>
                    {myStore.isLoggedIn ? 'true' : 'false'}
                </Text>
            </ScrollView>
        </Screen>
    )

}


const styles = StyleSheet.create({
    scrollViewContainer: {
        flex: 1,
    },
    inputFieldsContainer: {
        flex: 3,
        marginTop: 30,
    },
    button: {
        backgroundColor: Colors.inputBackground,
        borderWidth: 0,
        justifyContent: 'center',
        marginTop: 10,
    },
    nextButton: {
        marginTop: 40,
    },
    inputLabel: {
        fontSize: 15,
        marginHorizontal: 50,
        textAlign: 'center',
        color: Colors.textLabel,
    },
    inputField: {
        borderRadius: 5,
        backgroundColor: Colors.inputBackground,
        borderWidth: 0,
    },
    input: {
        textAlign: 'center',
        height: 48,
        marginBottom: 20,
        marginTop: 5,
    },
    subtitle: {
        marginTop: 10,
        marginHorizontal: 50,
    },
});

export default HomeScreen