const { Notification } = require("../models/notification");

// Tạo một thông báo mới
exports.createNotification = async (req, res) => {
    try {
        const { title, content, type, userId } = req.body;
        const notification = new Notification({
            title,
            content,
            type,
            userId,
            createAt: Date.now(),
        });

        await notification.save();
        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ message: "Failed to create notification", error: error.message });
    }
};

// Lấy tất cả thông báo của một người dùng
exports.getUserNotifications = async (req, res) => {
    try {
        const { userId } = req.params;
        const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: "Failed to get notifications", error: error.message });
    }
};

// Đánh dấu thông báo là đã đọc
exports.markAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findByIdAndUpdate(
            id,
            { isRead: true },
            { new: true }
        );

        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }

        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ message: "Failed to update notification", error: error.message });
    }
};

// Xóa một thông báo
exports.deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findByIdAndDelete(id);

        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }

        res.status(200).json({ message: "Notification deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete notification", error: error.message });
    }
};
