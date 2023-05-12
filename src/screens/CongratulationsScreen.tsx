import * as React from 'react';
import { Routes } from '../routes/routes';
import { RouteParams } from '../routes/types';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { Text, TextInput } from 'react-native-paper';
import Title from '../components/Title';
import Subtitle from '../components/Subtitle';
import Screen from '../components/layout/Screen';
import { Colors } from '../constants';


type RoutePropType = StackNavigationProp<RouteParams, Routes.UserInfo>;

const CongratulationsScreen: React.FC = () => {

    const navigation = useNavigation<RoutePropType>();
    const [cal, setCal] = React.useState(2600);


    return (
        <Screen>
            <ScrollView bounces={false}>
                <View style={styles.scrollViewContainer}>
                    <View style={styles.titleContainer}>
                        <Title title={'Congratulations!'} />
                        <Subtitle
                            subtitle={'Your custom plan is ready and you’re one step closer to your goal weight'}
                            style={styles.subtitle}
                        ></Subtitle>
                    </View>

                    <View style={styles.inputFieldsContainer}>
                        <Text style={styles.inputLabel}>Your KCals allowance per day is</Text>
                        <TextInput
                            mode="outlined"
                            returnKeyType='done'
                            inputMode="numeric"
                            style={styles.input}
                            placeholder={'2600'}
                            outlineStyle={styles.inputField}
                            onChangeText={(text) => {
                                const num = Number(text);
                                if (!isNaN(num)) {
                                    setCal(num);
                                }
                            }}
                            value={cal.toString()}
                        />
                    </View>

                    <Button
                        mode="contained"
                        style={styles.bottomButton}
                        onPress={() => {
                            navigation.navigate(Routes.Congratulations);
                        }}
                    >
                        Start your journey!
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
        marginVertical: 50,
    },
    subtitle: {
        marginTop: 30,
        marginHorizontal: 20,
    },
    bottomButton: {
        bottom: 0,
        width: '100%',
        marginVertical: 20,
    },
    inputFieldsContainer: {
        flex: 4,
    },
    inputLabel: {
        fontSize: 15,
        marginHorizontal: 50,
        textAlign: 'center',
        color: Colors.textLabel,
    },
    input: {
        textAlign: 'center',
        height: 48,
        marginBottom: 20,
        marginTop: 5,
    },
    inputField: {
        borderRadius: 5,
        backgroundColor: Colors.inputBackground,
        borderWidth: 0,
    },
});


export default CongratulationsScreen;