var db = require('./db')
module.exports.handleSignUp = (email, password) => {
    db.saveUser({email, password})
} 