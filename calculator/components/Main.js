import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import Display from './Display';
import Column from './Column';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            operation: "",
            result: "",
            additionalColumn: <></>
        };
    }

    componentDidMount = () => {
        if (!this.isPortrait()) {
            this.setState({ additionalColumn: <Column values={["Sqrt", "Pow", "Sin", "Cos"]} color={"gray"} sendValue={this.handleValue} /> })
        }
        this.dimensionsListener = Dimensions.addEventListener("change", () => {
            if (!this.isPortrait()) {
                this.setState({ additionalColumn: <Column values={["Sqrt", "Pow", "Sin", "Cos"]} color={"gray"} sendValue={this.handleValue} /> })
            } else {
                this.setState({ additionalColumn: <></> })
            }
        });
    }

    componentWillUnmount = () => {
        this.dimensionsListener?.remove();
    }

    isPortrait = () => {
        const dim = Dimensions.get("screen");
        return dim.height >= dim.width;
    }

    handleValue = (value) => {
        switch (value) {
            case "Log":
                console.log(operation);
                break;
            case "=":
                this.calculate();
                break;
            case "Del":
                this.cut();
                break;
            case "C":
                this.clear();
                break;
            case "Pow":
                this.power();
                break;
            case "Sqrt":
                this.root();
                break;
            case "Sin":
                this.sinus();
                break;
            case "Cos":
                this.cosinus();
                break;
            default:
                this.addToEquation(value);
                break;
        }
    }

    cut = () => {
        this.setState(prevState => { return { operation: prevState.operation.substring(0, prevState.operation.length - 1) } });
    }

    clear = () => {
        this.setState({
            operation: "",
            result: ""
        })
    }

    power = () => {
        this.setState(prevState => { return { operation: prevState + "**" } });
    }

    root = () => {
        this.setState(prevState => { return { operation: "sqrt(" + prevState.operation + ")", result: Math.sqrt(eval(prevState.operation)) } });
    }

    sinus = () => {
        this.setState(prevState => { return { operation: "sin(" + prevState.operation + ")", result: Math.sin(eval(prevState.operation) * (Math.PI / 180)) } });
    }

    cosinus = () => {
        this.setState(prevState => { return { operation: "cos(" + prevState.operation + ")", result: Math.cos(eval(prevState.operation) * (Math.PI / 180)) } });
    }

    addToEquation = (value) => {
        this.setState(prevState => { return { operation: prevState.operation + value } });
    }

    calculate = () => {
        try {
            this.setState({ result: eval(this.state.operation) });
        } catch {
            this.setState({ result: "Error" });
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Display flex={1} color={"gray"} text={this.state.operation} />
                <Display flex={1} color={"darkgray"} text={this.state.result} />
                <View style={{ flexDirection: "row", flex: 4 }} >
                    <Column values={["1", "4", "7", "."]} color={"lightgray"} sendValue={this.handleValue} />
                    <Column values={["2", "5", "8", "0"]} color={"lightgray"} sendValue={this.handleValue} />
                    <Column values={["3", "6", "9", "="]} color={"lightgray"} sendValue={this.handleValue} />
                    {this.state.additionalColumn}
                    <Column values={["Del", "C", "/", "*", "-", "+"]} color={"gray"} sendValue={this.handleValue} />
                </View>
            </View>
        );
    }
}

export default Main;
