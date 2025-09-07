const mongoose = require("mongoose");

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Successfully Connected to MongoDB Database");
    } catch (error) {
        console.log("Failed to connect to the DB", error);
    }
};
module.exports = connectDB;