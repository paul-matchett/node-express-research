const express = require('express');

let app = express();

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.get('/about', (req, res) => {
    res.status(404).send({
        error: 'Page not found',
        name: 'Todo App v1.0'
    })
});

app.get('/users', (req, res)  => {
    res.send({
        name: 'Mike',
        age: 25
    },{
        name: 'John',
        age: 20
    },{
        name: 'Keith',
        age: 28
    })
});

app.listen(3000);

module.exports.app = app;