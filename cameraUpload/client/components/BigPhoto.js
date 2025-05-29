import React, { Component } from 'react';
import { View, Image, ActivityIndicator, ToastAndroid, LogBox } from 'react-native';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from "expo-media-library";
import * as SecureStore from 'expo-secure-store';
import UniversalButton from './UniversalButton';

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
    'Key "cancelled" in the image picker result is deprecated and will be removed in SDK 48, use "canceled" instead'
]);

class BigPhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            server: ""
        };
    }

    componentDidMount = async () => {
        const ip = await SecureStore.getItemAsync("ip");
        const port = await SecureStore.getItemAsync("port");
        this.setState({ server: "http://" + ip + ":" + port + "/upload" });
    }

    sharePhoto = async () => {
        this.setState({ loading: true });
        if (await Sharing.isAvailableAsync()) {
            this.setState({ loading: false });
            Sharing.shareAsync(this.props.route.params.uri);
        } else {
            this.setState({ loading: false });
            ToastAndroid.showWithGravity("Nie udało się udostępnić zdjęcia", ToastAndroid.SHORT, ToastAndroid.CENTER);
        }
    }

    deletePhoto = async () => {
        await MediaLibrary.deleteAssetsAsync([this.props.route.params.id]);
        this.props.route.params.refreshGallery();
        this.props.navigation.goBack();
    }

    uploadPhoto = async () => {
        const data = new FormData();

        const fileName = this.props.route.params.uri.substring(this.props.route.params.uri.lastIndexOf("/") + 1, this.props.route.params.uri.length);

        data.append("photo", {
            uri: this.props.route.params.uri,
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

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#F44336" }}>
                <View style={{ flex: 4, margin: 5 }}>
                    <Image resizeMode='cover' style={{ width: "100%", height: "100%", borderRadius: 10 }} source={{ uri: this.props.route.params.uri }} />
                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                    <UniversalButton text={"Share"} onClick={this.sharePhoto} bgColor={"#FF5722"} color={"#FFFFFF"} />
                    <UniversalButton text={"Delete"} onClick={this.deletePhoto} bgColor={"#FF5722"} color={"#FFFFFF"} />
                    <UniversalButton text={"Upload"} onClick={this.uploadPhoto} bgColor={"#FF5722"} color={"#FFFFFF"} />
                </View>
                {this.state.loading ? <ActivityIndicator size={"large"} color={"#FFFFFF"} style={{ position: "absolute", top: "50%", left: "50%", marginTop: -18, marginLeft: -18 }} /> : ""}
            </View>
        );
    }
}

export default BigPhoto;
