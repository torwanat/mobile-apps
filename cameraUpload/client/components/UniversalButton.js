import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';

class UniversalButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    clicked = () => {
        this.props.onClick();
    }

    render() {
        return (
            <TouchableOpacity style={{ alignContent: "center", alignItems: "center" }} onPress={this.clicked}>
                <Text style={{ backgroundColor: this.props.bgColor ? this.props.bgColor : "blue", color: this.props.color ? this.props.color : "white", borderRadius: 5, margin: 2, padding: 3 }}> {this.props.text} </Text>
            </TouchableOpacity>
        );
    }
}

export default UniversalButton;
