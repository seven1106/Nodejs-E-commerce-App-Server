const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    type: {
        type: String,
        enum: ["common", "order", "vote", "delivery", "voucher"],
        required: true,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    orderId: {
        type: String,
        required: true,
    },
    createTime: {
        type: Number,
        required: true,
    },
    });
const Notification = mongoose.model("Notification", notificationSchema);
module.exports = {Notification, notificationSchema};