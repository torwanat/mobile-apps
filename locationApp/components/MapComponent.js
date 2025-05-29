import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

class MapComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: []
        };
    }

    componentDidMount = () => {
        const markers = this.props.route.params.markers;
        const pins = markers.map(e => {
            return <Marker
                coordinate={{
                    latitude: e.latitude,
                    longitude: e.longitude,
                }} key={e.id}
            />
        });
        this.setState({ locations: pins });
    }

    render() {
        return (
            <MapView style={{ flex: 1 }}
                initialRegion={{
                    latitude: this.props.route.params.markers[0].latitude,
                    longitude: this.props.route.params.markers[0].longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                }}>
                {this.state.locations}
            </MapView>
        );
    }
}

export default MapComponent;

