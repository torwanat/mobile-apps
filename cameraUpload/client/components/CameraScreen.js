import React, { Component } from 'react';
import { View, Text, ActivityIndicator, BackHandler, ToastAndroid } from 'react-native';
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';
import Plus from "../assets/plus.png";
import Refresh from "../assets/refresh.png";
import Choose from "../assets/choose.png";
import CircleButton from './CircleButton';

class CameraScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            server: ""
        };
    }

    componentDidMount = async () => {
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
        const { status } = await Camera.requestCameraPermissionsAsync();
        const ip = await SecureStore.getItemAsync("ip");
        const port = await SecureStore.getItemAsync("port");
        this.setState({ hasCameraPermission: status === "granted", server: "http://" + ip + ":" + port + "/upload" });
    }

    takePhoto = async () => {
        if (this.camera) {
            const photo = await this.camera.takePictureAsync();
            const asset = await MediaLibrary.createAssetAsync(photo.uri);
            // const album = await MediaLibrary.getAlbumAsync("Camera");
            // await MediaLibrary.addAssetsToAlbumAsync(asset, album, false);
        }
    }

    handleBackPress = async () => {
        await this.props.route.params.refreshGallery();
        this.props.navigation.goBack();
        return true;
    }

    changeCamera = () => {
        this.setState({ type: this.state.type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back });
    }

    pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {

            const data = new FormData();
            const fileName = result.assets[0].uri.substring(result.assets[0].uri.lastIndexOf("/") + 1, result.assets[0].uri.length);

            data.append("photo", {
                uri: result.assets[0].uri,
                type: "image/jpeg",
                name: fileName
            });

            const response = await fetch(this.state.server, {
                method: "POST",
                body: data
            });
            const json = await response.json();
            if (json === "OK") {
                ToastAndroid.showWithGravity("Przesłano zdjęcie!", ToastAndroid.SHORT, ToastAndroid.CENTER);
            } else {
                ToastAndroid.showWithGravity("Błąd w przesyłaniu zdjęcia", ToastAndroid.SHORT, ToastAndroid.CENTER);
            }
        }
    }

    componentWillUnmount = () => {
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
    }

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size={"large"} color={"#000000"} />
                </View>
            )
        } else if (hasCameraPermission) {
            return (
                <View style={{ flex: 1 }}>
                    <Camera ref={ref => { this.camera = ref; }} style={{ flex: 1 }} type={this.state.type}>
                        <View style={{ flex: 1, justifyContent: "flex-end" }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                <CircleButton radius={80} image={Refresh} onClick={this.changeCamera} margin={50} />
                                <CircleButton radius={100} image={Plus} onClick={this.takePhoto} margin={50} />
                                <CircleButton radius={80} image={Choose} onClick={this.pickImage} margin={50} />
                            </View>
                        </View>
                    </Camera>
                </View >
            );
        } else {
            return (
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text style={{ textAlign: "center", fontSize: 20 }}> Nie przyznano uprawnien do używania kamery </Text>
                </View>
            );
        }
    }
}

export default CameraScreen;
