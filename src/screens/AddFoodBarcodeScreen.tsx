import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useState } from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Dimensions,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { RouteParams } from '../routes/types';
import { Routes } from '../routes/routes';
import { useNavigation } from '@react-navigation/native';
import { Photo } from '../types';
import CameraComponent from '../components/CameraComponent';
import { CameraCapturedPicture } from 'expo-camera';
import { useBackHardwareButtonAndGestureHandler } from '../hooks/useBackHardwareButtonAndGestureHandler';
import { useBackSoftwareButton } from '../hooks/useBackSoftwareButton';
import { useFoodStore } from '../hooks/useFoodsStore';
import { BarCodeEvent, BarCodeScanner } from 'expo-barcode-scanner';

type RoutePropType = StackNavigationProp<RouteParams, Routes.AddFoodBarcode>;

const AddFoodBarcodeScreen: React.FC = () => {
  const { addFood, addFoodImage, getInfoFromBarCode } = useFoodStore();
  const [name, setName] = useState('');
  const [kcal, setKcal] = useState(0);
  const [image, setImage] = useState<CameraCapturedPicture | null>(null);
  const navigation = useNavigation<RoutePropType>();
  const [showCamera, setShowCamera] = useState(false);
  const [showBarCodeScanner, setShowBarCodeScanner] = useState(false);

  const backHandler = useCallback(() => {
    if (showBarCodeScanner) {
      setShowBarCodeScanner(false);
      return true;
    }
    if (showCamera) {
      setShowCamera(false);
      return true;
    }
    return false;
  }, [showCamera]);

  useBackHardwareButtonAndGestureHandler(backHandler);

  useBackSoftwareButton(backHandler);

  const onSubmit = async () => {
    try {
      const foodId = await addFood(name, kcal);
      if (foodId && image) {
        await addFoodImage(foodId, { uri: image?.uri, name: '', type: '' } as Photo);
      }
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  const onPictureTacken = (picture: CameraCapturedPicture) => {
    setShowCamera(false);
    setImage(picture);
  };

  const openCamera = () => {
    setShowCamera(true);
    Keyboard.dismiss();
  };

  const onBarCodeScanned = async (data: BarCodeEvent) => {
    setShowBarCodeScanner(false);
    try {
      const foodScanned = await getInfoFromBarCode(data.data);
      console.log(foodScanned);
      if (foodScanned != null) {
        setName(foodScanned.name);
        setKcal(Math.round(foodScanned.kcal));
        if (foodScanned.imageUrl) {
          setImage({ uri: foodScanned.imageUrl } as CameraCapturedPicture);
        }
      } else {
        alert(`The food item with ${data.data} was not found`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <TouchableOpacity onPress={openCamera}>
              <View style={styles.imageContainer}>
                {image ? (
                  <Image source={{ uri: image.uri }} style={styles.image} />
                ) : (
                  <Text>Add Image</Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.foodNameContainer}>
            <TextInput
              label="Food name"
              value={name}
              onChangeText={setName}
              style={styles.textInputFoodName}
              underlineStyle={{ display: 'none' }}
            />
            <Button icon="barcode" mode="text" onPress={() => setShowBarCodeScanner(true)}>
              Scan
            </Button>
          </View>
          <TextInput
            label="Kcal"
            keyboardType="numeric"
            value={kcal ? kcal.toString() : ''}
            onChangeText={(v) => setKcal(v ? parseInt(v) : 0)}
            style={[styles.textInput, { width: '30%' }]}
            underlineStyle={{ display: 'none' }}
          />
        </View>
      </ScrollView>
      <Button mode="contained" style={styles.button} onPress={onSubmit} disabled={!name}>
        Save
      </Button>
      {showBarCodeScanner && (
        <View style={styles.barcodeScannerContainer}>
          <BarCodeScanner
            onBarCodeScanned={onBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        </View>
      )}
      {showCamera && <CameraComponent onPictureTaken={onPictureTacken} />}
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  closeBarcode: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    left: 16,
  },
  barcodeScannerContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
  },
  textInputFoodName: {
    flexGrow: 1,
  },
  foodNameContainer: {
    flexDirection: 'row',
    alignContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  textInput: {
    marginBottom: 16,
    borderRadius: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  button: {
    margin: 20,
    marginBottom: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    margin: 16,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.3)',
    borderStyle: 'dashed',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddFoodBarcodeScreen;
