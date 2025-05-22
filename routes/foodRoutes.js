const express = require("express");
const { createFoodController, getAllFoodController,deleteFoodController } = require("../controllers/foodController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//routes
// GET USER || GET
router.post("/create", authMiddleware, createFoodController);
// GET ALL RESTURANTS || GET
router.get("/getall", getAllFoodController);

// // GET ALL RESTURANTS || GET
// router.get("/getall/:id", getAllByResturantController);

// //Delete Resturent
 router.delete("/delete/:id", authMiddleware, deleteFoodController);

module.exports = router; 