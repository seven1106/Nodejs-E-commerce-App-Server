const express = require("express");
const auth = require("../middlewares/auth");
const controller = require("../controllers/product");
const router = express.Router();

router.get("/products/", auth, controller.fetchProductsCategory);

router.get("/products/search/:name", controller.searchProducts);

module.exports = router;
