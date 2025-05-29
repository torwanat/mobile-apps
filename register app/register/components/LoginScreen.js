import React, { Component } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView } from 'react-native';
import UniversalButton from './UniversalButton';
import settings from '../data/settings.json'

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: ""
        };
    }

    handleRegister = async () => {
        const data = JSON.stringify({
            name: this.state.login,
            password: this.state.password
        });
        try {
            const response = await fetch(settings.server + '/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: data,
            });
            const json = await response.json();
            if (json.status === "OK") {
                this.props.navigation.navigate("s2");
            } else {
                alert("user exists");
            }
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: "#B2DFDB", alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ color: "#212121", fontSize: 50 }} >Register App</Text>
                </View>
                <View style={{ flex: 1, alignItems: "center", backgroundColor: "#009688" }}>
                    <TextInput placeholder='Login' onChangeText={text => this.setState({ login: text })} style={{ margin: 5, borderBottomColor: "#FFFFFF", borderBottomWidth: 1, width: 120, textAlign: "center", color: "#FFFFFF" }} />
                    <TextInput placeholder='Password' onChangeText={text => this.setState({ password: text })} style={{ margin: 5, borderBottomColor: "#FFFFFF", borderBottomWidth: 1, width: 120, textAlign: "center", marginBottom: 15, color: "#FFFFFF" }} />
                    <UniversalButton text="Register" onClick={this.handleRegister} color={"#FFFFFF"} bgColor={"#00796B"} />
                </View>
            </KeyboardAvoidingView>
        );
    }
}

export default LoginScreen;
