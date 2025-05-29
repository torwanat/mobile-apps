import React, { Component } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import Profile from './Profile';
import UniversalButton from './UniversalButton';
import settings from '../data/settings.json'

class MainScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        this.getUsers();
    }

    getUsers = async () => {
        try {
            const response = await fetch(settings.server + '/admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const json = await response.json();
            this.setState({ data: json.users });
        } catch (error) {
            console.error(error);
        }
    }

    handleDeleteUser = async (id) => {
        const data = JSON.stringify({
            id: id
        });
        try {
            const response = await fetch(settings.server + '/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: data,
            });
            const json = await response.json();
            if (json.status === "OK") {
                this.getUsers();
            } else {
                alert("Server error");
            }
        } catch (error) {
            console.error(error);
        }
    }

    handleDetails = async (id) => {
        const data = JSON.stringify({
            id: id
        });
        try {
            const response = await fetch(settings.server + '/details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: data,
            });
            const json = await response.json();
            console.log(json);
            this.props.navigation.navigate("s3", { login: json.name, password: json.password, registered: json.registered });
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        return (
            <View style={{ padding: 10, backgroundColor: "#009688", flex: 1 }}>
                <UniversalButton text="Go to login screen" onClick={() => this.props.navigation.navigate("s1")} color={"#FFFFFF"} bgColor={"#00796B"} />
                <FlatList data={this.state.data} renderItem={({ item }) => <Profile name={item.name} id={item.id} deleteUser={this.handleDeleteUser} userDetails={this.handleDetails} />} keyExtractor={item => item.id} />
            </View>
        );
    }
}

export default MainScreen;
