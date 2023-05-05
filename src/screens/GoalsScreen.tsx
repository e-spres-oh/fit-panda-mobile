import React from 'react';
import { SafeAreaView, StyleSheet, Dimensions, View } from 'react-native';
import { Button, Text, TextInput, SegmentedButtons } from 'react-native-paper';


const GoalsScreen: React.FC = () => {
    const [value, setValue] = React.useState('male');

    return (
        <SafeAreaView style={styles.container}>

            <Text style={styles.title}>Welcome!</Text>
            <Text style={styles.subtitle}>Let's customise Fit Pand for your Goals</Text>
            <Text style={[styles.subtitle, styles.normalText]}>Please select witch sex we should use to calculate your calorie needs</Text>

            <View style={styles.buttonsContainer}>
                <SegmentedButtons
                    value={value}
                    onValueChange={setValue}
                    style={{ backgroundColor: '#D3E0F8', borderWidth: 0 }}
                    buttons={[
                        {
                            uncheckedColor: '#666B78',
                            value: 'male',
                            label: 'Male',
                        },
                        {
                            uncheckedColor: '#666B78',
                            value: 'female',
                            label: 'Female',
                        },
                    ]}
                />
            </View>

            <Text style={styles.normalText}>How tall are you?</Text>

            <TextInput
                mode="outlined"
                inputMode="text"
                style={styles.input}
                placeholder="170 cm"
                outlineStyle={styles.inputField}
            />

            <Text style={styles.normalText}>How much do your weight?</Text>

            <TextInput
                mode="outlined"
                inputMode="text"
                style={styles.input}
                placeholder="80 kg"
                outlineStyle={styles.inputField}
            />

            <Text style={styles.normalText}>How old are you?</Text>

            <TextInput
                mode="outlined"
                inputMode="text"
                style={styles.input}
                placeholder="40"
                outlineStyle={styles.inputField}
            />

            <Button
                mode="contained"
                style={styles.button}
                // onPress={() => {
                //     navigation.navigate(Routes.Goals);
                // }}
            >
                Next
            </Button>

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
    title: {
        fontSize: 30,
        fontWeight: "500",
        textAlign: "center",
    },
    subtitle: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "400",
        marginTop: 8,
        paddingLeft: 35,
        paddingRight: 35,
        marginBottom: 32,
    },
    normalText: {
        fontSize: 12,
        marginTop: 40,
        marginBottom: 0,
    },
    buttonsContainer: {
        width: '90%',
        // padding: 25,
    },
    input: {
        width: '90%',
        // marginVertical: 10,
        textAlign: 'center',
    },
    inputField: {
        borderRadius: 5,
        // backgroundColor: Colors.inputBackground,
        backgroundColor: "white",
        borderWidth: 0,
    },
    button: {
        marginVertical: 20,
        width: '90%',
    },

})

export default GoalsScreen