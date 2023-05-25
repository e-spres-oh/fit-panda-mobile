import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import { Text, IconButton, Button, TextInput } from 'react-native-paper';
import Title from '../components/Title';
import Screen from '../components/layout/Screen';
import { Colors } from '../constants';
import { Routes } from '../routes/routes';
import { RouteParams } from '../routes/types';
import { UserGoal } from '../types';
import { IStore, RootContext } from '../stores/rootStore';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Camera, CameraCapturedPicture, CameraType, PermissionStatus } from 'expo-camera';

type RoutePropType = StackNavigationProp<RouteParams, Routes.AddFood>;

const AddFoodScreen: React.FC = () => {
  const navigation = useNavigation<RoutePropType>();
  const rootStore = React.useContext<IStore>(RootContext);
  const user = rootStore.getUser();
  const [foodName, setFoodName] = useState("");
  const [kcal, setKcal] = useState("");
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [camera, setCamera] = useState<Camera | null>(null);
  const [selectedImage, setSelectedImage] = useState<CameraCapturedPicture | null>(null);
  const [type, setType] = useState(Camera.Constants.Type = CameraType.back);
  const [cameraOpen, setCameraOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === PermissionStatus.GRANTED);
    })();
  }, []);

  const onSavePressed = () => {
    navigation.navigate(Routes.Home);
    // put name, kcal, optionally the image on the server
  };

  const onAddImagePressed = async () => {
    if (hasCameraPermission === true) {
      setCameraOpen(true);
    }
  };

  const takePicture = async () => { 
    if(camera){
        const data = await camera.takePictureAsync()
        setSelectedImage(data);
        setCameraOpen(false);
    }
  };

  return (
    <Screen>
      {cameraOpen ? (
        <View style={{ flex : 1 }}>
          <View style={styles.cameraContainer}>
            <Camera 
            ref={ref => setCamera(ref)}
            style={styles.fixedRatio} 
            type={type}
            ratio={'1:1'} />
          </View>
          <Button onPress={() => takePicture()}>Take picture</Button>
        </View>
        )
        : (//
          <View style={styles.container}>
          <View style={styles.topRowContainer}>
            <IconButton icon="arrow-left" size={24} onPress={() => navigation.navigate(Routes.Home)}/>
            <Text style={styles.topText}>Add food</Text>
            <IconButton icon="dots-vertical" size={24} onPress={() => {}}/>
          </View>
  
          <View style={styles.content}>
            <TouchableOpacity style={styles.imageContainer} onPress={onAddImagePressed}>
              {selectedImage ? (
                <Image
                  source={{ uri: selectedImage.uri }}
                  style={styles.selectedImage}
                />
                ) : (
                <>
                  <IconButton icon="image" size={36} />
                  <Text>Add image</Text>
                </>
              )}
            </TouchableOpacity>
            <TextInput
              style={styles.textInput}
              placeholder="Food name"
              mode="outlined"
              outlineStyle={styles.textInput}
              value={foodName}
              keyboardType="default"
              onChangeText={(text) => setFoodName(text)}
            />
            <TextInput
              style={[styles.textInput, styles.kcalInput]}
              placeholder="0 kcal"
              mode="outlined"
              outlineStyle={styles.textInput}
              value={kcal}
              keyboardType="numeric"
              onChangeText={(text) => setKcal(text)}
            />
          </View>
  
          <Button mode="contained" style={styles.saveButton} onPress={onSavePressed}>
            Save
          </Button>
          </View>
        )
      };
     
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  topRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  topText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  saveButton: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  imageContainer: {
    height: '25%',
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  selectedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  textInput: {
    marginBottom: 16,
    height: 40,
    borderRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  kcalInput: {
    width: '50%',
  },
  cameraContainer: {
    flex: 1,
  },
  fixedRatio:{
      flex: 1,
      aspectRatio: 1
  }
});

export default AddFoodScreen;
