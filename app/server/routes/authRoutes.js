const express = require("express");
const { registerController, loginController } = require("../controllers/authControllers");

const router = express.Router();
console.log("In Routes, calling controller to process the request");
// register - POST - /register
router.post("/register", registerController);

// Login - POST - /login
router.post("/login", loginController);

module.exports = router;
