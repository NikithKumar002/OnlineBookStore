const categoryModel = require("../models/categoryModel");
const { Types } = require('mongoose');

console.log("In the category controller");
const createCategoryController = async (req, res) => {
    try {
        const { categoryName, categoryDescription } = req.body;
        if(!categoryName || !categoryDescription) {
            return res.status(400).send({
                success: false,
                message: "Missing required field: category name or description"
            });
        };
        const categories = await categoryModel.findOne({categoryName});
        console.log(categoryName);
        console.log(categoryDescription);
        if(categories) {
            return res.status(409).send({
                success: false,
                message: "Category name is already in use. Please use different name"
            });
        };
        const newCategory = new categoryModel({categoryName: categoryName, description: categoryDescription});
        await newCategory.save();
        res.status(201).send({
            success: true,
            message: "Category created successfully",
            result: [newCategory]
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "get all categories API is failed!",
            error: error
        });
    };
};

const listAllCategoriesController = async (req, res) => {
    try {
        const categories = await categoryModel.find();
        let TotalCategories = categories.length;
        res.status(200).send({
            success: true,
            message: "get all categories API passed successfully!",
            result: [TotalCategories, categories]
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "get all categories API is failed!",
            error: error
        });
    };
};

const updateCategoryController = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { categoryName, categoryDescription } = req.body;
        if (!categoryName || !categoryDescription) {
            return res.status(400).send({
                success: false,
                message: "Missing required field: category name or description"
            });
        };
        const category_Id = new Types.ObjectId(categoryId)
        if (!Types.ObjectId.isValid(category_Id)) {
            return res.status(400).send({
                success: false,
                message: "Invalid category ID format"
            });
        }
        const categories = await categoryModel.findOne({ _id: new Types.ObjectId(category_Id) });
        console.log(categories);

        if (!categories) {
            return res.status(404).send({
                success: false,
                message: "Category was not found",
                result: [
                    `category: ${categoryName}`
                ]
            });
        }
        const updateCategory = await categoryModel.updateOne({
            _id: category_Id
        }, { $set: {
            categoryName: categoryName, description: categoryDescription
        }}, { new: true });
        console.log(updateCategory);

        res.status(200).send({
            success: true,
            message: "Category updated successfully!",
            result: [updateCategory]
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "get all categories API is failed!",
            error
        });
    };
};

const deleteCategoryController = async (req, res) => {
    try {
        const { categoryId } = req.params;
        if (!categoryId) {
            return res.status(400).send({
                success: false,
                message: "Missing required field: category name"
            });
        }
        const categories = await categoryModel.findOne({ _id: new Types.ObjectId(categoryId) });
        if(!categories) {
            return res.status(404).send({
                success: false,
                message: "Category not found"
            });
        }
        await categoryModel.deleteOne({ _id: new Types.ObjectId(categoryId) });
        res.status(200).send({
            success: true,
            message: "Category deleted successfully!",
            result: [  
                `category: ${category}`
            ]
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Failed to delete category API!",
            error: error
        });
    };
};

module.exports = { 
    createCategoryController, 
    listAllCategoriesController, 
    updateCategoryController, 
    deleteCategoryController 
};