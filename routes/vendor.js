const express = require("express");
const app = express();
const router = express.Router();
const productController = require("../controllers/vendor");
const middleWare = require("../middlewares/vendor");

router.post("/vendor/add-product", middleWare, productController.addProduct);



module.exports = router;
