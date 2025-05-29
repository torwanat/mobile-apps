const express = require("express");
const app = express();
const PORT = 3001;
const path = require("path");
const fsPromises = require("fs").promises;
const formidable = require('formidable');
const cors = require('cors');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const filepath = path.join("..", "public", "upload");

const list = async () => {
    try {
        const data = await fsPromises.readdir(filepath)
        return data;
    } catch (error) {
        console.log(error);
        return [];
    }
}

const renameFile = async (oldName, newName) => {
    try {
        await fsPromises.rename(path.join(filepath, oldName), path.join(filepath, newName));
        return;
    } catch (error) {
        console.log(error);
    }
}

const remove = async (photos) => {
    await Promise.all(photos.map(async (photo) => {
        const contents = await fsPromises.unlink(path.join(filepath, photo));
    }));
    return;
}

app.get("/files", async (req, res) => {
    const body = await list();
    res.send(JSON.stringify(body));
});

app.post("/rename", async (req, res) => {
    await renameFile(req.body.oldName, req.body.newName);
    const body = await list();
    res.send(JSON.stringify(body));
});

app.post("/delete", async (req, res) => {
    await remove(req.body.photos);
    const body = await list();
    res.send(JSON.stringify(body));
});

app.listen(PORT, () => {
    console.log("start serwera na porcie " + PORT);
});