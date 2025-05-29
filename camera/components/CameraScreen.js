import React, { Component } from 'react';
import { View, Text, ActivityIndicator, BackHandler } from 'react-native';
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import Plus from "../assets/plus.png";
import Refresh from "../assets/refresh.png";
import Mystery from "../assets/mystery.png";
import CircleButton from './CircleButton';

class CameraScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
        };
    }

    componentDidMount = async () => {
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
        const { status } = await Camera.requestCameraPermissionsAsync();
        this.setState({ hasCameraPermission: status === "granted" });
    }

    takePhoto = async () => {
        if (this.camera) {
            const photo = await this.camera.takePictureAsync();
            const asset = await MediaLibrary.createAssetAsync(photo.uri);
            const album = await MediaLibrary.getAlbumAsync("Camera");
            await MediaLibrary.addAssetsToAlbumAsync(asset, album, false);
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

    mysteryFunction = () => {
        console.log("What is this...?");
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
                                <CircleButton radius={80} image={Mystery} onClick={this.mysteryFunction} margin={50} />
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
