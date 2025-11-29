
const express = require("express");
const router = express.Router();

const { 
    addNewBookController, 
    listAllBookController, 
    listAllBookByCategoryController,
    listAllBookByAuthorController,
    updateBookController,
    deleteBookController,
    addUpdateReviewController
} = require("../controllers/bookControllers");

router.put("/create", addNewBookController);
router.get("/listAll", listAllBookController);
router.get("/category/:categoryId", listAllBookByCategoryController);
router.get("/author/:authorName", listAllBookByAuthorController);
router.post("/update/:bookId", updateBookController);
router.delete("/delete/:bookId", deleteBookController);
router.post("/review/:bookId/:reviewerId", addUpdateReviewController);
router.put("/review/:bookId/:reviewerId", addUpdateReviewController);


module.exports = router;
