const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const { Todo } = require('./../../models/todo');
const { User } = require('./../../models/user');


const userOneId = new ObjectID();
const userTwoId = new ObjectID();
var secret = 'abc123';
const users = [
    {
        _id: userOneId,
        email: 'bill@example.com',
        password: 'userOnePassword',
        tokens: [
            {
                access: 'auth',
                token: jwt.sign({_id: userOneId.toHexString(), access:'auth'}, secret).toString()
            }
        ]
    },
    {
        _id: userTwoId,
        email: 'ted@example.com',
        password: 'userTwoPassword',
        tokens: [
          {
              access: 'auth',
              token: jwt.sign({_id: userTwoId.toHexString(), access:'auth'}, secret).toString()
          }
      ]
    }
];


const todos = [
    {
        _id: new ObjectID(),
        text: 'first test todo',
        _userId: userOneId
    },
    {
        _id: new ObjectID(),
        text: 'second test todo',
        completed: true,
        completedAt: 333,
        _userId: userTwoId
    }
]

const poulateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos)
    }).then(() => done());
}

const populateUsers = (done) => {
    User.remove({}).then(() => {
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo]);

    }).then(() => done());
}

module.exports = { todos, poulateTodos, users, populateUsers };