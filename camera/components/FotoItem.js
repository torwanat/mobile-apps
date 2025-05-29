import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Tick from "../assets/tick.png";

class FotoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleClick = () => {
        this.props.onClick(this.props.uri, this.props.id);
    }

    handleHold = () => {
        this.props.onHold(this.props.id);
    }

    render() {
        return (
            <TouchableOpacity onPress={this.handleClick} onLongPress={this.handleHold}>
                <Image style={{ width: this.props.width, height: this.props.height, borderRadius: 10, margin: 3 }} source={{ uri: this.props.uri }} />
                {this.props.marked ? <Image style={{ width: 30, height: 30, borderRadius: 10, margin: 3, position: 'absolute', right: 3, bottom: 3 }} source={Tick} /> : ""}
            </TouchableOpacity>
        );
    }
}

export default FotoItem;
