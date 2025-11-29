const bookModel = require("../models/bookModel");
const categoryModel = require("../models/categoryModel");
const reviewModel = require("../models/reviewModel");
const userModel = require("../models/userModel");
const { Types } = require('mongoose');

const addNewBookController = async(req, res) => {
    try {
        const { 
            title: title, 
            author: author, 
            category: category, 
            description: description, 
            publishedDate: publishedDate, 
            stock: stock, 
            price: price
        } = req.body;
        console.log(req.body);
        if (!title || !author || !category || !description) {
            console.log("Missing required fields: title, author, category name, description or publishedDate");
            return res.status(400).send({
                success: false,
                message: "Title, author, category name, description and publishedDate are required."
            });
        };
        if ( price < 0 || stock < 0 ) {
            console.log("Invalid price or stock value.");
            return res.status(400).send({
                success: false,
                message: "Price or Stock must be zero or positive."
            });
        };
        const checkBookInfo = await bookModel.findOne({title: title, author: author});
        if(checkBookInfo) {
            console.log("Duplicate book detected.");
            return res.status(409).send({
                success: false,
                message: "This book already exists in the records"
            });
        };
        console.log(category);
        const getCategoryId = await categoryModel.findOne({ categoryName: category });
        console.log(getCategoryId);
        if(!getCategoryId) {
            console.log("Category not found");
            return res.status(404).send({
                success: false,
                message: "Category not found"
            });
        };

        const newBook = new bookModel({
            title, 
            author, 
            description,
            publishedDate,
            price: price,
            stock, 
            categoryId: getCategoryId._id
        });
        const saveBook = await newBook.save();
        res.status(201).send({
            success: true,
            message: "New Book details added successfully!",
            result: [saveBook]
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Failed to add new book.",
            error: error
        });
    };
};

const listAllBookController = async(req, res) => {
    try {
        const getAllbook = await bookModel.find();
        let totalBooksCount = getAllbook.length;
        res.status(200).send({
            success: true,
            message: "All Books fetched successfully.",
            result: [totalBooksCount, getAllbook]
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error fetching All books.",
            error: error
        });
    };
};

const listAllBookByCategoryController = async(req, res) => {
    try {
        const { categoryId } = req.params;
        if (!categoryId) {
            console.log("Missing required field: categoryId");
            return res.status(400).send({
                success: false,
                message: "Category Id is required."
            });
        };
        const getCategoryInfo = await categoryModel.findOne({ _id: new Types.ObjectId(categoryId) });
        if (!getCategoryInfo) {
            return res.status(404).send({
                success: false,
                message: "Category not found"
            });
        };
        const getBookOnCategory = await bookModel.find({categoryId: getCategoryInfo._id});
        let totalBooksCount = getBookOnCategory.length;
        if(totalBooksCount == 0) {
            return res.status(404).send({
                success: false, 
                message: "No books found in this category."
            });
        };
        res.status(200).send({
            success: true,
            message: "Books fetched successfully.",
            result: [totalBooksCount, getCategoryInfo.categoryName, getBookOnCategory]
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error fetching books by category.",
            error: error
        });
    };
}

const listAllBookByAuthorController = async(req, res) => {
    try {
        const { authorName } = req.params;
        if (!authorName) {
            console.log("Missing required field: Author Name");
            return res.status(400).send({
                success: false,
                message: "Author Name are required."
            });
        };
        const getBookOnAuthor = await bookModel.find({author: authorName});
        let totalBooksCount = getBookOnAuthor.length;
        if(totalBooksCount === 0) {
            return res.status(404).send({
                success: false, 
                message: "No books found for this author."
            });
        };
        res.status(200).send({
            success: true,
            message: "Books fetched successfully.",
            result: [totalBooksCount, authorName, getBookOnAuthor]
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error fetching books by author.",
            error: error
        });
    };
}

