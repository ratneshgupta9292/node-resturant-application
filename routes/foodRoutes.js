const express = require("express");
const { createFoodController, getAllFoodController, getFoodByResturantController, deleteFoodController, updateFoodController, placeOrderController, orderStatusController } = require("../controllers/foodController");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

//ROUTE
// POST Create
router.post("/create", authMiddleware, createFoodController);

// GET ALL Food
router.get("/getall", getAllFoodController);

// //Delete Resturent
router.delete("/delete/:id", authMiddleware, deleteFoodController);

// // GET ALL Food
router.get("/getByResturent/:id", authMiddleware, getFoodByResturantController);

//update Food 
router.put("/update/:id", authMiddleware, updateFoodController);

//Food Order 
router.post("/placeorder", authMiddleware, placeOrderController);

//Order Status
router.post(
    "/orderstatus/:id",
    authMiddleware,
    adminMiddleware,
    orderStatusController
);



module.exports = router; 