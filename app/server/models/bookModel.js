const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title of the book is required."],
        description: "Title of the book",
        trim: true
    },
    author: {
        type: String,
        required: [true, "Author name is required."],
        description: "Author of the book",
        trim: true
    },
    description: {
        type: String,
        required: [true, "Book description is required."],
        description: "Description of the book"
    }, 
    publishedDate: {
        type: Date,
        required: true,
        description: "Date of the book published is required."
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        description: "Price of the book"
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'category', 
        required: [true, "Category is required"],
    },
    stock: {
        type: Number,
        required: [true, "Stock is required"],
        description: "Number of the books are available to sell."
    },
    coverImage: {
        type: String,
        default: "https://tse3.mm.bing.net/th/id/OIP.WXYEZWXpkW7G0XO1-HsF_AAAAA?rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    rating: {
        type: Number,
        default: null
    }, 
    reviews: {
        type: [mongoose.Schema.Types.ObjectId], 
        ref: 'Reviews',
        default: []
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('book', bookSchema, "bookDetails");