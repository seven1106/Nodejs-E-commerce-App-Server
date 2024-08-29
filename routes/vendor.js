const express = require("express");
const app = express();
const router = express.Router();
const productController = require("../controllers/vendor");
const middleWare = require("../middlewares/vendor");

router.post("/vendor/add-product", middleWare, productController.addProduct);
router.get("/vendor/get-products", middleWare, productController.getProducts);
router.get("/vendor/get-product/:id", middleWare, productController.getProductById);
router.get("/vendor/get-orders", middleWare, productController.getOrders);
router.get("/vendor/get-order/:id", middleWare, productController.getOrdersById);
router.get("/vendor/get-analytics", middleWare, productController.getAnalytics);
router.post("/vendor/delete-product", middleWare, productController.deleteProduct);
router.post("/vendor/change-order-status", middleWare, productController.changeOrderStatus);
router.post("/vendor/update-product", middleWare, productController.updateProduct);
module.exports = router;

