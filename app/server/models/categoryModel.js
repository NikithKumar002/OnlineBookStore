const mongoose = require("mongoose");

// {
//   _id: ObjectId,
//   name: String,
//   description: String
//   createdAt: Date
// }
const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        unique: true,
        description: "Name of the category",
        required: [true, "Category Name is required!"]
    },
    description: {
        type: String,
        description: "Description for the category.",
        required: [true, "Description is required."]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("category", categorySchema, "category");