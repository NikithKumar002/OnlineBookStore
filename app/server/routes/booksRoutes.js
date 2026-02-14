
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { 
    addNewBookController, 
    listAllBookController, 
    listAllBookByCategoryController,
    listAllBookByAuthorController,
    updateBookController,
    deleteBookController,
    addUpdateReviewController
} = require("../controllers/bookControllers");

router.put("/create", auth, addNewBookController);
router.get("/listAll", auth, listAllBookController);
router.get("/category/:categoryId", auth, listAllBookByCategoryController);
router.get("/author/:authorName", auth, listAllBookByAuthorController);
router.post("/update/:bookId", auth, updateBookController);
router.delete("/delete/:bookId", auth, deleteBookController);
router.post("/review/:bookId/:reviewerId", auth, addUpdateReviewController);
router.put("/review/:bookId/:reviewerId", auth, addUpdateReviewController);


module.exports = router;
