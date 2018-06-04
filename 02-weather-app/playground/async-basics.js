/*
    Synchronous Callback
*/

var getUser = (id, callback) => {
    var user = {
        id: id,
        name: 'Paul'
    };
    callback(user);
};

var getAsyncUser = (id, callback) => {
    var user = {
        id: id,
        name: 'Paul'
    };
    setTimeout(()=> {
        callback(user);
    }, 3000);
};

getAsyncUser(38, (userObj) => {
    console.log(userObj);
});

getUser(31, (userObj) => {
    console.log(userObj);
});