const updateBookController = async(req, res) => {
    try {
        const bookId = req.params.bookId;
        const updateData = req.body;

        if (!bookId) {
            console.log("Missing required field: Book Title");
            return res.status(400).send({
                success: false,
                message: "Book Name is required."
            });
        };
        if (updateData.price < 0 || updateData.stock < 0 ) {   
            console.log("Invalid price or stock value.");
            return res.status(400).send({
                success: false,
                message: "Price or Stock must be zero or positive."
            });
        };
        const getCategoryId = await categoryModel.findOne({ categoryName: updateData.category });
        if(!getCategoryId) {
            console.log("Category not found");
            return res.status(404).send({
                success: false,
                message: "Category not found"
            });
        };
        // Find the book by title
        const findBookId = await bookModel.findOne({ _id: new Types.ObjectId(bookId) });
        if(!findBookId) {
            console.log("book not found!");
            return res.status(404).send({
                success: false,
                message: "Book not found,"
            });
        };
        const updateBookDetails = await bookModel.findByIdAndUpdate(
            findBookId._id, { $set: {updateData}}, {
                new: true,
                runValidators: true
            }
        );
        // Check again
        if (!updateBookDetails) {
            return res.status(404).send({
                success: false,
                message: "Book not found,"
            });
        };
        res.status(200).send({
            success: true,
            message: "Book updated successfully.",
            result: [updateBookDetails] 
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Failed to update book.",
            error: error
        });
    };
}

const deleteBookController = async(req, res) => {
    try {
        const bookId = req.params.bookId;

        if (!bookId) {
            console.log("Missing required field: Book Title");
            return res.status(400).send({
                success: false,
                message: "Book Name is required."
            });
        };
        const findBookId = await bookModel.findOne({ _id: new Types.ObjectId(bookId) });
        if(!findBookId) {
            console.log("book not found!");
            return res.status(404).send({
                success: false,
                message: "Book not found,"
            });
        };

        // Delete all reviews associated with this book
        const deleteReview = await reviewModel.deleteMany({ bookId: new Types.ObjectId(findBookId._id) });
        if(!deleteReview) {
            console.log("Reviews not found for this book. Proceeding to delete the book.");
        }

        const deleteBook = await bookModel.findByIdAndDelete({ _id: new Types.ObjectId(findBookId._id) });
        if(!deleteBook) {
            return res.status(404).send({
                success: false,
                message: "Book not found,",
                result: [findBookId, deleteBook]
            })
        };
        res.status(200).send({
            success: true,
            message: "Book deleted successfully."
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Failed to Delete book.",
            error: error
        });
    };
}

const addUpdateReviewController = async(req, res) => {
    try {
        const { bookId, reviewerId } = req.params;
        const { rating, comment } = req.body;
        console.log(req.params);
        console.log(req.body);
        if (!bookId || !reviewerId || !rating || !comment) {
            console.log("Missing required fields: Book Id, Reviewer, Rating or comment");
            return res.status(400).send({
                success: false,
                message: "Book Id, Reviewer, Rating or comment are required."
            });
        };
        const ratingValue = parseInt(rating);
        if (isNaN(ratingValue) || ratingValue < 1 || ratingValue > 5) {
            console.log("Invalid rating value. It must be an integer between 1 and 5.");
            return res.status(400).send({
                success: false,
                message: "Rating must be an integer between 1 and 5."
            });
        }
        // const checkBook = await bookModel.findById({_id: bookId});
        const checkBook = await bookModel.findById({ _id: new Types.ObjectId(bookId) });
        if(!checkBook) {
            console.log("Book not found to give the review.");
            return res.status(404).send({
                success: false,
                message: "Book not found."
            });
        };
        const checkUser = await userModel.findById({ _id:reviewerId });
        if(!checkUser){
            console.log("User not found, Please sign up to add the review.");
            return res.status(404).send({
                success: false,
                message: "User not found."
            });
        };
        const existingReview = await reviewModel.findOne({bookId: new Types.ObjectId(checkBook._id), reviewerId: new Types.ObjectId(checkUser._id)});
        if(existingReview && req.method === 'POST') {
            const review = await reviewModel.findByIdAndUpdate(
                existingReview._id, 
                { $set: { rating, comment }}, 
                { new: true, runValidators: true } 
            );
            console.log("Review updated successfully.");
            return res.status(201).send({
                success: true,
                message: "Review updated successfully.",
                result: [review]
            });
        } else if(req.method === 'PUT') {
            const review = { bookId: new Types.ObjectId(checkBook._id), reviewerId: new Types.ObjectId(checkUser._id), rating, comment };
            const addReview = new reviewModel(review);
            await addReview.save();
            console.log("Review added successfully.");
            res.status(200).send({
                success: true,
                message: "Review added successfully.",
                result: [
                    `review: ${addReview}`
                ]
            });
        } else {
            return res.status(405).send({
                success: false,
                message: "Method not allowed."
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Failed to add review",
            error: error
        });
    };
}

module.exports = { 
    addNewBookController, 
    listAllBookController, 
    listAllBookByCategoryController,
    listAllBookByAuthorController,
    updateBookController,
    deleteBookController,
    addUpdateReviewController
};