const multer = require('multer');

//configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()} - ${file.originalname}`);
    }
})

//File filter
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if(allowedMimeTypes.includes(file.mimetype)){
        cb(null , true);
    } else {
        cb(new Error('Invalid file type , only jpeg , png , jpg types are allowed'), false);
    }
};

const upload = multer({storage, fileFilter});

module.exports = upload;