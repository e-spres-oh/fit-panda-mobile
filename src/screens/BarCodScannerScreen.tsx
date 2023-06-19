import { BarCodeEvent, BarCodeScanner } from "expo-barcode-scanner";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useFoodStore } from "../hooks/useFoodsStore";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteParams } from '../routes/types';
import { Routes } from '../routes/routes';

type RoutePropType = StackNavigationProp<RouteParams, Routes.AddFood>;

const CodeScanner = () => {

    const [showBarCodeScanner, setShowBarCodeScanner] = useState(true);
    const [scanned, setScanned] = useState("");
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const { addFood, getFoodByBarCode, foods } = useFoodStore();

    const navigation = useNavigation<RoutePropType>();

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === "granted");
        };
        getBarCodeScannerPermissions();
    }, []);

    const onBarCodeScanned = async (data: BarCodeEvent) => {
        try {
            setShowBarCodeScanner(false);
            const scannedFood = await getFoodByBarCode(Number(data.data));
            const foodId = await addFood(scannedFood.name, Math.ceil(scannedFood.kcal));
            navigation.goBack();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text>Scanned: {scanned}</Text>
            {showBarCodeScanner && (
                <BarCodeScanner
                    onBarCodeScanned={onBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
            )}
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});


export default CodeScanner;