var mongoose = require('mongoose');
var { Schema } = mongoose;

var TodoSchema = new Schema({
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true// removes any leading/trailing white space 
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    },
    _userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    }
});
var Todo = mongoose.model('Todo', TodoSchema);

module.exports = { Todo };