import React, { Component } from 'react';
import "./style.css";

export default class ImageTile extends Component {
    constructor(props) {
        super(props);
        this.state = { dialog: false, newName: "" };
    }

    handleCheckbox = () => {
        this.props.toggleCheckbox(this.props.title);
    }

    handleDelete = () => {
        this.props.delete(this.props.title);
    }

    handleDialogOpen = () => {
        this.setState({ dialog: true });
    }

    handleDialogClose = () => {
        const extension = this.props.title.split('.').pop();
        this.props.renameFile(this.props.title, this.state.newName + "." + extension);
        this.setState({ dialog: false, newName: "" });

    }

    handleDialogAbort = () => {
        this.setState({ dialog: false, newName: "" });
    }

    render() {
        return (
            <div className="tile-container">
                <p>{this.props.title}</p>
                <img src={this.props.src} alt="" width={100} height={100} />
                <button onClick={this.handleDelete}>Delete</button>
                <button onClick={this.handleDialogOpen}>Rename</button>
                <input type="checkbox" checked={this.props.checked} onChange={this.handleCheckbox}></input>
                <dialog open={this.state.dialog} onClose={this.handleDialogClose} className="dialog-container">
                    <input type="text" value={this.state.newName} onChange={event => this.setState({ newName: event.target.value })}></input>
                    <button onClick={this.handleDialogAbort}>Anuluj</button>
                    <button onClick={this.handleDialogClose}>Zmień</button>
                </dialog>
            </div >
        );
    }
}
