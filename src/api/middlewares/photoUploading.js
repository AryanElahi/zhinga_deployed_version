const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: './photos', 
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, 
}).array('images', 10); 
module.exports = upload;
