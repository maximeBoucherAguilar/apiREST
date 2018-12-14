var mongoose = require('mongoose')
mongoose.Promise = global.Promise;

var Schema = mongoose.Schema

var userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true,
        unique: true
    },
    admin: {
        type: Boolean,
        default: false
    }
});

var UserModel = mongoose.model('user', userSchema)
module.exports = UserModel