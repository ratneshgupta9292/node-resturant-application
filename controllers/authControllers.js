const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require('jsonwebtoken');



const registerController = async (req, res) => {
    try {
        const { userName, email, password, phone, address, answer } = req.body;
        //validation
        if (!userName || !email || !password || !address || !phone || !answer) {
            return res.status(500).send({
                success: false,
                message: "Please Provide All Fields",
            });
        }

        const exisiting = await userModel.findOne({ email });
        if (exisiting) {
            return res.status(500).send({
                success: false,
                message: "Email Already Registerd please Login",
            });
        }

        const salt = bcrypt.genSaltSync(10);
        const haspassword = await bcrypt.hash(password, salt)
        const user = await userModel.create({
            userName,
            email,
            password: haspassword,
            address,
            phone,
            answer,
        });
        res.status(201).send({
            success: true,
            message: "Successfully Registered",
            user,
        });
    } catch (error) {
        console.log(error)
        return res.status(404).send({ sucess: false, message: "Error In API", error })
    }
};
//login
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(500).send({
                success: false,
                message: "Please Provide Email or Password",
            });
        }

        const user = await userModel.findOne({ email: email });
        if (!user) {
            return res.status(500).send({
                success: false,
                message: "Not a User!",
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            res.status(404).send({
                success: true,
                message: "Invalid Credencials",
                user,
            });
        }
        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        })
        res.status(200).send({
            success: true,
            message: "Successfully Login",
            user,
            token,
        });
    } catch (error) {
        console.log(error)
        return res.status(404).send({ sucess: false, message: "Error In API", error })
    }
};
module.exports = { registerController, loginController };