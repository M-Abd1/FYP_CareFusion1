const mongoose = require("mongoose");
const schema= mongoose.Schema;

const jobPostSchema =new schema({
    fullname: {
        type: String,
        require: true
    },
    
    email: { //y
        type: String,
        require: true
    },
    pincode:{
        type: Number,
        require: true
    },
    address:{
        type: String,
        require: true
    },
    gender: { // gender of provider
        type: String,
        opt: ['Male', 'Female'],
        require: true
    },
    hometown: {        
        type: String,
        required: true,
    },
    detail: {        
        type: String,
        required: true,
    },
    skill: {
        type: String, 
        required: true,
    },
    date:{
        type: Date,
        default :Date.now()
    },
    language:{
        type: String,
        required: true
    },
    status:{
        type: String,
        default: "Unassigned"
    },
    reply:{
        type:[String],
        default:[]
    },
    assignProv:{
        type:String,
        default:""
    }
    
    
})

module.exports = mongoose.model('JobPost', jobPostSchema);