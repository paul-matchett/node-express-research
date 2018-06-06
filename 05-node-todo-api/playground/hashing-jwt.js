const { jwt } = require('jsonwebtoken');

var data = {
    id: 10
}

var secret = '123abc';

var token = jwt.sign(data, secret); 
console.log('token :', token);

var decoded = jwt.verify(token, secret);
console.log('decoded :', decoded);
