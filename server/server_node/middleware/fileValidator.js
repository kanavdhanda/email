const validateFileType = (req, file, cb) => {
    if (file.mimetype === 'text/html') {
        cb(null, true);
    } else {
        cb(new Error('Only HTML files are allowed!'), false);
    }
};

module.exports = validateFileType;
