import React, { Component } from 'react';
import { View, Image, ActivityIndicator, ToastAndroid, LogBox } from 'react-native';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from "expo-media-library";
import UniversalButton from './UniversalButton';

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

class BigPhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
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

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#F44336" }}>
                <View style={{ flex: 4, margin: 5 }}>
                    <Image resizeMode='cover' style={{ width: "100%", height: "100%", borderRadius: 10 }} source={{ uri: this.props.route.params.uri }} />
                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                    <UniversalButton text={"Share"} onClick={this.sharePhoto} bgColor={"#FF5722"} color={"#FFFFFF"} />
                    <UniversalButton text={"Delete"} onClick={this.deletePhoto} bgColor={"#FF5722"} color={"#FFFFFF"} />
                </View>
                {this.state.loading ? <ActivityIndicator size={"large"} color={"#FFFFFF"} style={{ position: "absolute", top: "50%", left: "50%", marginTop: -18, marginLeft: -18 }} /> : ""}
            </View>
        );
    }
}

export default BigPhoto;
