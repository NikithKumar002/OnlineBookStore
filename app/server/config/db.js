const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/onlinebookstore";

const connectDB = async() => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Successfully Connected to MongoDB Database", mongoURI);
    } catch (error) {
        console.log("Failed to connect to the DB", error);
    }
};
module.exports = connectDB;