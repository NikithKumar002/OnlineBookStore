const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bookDetails',
        required: [true, "Book Id is required."]
    },
    reviewerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userDetails',
        required: [true, "User Id is required."]
    }, 
    rating: {
        type: Number, 
        min: 1,
        max: 5,
        required: [true, "Rating is required"]
    },
    comment: {
        type: String
    }
}, {
  timestamps: true
});

reviewSchema.index({ bookId: 1, reviewerId: 1 }, { unique: true });

module.exports = mongoose.model('Reviews', reviewSchema, "reviews");