import React, { Component } from 'react';
import { View, Text, Image, Switch } from 'react-native';
import { isEnabled } from 'react-native/Libraries/Performance/Systrace';
import icon from '../assets/location-icon.png';

class LocationItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleClick = (id) => {
        this.props.onClick(id);
    }

    render() {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 10, justifyContent: 'space-around', backgroundColor: "#009688" }}>
                <Image source={icon} style={{ width: 100, height: 100 }} />
                <View>
                    <Text style={{ color: "#212121", fontWeight: 'bold' }}>Timestamp: {this.props.timestamp} </Text>
                    <Text style={{ color: "#FFFFFF" }}>Latitude: {this.props.latitude} </Text>
                    <Text style={{ color: "#FFFFFF" }}>Longitude: {this.props.longitude} </Text>
                </View>
                <View>
                    <Switch onValueChange={() => this.handleClick(this.props.id)} value={this.props.isEnabled} trackColor={{ false: "#00796B", true: "#B2DFDB" }} thumbColor={this.props.isEnabled ? "#FFFFFF" : "#B2DFDB"} />
                </View>
            </View>
        );
    }
}

export default LocationItem;
