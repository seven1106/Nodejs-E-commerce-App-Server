const express = require("express");
const userRouter = express.Router();
const auth = require("../middlewares/auth");
const Order = require("../models/order");
const {Notification} = require("../models/notification");
const { Product } = require("../models/product");
const { User } = require("../models/user");

userRouter.post("/user/add-to-cart", auth, async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findById(id);
    let user = await User.findById(req.user);

    if (user.cart.length == 0) {
      user.cart.push({ product, quantity: 1 });
    } else {
      let isProductFound = false;
      for (let i = 0; i < user.cart.length; i++) {
        if (user.cart[i].product._id.equals(product._id)) {
          isProductFound = true;
        }
      }

      if (isProductFound) {
        let producttt = user.cart.find((productt) =>
          productt.product._id.equals(product._id)
        );
        producttt.quantity += 1;
      } else {
        user.cart.push({ product, quantity: 1 });
      }
    }
    user = await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

userRouter.delete("/user/remove-from-cart/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    let user = await User.findById(req.user);

    for (let i = 0; i < user.cart.length; i++) {
      if (user.cart[i].product._id.equals(product._id)) {
        if (user.cart[i].quantity == 1) {
          user.cart.splice(i, 1);
        } else {
          user.cart[i].quantity -= 1;
        }
      }
    }
    user = await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// save user address
userRouter.post("/user/save-user-address", auth, async (req, res) => {
  try {
    const { address } = req.body;
    let user = await User.findById(req.user);
    user.address = address;
    user = await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// order product
userRouter.post("/user/order", auth, async (req, res) => {
  try {
    const { cart, totalPrice, address, receiverName, receiverPhone, paymentMethod } = req.body;
    let products = [];

    for (let i = 0; i < cart.length; i++) {
      let product = await Product.findById(cart[i].product._id);
      if (product.quantity >= cart[i].quantity) {
        product.quantity -= cart[i].quantity;
        product.sellCount += cart[i].quantity;
        products.push({ product, quantity: cart[i].quantity });
        await product.save();
      } else {
        return res
          .status(400)
          .json({ msg: `${product.name} is out of stock!` });
      }
    }

    let user = await User.findById(req.user);
    user.cart = [];
    user = await user.save();

    let order = new Order({
      products,
      totalPrice,
      address,
      receiverName,
      receiverPhone,
      paymentMethod,
      userId: req.user,
      orderedAt: new Date().getTime(),
    });
    order = await order.save();
    res.json({ order });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
userRouter.post("/user/notification", auth, async (req, res) => {
  try {
    const { title, content, type, orderId, receiverId } = req.body;
    let user = await User.findById(receiverId);
    let notification = new Notification({
      title,
      content,
      type,
      orderId,
      createTime: new Date().getTime(),
    });
    user.notifications.push({
      notify: notification,
    },);
    await user.save();
    res.json(notification);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
userRouter.put("/user/mark-as-read", auth, async (req, res) => {
  try {
    const { id, uid } = req.body;
    let user = await User.findById(uid);
    for (let i = 0; i < user.notifications.length; i++) {
      if (user.notifications[i].notify._id.equals(id)) {
        user.notifications[i].notify.isRead = true;
      }
    }
    await user.save();
    res.json(user.notifications);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
);

userRouter.get("/user/orders/me", auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user });
    res.json(orders);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Thêm sản phẩm vào wishlist của người dùng
userRouter.post("/user/add-to-wishlist", auth, async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }

    let user = await User.findById(req.user);

    // Kiểm tra xem sản phẩm đã có trong wishlist chưa
    const isProductInWishlist = user.wishlist.find((item) =>
      item.product._id.equals(product._id)
    );
    if (isProductInWishlist) {
      return res.status(400).json({ message: "Sản phẩm đã có trong wishlist" });
    }

    // Thêm sản phẩm vào wishlist
    user.wishlist.push({ product: product });
    await user.save();

    res.status(200).json({ message: "Đã thêm sản phẩm vào wishlist", wishlist: user.wishlist });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Xóa sản phẩm khỏi wishlist của người dùng
userRouter.delete("/user/remove-from-wishlist/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    let user = await User.findById(req.user);
    const productIndex = user.wishlist.indexOf(id);
    // Xóa sản phẩm khỏi wishlist
    user.wishlist.splice(productIndex, 1);
    await user.save();

    res.status(200).json({ message: "Đã xóa sản phẩm khỏi wishlist", wishlist: user.wishlist });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});



module.exports = userRouter;