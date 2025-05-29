import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import picture from '../assets/profile-picture.png';

class DetailsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#009688" }}>
                <Image style={{ width: 200, height: 200 }} source={picture} />
                <View style={styles.container}>
                    <Text style={{ color: "#FFFFFF" }}>Login:</Text>
                    <Text style={styles.data} >{this.props.route.params.login}</Text>
                </View>
                <View style={styles.container}>
                    <Text style={{ color: "#FFFFFF" }}>Password:</Text>
                    <Text style={styles.data} >{this.props.route.params.password}</Text>
                </View>
                <View style={styles.container}>
                    <Text style={{ color: "#FFFFFF" }}>Registered:</Text>
                    <Text style={styles.data} >{this.props.route.params.registered}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20
    },
    data: {
        fontWeight: "bold",
        color: "#212121",
        fontSize: 20,
        margin: 5
    }
});

export default DetailsScreen;
