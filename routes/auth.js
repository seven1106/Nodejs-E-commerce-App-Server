const express = require("express");

const app = express();
const router = express.Router();
const User = require("../models/user");
const authController = require("../controllers/auth");
// const authMiddleware = require("../middleware/auth");
const { body } = require("express-validator");
const validateUser = [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Enter a valid email address"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
];
router.post("/sign-in", authController.signin);
router.post("/sign-up",validateUser, authController.signup);
router.post("/forgot-password",);
router.post("/verify-otp",);
router.post("/reset-password",);

module.exports = router;
