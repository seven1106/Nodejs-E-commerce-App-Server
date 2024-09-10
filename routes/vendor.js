const express = require("express");
const app = express();
const vendorRouter = express.Router();
const productController = require("../controllers/vendor");
const middleWare = require("../middlewares/vendor");

vendorRouter.post("/vendor/add-product", middleWare, productController.addProduct);
vendorRouter.get("/vendor/get-products", middleWare, productController.getProducts);
vendorRouter.get("/vendor/get-product/:id", middleWare, productController.getProductById);
vendorRouter.get("/vendor/get-orders", middleWare, productController.getOrders);
vendorRouter.get("/vendor/get-order/:id", middleWare, productController.getOrdersById);
vendorRouter.get("/vendor/get-analytics", middleWare, productController.getAnalytics);
vendorRouter.post("/vendor/delete-product", middleWare, productController.deleteProduct);
vendorRouter.post("/vendor/change-order-status", middleWare, productController.changeOrderStatus);
vendorRouter.post("/vendor/update-product", middleWare, productController.updateProduct);
module.exports = vendorRouter;



