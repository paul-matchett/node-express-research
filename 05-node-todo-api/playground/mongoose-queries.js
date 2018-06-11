const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');


var id = '5b169e222aa6357c07d32851';

if (!ObjectID.isValid(id)) {
  console.log('id not valid');
}

// array containing a todo
// Todo.find({ _id: id }).then((todos) => {
//     if(todos.length == 0) {
//         return console.log('Id not found');
//     }
//     console.log('todos :', todos);
// });

// todo object
// Todo.findOne({ _id: id }).then((todo) => {
//     if(!todo) {
//         return console.log('Id not found');
//     }
//     console.log('todo :', todo);
// });

// todo object by id
Todo.findById(id).then((todo) => {
  if (!todo) {
    return console.log('Id not found');
  }
  console.log('todo by id :', todo);
}).catch((error) => console.log(error));


