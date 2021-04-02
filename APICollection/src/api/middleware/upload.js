const multer = require("multer");
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let subPath = '';
        if (file.fieldname == 'badge_image') subPath = 'badge_image';

        file.subPath = subPath;
        file.dirPath = path.join(__basedir, 'public', subPath)

        if (!fs.existsSync(file.dirPath)) {
            fs.mkdirSync(file.dirPath);
        }
        cb(null, file.dirPath);
    },
    filename: function (req, file, cb) {
        const file_name = Date.now() + '-' + file.originalname.replace(/ /g, '_');
        file.fullPath = process.env['SITE_URL'] + "/" + file.subPath + "/" + file_name;
        cb(null, file_name);
    }
});

const validateFile = function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
        allowedFileTypes = /jpeg|jpg|png|gif/;
        const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = allowedFileTypes.test(file.mimetype);
        if (extension && mimeType) {
            return cb(null, true);
        } else {
            req.fileValidationError = "Invalid file type! Only JPEG, PNG and GIF file are allowed.";
            return cb(null, false, new Error(req.fileValidationError));
        }
    } else {
        req.fileValidationError = "Please upload valid file type!";
        return cb(null, false, new Error(req.fileValidationError));
    }
}

const upload = multer({
    storage,
    fileFilter: validateFile
});

module.exports = upload;