import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';

class CircleButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <TouchableOpacity style={{ width: this.props.radius, height: this.props.radius, borderRadius: 50, backgroundColor: "gray", opacity: 0.5, margin: this.props.margin }} onPress={this.props.onClick}>
                <Image source={this.props.image} resizeMode='cover' style={{ flex: 1, width: "100%", height: "100%" }} />
            </TouchableOpacity>
        );
    }
}

export default CircleButton;
