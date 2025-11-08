// Import dependencies
const User = require('../models/User');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ============================================================
// Helper: Generate JWT Token
// ============================================================

/**
 * Generates a JWT token for a given user ID.
 * @param {String} userId - MongoDB ObjectId of the user
 * @returns {String} JWT token valid for 7 days
 */
const generateToken = (userId) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};

// ============================================================
// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
// ============================================================

const registerUser = async (req, res) => {
    try {
        const { name, email, password, profileImageUrl, adminInviteToken } = req.body;

        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email, and password are required" });
        }

        // Validate password strength
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        // Check if the User already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        // Determine Role (admin if the correct token is provided)
        let role = "member";
        if (adminInviteToken && adminInviteToken === process.env.ADMIN_INVITE_TOKEN) {
            role = "admin";
        }

        // Hash password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the new user in the database
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            profileImageUrl,
            role,
        });

        // Send response with token
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            role: user.role,
            token: generateToken(user._id),
        });

    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// ============================================================
// @desc    Login User
// @route   POST /api/auth/login
// @access  Public
// ============================================================

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate inputs
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Compare entered password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Successful login — return user data and JWT
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            role: user.role,
            token: generateToken(user._id),
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// ============================================================
// @desc    Get User Profile (Requires JWT Authentication)
// @route   GET /api/auth/profile
// @access  Private
// ============================================================

const getUserProfile = async (req, res) => {
    try {
        // req.user is set by JWT middleware
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);

    } catch (error) {
        console.error("Get Profile Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// ============================================================
// @desc    Update User Profile (Requires JWT Authentication)
// @route   PUT /api/auth/profile
// @access  Private
// ============================================================

const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // If updating email, ensure it's not already in use
        if (req.body.email && req.body.email !== user.email) {
            const emailExists = await User.findOne({ email: req.body.email });
            if (emailExists) {
                return res.status(400).json({ message: "Email already in use by another account" });
            }
            user.email = req.body.email;
        }

        // Update name and profile image if provided
        user.name = req.body.name || user.name;
        user.profileImageUrl = req.body.profileImageUrl || user.profileImageUrl;

        // Update password if provided
        if (req.body.password) {
            if (req.body.password.length < 6) {
                return res.status(400).json({ message: "Password must be at least 6 characters long" });
            }
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.password, salt);
        }

        // Save updates to DB
        const updatedUser = await user.save();

        // Return updated info (no need for a new token)
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            profileImageUrl: updatedUser.profileImageUrl,
            role: updatedUser.role,
        });

    } catch (error) {
        console.error("Update Profile Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// ============================================================
// Export controller functions
// ============================================================

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
};
