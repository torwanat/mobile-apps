import React, { Component } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import * as Font from "expo-font";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontLoaded: false
        };
    }

    componentDidMount = async () => {
        await Font.loadAsync({
            "titleFont": require("../assets/graffiti.ttf")
        });
        this.setState({ fontLoaded: true });
    }

    handleClick = () => {
        this.props.navigation.navigate("s2");
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F44336" }}>
                {
                    this.state.fontLoaded ?
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <TouchableOpacity onPress={this.handleClick}>
                                <Text style={{ fontFamily: "titleFont", fontSize: 70, lineHeight: 120, textAlign: "center", color: "#FFFFFF" }}>CAMERA APP</Text>
                            </TouchableOpacity>
                            <Text style={{ margin: 10, fontSize: 20, textAlign: "center", fontFamily: "titleFont", color: "#FFFFFF" }}>Show pictures from your gallery{"\n"}Take pictures using camera{"\n"}Save photos to your device{"\n"}Delete photos from your device{"\n"}Share photos</Text>
                        </View>
                        :
                        <ActivityIndicator size="large" color="#000000" />
                }
            </View>
        );
    }
}

export default Main;
