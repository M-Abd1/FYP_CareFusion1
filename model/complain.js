const mongoose = require("mongoose");
const schema = mongoose.Schema;

const complain = new schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phone:{
        type: String,
        default: ""
    },
    service: {
        type: String,
        default:""
    },
    complain: {
        type: String,
        default:""
    },
})

module.exports = mongoose.model('complain',complain);