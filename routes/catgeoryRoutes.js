const express = require("express");
const { createCategoryController, getAllCatController, updateCatController,deleteCategoryController } = require("../controllers/categoryController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//routes 
// GET USER || GET
router.post("/create", authMiddleware, createCategoryController);
// GET USER || GET
router.get("/getall", getAllCatController);
//UPDATE CATEGORY
router.put("/update/:id", updateCatController);
//update
router.delete("/delete/:id", deleteCategoryController);

module.exports = router;  