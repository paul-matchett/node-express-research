var mongoose = require('mongoose');
var { Schema } = mongoose;

var userSchema = new Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true// removes any leading/trailing white space 
    }
});
var User = mongoose.model('User', userSchema);

module.exports = { User }