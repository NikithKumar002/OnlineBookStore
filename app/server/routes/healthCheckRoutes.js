const express = require("express");
const { testUserController } = require("../controllers/healthCheckControllers");

const router = express.Router();
console.log("In Routes, calling controller to process the request");

router.get("/test-api", testUserController);

module.exports = router;