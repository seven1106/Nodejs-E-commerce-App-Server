const express = require("express");
const auth = require("../middlewares/auth");
const controller = require("../controllers/product");
const router = express.Router();

router.get("/products/", auth, controller.fetchProductsCategory);

// create a get request to search products and get them
// /api/products/search/i
// router.get("/api/products/search/:name", auth, async (req, res) => {
//   try {
//     const products = await Product.find({
//       name: { $regex: req.params.name, $options: "i" },
//     });

//     res.json(products);
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// });

module.exports = router;
