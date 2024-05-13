const mongoose = require("mongoose");
const schema= mongoose.Schema;

const provProfileSchema =new schema({
    fullname: {
        type: String,
        require: true
    },
    phoneNo: {
        type: Number,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    cnic: {
        type: Number,
        require: true
    },
    address:{
        type: String,
        require: true
    },
    dob: {
        type:Date,
        require:true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        require: true
    },
    hometown: {
        type: String,
        required: true,
    },
    skills: {
        type: [String], 
        required: true,
    },
    about: {        
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        require: true
    },
    jobs:{
        type:[String],
        default:[]
    }
});

module.exports = mongoose.model('provProfile', provProfileSchema);