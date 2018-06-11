const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

// remove all todos
Todo.remove({}).then((result) => {
  console.log('result :', result);
});

var id = '5b17a659a63c9139f0b520e1';

if (!ObjectID.isValid(id)) {
  console.log('id not valid');
}

// remove passing in query object
Todo.findOneAndRemove({ _id: id }).then((todo) => {
  console.log('todo :', todo);
});

// remove by id
Todo.findByIdAndRemove(id).then((todo) => {
  console.log('todo :', todo);
});