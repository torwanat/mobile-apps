import React, { Component } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import { Dimensions } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { ToastAndroid } from "react-native";
import UniversalButton from './UniversalButton';
import FotoItem from './FotoItem';

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasLibraryPermission: null,
            layout: "grid",
            width: 0,
            height: 0,
            photos: null,
            columns: 5
        };
    }

    componentDidMount = async () => {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        this.setState({ hasLibraryPermission: status === "granted" });
        if (status === "granted") {
            const album = await MediaLibrary.getAlbumAsync("Camera");
            const rawPhotos = await MediaLibrary.getAssetsAsync({
                album: album,
                first: 100,
                mediaType: 'photo',
                sortBy: 'creationTime'
            });
            const photos = rawPhotos.assets.map(e => {
                return {
                    id: e.id,
                    uri: e.uri,
                    marked: false
                }
            });
            this.setState({ width: Math.floor((Dimensions.get("window").width - 30) / 5), height: Math.floor((Dimensions.get("window").width - 30) / 5), photos: photos })
        } else {
            ToastAndroid.showWithGravity("Nie zezwolono na dostęp do zdjęć", ToastAndroid.SHORT, ToastAndroid.CENTER);
        }
    }

    changeLayout = () => {
        if (this.state.layout === "grid") {
            this.setState({ layout: "list", width: Dimensions.get("window").width - 6, height: Math.floor(Dimensions.get("window").height / 5), columns: 1 });
        } else {
            this.setState({ layout: "grid", width: Math.floor((Dimensions.get("window").width - 30) / 5), height: Math.floor((Dimensions.get("window").width - 30) / 5), columns: 5 });
        }
    }

    selectPhoto = (uri, id) => {
        this.props.navigation.navigate("s3", { uri: uri, id: id, refreshGallery: this.refreshGallery });
    }

    refreshGallery = async () => {
        const album = await MediaLibrary.getAlbumAsync("Camera");
        const rawPhotos = await MediaLibrary.getAssetsAsync({
            album: album,
            first: 100,
            mediaType: 'photo',
            sortBy: 'creationTime'
        });
        const photos = rawPhotos.assets.map(e => {
            return {
                id: e.id,
                uri: e.uri,
                marked: false
            }
        });
        this.setState({ photos: photos });
    }

    markPhoto = (id) => {
        this.setState(prevState => {
            return {
                photos: prevState.photos.map(e => {
                    if (e.id === id) {
                        return {
                            id: e.id,
                            uri: e.uri,
                            marked: !e.marked
                        }
                    } else {
                        return e;
                    }
                })
            }
        });
    }

    deletePhotos = async () => {
        const toDelete = this.state.photos.filter(e => {
            return e.marked;
        });
        await MediaLibrary.deleteAssetsAsync(toDelete.map(e => { return e.id }));
        this.refreshGallery();
    }

    goToCamera = () => {
        this.props.navigation.navigate("s4", { refreshGallery: this.refreshGallery });
    }

    render() {
        const { hasLibraryPermission } = this.state;
        if (hasLibraryPermission === null) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#F44336" }}>
                    <ActivityIndicator size={"large"} color={"#FFFFFF"} />
                </View>
            )
        } else if (hasLibraryPermission) {
            return (
                <View style={{ flex: 1, backgroundColor: "#F44336" }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 15 }}>
                        <UniversalButton text={"Change layout"} onClick={this.changeLayout} bgColor={"#FF5722"} color={"#FFFFFF"} />
                        <UniversalButton text={"Camera"} onClick={this.goToCamera} bgColor={"#FF5722"} color={"#FFFFFF"} />
                        <UniversalButton text={"Delete selected"} onClick={this.deletePhotos} bgColor={"#FF5722"} color={"#FFFFFF"} />
                    </View>
                    {this.state.photos ? <FlatList data={this.state.photos} renderItem={({ item }) => <FotoItem width={this.state.width} height={this.state.height} uri={item.uri} id={item.id} marked={item.marked} onClick={this.selectPhoto} onHold={this.markPhoto} />} keyExtractor={item => item.id} numColumns={this.state.columns} key={this.state.columns} /> : <ActivityIndicator size={"large"} color={"#000000"} />}
                </View>
            );
        } else {
            return (
                <View style={{ flex: 1, justifyContent: "center", backgroundColor: "#F44336" }}>
                    <Text style={{ textAlign: "center", fontSize: 20, color: "#FFFFFF" }}> Nie przyznano uprawnien do wyświetlania zdjęć </Text>
                </View>
            );
        }
    }
}

export default Gallery;
