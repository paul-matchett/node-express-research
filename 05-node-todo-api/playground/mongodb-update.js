//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
  if (error) {
    return console.log('Unable to connect to mongodb server');
  }

  // Find One Todo And Update text
  // db.collection('Todos')
  //     .findOneAndUpdate({
  //         _id: new ObjectID('5b16557458f49d2cdc8e1b73') 
  //     }, {
  //         $set: {
  //             text: 'Walking the Dog'
  //         }
  //     }, {
  //         returnOriginal: false
  //     })
  //     .then((result) => {
  //         console.log(result);
  //     }, (error) => {
  //         console.log('Unable to find Todos :', error);
  //     });

  // Find One user And Update age
  db.collection('Users')
    .findOneAndUpdate({
      _id: new ObjectID('5b1649983b39d918a09b4dfe')
    }, {
        $set: {
          location: 'France',
        },
        $inc: {
          age: 1,
        }
      }, {
        returnOriginal: false,
      })
    .then((result) => {
      console.log(result);
    }, (error) => {
      console.log('Unable to find Todos :', error);
    });


  // db.close();
});