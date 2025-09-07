const express = require("express");
const router = express.Router();

const { 
    createCategoryController, 
    listAllCategoriesController, 
    updateCategoryController, 
    deleteCategoryController 
} = require("../controllers/categoryControllers");

router.get("/list", listAllCategoriesController);
router.post("/update/:categoryId", updateCategoryController);
router.put("/create", createCategoryController);
router.delete("/delete/:categoryId", deleteCategoryController);


module.exports = router;
