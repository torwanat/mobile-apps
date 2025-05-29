import React, { Component } from 'react';
import ImageTile from './ImageTile';
import "./style.css";
import data from "../data/data.json";

class Main extends Component {

    constructor() {
        super();
        this.state = { photos: [], tiles: [], selected: false };
    }

    getImages = async () => {
        try {
            const result = await fetch("http://" + data.server + ":3001/files", {
                method: "GET"
            });
            const json = await result.json();
            this.createPhotos(json);
        } catch (err) {
            console.log("Error: ", err);
        }
    }

    createPhotos = (filenames) => {
        const photos = filenames.map(e => {
            return {
                src: "./upload/" + e,
                title: e,
                checked: false
            }
        });
        const tiles = photos.map((e, i) => {
            return <ImageTile title={e.title} src={e.src} checked={e.checked} toggleCheckbox={this.toggleCheckbox} delete={this.deleteOne} renameFile={this.renameFile} key={i} />
        });
        this.setState({ photos: photos, tiles: tiles });
    }

    createTiles = (photos) => {
        const tiles = photos.map((e, i) => {
            return <ImageTile title={e.title} src={e.src} checked={e.checked} toggleCheckbox={this.toggleCheckbox} delete={this.deleteOne} renameFile={this.renameFile} key={i} />
        });
        this.setState({ tiles: tiles, photos: photos });
    }

    toggleCheckbox = (name) => {
        const photos = this.state.photos.map(e => {
            if (e.title === name) {
                e.checked = !e.checked;
            }
            return e;
        });
        const checked = photos.filter(e => { return e.checked });
        if (checked.length === photos.length) {
            this.setState({ selected: true });
        } else {
            this.setState({ selected: false });
        }
        this.createTiles(photos);
    }

    deselectAll = () => {
        const photos = this.state.photos.map(e => {
            e.checked = false;
            return e;
        });
        this.setState({ selected: false });
        this.createTiles(photos);
    }

    selectAll = () => {
        const photos = this.state.photos.map(e => {
            e.checked = true;
            return e;
        });
        this.setState({ selected: true });
        this.createTiles(photos);
    }

    deleteSelected = async () => {
        const toDelete = this.state.photos.filter(e => {
            return e.checked;
        });

        if (toDelete.length) {

            const body = JSON.stringify({
                photos: toDelete.map(e => { return e.title })
            });

            try {

                const headers = { 'Content-Type': 'application/json' };
                const result = await fetch("http://" + data.server + ":3001/delete", { method: "POST", headers: headers, body: body });
                const json = await result.json();
                this.createPhotos(json);

            } catch (ex) {
                console.log(ex);
            }
        }

    }

    deleteOne = async (name) => {
        const body = JSON.stringify({
            photos: [name]
        });

        try {

            const headers = { "Content-Type": "application/json" };
            const result = await fetch("http://" + data.server + ":3001/delete", { method: "POST", headers: headers, body: body });
            const json = await result.json();
            this.createPhotos(json);

        } catch (ex) {
            console.log(ex);
        }
    }

    renameFile = async (oldName, newName) => {
        const body = JSON.stringify({
            oldName: oldName,
            newName: newName
        });

        try {

            const headers = { "Content-Type": "application/json" };
            const result = await fetch("http://" + data.server + ":3001/rename", { method: "POST", headers: headers, body: body });
            const json = await result.json();
            this.createPhotos(json);

        } catch (ex) {
            console.log(ex);
        }
    }

    componentDidMount = async () => {
        await this.getImages();
    }

    render() {
        return (
            <div>
                {this.state.selected ? <button className="controls-button" onClick={this.deselectAll}>Deselect all</button> : <button className="controls-button" onClick={this.selectAll}>Select all</button>}
                <button className="controls-button" onClick={this.deleteSelected}>Delete selected</button>
                <div className="container">
                    {this.state.tiles}
                </div>
            </div>
        );
    }
}

export default Main;