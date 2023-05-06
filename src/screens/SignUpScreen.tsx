import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { SafeAreaView, StyleSheet, Dimensions, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RouteParams } from '../routes/types';
import { Routes } from '../routes/routes';

import CustomButton from '../components/TextButton';
import CustomInputText from '../components/TextInput';
import Title from '../components/Title';
import Subtitle from '../components/Subtitle';
import ErrorMessage from '../components/ErrorMessage';

type RoutePropType = StackNavigationProp<RouteParams, Routes.Welcome>;

const SignUpScreen: React.FC = () => {

    const navigation = useNavigation<RoutePropType>();
    const [hidePassword, setHidePassword] = React.useState(true);
    const [name, setName] = React.useState<string | null>(null);
    const [email, setEmail] = React.useState<string | null>(null);
    const [password, setPassword] = React.useState<string | null>(null);
    const [isOk, setIsOk] = React.useState<boolean>(false);
    const [errorMessage, setErrorMessage] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (name !== null && email !== null && password !== null) {
            setIsOk(true)
        } else {
            setIsOk(false)
        }
    }, [name, email, password])

    return (

        <SafeAreaView style={styles.container}>

            <View style={styles.appContainer}>
                <Title>Sign up</Title>
                <Title>and jump right in</Title>
                <Subtitle>We are pretty sure you will use this thing to become better and better every day</Subtitle>

                <CustomInputText
                    inputMode="text"
                    label="Name"
                    required={true}
                    setValue={setName}
                />

                <CustomInputText
                    inputMode="email"
                    label="Email"
                    required={true}
                    setValue={setEmail}
                />

                <CustomInputText
                    inputMode='text'
                    label="Password"
                    secureTextEntry={hidePassword}
                    right={<TextInput.Icon icon="eye" onPress={() => setHidePassword(!hidePassword)} />}
                    required={true}
                    setValue={setPassword}
                />

                <CustomButton
                    mode="contained"
                    onPress={() => {
                        if (isOk) {
                            setErrorMessage(false)
                            navigation.navigate(Routes.Goals);
                        } else {
                            setErrorMessage(true)
                        }
                    }}
                >
                    Register
                </CustomButton>

                {errorMessage && (
                    <ErrorMessage>
                        Please complete all required filds (*)
                    </ErrorMessage>
                )}

            </View>


            <CustomButton
                mode="text"
                customStyles={styles.button}>
                Got an account? Sign In!
            </CustomButton>
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
        backgroundColor: "transparent",
    },
    appContainer: {
        padding: 24,
        width: '100%',
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 1,
    },
})