const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const { 
    createCategoryController, 
    listAllCategoriesController, 
    updateCategoryController, 
    deleteCategoryController 
} = require("../controllers/categoryControllers");

router.get("/list", auth, listAllCategoriesController);
router.post("/update/:categoryId", auth, updateCategoryController);
router.put("/create", auth, createCategoryController);
router.delete("/delete/:categoryId", auth, deleteCategoryController);

module.exports = router;
