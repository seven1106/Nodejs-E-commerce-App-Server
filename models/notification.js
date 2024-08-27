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
    userId: {
        type: String,
        required: true,
    },
    createAt: {
        type: Number,
        required: true,
    },
    }, {
    timestamps: true,
});
const Notification = mongoose.model("Notification", notificationSchema);
exports.Notification = Notification;