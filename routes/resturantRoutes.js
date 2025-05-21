const express = require("express");
const { createResturantController,getAllResturantController,getAllByResturantController,deleteResturantController } = require("../controllers/resturentController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//routes
// GET USER || GET
router.post("/create", authMiddleware, createResturantController);
// GET ALL RESTURANTS || GET
router.get("/getAll", getAllResturantController);

// GET ALL RESTURANTS || GET
router.get("/getall/:id", getAllByResturantController);

//Delete Resturent
router.delete("/delete/:id", authMiddleware, deleteResturantController);

module.exports = router; 