const categoryModel = require("../models/categoryModel");

// post Create INFGO
const createCategoryController = async (req, res) => {
    try {
        const { title, imageurl } = req.body;

        // Optional: Manual required field check (in case you want more control)
        if (!title) {
            return res.status(400).send({
                success: false,
                message: "Please provide Category title or image!",
            });
        }

        // Create and save new restaurant
        const category = new categoryModel({ title, imageurl });
        const savedCategory = await category.save();

        // Response
        res.status(201).send({
            success: true,
            message: "Category Created Successfully",
            data: savedCategory,
        });

    } catch (error) {
        console.error("Create Category Error:", error);
        res.status(500).send({
            success: false,
            message: "Error in Create Category API",
            error: error.message,
        });
    }
};

// GET Create INFGO
const getAllCatController = async (req, res) => {
    try {
        const category = await categoryModel.find({});
        //validation
        if (!category) {
            return res.status(404).send({
                success: false,
                message: "No Category Availible",
            });
        }

        res.status(200).send({
            success: true,
            totalCount: category.length,
            category
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Eror in Get Category API",
            error: error.message
        });
    }
};

const updateCatController = async (req, res) => {
    try {
        const catUpdates = req.body;
        // Log the ID being updated
        console.log("Category ID to update:", req.params.id);
        const category = await categoryModel.findByIdAndUpdate(
            req.params.id,
            catUpdates,
            { new: true } // return the updated document
        );
        // Validation
        if (!category) {
            return res.status(404).send({
                success: false,
                message: "Category not found",
            });
        }

        res.status(200).send({
            success: true,
            message: "Category updated successfully",
            category
        });
    } catch (error) {
       
        res.status(500).send({
            success: false,
            message: "Error in update category API",
            error: error.message
        });
    }
};

//Delete CATEGORY
const deleteCategoryController = async (req, res) => {
  try {
    const categoryId = req.params.id;

    if (!categoryId) {
      return res.status(400).send({
        success: false,
        message: "Please provide a valid Category ID",
      });
    }

    const deletedResturant = await categoryModel.findByIdAndDelete(categoryId);

    if (!deletedResturant) {
      return res.status(404).send({
        success: false,
        message: "Delete not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Restaurant deleted successfully",
      data: deletedResturant,
    });

  } catch (error) {
    console.error("Delete Restaurant Error:", error);
    res.status(500).send({
      success: false,
      message: "Error deleting restaurant",
      error: error.message,
    });
  }
};



module.exports = {
    createCategoryController,
    getAllCatController,
    updateCatController,
    deleteCategoryController,
}