//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
    if(error) {
        return console.log('Unable to connect to mongodb server');
    }

    // Find all from Todos
    db.collection('Todos').find().toArray().then((documents) => {
        console.log('Todos');
        console.log(JSON.stringify(documents, undefined, 2));
    }, (error) => {
        console.log('Unable to find Todos :', error);
    });

    // Find completed Todos
    // db.collection('Todos').find({completed: false}).toArray().then((documents) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(documents, undefined, 2));
    // }, (error) => {
    //     console.log('Unable to find Todos :', error);
    // });

    // Find Todos where name = 'Drogba'
    // db.collection('Users').find({name: 'Drogba'}).toArray().then((documents) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(documents, undefined, 2));
    // }, (error) => {
    //     console.log('Unable to find Todos :', error);
    // });

    // Find Todos where Object Id is '5b16489344ab521d0c22739c'
    // db.collection('Todos').find(
    //     {_id: new ObjectID('5b16489344ab521d0c22739c')}
    // ).toArray().then((documents) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(documents, undefined, 2));
    // }, (error) => {
    //     console.log('Unable to find Todos :', error);
    // });

    // Find Todos Count
    // db.collection('Todos').find().count().then((count) => {
    //     console.log('Todos count: ', count);
    // }, (error) => {
    //     console.log('Unable to count Todos :', error);
    // });



    // db.close();
});