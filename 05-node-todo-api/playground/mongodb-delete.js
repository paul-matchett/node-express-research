//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
    if(error) {
        return console.log('Unable to connect to mongodb server');
    }

    // Delete Many
    // db.collection('Todos').deleteMany({text: 'East Lunch'}).then((result) => {
    //     console.log(result);
    // }, (error) => {
    //     console.log('Unable to find Todos :', error);
    // });

    // Delete One
    // db.collection('Todos').deleteOne({text: 'Snooze'}).then((result) => {
    //     console.log(result);
    // }, (error) => {
    //     console.log('Unable to find Todos :', error);
    // });

    // Find One And Delete
    db.collection('Todos').findOneAndDelete({text: 'Snooze', completed: false}).then((result) => {
        console.log(result);
    }, (error) => {
        console.log('Unable to find Todos :', error);
    });

 
    // db.close();
});