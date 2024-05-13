const mongoose = require("mongoose");
const schema = mongoose.Schema;

const signupSchema = new schema({
    fullname: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    signedUpAs:{
        type: String,
        enum: ['Service Seeker', 'Service Provider'],
        require: true
    },
    token:{
        type: String,
        default: ""
    },
    phoneno:{
        type: String,
        default: ""
    },
    address: {
        type: String,
        default:""
    },
})

module.exports = mongoose.model('signup',signupSchema);