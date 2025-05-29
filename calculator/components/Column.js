import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Button from './Button';

class Column extends Component {
    constructor(props) {
        super(props);
        this.state = {
            array: []
        };
    }

    handleClick = (value) => {
        this.props.sendValue(value);
    }

    componentDidMount() {
        this.setState({
            array: this.props.values.map((e, index) => {
                return <Button flex={1} text={e} color={this.props.color} onClick={this.handleClick} key={index} />
            })
        })
    }

    render() {
        return (
            <View style={{ flex: 4 }}>
                {this.state.array}
            </View>
        );
    }
}

export default Column;
