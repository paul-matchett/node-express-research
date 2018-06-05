//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

const insertIntoCollection = (error, db, collectionName, data) => {
    db.collection(collectionName).insertOne(data, (error, result) => {
        if(error) {
            return console.log('Unable to insert todo:', error);
        }

        console.log(JSON.stringify(result.ops, undefined, 2));        
    });
} 

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {

    if(error) {
        return console.log('Unable to connect to mongodb server');
    }
    console.log('Connected to mongodb server');
    
    // Insert Todo into Todos collection
    // insertIntoCollection(error, db, 'Todos', {
    //     text: 'Eat Lunch and Mongo',
    //     completed: false
    // });

    // Insert User into Users Collection
    insertIntoCollection(error, db, 'Users', {
        _id: new ObjectID(),
        name: 'Frank lampard',
        age: 39,
        location: 'London'
    });

    db.close();
});