const multer = require('multer');

const errorHandler = (error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        return res.status(400).json({
            error: 'File upload error',
            details: error.message
        });
    }
    next(error);
};

module.exports = errorHandler;