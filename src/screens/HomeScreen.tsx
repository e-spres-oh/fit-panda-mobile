import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { MyContext, UserProfile, defaultUserProfile } from "../store/MyStore"; 
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Routes } from '../routes/routes';
import { RouteParams } from '../routes/types';

type RoutePropType = StackNavigationProp<RouteParams, Routes.Home>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<RoutePropType>();
  const myStore = useContext(MyContext);
  const [data, setData] = useState("");
  const [name, setName] = useState("");
  

  useEffect(() => {
    if (!myStore.isLoggedIn) {
      navigation.navigate(Routes.Welcome);
    }
    myStore.fetchUserProfile().then(() => {
      setData(JSON.stringify(myStore.userProfile));
    });
  }, []);

  return (
    <View>
      <Text>{myStore.isLoggedIn}</Text>
      <Button
        title="Logout"
        onPress={() => {
          myStore.logout();
          navigation.navigate(Routes.Welcome);
        }}
      />
      {/* <Text>{"store: " + JSON.stringify(myStore)}</Text>
      <Text>{"profile: " + data}</Text> */}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});