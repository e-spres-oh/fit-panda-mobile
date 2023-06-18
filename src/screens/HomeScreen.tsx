import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import Screen from '../components/layout/Screen';
import TopRowHome from '../components/TopRowComponent';
import BottomRowHome from '../components/BottomRowComponent';
import DateRowHome from '../components/DateRowComponent';
import TargetFoodComponent from '../components/TargetFoodComponent';
import DisplayedFoodsComponent from '../components/DisplayedFoodsComponent';
import { useUserStore } from '../hooks/useUserStore';
import { useFoodStore } from '../hooks/useFoodsStore';
import { useFocusEffect } from '@react-navigation/native';
import { BarCodeEvent, BarCodeScanner } from "expo-barcode-scanner";
import { StatusBar } from "expo-status-bar";

const HomeScreen: React.FC = () => {
  const { getUserProfile } = useUserStore();
  const { selectedDate, getFoods } = useFoodStore();
  const [scanned, setScanned] = useState("");
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const { showBarCodeScanner, setShowBarCodeScanner } = useFoodStore();

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const onBarCodeScanned = (data: BarCodeEvent) => {
    setScanned(data.data);
    setShowBarCodeScanner(false);
  };

  useEffect(() => {
    getUserProfile().catch((e) => console.log(e));
  }, []);

  useFocusEffect(
    useCallback(() => {
      getFoods().catch((e) => console.log(e));
    }, [selectedDate])
  );

  

  return (
    <Screen>
      <View style={styles.container}>
        <TopRowHome />
        <DateRowHome />
        <TargetFoodComponent />
        <Text style={styles.textFoods}>Foods for today</Text>
        <View style={styles.displayedFoods}>
          <DisplayedFoodsComponent />
        </View>
        <BottomRowHome />

        {showBarCodeScanner && (
            <BarCodeScanner
              onBarCodeScanned={onBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
            />
        )}
        <StatusBar style="auto" />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
  },
  displayedFoods: {
    height: '50%',
  },
  textFoods: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: '3%',
  },
});

export default HomeScreen;
