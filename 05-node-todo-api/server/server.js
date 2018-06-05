var express = require('express');
var bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose');
var { User } = require('./models/user');
var { Todo } = require('./models/todo');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (error) => {
        res.status(400).send(error);
    });

});

app.get('/todos', (req, res) => {
    
    Todo.find()
        .then((todos) => {
            res.send({ todos });
        }, (e) => {
            res.status(400).send(error);
            console.log('Unable to save todo');
        });
});

// app.post('/users', (req, res) => {
//     var newUser = new User(req.body)

//     newUser.save().then((doc) => {
//         console.log(JSON.stringify(doc, undefined, 2));
//         res.send(doc);
//     }, (error) => {
//         res.status(400).send(error);
//         console.log('Unable to save user');
//     });

// });

// app.get('/todos', (req, res) => {

// });

// app.get('/todo:id', (req, res) => {

// });

app.listen(3000, () => {
    console.log('Started on port 3000');
})

// const newUser = (email) => {

//     var newUser = new User({
//         email
//     })

//     newUser.save().then((doc) => {
//         console.log(JSON.stringify(doc, undefined, 2));
//     }, (error) => {
//         console.log('Unable to save user');
//     });

// }

// const newTodo = (todo) => {

//     var newTodo = new Todo(todo)

//     newTodo.save().then((doc) => {
//         console.log(JSON.stringify(doc, undefined, 2));
//     }, (error) => {
//         console.log('Unable to save todo');
//     });

// }

// var collection = 'user';

// if(collection == 'user'){
//     newUser('emailthree@email.com');
// } else {
//     newTodo({ text: 'Bath da ba', completed: false, completedAt: 123 });
// }

module.exports = { app }
