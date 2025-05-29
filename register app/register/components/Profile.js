import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import picture from '../assets/profile-picture.png';
import UniversalButton from './UniversalButton';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleDetails = () => {
        this.props.userDetails(this.props.id);
    }

    handleDelete = () => {
        this.props.deleteUser(this.props.id);
    }

    render() {
        return (
            <View>
                <View style={{ flexDirection: 'row', alignContent: "center", justifyContent: 'space-around', height: 100, marginTop: 15, marginBottom: 15 }}>
                    <Image style={{ width: 100, height: 100 }} source={picture} />
                    <View style={{ justifyContent: 'space-around', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <UniversalButton text="Details" onClick={this.handleDetails} color={"#FFFFFF"} bgColor={"#00796B"} />
                            <UniversalButton text="Delete" onClick={this.handleDelete} color={"#FFFFFF"} bgColor={"#00796B"} />
                        </View>
                        <Text style={{ color: "#212121" }}>{this.props.id}: {this.props.name}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

export default Profile;
