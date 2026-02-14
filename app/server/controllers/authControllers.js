const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
console.log("In Auth Controller, processing the request");

// User registration
const registerController = async (req, res) => {
    try {
        console.log(req.body);
        const {username, email, password, phone, address} = req.body;
        if (!username || !email || !password || !phone || !address) {
            return res.status(400).send({
                success: false,
                message: "Missing required field: username, email, password, phone or address"
            });
        }
        console.log({email});
        const checkEmail = await userModel.findOne({email});
        console.log(checkEmail);
        if (checkEmail) {
            return res.status(409).send({
                success: false,
                message: "Email already registered, Please login"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({
            username, email, password: hashedPassword, phone, address: [address]
        });
        res.status(201).send({
            success: true,
            message: "Successfully registered",
            result: [user]
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "User Registration Failed!",
            error
        });
    }
};

// User Login verification
const loginController = async (req, res) => {
    try {
        const {email, password} = req.body;
        if ( !email || !password ) {
            return res.status(400).send({
                success: false,
                message: "Missing required field: Email Id or Password."
            });
        }
        const user = await userModel.findOne({email});
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email id is not found in the database, please register."
            });
        }
        const validatePassword = await bcrypt.compare(password, user.password);
        if (!validatePassword) {
            return res.status(401).send({
                success: false,
                message: "Invalid Credentials, Please try again."
            });
        }
        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
                role: user.role || "USER",
            }, 
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
        );
        res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user: {
                userId: user._id,
                email: user.email,
                role: user.role || "USER"
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "User Login API was failed!",
            error
        });
    }
}

module.exports = { registerController, loginController };