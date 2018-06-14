const { SHA256 } = require('crypto-js');

var data = {
  id: 4,
}

var token = {
  data,
  hash: SHA256(JSON.stringify(data) + 'saltStringHolder').toString(),
};

token.data.id = 5;
token.hash = SHA256(JSON.stringify(token.data)).toString()

var resultHash = SHA256(JSON.stringify(token.data) + 'saltStringHolder').toString();
if (resultHash == token.hash) {
  //console.log('data was not changed');
} else {
  //console.log('data changed. dont trust');
}