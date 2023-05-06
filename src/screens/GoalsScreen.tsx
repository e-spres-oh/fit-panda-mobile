import React from 'react';
import { SafeAreaView, StyleSheet, Dimensions, View } from 'react-native';

import Title from '../components/Title';
import Subtitle from '../components/Subtitle';
import CustomSegmentedButtons from '../components/CustomSegmentedButtons';
import CustomButton from '../components/TextButton';
import CustomInputText from '../components/TextInput';
import ErrorMessage from '../components/ErrorMessage';

const GoalsScreen: React.FC = () => {
    const [gen, setGen] = React.useState<string>('Male');
    const [height, setHeight] = React.useState<string>('170 cm');
    const [weight, setWeight] = React.useState<string>('80 kg');
    const [age, setAge] = React.useState<string>('40');
    const [isOk, setIsOk] = React.useState<boolean>(false);
    const [errorMessage, setErrorMessage] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (height !== null && weight !== null && age !== null) {
            setIsOk(true)
        } else {
            setIsOk(false)
        }
    }, [height, weight, age])


    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.components}>
                <Title>Welcome!</Title>
                <Subtitle>Let's customise Fit Pand for your Goals</Subtitle>
                <Subtitle customStyles={[styles.normalText, { marginTop: 40 }]}>Please select witch sex we should use to calculate your calorie needs</Subtitle>

                <CustomSegmentedButtons options={['Male', 'Female']} value={gen} setValue={setGen} />

                <Subtitle customStyles={styles.normalText}>How tall are you?</Subtitle>

                <CustomInputText
                    inputMode="numeric"
                    returnKeyType='done'
                    style={styles.input}
                    placeholder='170 cm'
                    setValue={setHeight}
                    // required={true}
                />

                <Subtitle customStyles={styles.normalText}>How much do your weight?</Subtitle>

                <CustomInputText
                    inputMode="numeric"
                    returnKeyType='done'
                    style={styles.input}
                    placeholder='80 kg'
                    setValue={setWeight}
                    // required={true}
                />

                <Subtitle customStyles={styles.normalText}>How old are you?</Subtitle>

                <CustomInputText
                    inputMode="numeric"
                    returnKeyType='done'
                    style={styles.input}
                    setValue={setAge}
                    placeholder='40'
                    // required={true}
                />

                <CustomButton
                    mode="contained"
                    onPress={() => {
                        if (isOk) {
                            setErrorMessage(false)
                        } else {
                            setErrorMessage(true)
                        }
                    }}
                >
                    Next
                </CustomButton>

                {errorMessage && (
                    <ErrorMessage>
                        Please complete all required filds (*)
                    </ErrorMessage>
                )}

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').height,
        width: '100%',
        backgroundColor: "#EDF1F5",
    },
    components: {
        width: "90%",
        justifyContent: "center",
        alignContent: "center",
    },
    normalText: {
        fontSize: 12,
        marginBottom: 8,
        marginTop: 30,
    },
    input: {
        // width: '90%',
        // marginVertical: 10,
        textAlign: 'center',
    },
})

export default GoalsScreen