import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView, StyleSheet, Dimensions, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { RouteParams } from '../routes/types';
import { Routes } from '../routes/routes';

type RoutePropType = StackNavigationProp<RouteParams, Routes.Welcome>;

const SignUpScreen: React.FC = () => {
    const navigation = useNavigation<RoutePropType>();
    const [hidePassword, setHidePassword] = React.useState(true);

    return (

        <SafeAreaView style={styles.container}>

            <View style={styles.appContainer}>
                <Text style={styles.title}>Sign up </Text>
                <Text style={styles.title}>and jump right in</Text>
                <Text style={styles.subtitle}>We are pretty sure you will use this thing to become better and better every day</Text>

                <TextInput
                    mode="outlined"
                    inputMode="text"
                    style={styles.input}
                    placeholder="Name"
                    outlineStyle={styles.inputField}
                />

                <TextInput
                    mode="outlined"
                    inputMode="email"
                    style={styles.input}
                    placeholder="Email"
                    outlineStyle={styles.inputField}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    mode="outlined"
                    outlineStyle={styles.inputField}
                    secureTextEntry={hidePassword}
                    right={<TextInput.Icon icon="eye" onPress={() => setHidePassword(!hidePassword)} />}
                />

                <Button
                    mode="contained"
                    style={styles.button}
                    onPress={() => {
                        navigation.navigate(Routes.Goals);
                    }}
                >
                    Register
                </Button>

            </View>


            <Button mode="text" style={styles.button}>
                Got an account? Sign In!
            </Button>
        </SafeAreaView>
    )

}

export default SignUpScreen


const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: Dimensions.get('window').height,
        width: '100%',
        backgroundColor: "#EDF1F5",
    },
    button: {
        marginVertical: 20,
        width: '100%',
    },
    appContainer: {
        padding: 24,
        width: '100%',
        alignItems: "center",
        justifyContent: "center",
        marginTop: 95,
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
    input: {
        width: '100%',
        // marginVertical: 10,
    },
    inputField: {
        borderRadius: 5,
        // backgroundColor: Colors.inputBackground,
        backgroundColor: "white",
        borderWidth: 0,
    },
})