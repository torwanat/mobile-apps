import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    clicked = () => {
        this.props.onClick(this.props.text);
    }

    render() {
        return (
            <TouchableOpacity onPress={this.clicked} style={{ backgroundColor: this.props.color, flex: this.props.flex, alignItems: "center", justifyContent: "center" }}>
                <Text> {this.props.text} </Text>
            </TouchableOpacity>
        );
    }
}

export default Button;
