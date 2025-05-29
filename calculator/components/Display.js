import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Display extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{
                flex: this.props.flex,
                backgroundColor: this.props.color,
                alignItems: "center",
                justifyContent: "center",
                borderStyle: "solid",
                borderColor: "white",
                borderWidth: 1
            }}>
                <Text style={{ color: "white" }}> {this.props.text} </Text>
            </View>
        );
    }
}

export default Display;
