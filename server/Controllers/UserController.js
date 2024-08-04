const User = require('../Models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email });
        
        if (userExists) {
            return res.status(400).json({ message: "User with that email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt); 
        req.body.password = hashedPassword;

        const newUser = new User(req.body);
        await newUser.save();
        
        res.status(201).json({ message: "User created successfully" });
    } 
    catch (error) {
        res.status(500).json({ message: "Unable to create user", error: error.message });
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const validUser = await User.findOne({ email });
        if (!validUser) {
            return res.status(400).json({ message: "User not found, please register" });
        }

        const validPassword = await bcrypt.compare(password, validUser.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ userId: validUser._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.send({ 
            message: "Login successful", 
            success: true, 
            token: token
        });
    } 
    catch (error) {
        res.status(500).json({ message: "Unable to login user", error: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } 
    catch (error) {
        res.status(500).json({ message: "Unable to retrieve users", error: error.message });
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } 
    catch (error) {
        res.status(500).json({ message: "Unable to retrieve user", error: error.message });
    }
};
