const { validationResult } = require('express-validator');
const { User } = require('../models/user');
const bcrypt = require('bcryptjs');
exports.signup = async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => ({
            field: error.path,
            message: error.msg,
        }));
        return res.status(400).json({ errors: errorMessages });
    }
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res
            .status(400)
            .json({ msg: "User with same email already exists!" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        var newUser = new User({
            name,
            email,
            password: hashedPassword,
        });
        newUser = await newUser.save();
        return res.status(201).json(newUser);
    }catch (error) {
        return res.status(500).json({ error: error.message, type: error.name });
    }
    
    
};
