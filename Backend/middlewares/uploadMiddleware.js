const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary with environment variables
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'task-manager-uploads', // Folder name in Cloudinary
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'], // Allowed file types
        transformation: [{ width: 1500, height: 1500, crop: 'limit' }], // Optional: resize large images
        public_id: (req, file) => {
            // Generate unique filename
            return `${Date.now()}-${file.originalname.replace(/\s+/g, '-').replace(/\.[^/.]+$/, '')}`;
        }
    }
});

// File filter (same as before, but now it's extra validation)
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed'), false);
    }
};

// Configure multer with Cloudinary storage
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB file size limit
    }
});

module.exports = upload;