import React, { Component } from 'react';
import { View, Text } from 'react-native';
import RadioButton from './RadioButton';

class RadioGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: []
        };
    }

    componentDidMount = () => {
        const options = this.props.options.map((e, i) => {
            if (e[0] === this.props.default) {
                return <RadioButton selected={true} name={e[0]} color={this.props.color} buttonColor={this.props.buttonColor} handleSelect={this.changeSelected} key={i} />
            } else {
                return <RadioButton selected={false} name={e[0]} color={this.props.color} buttonColor={this.props.buttonColor} handleSelect={this.changeSelected} key={i} />
            }
        });
        this.setState({ options: options });
    }

    changeSelected = (name) => {
        const options = this.props.options.map((e, i) => {
            if (e[0] === name) {
                return <RadioButton selected={true} name={e[0]} color={this.props.color} buttonColor={this.props.buttonColor} handleSelect={this.changeSelected} key={i} />
            } else {
                return <RadioButton selected={false} name={e[0]} color={this.props.color} buttonColor={this.props.buttonColor} handleSelect={this.changeSelected} key={i} />
            }
        });
        this.setState({ options: options });
        let value = 0;
        for (let i = 0; i < this.props.options.length; i++) {
            if (this.props.options[i][0] === name) {
                value = this.props.options[i][1];
                break;
            }
        }
        this.props.changeValue(this.props.title, value);
    }

    render() {
        return (
            <View>
                <Text style={{ color: this.props.titleColor ? this.props.titleColor : "#FFFFFF", fontSize: 20 }}> {this.props.title} </Text>
                {this.state.options}
            </View>
        );
    }
}

export default RadioGroup;
