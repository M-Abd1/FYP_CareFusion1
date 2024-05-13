const mongoose = require('mongoose');
const schema = mongoose.Schema;


const availformSchema = new schema({
    serviceType: {
        type: String,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    estimatedBudget: {
        type: Number,
        require: true
    },
    serviceDate: {
        type: Date,
        require: true
    },
    serviceTime: {
        type: String,
        enum: ['7am-10am', '10am-1pm', '1pm-4pm', '4pm-7pm', '7pm-8pm'],
        require: true
    },
})

module.exports = mongoose.model('availform', availformSchema);








