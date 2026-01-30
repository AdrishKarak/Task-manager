const express = require('express');
const { registerUser, loginUser, getUserProfile, updateUserProfile } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const router = express.Router();

//Auth Routes

router.post("/register", registerUser); //Register User
router.post("/login", loginUser); //Login User
router.get("/profile", protect, getUserProfile); //Get User Profile
router.put("/profile", protect, updateUserProfile); //Update User Profile

// Image upload route with Cloudinary
router.post("/upload-image", upload.single("image"), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // Cloudinary automatically provides the URL in req.file.path
        const imageUrl = req.file.path;

        // Additional info you might want to save
        const imageData = {
            imageUrl: imageUrl,
            publicId: req.file.filename, // Cloudinary public ID (useful for deletion)
            format: req.file.format,
            size: req.file.size
        };

        console.log('Image uploaded successfully to Cloudinary:', imageUrl);

        res.status(200).json({
            message: "Image uploaded successfully",
            imageUrl: imageUrl,
            publicId: req.file.filename // Save this if you need to delete the image later
        });

    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({
            message: "Failed to upload image",
            error: error.message
        });
    }
});

module.exports = router;