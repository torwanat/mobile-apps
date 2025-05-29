import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

class RadioButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    toggleSelect = () => {
        this.props.handleSelect(this.props.name);
    }

    render() {
        if (this.props.selected) {
            return (
                <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", margin: 5 }}>
                    <TouchableOpacity onPress={this.toggleSelect} style={{ width: 40, aspectRatio: 1, borderRadius: 50, borderColor: this.props.buttonColor ? this.props.buttonColor : "red", borderWidth: 2, justifyContent: "center", alignItems: "center" }}>
                        <View style={{ width: 20, aspectRatio: 1, borderRadius: 50, backgroundColor: this.props.buttonColor ? this.props.buttonColor : "red" }}></View>
                    </TouchableOpacity>
                    <Text style={{ color: this.props.color ? this.props.color : "#FFFFFF", margin: 5 }}>{this.props.name}</Text>
                </View>

            );
        } else {
            return (
                <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", margin: 5 }}>
                    <TouchableOpacity onPress={this.toggleSelect} style={{ width: 40, aspectRatio: 1, borderRadius: 50, borderColor: this.props.buttonColor ? this.props.buttonColor : "red", borderWidth: 2 }}>
                    </TouchableOpacity>
                    <Text style={{ color: this.props.color ? this.props.color : "#FFFFFF", margin: 5 }}>{this.props.name}</Text>
                </View>
            )
        }
    }
}

export default RadioButton;
