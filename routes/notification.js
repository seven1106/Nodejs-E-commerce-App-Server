const express = require("express");
const notificationController = require("../controllers/notification");

const router = express.Router();

router.patch("/notifications/:id/read", notificationController.markAsRead);
router.delete("/notifications/:id", notificationController.deleteNotification);

module.exports = router;
