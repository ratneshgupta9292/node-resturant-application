const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

// GET USER INFGO
const getUserController = async (req, res) => {
    try {

        const user = await userModel.findById({ _id: req.user.id });

        //validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User Not Found",
            });
        }
        //hinde password
        user.password = undefined;
        //resp
        res.status(200).send({
            success: true,
            message: "User get Successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Eror in Get User API",
            error: error.message
        });
    }
};

const updateUserController = async (req, res) => {
    try {
        const userId = req.user.id;
        const updates = req.body;

        const user = await userModel.findByIdAndUpdate(
            userId,
            updates,
            { new: true, runValidators: true }
        );


        //validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "user not found",
            });
        }
        //update
        const { userName, address, phone } = req.body;
        if (userName) user.userName = userName;
        if (address) user.address = address;
        if (phone) user.phone = phone;
        //save user
        await user.save();
        res.status(200).send({
            success: true,
            message: "Get Uer Updated Successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Eror in Get User API",
            error: error.message
        });
    }
};

const updatePasswordController = async (req, res) => {
    try {
        const userId = req.user.id;
        const { oldPassword, newPassword } = req.body;
        console.log(userId)
        // Validate input
        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Old and new passwords are required",
            });
        }

        // Find user
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Check old password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid current password",
            });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update and save
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password updated successfully",
        });
    } catch (error) {
        console.error("Update Password Error:", error);
        res.status(500).json({
            success: false,
            message: "Error updating password",
            error: error.message,
        });
    }
};

//RESET password
const resetPasswordController = async (req, res) => {
    try {
        const userId = req.user.id;
        const { email, newPassword, answer } = req.body;

        // Validate input
        if (!email || !newPassword || answer) {
            return res.status(400).json({
                success: false,
                message: "Please Provide all fields!",
            });
        }

        const user = await userModel.findOne({ email, answer })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found or Ans Invalid",
            });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update and save
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password Reset successfully",
        });
    } catch (error) {
        console.error("Update Password Error:", error);
        res.status(500).json({
            success: false,
            message: "Error updating password",
            error: error.message,
        });
    }
};
// DLEETE PROFILE ACCOUNT

const deleteProfileController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Your account has been deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr In Delete Profile API",
      error,
    });
  }
};


module.exports = {
    getUserController,
    updateUserController,
    updatePasswordController,
    resetPasswordController,
    deleteProfileController
}