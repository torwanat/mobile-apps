import React, { Component } from 'react';
import { View, Text, ActivityIndicator, BackHandler, Dimensions, ToastAndroid } from 'react-native';
import { Camera, FlashMode, WhiteBalance } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import Plus from "../assets/plus.png";
import Refresh from "../assets/refresh.png";
import Settings from "../assets/settings.png";
import CircleButton from './CircleButton';
import SettingsMenu from './SettingsMenu';

class CameraScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            menuHidden: true,
            windowHeight: 0,
            ratio: "4:3",
            whiteBalance: "auto",
            pictureSize: null,
            flashMode: "auto",
            settings: []
        };
    }

    componentDidMount = async () => {
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
        const { status } = await Camera.requestCameraPermissionsAsync();
        const height = Dimensions.get("window").height;
        this.setState({ hasCameraPermission: status === "granted", windowHeight: height });
    }

    takePhoto = async () => {
        if (this.camera) {
            const photo = await this.camera.takePictureAsync();
            const asset = await MediaLibrary.createAssetAsync(photo.uri);
            // const album = await MediaLibrary.getAlbumAsync("DCIM");
            // await MediaLibrary.addAssetsToAlbumAsync(asset, album, false);
            ToastAndroid.showWithGravity("Zrobiono zdjęcie", ToastAndroid.SHORT, ToastAndroid.CENTER);
        }
    }

    handleBackPress = async () => {
        if (this.state.menuHidden) {
            await this.props.route.params.refreshGallery();
            this.props.navigation.goBack();
            return true;
        } else {
            this.setState({ menuHidden: true });
        }
    }

    changeCamera = async () => {
        this.setState({ type: this.state.type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back });
        await this.getCameraParams();
    }

    toggleSettings = () => {
        this.setState(prevState => { return { menuHidden: !prevState.menuHidden } });
    }

    getCameraParams = async () => {
        const whiteBalances = Camera.Constants.WhiteBalance;
        const flashModes = Camera.Constants.FlashMode;
        const sizes = await this.camera.getAvailablePictureSizesAsync(this.state.ratio);
        const whiteBalancesGroup = {
            title: "White balance",
            default: this.state.whiteBalance,
            values: Object.entries(whiteBalances)
        }
        const flashModesGroup = {
            title: "Flash mode",
            default: this.state.flashMode,
            values: Object.entries(flashModes)
        }
        const sizesGroup = {
            title: "Picture size",
            default: this.state.pictureSize ? this.state.pictureSize : sizes[3],
            values: sizes.map(e => { return [e, e] })
        }
        const ratiosGroup = {
            title: "Ratio",
            default: this.state.ratio,
            values: [["4:3", "4:3"], ["16:9", "16:9"]]
        }
        this.setState({
            whiteBalance: whiteBalances.auto,
            flashMode: flashModes.auto,
            pictureSize: sizes[3],
            ratio: "4:3",
            settings: [whiteBalancesGroup, flashModesGroup, sizesGroup, ratiosGroup]
        });
    }

    changeParamValue = (param, value) => {
        console.log(param, value);
        switch (param) {
            case "White balance":
                this.setState({ whiteBalance: value });
                break;
            case "Flash mode":
                this.setState({ flashMode: value });
                break;
            case "Picture size":
                this.setState({ pictureSize: value });
                break;
            case "Ratio":
                this.setState({ ratio: value });
                break;
            default:
                console.log("Unrecognised param type!");
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
                    <Camera ref={ref => { this.camera = ref; }} style={{ flex: 1 }} onCameraReady={this.getCameraParams} type={this.state.type} ratio={this.state.ratio} whiteBalance={this.state.whiteBalance} flashMode={this.state.flashMode} pictureSize={this.state.pictureSize ? this.state.pictureSize : null}>
                        <View style={{ flex: 1, justifyContent: "flex-end" }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                <CircleButton radius={80} image={Refresh} onClick={this.changeCamera} margin={50} />
                                <CircleButton radius={100} image={Plus} onClick={this.takePhoto} margin={50} />
                                <CircleButton radius={80} image={Settings} onClick={this.toggleSettings} margin={50} />
                            </View>
                            {this.state.settings.length ? <SettingsMenu isHidden={this.state.menuHidden} height={this.state.windowHeight} settings={this.state.settings} changeParam={this.changeParamValue} /> : <></>}
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
