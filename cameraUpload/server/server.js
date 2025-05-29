const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");
const formidable = require('formidable');

app.use(express.static('static'));
app.use(express.urlencoded({ extended: true }));

app.post("/upload", (req, res) => {

    const form = formidable({
        multiples: true,
        encoding: 'utf-8',
        allowEmptyFiles: false,
        uploadDir: path.join(__dirname, "static/upload"),

        filename: (name, ext, part, form) => {
            return part.originalFilename;
        }
    });

    form.parse(req, (err, fields, files) => {
        if (err) {
            res.send(JSON.stringify("ERROR"));
        }
        res.send(JSON.stringify("OK"));
    });
})

app.listen(PORT, () => {
    console.log("start serwera na porcie " + PORT)
})