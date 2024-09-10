const mongoose = require("mongoose");
const { productSchema } = require("./product");

const orderSchema = mongoose.Schema({
  products: [
    {
      product: productSchema,
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  initialPrice: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  userId: {
    required: true,
    type: String,
  },
  receiverName: {
    required: true,
    type: String,
  },
  receiverPhone: {
    required: true,
    type: String,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  orderedAt: {
    type: Number,
    required: true,
  },
  status: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    required: false,
  },
  voucherId: {
    type: String,
    default: "",
    required: false,
  },

});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
