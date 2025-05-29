import React, { Component } from 'react';
import { View, Text, Animated, ScrollView } from 'react-native';
import RadioButton from './RadioButton';
import RadioGroup from './RadioGroup';

class SettingsMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pos: new Animated.Value(this.props.height),
            groups: [],
        };
    }

    componentDidUpdate = () => {
        this.changeVisibility();
    }

    componentDidMount = () => {
        this.generateSettings();
    }

    generateSettings = () => {
        const groups = this.props.settings.map((e, i) => {
            return <RadioGroup title={e.title} options={e.values} default={e.default} color={"#FFFFFF"} titleColor={"#FFCDD2"} buttonColor={"#F44336"} changeValue={this.handleValueChange} key={i} />
        });
        this.setState({ groups: groups });
    }

    changeVisibility = () => {
        let targetPos;
        if (this.props.isHidden) {
            targetPos = this.props.height;
        } else {
            targetPos = 0;
        }

        Animated.spring(this.state.pos, {
            toValue: targetPos,
            velocity: 1,
            tension: 0,
            friction: 10,
            useNativeDriver: true
        }).start();

    }

    handleValueChange = (type, value) => {
        this.props.changeParam(type, value);
    }

    render() {
        return (
            <Animated.View style={{ position: "absolute", bottom: 0, left: 0, backgroundColor: "#000000", opacity: 0.5, height: this.props.height, transform: [{ translateY: this.state.pos }] }}>
                <ScrollView >
                    <Text style={{ color: "white", fontSize: 30, margin: 10, fontWeight: "bold" }}>Settings</Text>
                    {this.state.groups}
                </ScrollView>
            </Animated.View>
        );
    }
}

export default SettingsMenu;
