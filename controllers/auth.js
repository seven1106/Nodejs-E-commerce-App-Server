const { validationResult } = require("express-validator");
const { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.signup = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => ({
      field: error.path,
      message: error.msg,
    }));
    return res.status(400).json({ error: errorMessages });
  }
  try {
    const { name, email, phone, password, type } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with same email already exists!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    var newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      type,
    });
    newUser = await newUser.save();
    return res.status(200).json(newUser);
  } catch (error) {
    return res.status(500).json({ error: error.message, type: error.name });
  }
};
exports.signin = async function (req, res) {
  const errors = validationResult(req);
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found!" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials!" });
    }
    const token = jwt.sign({ id: user._id }, "passwordKey");
    return res.status(200).json({ token, ...user._doc });
  } catch (error) {
    return res.status(500).json({ error: error.message, type: error.name });
  }
};
exports.validateToken = async function (req, res) {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);
    const verified = jwt.verify(token, "passwordKey");
    if (!verified) return res.json(false);
    const user = await User.findById(verified.id);
    if (!user) return res.json(false);
    return res.json(true);
  } catch (error) {
    return res.status(500).json({ error: error.message, type: error.name });
  }
};
exports.getUserData = async function (req, res) {
    try {
      const user = await User.findById(req.user);
      res.json({
        ...user._doc,
        token: req.token,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message, type: error.name });
    }
};
