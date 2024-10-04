const express = require("express");
const auth = require("../middlewares/auth");
const controller = require("../controllers/product");
const ProductRouter = express.Router();

ProductRouter.get("/products/", auth, controller.fetchProductsCategory);

ProductRouter.get("/get-products/:id", auth, controller.getProductById);

ProductRouter.get("/products/search/:name", controller.searchProducts);

// create a post request route to rate the product.
ProductRouter.post("/products/rate-product", auth, controller.rateProduct);

ProductRouter.get("/products/deals", controller.fetchDeals);
ProductRouter.get("/products/new-product", controller.fetchAllProduct);
ProductRouter.get("/products/best-seller-product", controller.fetchBestSellerProducts);
ProductRouter.get("/products/best-sale-product", controller.fetchTopDeals);

module.exports = ProductRouter;
