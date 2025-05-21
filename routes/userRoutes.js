const express = require("express");
const { getUserController, updateUserController, updatePasswordController, resetPasswordController } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//routes
// GET USER || GET
router.get("/getuser", authMiddleware, getUserController);
//UPDATED USER
router.put("/updateuser", authMiddleware, updateUserController);
//UPDATED PASSWPORD
router.put("/updatpassword", authMiddleware, updatePasswordController);
//RESET PASSWPORD
router.put("/resetpassword", authMiddleware, resetPasswordController);
module.exports = router; 