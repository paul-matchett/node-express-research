const { SHA256 } = require('crypto-js');

var message = 'I am user number 3';
var hash = SHA256(message).toString();

console.log('message :', message);
console.log('hash :', hash);

var data = {
    id: 4
}

var token = {
    data,
    hash: SHA256(JSON.stringify(data) + 'saltStringHolder').toString()
}

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString()

var resultHash = SHA256(JSON.stringify(token.data) + 'saltStringHolder').toString();
if(resultHash == token.hash) {
    console.log('data was not changed');
} else {
    console.log('data changed. dont trust');
}