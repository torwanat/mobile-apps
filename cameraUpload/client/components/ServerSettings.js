import React, { Component } from 'react';
import { View, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import UniversalButton from './UniversalButton';
import Dialog from "react-native-dialog";

class ServerSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ip: "",
            port: "",
            dialogVisible: false,
            dialogIp: "",
            dialogPort: ""
        };
    }

    componentDidMount = async () => {
        const ip = await SecureStore.getItemAsync("ip");
        const port = await SecureStore.getItemAsync("port");
        this.setState({ ip: ip, port: port });
    }

    changeData = () => {
        this.setState(prevState => { return { dialogIp: prevState.ip, dialogPort: prevState.port, dialogVisible: true } });
    }

    cancelDialog = () => {
        this.setState({ dialogVisible: false });
    }

    confirmDialog = async () => {
        await SecureStore.setItemAsync("ip", this.state.dialogIp);
        await SecureStore.setItemAsync("port", this.state.dialogPort);
        this.setState(prevState => { return { dialogVisible: false, ip: prevState.dialogIp, port: prevState.dialogPort } });
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#F44336" }}>
                <View>
                    <Text style={{ color: "#FFFFFF", textAlign: "center", fontSize: 25, margin: 5 }}> Obecnie zapisany adres IP to: {"\n"}{this.state.ip} </Text>
                    <Text style={{ color: "#FFFFFF", textAlign: "center", fontSize: 25, margin: 5 }}> Obecnie zapisany port serwera to: {"\n"}{this.state.port} </Text>
                </View>
                <UniversalButton text={"Podaj nowe dane"} bgColor={"#FF5722"} color={"#FFFFFF"} onClick={this.changeData} />
                <Dialog.Container visible={this.state.dialogVisible}>
                    <Dialog.Title>Adres IP i port serwera</Dialog.Title>
                    <Dialog.Description>
                        Podaj adres IP i port serwera
                    </Dialog.Description>
                    <Dialog.Input label="Adres IP" value={this.state.dialogIp} onChangeText={text => { this.setState({ dialogIp: text }) }} />
                    <Dialog.Input label="Port" value={this.state.dialogPort} onChangeText={text => { this.setState({ dialogPort: text }) }} />
                    <Dialog.Button label="Anuluj" onPress={this.cancelDialog} />
                    <Dialog.Button label="Zapisz" onPress={this.confirmDialog} />
                </Dialog.Container>
            </View>
        );
    }
}

export default ServerSettings;
