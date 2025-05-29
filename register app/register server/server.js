const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let data = [];
let id = 0;

const addUser = (name, password) => {
    if (name === "" || password === "") {
        return false;
    }
    for (let i = 0; i < data.length; i++) {
        if (data[i].name === name) {
            return false;
        }
    }
    const tmp = {
        id: id,
        name: name,
        password: password,
        time: new Date()
    }
    id++;
    data.push(tmp);
    return true;
}

const deleteUser = (id) => {
    data = data.filter(e => {
        return e.id !== id;
    });
}

const showUser = (id) => {
    for (let i = 0; i < data.length; i++) {
        if (data[i].id === id) {
            return { name: data[i].name, password: data[i].password, registered: data[i].time };
        }
    }
}

app.post('/register', function (req, res) {
    if (addUser(req.body.name, req.body.password)) {
        res.send(JSON.stringify({ status: "OK" }));
    } else {
        res.send(JSON.stringify({ status: "NO" }));
    }
});

app.post('/admin', function (req, res) {
    res.send(JSON.stringify({ users: data }));
});

app.post('/delete', function (req, res) {
    deleteUser(req.body.id);
    res.send(JSON.stringify({ status: "OK" }));
});

app.post('/details', function (req, res) {
    res.send(JSON.stringify(showUser(req.body.id)));
});

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT);
});