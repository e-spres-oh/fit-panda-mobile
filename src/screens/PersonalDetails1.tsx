import React from 'react';
import { SafeAreaView, StyleSheet, Dimensions, View } from 'react-native';
import { Button, SegmentedButtons, Text, TextInput } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteParams } from '../routes/types';
import { Routes } from '../routes/routes';
import { useNavigation } from '@react-navigation/native';
import { transparent } from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors';

type RoutePropType = StackNavigationProp<RouteParams, Routes.PersonalDetails>;

const PersonalDetails: React.FC = () => {
    const navigation = useNavigation<RoutePropType>();
    const [height, setHeight] = React.useState("170");
    const [weight, setWeight] = React.useState("80");
    const [age, setAge] = React.useState("40");
    const [value, setValue] = React.useState('male');

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mainButtonsContainer}>
                <Text style={styles.logo}>Welcome!</Text>
                <Text style={styles.underLogo}>Let’s customise Fit Panda for{'\n'}your Goals</Text>
                <Text style={styles.help}>Please select which sex we should use to calculate your calorie needs</Text>
                <SegmentedButtons
                    style={styles.segmentedButtons}
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
                />
                <Text style={styles.help}>How tall are you?</Text>
                <TextInput
                    value={height}
                    onChangeText={setHeight}
                    mode="outlined"
                    inputMode="decimal"
                    right={<TextInput.Affix text="cm" />}
                    style={styles.input}
                    outlineStyle={styles.inputField}
                />
                <Text style={styles.help}>How much do you weigh?</Text>
                <TextInput
                    value={weight}
                    onChangeText={setWeight}
                    mode="outlined"
                    inputMode="decimal"
                    right={<TextInput.Affix text="kg" />}
                    style={styles.input}
                    outlineStyle={styles.inputField}
                />
                <Text style={styles.help}>How old are you?</Text>
                <TextInput
                    value={age}
                    onChangeText={setAge}
                    mode="outlined"
                    inputMode="decimal"
                    // right={<TextInput.Affix text="cm" />}
                    style={styles.input}
                    outlineStyle={styles.inputField}
                />
            </View>
            <Button
                mode="outlined"
                style={styles.bottomButton}
                textColor='#fff'
            >
                Next
            </Button>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    inputField: {
        borderRadius: 5,
        borderWidth: 0,
        marginBottom: 32,
        backgroundColor: '#FFFFFF',
        height: 60,
    },
    mainButtonsContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        flexGrow: 1,
    },
    container: {
        backgroundColor: '#EDF1F5',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: Dimensions.get('window').height,
        width: '100%',
    },
    input: {
        textAlign: 'center',
        width: '90%',
        marginBottom: 32,
    },
    logo: {
        textAlign: 'center',
        fontSize: 30,
        marginBottom: 20,
    },
    button: {
        marginVertical: 20,
        width: '90%',
    },
    bottomButton: {
        width: '90%',
        backgroundColor: '#558AF8',
        borderColor: 'transparent'
    },
    underLogo: {
        marginHorizontal: 60,
        textAlign: 'center',
        fontSize: 16,
        color: '#666B78',
        marginBottom: 40,
    },
    help: {
        marginHorizontal: 74,
        textAlign: 'center',
        fontSize: 12,
        color: '#666B78',
    },
    segmentedButtons: {
        marginHorizontal: 25,
        borderRadius: 9,
        marginBottom: 32,
        disabledChildStyle: {
            backgroundColor: '#D3E0F8',
        }
    }
});

export default PersonalDetails;
