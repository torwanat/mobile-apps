import React, { Component } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import * as Font from "expo-font";
import UniversalButton from './UniversalButton';

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
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#009688" }}>
                {
                    this.state.fontLoaded ?
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <TouchableOpacity onPress={this.handleClick}>
                                <Text style={{ fontFamily: "titleFont", fontSize: 100, lineHeight: 130, color: "#FFFFFF" }}>GEO APP</Text>
                            </TouchableOpacity>
                            <Text style={{ margin: 10, fontSize: 30, textAlign: "center", fontFamily: "titleFont", color: "#FFFFFF" }}>Find and save your position using Google Maps</Text>
                        </View>
                        :
                        <ActivityIndicator size="large" color="#0000ff" />
                }
            </View>
        );
    }
}

export default Main;
