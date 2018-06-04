const add = (a,b) => a + b;

const asyncAdd = (a,b,callback) => {
    setTimeout(() => {
        callback(a + b);
    }, 1000);
}

const square = (x) => x * x;

const asyncsquare = (x, callback) => {
    setTimeout(() => {
        callback(x * x);
    }, 1000);
}

const setName = (user, fullName) => {
    let names = fullName.split(' ');
    [ user.firstName, user.lastName ] = names;
    return user;
}

module.exports = {
    add,
    asyncAdd,
    square,
    asyncsquare,
    setName
}