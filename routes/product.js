const express = require("express");
const auth = require("../middlewares/auth");
const controller = require("../controllers/product");
const router = express.Router();

router.get("/products/", auth, controller.fetchProductsCategory);

router.get("/products/search/:name", controller.searchProducts);

// create a post request route to rate the product.
router.post("/products/rate-product", auth, controller.rateProduct);

router.get("/products/deals", controller.fetchDeals);

module.exports = router;
