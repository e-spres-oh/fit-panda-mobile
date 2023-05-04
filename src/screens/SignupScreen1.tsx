import React from 'react';
import { SafeAreaView, StyleSheet, Dimensions, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteParams } from '../routes/types';
import { Routes } from '../routes/routes';
import { useNavigation } from '@react-navigation/native';

type RoutePropType = StackNavigationProp<RouteParams, Routes.Signup1>;

const SignupScreen: React.FC = () => {
    const navigation = useNavigation<RoutePropType>();
    const [hidePassword, setHidePassword] = React.useState(true);
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mainButtonsContainer}>
                <Text style={styles.logo}>Sign up {'\n'}and jump right in</Text>
                <Text style={styles.underLogo}>We are pretty sure you will use this thing to become better and better every day</Text>
                <TextInput
                    value={name}
                    onChangeText={setName}
                    mode="outlined"
                    inputMode="text"
                    style={styles.input}
                    placeholder="Name"
                    outlineStyle={styles.inputField}
                />
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    mode="outlined"
                    inputMode="email"
                    style={styles.input}
                    placeholder="Email"
                    outlineStyle={styles.inputField}
                />
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                    placeholder="Password"
                    mode="outlined"
                    outlineStyle={styles.inputField}
                    secureTextEntry={hidePassword}
                    right={<TextInput.Icon icon="eye" onPress={() => setHidePassword(!hidePassword)} />}
                />
                <Button 
                mode="contained" 
                style={styles.button} disabled={name == "" || email == "" || password == ""}
                onPress={() => {
                    navigation.navigate(Routes.PersonalDetails);
                }}
                >
                    Register
                </Button>
            </View>
            <Button
                mode="text"
                style={styles.bottomButton}
                textColor='#666B78'
                onPress={() => {
                    navigation.pop();
                    navigation.navigate(Routes.Login);
                }}
            >
                Got an account? Sign In!
            </Button>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    inputField: {
        borderRadius: 5,
        borderWidth: 0,
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
        width: '90%',
        marginVertical: 10,
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
    },
    underLogo: {
        marginHorizontal: 60,
        textAlign: 'center',
        fontSize: 16,
        color: '#666B78'
    }
});

export default SignupScreen;
