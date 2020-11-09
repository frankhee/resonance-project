const express = require("express");
const router = express.Router();
const userUtilities = require("../../controllers/user/userUtilities")

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", userUtilities.registerUser);

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", userUtilities.loginUser);

module.exports = router;