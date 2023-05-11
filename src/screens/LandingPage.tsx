import React from 'react';
import { StyleSheet, SafeAreaView, View, Button, Alert, Text, Image, TouchableOpacity, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LandingPage = () => {
  return (
    <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('/Users/carpencudavid/David/Espressoh/fit-panda-mobile/assets/logo.png')}
            style={styles.image} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button1} onPress={() => Alert.alert('Mai incearca :)')}>
            <Text style={{color: "white", fontSize: 17}}>Sign up for free</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button2} onPress={() => Alert.alert('Santier in lucru :(')}>
            <Text style={{fontSize: 17}}>Login</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDF1F5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  button1: {
    alignItems: 'center',
    backgroundColor: '#558AF8',
    borderRadius: 10,
    padding: 20,
    minWidth: '95%',
    marginBottom: 20,
  },
  button2: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    minWidth: '95%',
    marginBottom: 15,
    borderColor: 'lightgray',
    borderWidth: 1,
  },
  image: {
    width: windowWidth,
    height: windowHeight,
    resizeMode: 'contain',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
  },
});

export default LandingPage;
