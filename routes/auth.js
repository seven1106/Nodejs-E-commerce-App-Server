const express = require("express");

const app = express();
const router = express.Router();
router.post("/login", (req, res) => {
    return res.json({ 'message': "Login successful" });
});
router.post("/register",);
router.post("/forgot-password",);
router.post("/verify-otp",);
router.post("/reset-password",);
module.exports = router;
