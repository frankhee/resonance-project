const express = require("express");
const router = express.Router();
const productUtilities = require("../../controllers/product/productUtilities")

// @route GET api/products/allproducts
// @desc Get all product info
// @access Public
router.get("/allproducts", productUtilities.handleGetProducts);

module.exports = router;