const express = require("express");

const app = express();
const authRouter = express.Router();
const User = require("../models/user");
const authController = require("../controllers/auth");
const { body } = require("express-validator");
const validateUser = [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Enter a valid email address"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
];
const auth = require("../middlewares/auth");
authRouter.post("/sign-in", authController.signin);
authRouter.post("/sign-up",validateUser, authController.signup);
authRouter.post("/token-is-valid", authController.validateToken);
authRouter.get("/auth", auth, authController.getUserData);
authRouter.post("/reset-password",);

module.exports = authRouter;