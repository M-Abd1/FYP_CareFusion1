const mongoose = require("mongoose");

const connectDB = async (connectionString) => {
    try{
        mongoose.connect(connectionString);
        console.log("Database connection created");
    }catch(err){
        console.log(err)
    }
}

module.exports = connectDB;