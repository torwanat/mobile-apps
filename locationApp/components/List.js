import React, { Component } from 'react';
import { View, FlatList, Switch, Alert, StyleSheet, ActivityIndicator, Text } from 'react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import UniversalButton from './UniversalButton';
import LocationItem from './LocationItem';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            allSelected: false,
            enabled: [],
            loading: false,
            locationEnabled: false
        };
    }

    componentDidMount = async () => {
        const keys = await AsyncStorage.getAllKeys();
        const stores = await AsyncStorage.multiGet(keys);
        const maps = stores.map((result, i, store) => {
            // const key = store[i][0];
            const value = store[i][1];
            return JSON.parse(value);
        });
        this.setState({ data: maps });
        await this.askForPermission();
    }

    handleAddLocation = async () => {
        this.setState({ loading: true });
        const pos = await Location.getCurrentPositionAsync({});
        // pos.timestamp, pos.coords.latitude, pos.coords.longitude
        const location = {
            timestamp: pos.timestamp,
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            isEnabled: false,
            id: uuid.v4()
        }
        this.setState({ loading: false });
        (Alert.alert("Alert", "Czy zapisać pobraną lokalizację?", [
            {
                text: "OK",
                onPress: () => {
                    this.setState({ loading: true });
                    this.setState(prevState => { return { data: [...prevState.data, location], allSelected: false } });
                    this.saveToMemory(location);
                }
            },
            {
                text: "Cancel"
            }
        ]));
    }

    handleDelete = () => {
        this.setState({ data: [], allSelected: false, enabled: [], loading: true });
        this.wipeMemory();
    }

    toggleLocation = (id) => {
        this.setState(prevState => {
            return {
                data: prevState.data.map(e => {
                    if (e.id === id) {
                        e.isEnabled = !e.isEnabled;
                    }
                    return e;
                })
            }
        });
        this.addEnabledLocation(id);
    }

    addEnabledLocation = (id) => {
        for (let i = 0; i < this.state.enabled.length; i++) {
            if (this.state.enabled[i].id === id) {
                this.setState(prevState => {
                    return {
                        enabled: prevState.enabled.filter(e => {
                            return e.id !== id;
                        }), allSelected: false
                    }
                });
                return;
            }
        }
        for (let j = 0; j < this.state.data.length; j++) {
            if (this.state.data[j].id === id) {
                this.setState(prevState => {
                    return {
                        enabled: [...prevState.enabled, {
                            timestamp: this.state.data[j].timestamp,
                            latitude: this.state.data[j].latitude,
                            longitude: this.state.data[j].longitude,
                            id: id
                        }], allSelected: prevState.enabled.length + 1 === prevState.data.length
                    }
                });
                return;
            }
        }
    }

    toggleSelectAll = () => {
        if (this.state.allSelected) {
            this.setState(prevState => {
                return {
                    allSelected: !prevState.allSelected, data: prevState.data.map(e => {
                        return {
                            timestamp: e.timestamp,
                            latitude: e.latitude,
                            longitude: e.longitude,
                            isEnabled: false,
                            id: e.id
                        }
                    }), enabled: []
                }
            });
        } else {
            this.setState(prevState => {
                return {
                    allSelected: !prevState.allSelected, data: prevState.data.map(e => {
                        return {
                            timestamp: e.timestamp,
                            latitude: e.latitude,
                            longitude: e.longitude,
                            isEnabled: true,
                            id: e.id
                        }
                    }), enabled: prevState.data.map(e => {
                        return {
                            timestamp: e.timestamp,
                            latitude: e.latitude,
                            longitude: e.longitude,
                            id: e.id
                        }
                    })
                }
            });
        }
    }

    saveToMemory = async (location) => {
        await AsyncStorage.setItem("marker" + uuid.v4(), JSON.stringify(location));
        this.setState({ loading: false });
    }

    wipeMemory = async () => {
        const keys = await AsyncStorage.getAllKeys();
        keys.forEach(async key => {
            await AsyncStorage.removeItem(key);
        });
        this.setState({ loading: false });
        Alert.alert("Alert", "Dane usunięte");
    }

    goToMap = () => {
        if (this.state.enabled.length) {
            this.props.navigation.navigate("s3", { markers: this.state.enabled });
        } else {
            Alert.alert("Alert", "Proszę zaznaczyć przynajmniej jedną pozycję");
        }
    }

    askForPermission = async () => {
        Location.requestForegroundPermissionsAsync().then(respone => {
            if (respone.status === "granted") {
                this.setState({ locationEnabled: true });
            }
        });
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#009688" }}>
                {this.state.locationEnabled ?
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
                            <UniversalButton text={"Pobierz i zapisz pozycję"} color={"#FFFFFF"} onClick={this.handleAddLocation} bgColor={"#536DFE"} />
                            <UniversalButton text={"Usuń wszystkie dane"} onClick={this.handleDelete} bgColor={"#536DFE"} />
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <UniversalButton text={"Przejdź do mapy"} onClick={this.goToMap} bgColor={"#536DFE"} />
                            <Switch value={this.state.allSelected} onValueChange={this.toggleSelectAll} trackColor={{ false: "#00796B", true: "#B2DFDB" }} thumbColor={this.state.allSelected ? "white" : "#B2DFDB"} />
                        </View>
                        <FlatList data={this.state.data} renderItem={({ item }) => <LocationItem timestamp={item.timestamp} longitude={item.longitude} latitude={item.latitude} id={item.id} onClick={this.toggleLocation} isEnabled={item.isEnabled} />} keyExtractor={item => item.id} />
                        {this.state.loading ? <View style={styles.loading}>
                            <ActivityIndicator size={"large"} />
                        </View> : ""}
                    </View>
                    : <View style={{ flex: 1, justifyContent: "center" }}>
                        <Text style={{ textAlign: "center", justifyContent: "center", color: "#FFFFFF", fontSize: 50 }}>Proszę pozwolić na korzystanie z lokalizacji</Text>
                        <UniversalButton text={"Pozwól"} onClick={this.askForPermission} color={"#FFFFFF"} bgColor={"#536DFE"} />
                    </View>}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default List;
