import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, IconButton, Button, TextInput } from 'react-native-paper';
import Screen from '../components/layout/Screen';
import { Routes } from '../routes/routes';
import { RouteParams } from '../routes/types';
import { IStore, RootContext } from '../stores/rootStore';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Camera, CameraCapturedPicture, CameraType, PermissionStatus } from 'expo-camera';

type RoutePropType = StackNavigationProp<RouteParams, Routes.AddFood>;

const AddFoodScreen: React.FC = () => {
    const navigation = useNavigation<RoutePropType>();
    const rootStore = React.useContext<IStore>(RootContext);
    const [foodName, setFoodName] = useState<string>("");
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
        try {
        // rootStore.getFoods();
        rootStore.postFood(foodName, Number(kcal), 0);
        if (selectedImage) {
            const photoData = {
                uri: selectedImage.uri,
                name: foodName,
                type: 'jpg',
            }
            rootStore.addFoodImage(0, photoData)
        } else {
            console.log('SelectedImage is empty');
        }

        navigation.navigate(Routes.Home);
        } catch (e) {
            console.log(e);
        }
    };

    const revertCamera = () => {
        if (type === (Camera.Constants.Type = CameraType.back)) {
            setType(Camera.Constants.Type = CameraType.front);
        } else {
            setType(Camera.Constants.Type = CameraType.back);
        }
    }

    const onAddImagePressed = () => {
        if (hasCameraPermission === true) {
            setCameraOpen(true);
        }
    };

    const redirectHomeScreen = () => {
        navigation.navigate(Routes.Home)
    }

    const takePicture = async () => {
        if (camera) {
            const data = await camera.takePictureAsync()
            setSelectedImage(data);
            setCameraOpen(false);
        }
    };

    return (
        <>
            <Screen>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <IconButton icon="arrow-left" size={20} onPress={redirectHomeScreen} />
                        <Text style={styles.text}>Add food</Text>
                        <IconButton icon="dots-vertical" size={20} />
                    </View>

                    <View style={styles.content}>

                        <View style={styles.imageContainer} >
                            {selectedImage ? (
                                <Image
                                    source={{ uri: selectedImage.uri }}
                                    style={styles.selectedImage}
                                />
                            ) : (

                                <TouchableOpacity style={styles.buttonAddFood} onPress={onAddImagePressed}>
                                    <IconButton icon="image" size={20} />
                                    <Text style={styles.text}>Add image</Text>
                                </TouchableOpacity>

                            )}
                        </View>

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

                    <Button mode="contained" onPress={onSavePressed}>
                        Save
                    </Button>
                </View>

            </Screen>
            {
                cameraOpen && (
                    <View style={styles.cameraContainer}>

                        <View style={styles.camera}>
                            <Camera
                                ref={ref => setCamera(ref)}
                                style={styles.fixedRatio}
                                type={type}
                            />
                        </View>
                        <TouchableOpacity style={styles.takePictureButton} onPress={() => takePicture()}></TouchableOpacity>
                        <TouchableOpacity style={styles.switchCameraButton} onPress={() => revertCamera()}>
                            <IconButton icon="refresh" size={40} iconColor="#FFFFFF" />
                        </TouchableOpacity>
                    </View>
                )
            }
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 18,
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
    },
    imageContainer: {
        height: 150,
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 10,
        borderStyle: 'dashed',
        borderColor: '#B4B2BD',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 32,
        backgroundColor: 'white',
        overflow: 'hidden',
    },
    buttonAddFood: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectedImage: {
        aspectRatio: 1,
        minWidth: '100%',
        minHeight: '100%',
        borderRadius: 10,
    },
    textInput: {
        height: 50,
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: '#E6E8EC',
    },
    kcalInput: {
        width: '50%',
    },
    cameraContainer: {
        zIndex: 99999,
        height: '100%',
        width: '100%',
        backgroundColor: 'black',
        position: 'absolute',
        top: 0,
    },
    camera: {
        position: 'relative',
        top: '25%',
        width: '100%',
    },
    fixedRatio: {
        aspectRatio: 1 / 1,
    },
    takePictureButton: {
        position: 'absolute',
        bottom: '10%',
        left: '50%',
        transform: [{ translateX: -40 }],
        backgroundColor: '#E6E8EC',
        borderRadius: 40,
        borderStyle: 'solid',
        borderWidth: 5,
        borderColor: '#B4B2BD',
        height: 80,
        width: 80,
    },
    switchCameraButton: {
        position: 'absolute',
        bottom: '10%',
        left: '15%',
        transform: [{ translateX: -40 }],
        height: 80,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default AddFoodScreen;