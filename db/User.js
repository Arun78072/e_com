var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    username: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    createdAt:{
        type: Number,
        required: true
    },
    about: {
        type: String,
        default: '' 
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: ''
    },
    phone_no: {
        type: String,
        default: ''
    },
});

module.exports = mongoose.model('User', UserSchema);
