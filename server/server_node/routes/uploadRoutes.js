const express = require('express');
const router = express.Router();
const upload = require('../config/multer.config');
const validateFileType = require('../middleware/fileValidator');
const UploadController = require('../controllers/uploadController');
const errorHandler = require('../middleware/errorHandler');

router.post('/upload', 
    upload.single('htmlFile'),
    validateFileType,
    UploadController.uploadFile
);

router.get('/uploads', UploadController.getAllUploads);
router.get('/uploads/:id', UploadController.getUploadById);
router.delete('/uploads/:id', UploadController.deleteUpload);

router.use(errorHandler);

module.exports = router;
